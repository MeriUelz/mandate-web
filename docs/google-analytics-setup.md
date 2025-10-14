# Google Analytics Setup & Usage Guide

## Overview

This application uses Google Analytics 4 (GA4) to monitor SEO performance, track organic traffic growth, and understand user behavior. GA4 provides comprehensive analytics including:

- **Page views and navigation patterns**
- **User engagement metrics**
- **Traffic sources (organic, direct, referral, social)**
- **Conversion tracking**
- **Real-time analytics**
- **Custom event tracking**

## Initial Setup

### 1. Create a Google Analytics 4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Admin" (gear icon in bottom left)
3. Under "Property" column, click "Create Property"
4. Enter your property details:
   - Property name: "Mandate"
   - Time zone and currency
5. Click "Next" and complete the setup wizard
6. Once created, click on "Data Streams" under the Property column
7. Click "Add stream" → "Web"
8. Enter your website URL: `https://mandate.app`
9. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)

### 2. Configure the Application

1. Open the `.env` file in the project root
2. Replace the placeholder measurement ID:
   ```
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
   Replace `G-XXXXXXXXXX` with your actual GA4 Measurement ID

3. Restart the development server or rebuild the application

### 3. Verify Installation

1. Visit your website
2. In Google Analytics, go to "Reports" → "Realtime"
3. You should see your visit appear within 30 seconds
4. Navigate between pages to verify page view tracking

## What's Being Tracked Automatically

### Page Views
- **Initial page load**: Tracked via the GA4 script in `index.html`
- **Client-side navigation**: Tracked automatically by the `GoogleAnalytics` component when routes change
- **Page title and URL**: Automatically captured for each page view

### User Engagement
- **Session duration**: How long users spend on the site
- **Bounce rate**: Percentage of single-page sessions
- **Pages per session**: Average number of pages viewed per visit

### Traffic Sources
GA4 automatically categorizes traffic into:
- **Organic Search**: Traffic from search engines (Google, Bing, etc.)
- **Direct**: Users typing URL directly or from bookmarks
- **Referral**: Traffic from other websites
- **Social**: Traffic from social media platforms
- **Email**: Traffic from email campaigns

## Custom Event Tracking

The application includes utility functions for tracking specific user interactions that are important for SEO and conversion analysis.

### Using Event Tracking Functions

Import from `~/lib/analytics`:

```typescript
import {
  trackCTAClick,
  trackFormSubmit,
  trackOutboundClick,
  trackSearch,
  trackDownload,
  trackVideoPlay,
  trackScrollDepth,
  trackSectionView,
  trackCalculatorUse,
  trackArticleEngagement,
} from '~/lib/analytics';
```

### Example Usage

#### Track CTA Button Clicks
```typescript
import { trackCTAClick } from '~/lib/analytics';

function HeroSection() {
  return (
    <button
      onClick={() => {
        trackCTAClick('Get Started', 'hero_section');
        // ... rest of your click handler
      }}
    >
      Get Started
    </button>
  );
}
```

#### Track Form Submissions
```typescript
import { trackFormSubmit } from '~/lib/analytics';

function ContactForm() {
  const handleSubmit = async (data) => {
    try {
      await submitForm(data);
      trackFormSubmit('contact_form', true);
    } catch (error) {
      trackFormSubmit('contact_form', false);
    }
  };
}
```

#### Track Outbound Links
```typescript
import { trackOutboundClick } from '~/lib/analytics';

function ExternalLink({ href, children }) {
  return (
    <a
      href={href}
      onClick={() => trackOutboundClick(href, children)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
```

#### Track Search Queries
```typescript
import { trackSearch } from '~/lib/analytics';

function SearchBar() {
  const handleSearch = (query) => {
    const results = performSearch(query);
    trackSearch(query, results.length);
  };
}
```

#### Track Calculator Usage (ROI Calculator)
```typescript
import { trackCalculatorUse } from '~/lib/analytics';

function ROICalculator() {
  const handleCalculate = (inputs) => {
    const result = calculateROI(inputs);
    trackCalculatorUse('roi_calculator', {
      monthly_chargebacks: inputs.chargebacks,
      estimated_savings: result.savings,
    });
  };
}
```

#### Track Article Engagement
```typescript
import { trackArticleEngagement } from '~/lib/analytics';

function BlogArticle({ slug }) {
  useEffect(() => {
    // Track when user reads article (e.g., after scrolling 50%)
    trackArticleEngagement(slug, 'read');
  }, []);

  const handleShare = () => {
    trackArticleEngagement(slug, 'share');
  };
}
```

#### Track Scroll Depth
```typescript
import { trackScrollDepth } from '~/lib/analytics';

function LongFormContent() {
  useEffect(() => {
    let tracked25 = false;
    let tracked50 = false;
    let tracked75 = false;
    let tracked100 = false;

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercent >= 25 && !tracked25) {
        trackScrollDepth(25);
        tracked25 = true;
      }
      if (scrollPercent >= 50 && !tracked50) {
        trackScrollDepth(50);
        tracked50 = true;
      }
      if (scrollPercent >= 75 && !tracked75) {
        trackScrollDepth(75);
        tracked75 = true;
      }
      if (scrollPercent >= 100 && !tracked100) {
        trackScrollDepth(100);
        tracked100 = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}
```

### Using the React Hook for Custom Events

For more flexibility, use the `useGAEvent` hook:

```typescript
import { useGAEvent } from '~/components/GoogleAnalytics';

function CustomComponent() {
  const trackEvent = useGAEvent();

  const handleCustomAction = () => {
    trackEvent('custom_action', {
      action_type: 'special_interaction',
      value: 42,
      custom_param: 'example',
    });
  };

  return <button onClick={handleCustomAction}>Custom Action</button>;
}
```

## Monitoring SEO Performance

### Key Metrics to Track in GA4

1. **Organic Traffic Growth**
   - Go to Reports → Acquisition → Traffic acquisition
   - Filter by "Organic Search" channel
   - Track trends over time

2. **Landing Pages Performance**
   - Go to Reports → Engagement → Landing page
   - See which pages attract organic traffic
   - Monitor bounce rate and engagement per page

3. **Search Console Integration**
   - Link Google Search Console to GA4
   - Go to Admin → Property → Search Console links
   - This provides keyword data and search performance

4. **Conversion Tracking**
   - Set up conversion events (see below)
   - Track how organic traffic converts

### Setting Up Key Conversions

1. In GA4, go to Admin → Events
2. Click "Create event" or "Mark as conversion"
3. Recommended conversions to set up:
   - `cta_click` (when button_name contains "Get Started" or "Book Demo")
   - `form_submit` (when form_name is "contact_form")
   - `calculator_use` (ROI calculator completions)
   - `article_engagement` (blog engagement)

### Creating Custom Reports

1. Go to "Explore" in GA4
2. Create custom reports for:
   - **SEO Performance Dashboard**: Organic traffic, top landing pages, conversions
   - **Content Performance**: Blog article views, engagement, time on page
   - **User Journey**: How users navigate through the site

## Privacy and Compliance

### GDPR and Cookie Consent

The current implementation loads GA4 immediately. For GDPR compliance in EU regions, consider:

1. Implementing a cookie consent banner
2. Only loading GA4 after user consent
3. Using Google's consent mode

Example with consent:
```typescript
// Only initialize after consent
if (userHasConsented) {
  window.gtag('consent', 'update', {
    'analytics_storage': 'granted'
  });
}
```

### IP Anonymization

GA4 automatically anonymizes IP addresses by default, which helps with privacy compliance.

## Troubleshooting

### Analytics Not Working

1. **Check Measurement ID**: Verify `VITE_GA_MEASUREMENT_ID` in `.env` is correct
2. **Check Browser Console**: Look for any errors related to gtag.js
3. **Ad Blockers**: Some users have ad blockers that prevent GA4 from loading
4. **Development Mode**: If using placeholder `G-XXXXXXXXXX`, tracking is disabled

### Verifying Events

1. In GA4, go to Configure → DebugView
2. Enable debug mode in your browser:
   ```javascript
   // In browser console
   window.gtag('set', 'debug_mode', true);
   ```
3. Trigger events and watch them appear in DebugView in real-time

### Testing in Development

The implementation checks for the placeholder measurement ID (`G-XXXXXXXXXX`) and won't send events if it's not configured. This prevents test data from polluting your production analytics.

## Best Practices

1. **Consistent Naming**: Use snake_case for event names and parameters
2. **Meaningful Parameters**: Include context with events (e.g., location, value)
3. **Don't Over-Track**: Only track events that provide actionable insights
4. **Regular Reviews**: Check GA4 weekly to identify trends and issues
5. **Set Up Alerts**: Create custom alerts for traffic drops or spikes
6. **Segment Data**: Use GA4's audience features to analyze different user groups

## Advanced: Server-Side Tracking

For more accurate tracking (bypassing ad blockers), consider implementing server-side tracking using the GA4 Measurement Protocol. This would require:

1. Setting up a server endpoint
2. Forwarding events from server to GA4
3. Using the Measurement Protocol API

This is more complex but provides more reliable data collection.

## Resources

- [Google Analytics 4 Documentation](https://support.google.com/analytics/answer/10089681)
- [GA4 Event Reference](https://support.google.com/analytics/answer/9267735)
- [GA4 Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/ga4)
- [Search Console Integration](https://support.google.com/analytics/answer/1308621)

## Support

For questions about the analytics implementation, contact the development team or refer to this documentation.
