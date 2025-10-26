"use client";

import { useEffect } from "react";
import Script from "next/script";

interface GoogleAnalyticsProps {
  measurementId: string;
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  useEffect(() => {
    // Initialize Google Analytics
    if (typeof window !== 'undefined' && measurementId) {
      window.gtag = window.gtag || function() {
        (window.gtag.q = window.gtag.q || []).push(arguments);
      };
      
      window.gtag('js', new Date());
      window.gtag('config', measurementId, {
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, [measurementId]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `,
        }}
      />
    </>
  );
}

// Analytics event tracking utilities
export const analytics = {
  // Track page views
  trackPageView: (url: string, title: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
        page_title: title,
        page_location: url,
      });
    }
  },

  // Track custom events
  trackEvent: (action: string, category: string, label?: string, value?: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  },

  // Track property views
  trackPropertyView: (propertyId: string, propertyType: string, location: string) => {
    analytics.trackEvent('property_view', 'engagement', `${propertyType}_${location}`, 1);
  },

  // Track lead form submissions
  trackLeadSubmission: (source: string, propertyId?: string) => {
    analytics.trackEvent('lead_submission', 'conversion', source, 1);
  },

  // Track search queries
  trackSearch: (query: string, filters: any) => {
    analytics.trackEvent('search', 'engagement', query, 1);
  },

  // Track contact form submissions
  trackContact: (formType: string) => {
    analytics.trackEvent('contact_form', 'conversion', formType, 1);
  }
};

// Google Search Console verification
export function GoogleSearchConsole() {
  return (
    <meta 
      name="google-site-verification" 
      content="your-google-search-console-verification-code" 
    />
  );
}
