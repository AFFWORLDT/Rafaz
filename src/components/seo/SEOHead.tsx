"use client";

import Head from "next/head";
import { usePathname } from "next/navigation";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  structuredData?: any;
}

export default function SEOHead({
  title = "Rafaz Properties - Dubai's #1 Luxury Real Estate",
  description = "Discover Dubai's finest luxury properties with Rafaz Properties. Premium apartments, villas, penthouses, and off-plan projects in Dubai Marina, Downtown Dubai, Palm Jumeirah, and Business Bay.",
  keywords = ["Dubai real estate", "luxury properties Dubai", "off-plan projects Dubai"],
  image = "/images/og-image.jpg",
  url,
  type = "website",
  structuredData
}: SEOHeadProps) {
  const pathname = usePathname();
  const canonicalUrl = url || `https://rafazproperties.ae${pathname}`;
  
  const defaultKeywords = [
    "Dubai real estate",
    "luxury properties Dubai",
    "off-plan projects Dubai",
    "Dubai Marina properties",
    "Downtown Dubai apartments",
    "Palm Jumeirah villas",
    "Business Bay real estate",
    "property investment Dubai",
    "real estate Dubai",
    "luxury apartments Dubai",
    "villas for sale Dubai",
    "penthouses Dubai",
    "property management Dubai",
    "mortgages Dubai",
    "conveyancing Dubai",
    "short term rentals Dubai",
    "Rafaz Properties",
    "Dubai property market",
    "real estate investment UAE",
    "luxury living Dubai"
  ];

  const allKeywords = [...new Set([...defaultKeywords, ...keywords])];

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords.join(", ")} />
      <meta name="author" content="Rafaz Properties" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#dbbb90" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Rafaz Properties" />
      <meta property="og:image" content={`https://rafazproperties.ae${image}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`https://rafazproperties.ae${image}`} />
      <meta name="twitter:creator" content="@rafazproperties" />
      <meta name="twitter:site" content="@rafazproperties" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="geo.region" content="AE-DU" />
      <meta name="geo.placename" content="Dubai" />
      <meta name="geo.position" content="25.0767;55.1408" />
      <meta name="ICBM" content="25.0767, 55.1408" />
      
      {/* Language and Region */}
      <meta name="language" content="English" />
      <meta name="geo.region" content="AE" />
      <meta name="geo.country" content="United Arab Emirates" />
      
      {/* Mobile Optimization */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Rafaz Properties" />
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://maps.googleapis.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      
      {/* DNS Prefetch for better performance */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//maps.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
    </Head>
  );
}
