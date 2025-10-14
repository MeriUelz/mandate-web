import { trackGAEvent } from '~/components/GoogleAnalytics';

/**
 * Track a CTA (Call-to-Action) button click
 */
export function trackCTAClick(ctaName: string, location?: string) {
  trackGAEvent('cta_click', {
    cta_name: ctaName,
    cta_location: location,
  });
}

/**
 * Track a form submission
 */
export function trackFormSubmit(formName: string, success: boolean = true) {
  trackGAEvent('form_submit', {
    form_name: formName,
    success: success,
  });
}

/**
 * Track an outbound link click
 */
export function trackOutboundClick(url: string, linkText?: string) {
  trackGAEvent('outbound_click', {
    link_url: url,
    link_text: linkText,
  });
}

/**
 * Track internal site search
 */
export function trackSearch(searchTerm: string, resultsCount?: number) {
  trackGAEvent('search', {
    search_term: searchTerm,
    results_count: resultsCount,
  });
}

/**
 * Track file download
 */
export function trackDownload(fileName: string, fileType?: string) {
  trackGAEvent('file_download', {
    file_name: fileName,
    file_type: fileType,
  });
}

/**
 * Track video play/engagement
 */
export function trackVideoPlay(videoTitle: string, videoUrl?: string) {
  trackGAEvent('video_play', {
    video_title: videoTitle,
    video_url: videoUrl,
  });
}

/**
 * Track scroll depth (e.g., 25%, 50%, 75%, 100%)
 */
export function trackScrollDepth(percentage: number, page?: string) {
  trackGAEvent('scroll_depth', {
    scroll_percentage: percentage,
    page_path: page || window.location.pathname,
  });
}

/**
 * Track engagement with specific sections
 */
export function trackSectionView(sectionName: string) {
  trackGAEvent('section_view', {
    section_name: sectionName,
  });
}

/**
 * Track when user views pricing/ROI calculator
 */
export function trackCalculatorUse(calculatorType: string, result?: any) {
  trackGAEvent('calculator_use', {
    calculator_type: calculatorType,
    result: result,
  });
}

/**
 * Track blog article engagement
 */
export function trackArticleEngagement(articleSlug: string, engagementType: 'read' | 'share' | 'like') {
  trackGAEvent('article_engagement', {
    article_slug: articleSlug,
    engagement_type: engagementType,
  });
}
