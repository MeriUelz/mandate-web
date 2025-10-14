import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { chromium } from "playwright";
import { baseProcedure } from "~/server/trpc/main";
import { verifyAdminToken } from "~/server/utils/auth";

export const testMediumScraping = baseProcedure
  .input(z.object({
    authToken: z.string().min(1, "Authentication token is required"),
    testUrl: z.string().url().optional().default("https://medium.com/@example/test-article"),
  }))
  .mutation(async ({ input }) => {
    console.log(`=== MEDIUM SCRAPING TEST STARTED ===`);
    
    // Verify admin authentication
    verifyAdminToken(input.authToken);
    
    const testResults = {
      environment: {
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch,
        memory: {
          total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
          used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
          free: Math.round((process.memoryUsage().heapTotal - process.memoryUsage().heapUsed) / 1024 / 1024)
        },
        env: process.env.NODE_ENV,
      },
      playwright: {
        installed: false,
        browserLaunch: false,
        navigation: false,
        contentExtraction: false,
        error: null as string | null
      },
      network: {
        mediumAccessible: false,
        responseTime: 0,
        statusCode: 0,
        error: null as string | null
      }
    };
    
    // Test Playwright installation and browser launch
    console.log('Testing Playwright installation...');
    let browser;
    try {
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
      
      testResults.playwright.installed = true;
      testResults.playwright.browserLaunch = true;
      console.log('✅ Playwright browser launched successfully');
      
      // Test basic navigation
      console.log('Testing page navigation...');
      const page = await browser.newPage();
      
      try {
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
        await page.setViewportSize({ width: 1920, height: 1080 });
        
        const startTime = Date.now();
        const response = await page.goto('https://medium.com', { 
          waitUntil: 'domcontentloaded',
          timeout: 30000 
        });
        const endTime = Date.now();
        
        testResults.network.responseTime = endTime - startTime;
        testResults.network.statusCode = response?.status() || 0;
        testResults.network.mediumAccessible = (response?.status() || 0) < 400;
        testResults.playwright.navigation = true;
        
        console.log(`✅ Navigation successful: ${response?.status()} in ${testResults.network.responseTime}ms`);
        
        // Test basic content extraction
        console.log('Testing content extraction...');
        const pageTitle = await page.title();
        const bodyText = await page.evaluate(() => document.body.textContent?.substring(0, 100));
        
        if (pageTitle && bodyText) {
          testResults.playwright.contentExtraction = true;
          console.log(`✅ Content extraction successful: Title="${pageTitle}", Body="${bodyText}..."`);
        } else {
          console.log(`❌ Content extraction failed: Title="${pageTitle}", Body="${bodyText}"`);
        }
        
        await page.close();
        
      } catch (navError) {
        testResults.network.error = navError instanceof Error ? navError.message : 'Navigation failed';
        console.error('❌ Navigation test failed:', navError);
      }
      
      await browser.close();
      
    } catch (browserError) {
      testResults.playwright.error = browserError instanceof Error ? browserError.message : 'Browser launch failed';
      console.error('❌ Browser launch failed:', browserError);
    }
    
    // Test network connectivity to Medium specifically
    console.log('Testing Medium.com accessibility...');
    try {
      const response = await fetch('https://medium.com', {
        method: 'HEAD',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });
      
      console.log(`Medium.com HEAD request: ${response.status} ${response.statusText}`);
      
    } catch (fetchError) {
      console.error('Medium.com fetch test failed:', fetchError);
    }
    
    console.log('=== TEST RESULTS ===');
    console.log(JSON.stringify(testResults, null, 2));
    
    // Determine overall status
    const overallSuccess = testResults.playwright.installed && 
                          testResults.playwright.browserLaunch && 
                          testResults.playwright.navigation && 
                          testResults.playwright.contentExtraction &&
                          testResults.network.mediumAccessible;
    
    return {
      success: overallSuccess,
      results: testResults,
      recommendations: overallSuccess ? 
        ['All tests passed! Medium scraping should work correctly.'] :
        [
          !testResults.playwright.installed && 'Playwright may not be properly installed',
          !testResults.playwright.browserLaunch && 'Browser launch is failing - check Docker configuration',
          !testResults.playwright.navigation && 'Network connectivity issues detected',
          !testResults.playwright.contentExtraction && 'Content extraction is failing',
          !testResults.network.mediumAccessible && 'Medium.com is not accessible from server'
        ].filter(Boolean)
    };
  });
