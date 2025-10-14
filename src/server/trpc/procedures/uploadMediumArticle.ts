import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { chromium } from "playwright";
import { db } from "~/server/db";
import { baseProcedure } from "~/server/trpc/main";
import { verifyAdminToken } from "~/server/utils/auth";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

async function scrapeMediumArticle(url: string) {
  console.log(`=== STARTING MEDIUM ARTICLE SCRAPING ===`);
  console.log(`URL: ${url}`);
  console.log(`Node environment: ${process.env.NODE_ENV}`);
  console.log(`Available memory: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`);
  
  let browser;
  try {
    console.log('Launching Playwright browser...');
    browser = await chromium.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
        '--disable-extensions',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-renderer-backgrounding'
      ]
    });
    console.log('Browser launched successfully');
  } catch (error) {
    console.error('Failed to launch browser:', error);
    throw new Error(`Browser launch failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
  
  const page = await browser.newPage();
  
  try {
    // Set a more realistic user agent and viewport
    console.log('Setting up page configuration...');
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Add request interception to log failed requests
    page.on('requestfailed', (request) => {
      console.log(`Request failed: ${request.url()} - ${request.failure()?.errorText}`);
    });
    
    page.on('response', (response) => {
      if (response.status() >= 400) {
        console.log(`Response error: ${response.url()} - ${response.status()}`);
      }
    });
    
    // Set longer timeout and wait for load
    console.log('Navigating to Medium article...');
    const navigationPromise = page.goto(url, { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 // Increase timeout to 60 seconds
    });
    
    const response = await navigationPromise;
    console.log(`Navigation completed with status: ${response?.status()}`);
    
    if (!response || response.status() >= 400) {
      throw new Error(`Failed to load page: HTTP ${response?.status() || 'unknown'}`);
    }
    
    // Wait a bit more for dynamic content to load
    console.log('Waiting for dynamic content to load...');
    await page.waitForTimeout(5000); // Increased from 3000 to 5000ms
    
    // Check if the page loaded properly
    const pageTitle = await page.title();
    console.log(`Page title: "${pageTitle}"`);
    
    if (!pageTitle || pageTitle.toLowerCase().includes('error') || pageTitle.toLowerCase().includes('not found')) {
      throw new Error(`Page appears to have loading issues. Title: "${pageTitle}"`);
    }
    
    console.log('=== STARTING CONTENT EXTRACTION ===');
    
    // Extract article data from Medium with multiple fallback strategies
    const articleData = await page.evaluate(() => {
      console.log('Browser context: Starting content extraction...');
      
      // Log page structure for debugging
      console.log('Page URL:', window.location.href);
      console.log('Page title:', document.title);
      console.log('Body classes:', document.body.className);
      
      // Multiple strategies for finding the title
      const titleSelectors = [
        'h1[data-testid="storyTitle"]',
        'h1',
        '[data-testid="storyTitle"]',
        'article h1',
        '.graf--title',
        '[data-testid="headerTitle"]',
        'h1.pw-post-title',
        'h1[data-testid="post-title"]',
        '.post-title h1'
      ];
      
      let title = '';
      let titleSelector = '';
      for (const selector of titleSelectors) {
        const element = document.querySelector(selector);
        if (element && element.textContent?.trim()) {
          title = element.textContent.trim();
          titleSelector = selector;
          console.log(`Found title with selector: ${selector} - "${title}"`);
          break;
        } else {
          console.log(`Title selector failed: ${selector}`);
        }
      }
      
      if (!title) {
        console.log('No title found, trying meta tags...');
        const metaTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content') ||
                         document.querySelector('meta[name="title"]')?.getAttribute('content');
        if (metaTitle) {
          title = metaTitle;
          titleSelector = 'meta tag';
          console.log(`Found title from meta tag: "${title}"`);
        }
      }
      
      // Multiple strategies for finding the author
      const authorSelectors = [
        '[data-testid="authorName"]',
        'a[rel="author"]',
        '[data-testid="storyAuthorName"]',
        '.author-name',
        '[data-testid="authorName"] span',
        'a[data-testid="authorName"]',
        '.pw-author-name',
        '[data-testid="author-name"]',
        '.author a'
      ];
      
      let author = 'Unknown Author';
      let authorSelector = '';
      for (const selector of authorSelectors) {
        const element = document.querySelector(selector);
        if (element && element.textContent?.trim()) {
          author = element.textContent.trim();
          authorSelector = selector;
          console.log(`Found author with selector: ${selector} - "${author}"`);
          break;
        } else {
          console.log(`Author selector failed: ${selector}`);
        }
      }
      
      if (author === 'Unknown Author') {
        console.log('No author found, trying meta tags...');
        const metaAuthor = document.querySelector('meta[name="author"]')?.getAttribute('content') ||
                          document.querySelector('meta[property="article:author"]')?.getAttribute('content');
        if (metaAuthor) {
          author = metaAuthor;
          authorSelector = 'meta tag';
          console.log(`Found author from meta tag: "${author}"`);
        }
      }
      
      // Multiple strategies for finding content
      const contentStrategies = [
        // Strategy 1: Look for article with paragraphs and headings
        () => {
          console.log('Trying content strategy 1: article elements');
          const contentElements = document.querySelectorAll('article p, article h1, article h2, article h3, article h4, article h5, article h6');
          if (contentElements.length > 0) {
            console.log(`Found ${contentElements.length} content elements in article`);
            return Array.from(contentElements);
          }
          return null;
        },
        
        // Strategy 2: Look for main content area
        () => {
          console.log('Trying content strategy 2: main elements');
          const main = document.querySelector('main');
          if (main) {
            const contentElements = main.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
            if (contentElements.length > 0) {
              console.log(`Found ${contentElements.length} content elements in main`);
              return Array.from(contentElements);
            }
          }
          return null;
        },
        
        // Strategy 3: Look for story content
        () => {
          console.log('Trying content strategy 3: story content');
          const storyContent = document.querySelector('[data-testid="storyContent"]') || 
                              document.querySelector('.story-content') ||
                              document.querySelector('.postArticle-content') ||
                              document.querySelector('[data-testid="post-content"]');
          if (storyContent) {
            const contentElements = storyContent.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
            if (contentElements.length > 0) {
              console.log(`Found ${contentElements.length} content elements in story content`);
              return Array.from(contentElements);
            }
          }
          return null;
        },
        
        // Strategy 4: Look for Medium-specific selectors
        () => {
          console.log('Trying content strategy 4: Medium-specific selectors');
          const mediumContent = document.querySelector('.postArticle-readMore') ||
                               document.querySelector('.section-content') ||
                               document.querySelector('.post-content');
          if (mediumContent) {
            const contentElements = mediumContent.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
            if (contentElements.length > 0) {
              console.log(`Found ${contentElements.length} content elements in Medium content`);
              return Array.from(contentElements);
            }
          }
          return null;
        },
        
        // Strategy 5: Broader search with filtering
        () => {
          console.log('Trying content strategy 5: broader search');
          const contentElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
          const filtered = Array.from(contentElements).filter(el => {
            const text = el.textContent?.trim() || '';
            return text.length > 20 && // Filter out short elements
                   !el.closest('nav') && // Exclude navigation
                   !el.closest('header') && // Exclude header
                   !el.closest('footer') && // Exclude footer
                   !el.closest('.sidebar') && // Exclude sidebar
                   !el.closest('[role="banner"]') && // Exclude banner
                   !el.closest('[role="navigation"]') && // Exclude navigation
                   !el.closest('.comments') && // Exclude comments
                   !el.closest('.author-info'); // Exclude author info
          });
          
          if (filtered.length > 0) {
            console.log(`Found ${filtered.length} filtered content elements`);
            return filtered;
          }
          return null;
        }
      ];
      
      let contentElements: Element[] | null = null;
      for (let i = 0; i < contentStrategies.length; i++) {
        contentElements = contentStrategies[i]();
        if (contentElements && contentElements.length > 0) {
          console.log(`Content extraction strategy ${i + 1} successful with ${contentElements.length} elements`);
          break;
        }
      }
      
      let content = '';
      if (contentElements && contentElements.length > 0) {
        contentElements.forEach((element, index) => {
          const tagName = element.tagName.toLowerCase();
          const text = element.textContent?.trim() || '';
          
          if (text && text.length > 10) { // Only include substantial text
            if (tagName.startsWith('h')) {
              const level = parseInt(tagName.charAt(1)) || 1;
              content += `${'#'.repeat(level)} ${text}\n\n`;
            } else {
              content += `${text}\n\n`;
            }
          }
        });
      }
      
      console.log(`=== EXTRACTION RESULTS ===`);
      console.log(`Title: "${title}" (using ${titleSelector})`);
      console.log(`Author: "${author}" (using ${authorSelector})`);
      console.log(`Content length: ${content.length} characters`);
      console.log(`Content preview: ${content.substring(0, 200)}...`);
      
      return {
        title,
        author,
        content: content.trim(),
        debug: {
          titleSelector,
          authorSelector,
          contentElementsCount: contentElements?.length || 0,
          pageUrl: window.location.href,
          pageTitle: document.title
        }
      };
    });
    
    console.log(`=== SCRAPING RESULTS ===`);
    console.log(`Title: "${articleData.title}"`);
    console.log(`Author: "${articleData.author}"`);
    console.log(`Content length: ${articleData.content.length}`);
    console.log(`Debug info:`, articleData.debug);
    
    // Enhanced validation
    if (!articleData.title || articleData.title.length < 3) {
      console.error('Title validation failed:', {
        title: articleData.title,
        titleLength: articleData.title?.length || 0,
        debug: articleData.debug
      });
      throw new Error(`Could not extract article title from Medium URL. Found title: "${articleData.title || 'none'}". The page might not be accessible, behind a paywall, or the content structure has changed.`);
    }
    
    if (!articleData.content || articleData.content.length < 100) {
      console.error('Content validation failed:', {
        contentLength: articleData.content?.length || 0,
        contentPreview: articleData.content?.substring(0, 100) || 'none',
        debug: articleData.debug
      });
      throw new Error(`Could not extract sufficient article content from Medium URL. Found ${articleData.content?.length || 0} characters. The article might be behind a paywall, require login, or the content structure has changed.`);
    }
    
    console.log('=== SCRAPING COMPLETED SUCCESSFULLY ===');
    return articleData;
  } catch (error) {
    console.error('=== SCRAPING ERROR ===');
    console.error('Error during Medium article scraping:', error);
    
    // Take a screenshot for debugging if possible
    try {
      const screenshot = await page.screenshot({ fullPage: false });
      console.log(`Screenshot taken (${screenshot.length} bytes) - this could help debug the issue`);
    } catch (screenshotError) {
      console.log('Could not take screenshot:', screenshotError);
    }
    
    throw error;
  } finally {
    await page.close();
    await browser.close();
    console.log('Browser and page closed');
  }
}

export const uploadMediumArticle = baseProcedure
  .input(z.object({
    mediumUrl: z.string().url(),
    published: z.boolean().default(false),
    authToken: z.string().min(1, "Authentication token is required"),
  }))
  .mutation(async ({ input }) => {
    console.log(`Upload Medium article request:`, { 
      url: input.mediumUrl, 
      published: input.published 
    });
    
    // Verify admin authentication
    verifyAdminToken(input.authToken);
    
    // Validate that it's a Medium URL (handle different Medium URL formats)
    const mediumDomains = ['medium.com', 'towardsdatascience.com', 'betterprogramming.pub'];
    const isValidMediumUrl = mediumDomains.some(domain => input.mediumUrl.includes(domain));
    
    if (!isValidMediumUrl) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Please provide a valid Medium URL (medium.com or Medium publication)",
      });
    }

    try {
      console.log(`=== STARTING UPLOAD MEDIUM ARTICLE MUTATION ===`);
      const articleData = await scrapeMediumArticle(input.mediumUrl);
      const slug = generateSlug(articleData.title);
      
      console.log(`Generated slug: ${slug}`);
      
      // Check if slug already exists
      const existingArticle = await db.article.findUnique({
        where: { slug },
      });
      
      if (existingArticle) {
        console.log(`Article with slug ${slug} already exists`);
        throw new TRPCError({
          code: "CONFLICT",
          message: "An article with this title already exists in the database",
        });
      }

      console.log('Creating article in database...');
      const article = await db.article.create({
        data: {
          title: articleData.title,
          slug,
          content: articleData.content,
          author: articleData.author,
          published: input.published,
          publishedAt: input.published ? new Date() : null,
          mediumUrl: input.mediumUrl,
        },
      });

      console.log(`=== ARTICLE CREATED SUCCESSFULLY ===`);
      console.log(`Article ID: ${article.id}`);
      console.log(`Title: ${article.title}`);
      console.log(`Slug: ${article.slug}`);
      console.log(`Author: ${article.author}`);
      console.log(`Published: ${article.published}`);

      return {
        success: true,
        article,
      };
    } catch (error) {
      console.error('=== MUTATION ERROR ===');
      console.error('Error in uploadMediumArticle mutation:', error);
      
      // Provide more specific error messages based on error type
      if (error instanceof TRPCError) {
        throw error; // Re-throw TRPC errors as-is
      }
      
      if (error instanceof Error) {
        console.error('Error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack?.substring(0, 500)
        });
        
        if (error.message.includes('Browser launch failed')) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to start browser for scraping. This might be a server configuration issue. Please try again or contact support.",
          });
        } else if (error.message.includes('Timeout') || error.message.includes('timeout')) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "The Medium article took too long to load. Please check if the URL is accessible and try again.",
          });
        } else if (error.message.includes('net::ERR_NAME_NOT_RESOLVED') || error.message.includes('net::ERR_INTERNET_DISCONNECTED')) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Could not connect to Medium. Please check the URL and try again.",
          });
        } else if (error.message.includes('HTTP 4') || error.message.includes('Failed to load page')) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "The Medium article could not be accessed. It might be private, deleted, or require login.",
          });
        } else if (error.message.includes('Could not extract')) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: error.message,
          });
        } else if (error.message.includes('paywall')) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "The Medium article appears to be behind a paywall or requires login. Please try a different article.",
          });
        }
      }
      
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred while importing the Medium article. Please check the server logs and try again.",
      });
    }
  });
