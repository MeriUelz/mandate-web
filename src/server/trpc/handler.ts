import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "./root";

// Helper function to create a Web API compatible Request object
function createWebRequest(originalRequest: any): Request {
  try {
    // If it's already a Web API Request, return it
    if (originalRequest instanceof Request) {
      console.log("Request is already Web API Request, URL:", originalRequest.url);
      return originalRequest;
    }

    // Log the original request object structure for debugging
    console.log("Original request object keys:", Object.keys(originalRequest));
    console.log("Original request url:", originalRequest.url);
    console.log("Original request path:", originalRequest.path);
    console.log("Original request pathname:", originalRequest.pathname);

    // Extract basic request info
    const method = originalRequest.method || 'GET';
    
    // Handle different request object types
    let url = originalRequest.url;
    let headers = new Headers();
    let body: BodyInit | null = null;

    // Handle H3Event objects (Nitro/Nuxt framework)
    if (originalRequest.constructor?.name === 'H3Event' || originalRequest.node) {
      console.log("Detected H3Event object");
      const event = originalRequest;
      
      // For H3Event, we need to construct the URL differently
      const nodeReq = event.node?.req || event;
      url = nodeReq.url;
      
      // Extract headers from H3Event
      if (nodeReq.headers) {
        for (const [key, value] of Object.entries(nodeReq.headers)) {
          if (typeof value === 'string') {
            headers.set(key, value);
          } else if (Array.isArray(value)) {
            headers.set(key, value[0]);
          }
        }
      }
      
      // Handle body for H3Event
      if (method !== 'GET' && method !== 'HEAD') {
        body = nodeReq;
      }
    } else {
      // Handle standard Node.js request objects
      if (!url) {
        // If no direct URL, try to construct from parts
        const protocol = originalRequest.protocol || 'http:';
        const host = originalRequest.headers?.host || originalRequest.host || 'localhost';
        
        // Try to get the full path including query string
        let fullPath = originalRequest.pathname || originalRequest.path || '/';
        
        // If we have query parameters, append them
        const search = originalRequest.search || 
                      (originalRequest.query ? `?${new URLSearchParams(originalRequest.query).toString()}` : '') ||
                      '';
        
        // Ensure we don't double-add query params
        if (search && !fullPath.includes('?')) {
          fullPath += search;
        }
        
        url = `${protocol}//${host}${fullPath}`;
      }

      // Extract headers
      if (originalRequest.headers) {
        for (const [key, value] of Object.entries(originalRequest.headers)) {
          if (typeof value === 'string') {
            headers.set(key, value);
          } else if (Array.isArray(value)) {
            headers.set(key, value[0]);
          }
        }
      }

      // Handle body
      if (originalRequest.body) {
        body = originalRequest.body;
      } else if (method !== 'GET' && method !== 'HEAD') {
        // For non-GET requests, try to read the body
        if (typeof originalRequest.read === 'function') {
          // It's a readable stream
          body = originalRequest;
        }
      }
    }

    console.log("Constructed URL:", url);

    // Ensure we have a valid URL
    if (!url || (!url.startsWith('http') && !url.startsWith('/'))) {
      console.error("Invalid URL constructed:", url);
      url = '/';
    }

    // If URL is relative, make it absolute
    if (url.startsWith('/')) {
      const host = headers.get('host') || 'localhost';
      url = `http://${host}${url}`;
    }

    const webRequest = new Request(url, {
      method,
      headers,
      body,
    });

    console.log("Final Web API Request URL:", webRequest.url);
    console.log("Final Web API Request pathname:", new URL(webRequest.url).pathname);
    
    return webRequest;
  } catch (error) {
    console.error('Error creating Web API Request:', error);
    console.error('Original request object:', originalRequest);
    
    // Create a minimal fallback request
    try {
      const fallbackUrl = 'http://localhost/';
      const fallbackRequest = new Request(fallbackUrl, {
        method: originalRequest.method || 'GET',
      });
      console.log("Created fallback request with URL:", fallbackUrl);
      return fallbackRequest;
    } catch (fallbackError) {
      console.error('Even fallback request creation failed:', fallbackError);
      // Last resort: return the original request and hope it works
      return originalRequest as Request;
    }
  }
}

export default async function handler(request: any) {
  try {
    console.log("=== tRPC Handler Debug Info ===");
    console.log("Request type:", typeof request);
    console.log("Request method:", request.method);
    console.log("Request url:", request.url);
    console.log("Request constructor:", request.constructor?.name);
    console.log("Request keys:", Object.keys(request));
    
    // Convert request to Web API compatible format
    const webRequest = createWebRequest(request);
    
    console.log("=== Web Request Debug Info ===");
    console.log("Web Request URL:", webRequest.url);
    console.log("Web Request method:", webRequest.method);
    
    const parsedUrl = new URL(webRequest.url);
    console.log("Parsed URL pathname:", parsedUrl.pathname);
    console.log("Parsed URL search:", parsedUrl.search);
    
    const result = await fetchRequestHandler({
      endpoint: "/",
      req: webRequest,
      router: appRouter,
      createContext() {
        return {};
      },
      onError({ error, path }) {
        console.error(`=== tRPC Error Debug ===`);
        console.error(`Path: '${path}'`);
        console.error(`Error:`, error);
        console.error(`Request URL that caused error:`, webRequest.url);
        console.error(`Request pathname that caused error:`, new URL(webRequest.url).pathname);
      },
    });
    
    console.log("=== tRPC Handler Success ===");
    return result;
  } catch (error) {
    console.error("=== tRPC Handler Error ===");
    console.error("Error:", error);
    console.error("Request object:", request);
    return new Response(JSON.stringify({ 
      error: "Internal server error",
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
