import { useEffect } from 'react';

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  ogImageAlt?: string;
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  articleAuthor?: string;
  keywords?: string;
  noindex?: boolean;
  structuredData?: object;
}

export function SEO({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage = '/og-image.png',
  ogImageAlt = 'Mandate - Pre-dispute chargeback prevention platform',
  articlePublishedTime,
  articleModifiedTime,
  articleAuthor,
  keywords,
  noindex = false,
  structuredData,
}: SEOProps) {
  useEffect(() => {
    // Set title
    document.title = title;

    // Helper function to set or update meta tags
    const setMetaTag = (property: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${property}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Set or update link tags
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      
      element.setAttribute('href', href);
    };

    // Basic meta tags
    setMetaTag('description', description);
    if (keywords) {
      setMetaTag('keywords', keywords);
    }

    // Robots
    if (noindex) {
      setMetaTag('robots', 'noindex, nofollow');
    } else {
      setMetaTag('robots', 'index, follow');
    }

    // Canonical URL
    if (canonical) {
      setLinkTag('canonical', canonical);
    }

    // Open Graph tags
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:type', ogType, true);
    setMetaTag('og:image', ogImage, true);
    setMetaTag('og:image:alt', ogImageAlt, true);
    if (canonical) {
      setMetaTag('og:url', canonical, true);
    }
    setMetaTag('og:site_name', 'Mandate', true);

    // Article-specific Open Graph tags
    if (ogType === 'article') {
      if (articlePublishedTime) {
        setMetaTag('article:published_time', articlePublishedTime, true);
      }
      if (articleModifiedTime) {
        setMetaTag('article:modified_time', articleModifiedTime, true);
      }
      if (articleAuthor) {
        setMetaTag('article:author', articleAuthor, true);
      }
    }

    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', ogImage);
    setMetaTag('twitter:image:alt', ogImageAlt);

    // Structured data (JSON-LD)
    if (structuredData) {
      let scriptElement = document.querySelector('script[type="application/ld+json"]');
      
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptElement);
      }
      
      scriptElement.textContent = JSON.stringify(structuredData);
    }

    // Cleanup function
    return () => {
      // We don't remove meta tags on unmount to avoid flickering
      // They will be updated by the next page's SEO component
    };
  }, [
    title,
    description,
    canonical,
    ogType,
    ogImage,
    ogImageAlt,
    articlePublishedTime,
    articleModifiedTime,
    articleAuthor,
    keywords,
    noindex,
    structuredData,
  ]);

  return null;
}
