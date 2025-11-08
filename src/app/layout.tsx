import type React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "../lib/crypto-polyfill";
import Header from "@/src/components/common/header";
import Footer from "@/src/components/common/footer";
import { LanguageProvider } from "@/src/contexts/LanguageContext";
import { LeadFormProvider } from "@/src/contexts/LeadFormContext";
import GlobalLeadForm from "@/src/components/common/GlobalLeadForm";
import ConditionalFloatingActions from "../components/common/ConditionalFloatingActions";
import PromoPopup from "../components/common/PromoPopup";
// AutoPopupTrigger removed per request (no consultation popup on load)

const trajanPro = localFont({
  src: [
    {
      path: "../../public/fonts/TrajanPro3Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/TrajanPro3-Bold.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-trajan",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Rafaz Properties - Dubai's #1 Luxury Real Estate | Premium Properties & Off-Plan Projects",
    template: "%s | Rafaz Properties - Dubai's Premier Real Estate"
  },
  description: "Discover Dubai's finest luxury properties with Rafaz Properties. Premium apartments, villas, penthouses, and off-plan projects in Dubai Marina, Downtown Dubai, Palm Jumeirah, and Business Bay. Your trusted real estate partner in Dubai.",
  keywords: [
    "Dubai real estate",
    "luxury properties Dubai",
    "off-plan projects Dubai",
    "Dubai Marina properties",
    "Downtown Dubai apartments",
    "Palm Jumeirah villas",
    "Business Bay real estate",
    "JLT properties",
    "Deira apartments",
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
  authors: [{ name: "Rafaz Properties", url: "https://rafazproperties.ae" }],
  creator: "Rafaz Properties",
  publisher: "Rafaz Properties",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://rafazproperties.ae'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'ar-AE': '/ar',
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rafazproperties.ae',
    siteName: 'Rafaz Properties',
    title: "Rafaz Properties - Dubai's #1 Luxury Real Estate | Premium Properties & Off-Plan Projects",
    description: "Discover Dubai's finest luxury properties with Rafaz Properties. Premium apartments, villas, penthouses, and off-plan projects in Dubai Marina, Downtown Dubai, Palm Jumeirah, and Business Bay.",
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Rafaz Properties - Dubai Luxury Real Estate',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Rafaz Properties - Dubai's #1 Luxury Real Estate",
    description: "Discover Dubai's finest luxury properties with Rafaz Properties. Premium apartments, villas, penthouses, and off-plan projects.",
    images: ['/images/twitter-image.jpg'],
    creator: '@rafazproperties',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'Real Estate',
  classification: 'Business',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${trajanPro.variable} antialiased`}>
      <head>
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="preconnect" href="https://www.gstatic.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://www.gstatic.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        
        {/* Lazy load non-critical scripts */}
        <script 
          src="https://www.google.com/recaptcha/api.js" 
          async 
          defer
        ></script>
        <script 
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCuk4slyXMzBAh1XocahaRnpkp_2sueWas&libraries=places&loading=async" 
          async 
          defer
        ></script>
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "Rafaz Properties",
              "description": "Dubai's premier luxury real estate agency specializing in premium properties, off-plan projects, and investment opportunities.",
              "url": "https://rafazproperties.ae",
              "logo": "https://rafazproperties.ae/images/logo.png",
              "image": "https://rafazproperties.ae/images/og-image.jpg",
              "telephone": "+971 4 123 4567",
              "email": "info@rafazproperties.ae",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Dubai Marina",
                "addressLocality": "Dubai",
                "addressCountry": "AE"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "25.0767",
                "longitude": "55.1408"
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
              ],
              "sameAs": [
                "https://www.facebook.com/rafazproperties",
                "https://www.instagram.com/rafazproperties",
                "https://www.linkedin.com/company/rafazproperties",
                "https://twitter.com/rafazproperties"
              ],
              "foundingDate": "2020",
              "slogan": "Dubai's NO 1 Luxury Real Estate"
            })
          }}
        />
      </head>
      <body className="luxury-bg">
        <LanguageProvider>
          <LeadFormProvider>
            <main className="min-h-screen">
              <Header />
              {children}
              <Footer />
            </main>
            
            {/* Promotional popup (image-style) - session based */}
            <PromoPopup
              // If you have a creative image, place it under public/promo/popup.jpg and set imageSrc
              imageSrc="/727476354.jpg"
              title="Discover Our Off Plan Projects in Dubai"
              subtitle="Premium developments with flexible payment plans"
              ctaLabel="View Projects"
              ctaHref="/off-plan-projects-in-dubai"
              startingFrom="AED 2.5M"
              delayMs={400}
            />

            {/* Global Lead Form Popup */}
            <GlobalLeadForm />
            
            {/* Floating Actions (Consultation + WhatsApp) - Hidden on service page */}
            <ConditionalFloatingActions />
          </LeadFormProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
