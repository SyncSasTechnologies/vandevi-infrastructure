import React, { useEffect } from 'react';

export interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
  structuredData?: Record<string, any> | Record<string, any>[];
}

const SITE_URL = 'https://vandeviinfrastructure.com';
const DEFAULT_TITLE = 'Vandevi Infrastructure | Interior & Furniture Design';
const DEFAULT_DESCRIPTION =
  'Vandevi Infrastructure specializes in interior and furniture design, transforming residences, commercial workspaces, and luxury environments across Delhi NCR and India.';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-preview.png`;

export const SEO: React.FC<SEOProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  canonicalPath = '',
  keywords,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noindex = false,
  structuredData
}) => {
  useEffect(() => {
    // 1. Update Document Title
    const formattedTitle = title
      ? title.includes('Vandevi')
        ? title
        : `${title} | Vandevi Infrastructure`
      : DEFAULT_TITLE;
    document.title = formattedTitle;

    // Helper to safely set or update a meta tag
    const setMetaTag = (attribute: 'name' | 'property', key: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to safely set or update link tag
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Standard Metadata
    setMetaTag('name', 'description', description);
    if (keywords) {
      setMetaTag('name', 'keywords', keywords);
    }

    // 3. Robots Directives
    if (noindex) {
      setMetaTag('name', 'robots', 'noindex, nofollow');
    } else {
      setMetaTag(
        'name',
        'robots',
        'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
      );
    }

    // 4. Canonical URL
    const cleanPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
    const canonicalUrl = `${SITE_URL}${cleanPath === '/' ? '' : cleanPath}`;
    setLinkTag('canonical', canonicalUrl);

    // 5. Open Graph Metadata
    setMetaTag('property', 'og:title', formattedTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:site_name', 'Vandevi Infrastructure');
    setMetaTag('property', 'og:image', ogImage);

    // 6. Twitter Card Metadata
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', formattedTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);

    // 7. Dynamic JSON-LD Structured Data
    const scriptId = 'page-structured-data';
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (structuredData) {
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.id = scriptId;
        scriptElement.type = 'application/ld+json';
        document.head.appendChild(scriptElement);
      }
      scriptElement.textContent = JSON.stringify(structuredData);
    } else if (scriptElement) {
      scriptElement.remove();
    }

    // Clean up dynamic structured data when component unmounts
    return () => {
      const el = document.getElementById(scriptId);
      if (el) {
        el.remove();
      }
    };
  }, [title, description, canonicalPath, keywords, ogImage, ogType, noindex, structuredData]);

  return null;
};
