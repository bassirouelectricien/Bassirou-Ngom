import { useEffect } from 'react';
import { SeoResult } from '../types';

interface SeoHeadProps {
  seoResult: SeoResult | null;
}

export function SeoHead({ seoResult }: SeoHeadProps) {
  useEffect(() => {
    if (!seoResult) return;

    // Update document title
    if (seoResult.seoTitle) {
      document.title = seoResult.seoTitle;
    }

    // Helper to update or create meta tags
    const setMetaTag = (attrName: string, attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    if (seoResult.metaDescription) {
      setMetaTag('name', 'description', seoResult.metaDescription);
      setMetaTag('property', 'og:description', seoResult.ogDescription || seoResult.metaDescription);
      setMetaTag('name', 'twitter:description', seoResult.metaDescription);
    }

    if (seoResult.ogTitle) {
      setMetaTag('property', 'og:title', seoResult.ogTitle);
      setMetaTag('name', 'twitter:title', seoResult.ogTitle);
    }

    if (seoResult.keywords && seoResult.keywords.length > 0) {
      setMetaTag('name', 'keywords', seoResult.keywords.join(', '));
    }

    // Update Schema.org JSON-LD
    if (seoResult.schemaJson) {
      let scriptTag = document.getElementById('schema-electrician') as HTMLScriptElement | null;
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'schema-electrician';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.text = JSON.stringify(seoResult.schemaJson, null, 2);
    }
  }, [seoResult]);

  return null;
}
