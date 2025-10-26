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
import LeadFormButton from "@/src/components/common/LeadFormButton";

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
  title: "Rafaz Real Estate - Premium Properties in Dubai",
  description: "Discover luxury properties, off-plan projects, and premium real estate solutions in Dubai with Rafaz Real Estate. Your trusted partner for buying, renting, and investing in Dubai's finest properties.",
  keywords: "Dubai real estate, luxury properties, off-plan projects, property investment, Dubai Marina, Downtown Dubai, Palm Jumeirah",
  authors: [{ name: "Rafaz Real Estate" }],
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
    title: "Rafaz Real Estate - Premium Properties in Dubai",
    description: "Discover luxury properties, off-plan projects, and premium real estate solutions in Dubai",
    type: "website",
    locale: "en_US",
  },
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
        <script 
          src="https://www.google.com/recaptcha/api.js" 
          async 
          defer
        ></script>
        <script 
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCuk4slyXMzBAh1XocahaRnpkp_2sueWas&libraries=places" 
          async 
          defer
        ></script>
      </head>
      <body className="luxury-bg">
        <LanguageProvider>
          <LeadFormProvider>
            <main className="min-h-screen">
              <Header />
              {children}
              <Footer />
            </main>
            
            {/* Global Lead Form Popup */}
            <GlobalLeadForm />
            
            {/* Floating Lead Form Button */}
            <LeadFormButton variant="floating" source="Floating Button" />
          </LeadFormProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
