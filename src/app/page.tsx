import { Metadata } from "next";
import HeroSection from "@/src/view/landing/hero-section";
import PartnersSection from "@/src/view/landing/PartnersSection";
import Solutions from "@/src/view/landing/solutions";
import GoogleMapsSection from "@/src/components/common/GoogleMapsSection";
import Feature from "@/src/view/landing/feature";
import Communities from "@/src/view/landing/Communities";
import Property from "@/src/view/landing/property";
import { InsightsInspiration } from "@/src/view/landing/blog";
import { CallToAction } from "@/src/view/landing/call-to-action";

export const metadata: Metadata = {
  title: "Rafaz Properties - Dubai's #1 Luxury Real Estate | Premium Properties & Off-Plan Projects",
  description: "Discover Dubai's finest luxury properties with Rafaz Properties. Premium apartments, villas, penthouses, and off-plan projects in Dubai Marina, Downtown Dubai, Palm Jumeirah, and Business Bay. Your trusted real estate partner in Dubai.",
  keywords: [
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
  ],
  openGraph: {
    title: "Rafaz Properties - Dubai's #1 Luxury Real Estate | Premium Properties & Off-Plan Projects",
    description: "Discover Dubai's finest luxury properties with Rafaz Properties. Premium apartments, villas, penthouses, and off-plan projects in Dubai Marina, Downtown Dubai, Palm Jumeirah, and Business Bay.",
    url: "https://rafazproperties.ae",
    siteName: "Rafaz Properties",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rafaz Properties - Dubai Luxury Real Estate",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rafaz Properties - Dubai's #1 Luxury Real Estate",
    description: "Discover Dubai's finest luxury properties with Rafaz Properties. Premium apartments, villas, penthouses, and off-plan projects.",
    images: ["/images/twitter-image.jpg"],
    creator: "@rafazproperties",
  },
  alternates: {
    canonical: "https://rafazproperties.ae",
  },
};

export default function Home() {
  return (
    <>
      {/* Structured Data for Home Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Rafaz Properties - Dubai's #1 Luxury Real Estate",
            "description": "Discover Dubai's finest luxury properties with Rafaz Properties. Premium apartments, villas, penthouses, and off-plan projects in Dubai Marina, Downtown Dubai, Palm Jumeirah, and Business Bay.",
            "url": "https://rafazproperties.ae",
            "mainEntity": {
              "@type": "RealEstateAgent",
              "name": "Rafaz Properties",
              "description": "Dubai's premier luxury real estate agency",
              "url": "https://rafazproperties.ae",
              "telephone": "+971 4 123 4567",
              "email": "info@rafazproperties.ae",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Dubai Marina",
                "addressLocality": "Dubai",
                "addressCountry": "AE"
              },
              "areaServed": [
                "Dubai Marina",
                "Downtown Dubai",
                "Palm Jumeirah",
                "Business Bay",
                "JLT",
                "Deira"
              ],
              "serviceType": [
                "Property Sales",
                "Property Rentals",
                "Off-Plan Projects",
                "Property Management",
                "Mortgages",
                "Conveyancing",
                "Short-term Rentals"
              ]
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://rafazproperties.ae"
                }
              ]
            }
          })
        }}
      />
      
      <div className="bg-[#fff]">
        <HeroSection />
        <PartnersSection />
        <Solutions/>
        <GoogleMapsSection />
        <Feature />
        <Communities />
        <Property />
        <InsightsInspiration />
        <CallToAction />
      </div>
    </>
  );
}
