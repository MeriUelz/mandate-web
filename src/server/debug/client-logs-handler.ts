interface LogEntry {
  level: string;
  message: string;
  timestamp: Date;
  url?: string;
  userAgent?: string;
  stacks?: string[];
  extra?: any;
}

interface ClientLogRequest {
  logs: LogEntry[];
}

export default async function handler(request: any) {
  console.log("=== Client Logs Handler Debug ===");
  console.log("Request method:", request.method);
  console.log("Request type:", typeof request);
  console.log("Request constructor:", request.constructor?.name);
  console.log("Request keys:", Object.keys(request));

  if (request.method !== "POST") {
    console.log("Method not allowed:", request.method);
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    let body = "";
    
    console.log("Processing request body...");
    
    // Handle different request object types
    if (typeof request.json === "function") {
      console.log("Using request.json() method");
      // Web API Request object
      const jsonBody = await request.json();
      body = JSON.stringify(jsonBody);
      console.log("Successfully parsed JSON body");
    } else if (request.body) {
      console.log("Using request.body property");
      // Already parsed body
      body = typeof request.body === "string" ? request.body : JSON.stringify(request.body);
      console.log("Successfully processed body property");
    } else {
      console.log("Using stream reading approach");
      // Node.js IncomingMessage style - need to read stream
      return new Promise((resolve) => {
        let rawBody = "";
        
        if (request.setEncoding) {
          request.setEncoding("utf8");
        }
        
        request.on("data", (chunk: string) => {
          console.log("Received data chunk:", chunk.length, "bytes");
          rawBody += chunk;
        });
        
        request.on("end", async () => {
          console.log("Stream ended, total body length:", rawBody.length);
          try {
            const parsedBody = JSON.parse(rawBody) as ClientLogRequest;
            console.log("Successfully parsed streamed JSON, logs count:", parsedBody.logs?.length || 0);
            const result = await processLogs(parsedBody);
            console.log("Successfully processed logs");
            resolve(result);
          } catch (error) {
            console.error("Error processing streamed client logs:", error);
            console.error("Raw body that failed to parse:", rawBody);
            resolve(new Response(JSON.stringify({ 
              error: "Invalid JSON",
              details: error instanceof Error ? error.message : 'Unknown error'
            }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            }));
          }
        });
        
        request.on("error", (error: Error) => {
          console.error("Stream error:", error);
          resolve(new Response(JSON.stringify({ 
            error: "Request error",
            details: error.message
          }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }));
        });
      });
    }

    console.log("Parsing body as JSON...");
    const parsedBody = JSON.parse(body) as ClientLogRequest;
    console.log("Successfully parsed JSON, logs count:", parsedBody.logs?.length || 0);
    
    const result = await processLogs(parsedBody);
    console.log("Successfully processed logs");
    return result;
  } catch (error) {
    console.error("=== Client Logs Handler Error ===");
    console.error("Error:", error);
    console.error("Request object:", request);
    return new Response(JSON.stringify({ 
      error: "Invalid JSON",
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function processLogs(body: ClientLogRequest): Promise<Response> {
  try {
    console.log("Processing logs, received body:", body);
    
    if (!body.logs || !Array.isArray(body.logs)) {
      console.error("Invalid request body - logs missing or not an array:", body);
      return new Response("Invalid request body", { status: 400 });
    }

    console.log("Processing", body.logs.length, "log entries");

    // Forward each log to the server console
    body.logs.forEach((log, index) => {
      try {
        const timestamp = new Date(log.timestamp).toLocaleTimeString();
        const location = log.url ? ` (${log.url})` : "";
        const prefix = `[browser] [${timestamp}]`;

        let message = `${prefix} [${log.level}] ${log.message}${location}`;

        // Add stack traces if available
        if (log.stacks && log.stacks.length > 0) {
          message +=
            "\n" +
            log.stacks
              .map((stack) =>
                stack
                  .split("\n")
                  .map((line) => `    ${line}`)
                  .join("\n"),
              )
              .join("\n");
        }

        // Add extra data if available
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (log.extra && log.extra.length > 0) {
          message +=
            "\n    Extra data: " +
            JSON.stringify(log.extra, null, 2)
              .split("\n")
              .map((line, i) => (i === 0 ? line : `    ${line}`))
              .join("\n");
        }

        // Log to server console based on level
        switch (log.level) {
          case "error":
            console.error(message);
            break;
          case "warn":
            console.warn(message);
            break;
          case "info":
            console.info(message);
            break;
          case "debug":
            console.log(message);
            break;
          default:
            console.log(message);
        }
      } catch (logError) {
        console.error(`Error processing log entry ${index}:`, logError);
        console.error(`Problematic log entry:`, log);
      }
    });

    console.log("Successfully processed all log entries");

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in processLogs function:", error);
    return new Response(JSON.stringify({ 
      error: "Internal server error",
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
