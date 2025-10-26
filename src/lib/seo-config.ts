// Comprehensive SEO Configuration for Rafaz Properties

export const SEO_CONFIG = {
  // Site Information
  siteName: "Rafaz Properties",
  siteUrl: "https://rafazproperties.ae",
  siteDescription: "Dubai's premier luxury real estate agency specializing in premium properties, off-plan projects, and investment opportunities.",
  
  // Contact Information
  contact: {
    phone: "+971 4 123 4567",
    email: "info@rafazproperties.ae",
    address: "Dubai Marina, Dubai, UAE",
    coordinates: {
      latitude: "25.0767",
      longitude: "55.1408"
    }
  },

  // Social Media
  social: {
    facebook: "https://www.facebook.com/rafazproperties",
    instagram: "https://www.instagram.com/rafazproperties", 
    linkedin: "https://www.linkedin.com/company/rafazproperties",
    twitter: "https://twitter.com/rafazproperties",
    youtube: "https://www.youtube.com/@rafazproperties"
  },

  // Primary Keywords
  primaryKeywords: [
    "Dubai real estate",
    "luxury properties Dubai", 
    "off-plan projects Dubai",
    "Dubai Marina properties",
    "Downtown Dubai apartments",
    "Palm Jumeirah villas",
    "Business Bay real estate",
    "property investment Dubai",
    "real estate Dubai",
    "luxury apartments Dubai"
  ],

  // Location-based Keywords
  locationKeywords: [
    "Dubai Marina real estate",
    "Downtown Dubai properties", 
    "Palm Jumeirah apartments",
    "Business Bay villas",
    "JLT properties",
    "Deira apartments",
    "JBR properties",
    "DIFC real estate",
    "Dubai Hills properties",
    "Arabian Ranches villas"
  ],

  // Service Keywords
  serviceKeywords: [
    "property management Dubai",
    "mortgages Dubai",
    "conveyancing Dubai", 
    "short term rentals Dubai",
    "property investment UAE",
    "real estate services Dubai",
    "property valuation Dubai",
    "rental properties Dubai"
  ],

  // Property Type Keywords
  propertyTypeKeywords: [
    "apartments for sale Dubai",
    "villas for sale Dubai",
    "penthouses Dubai",
    "townhouses Dubai",
    "studios Dubai",
    "off-plan apartments Dubai",
    "luxury villas Dubai",
    "waterfront properties Dubai"
  ],

  // Long-tail Keywords
  longTailKeywords: [
    "best real estate agency Dubai",
    "luxury property investment Dubai",
    "off-plan property investment Dubai",
    "Dubai property market trends",
    "real estate investment opportunities Dubai",
    "premium properties Dubai Marina",
    "luxury living Dubai",
    "Dubai real estate market analysis"
  ]
}

// SEO Keywords with Priority
export const SEO_KEYWORDS = [
  // High Priority
  { keyword: "Dubai real estate", priority: "high", searchVolume: "high" },
  { keyword: "luxury properties Dubai", priority: "high", searchVolume: "high" },
  { keyword: "off-plan projects Dubai", priority: "high", searchVolume: "high" },
  { keyword: "Dubai Marina properties", priority: "high", searchVolume: "high" },
  { keyword: "Downtown Dubai apartments", priority: "high", searchVolume: "high" },
  { keyword: "Palm Jumeirah villas", priority: "high", searchVolume: "high" },
  { keyword: "Business Bay real estate", priority: "high", searchVolume: "high" },
  { keyword: "property investment Dubai", priority: "high", searchVolume: "high" },
  
  // Medium Priority
  { keyword: "JLT properties", priority: "medium", searchVolume: "medium" },
  { keyword: "Deira apartments", priority: "medium", searchVolume: "medium" },
  { keyword: "property management Dubai", priority: "medium", searchVolume: "medium" },
  { keyword: "mortgages Dubai", priority: "medium", searchVolume: "medium" },
  { keyword: "conveyancing Dubai", priority: "medium", searchVolume: "medium" },
  { keyword: "short term rentals Dubai", priority: "medium", searchVolume: "medium" },
  { keyword: "luxury apartments Dubai", priority: "medium", searchVolume: "medium" },
  { keyword: "villas for sale Dubai", priority: "medium", searchVolume: "medium" },
  
  // Low Priority
  { keyword: "Dubai property market", priority: "low", searchVolume: "low" },
  { keyword: "real estate investment UAE", priority: "low", searchVolume: "low" },
  { keyword: "luxury living Dubai", priority: "low", searchVolume: "low" },
  { keyword: "Dubai real estate trends", priority: "low", searchVolume: "low" }
]

// Page-specific SEO configurations
export const PAGE_SEO = {
  home: {
    title: "Rafaz Properties - Dubai's #1 Luxury Real Estate | Premium Properties & Off-Plan Projects",
    description: "Discover Dubai's finest luxury properties with Rafaz Properties. Premium apartments, villas, penthouses, and off-plan projects in Dubai Marina, Downtown Dubai, Palm Jumeirah, and Business Bay.",
    keywords: ["Dubai real estate", "luxury properties Dubai", "off-plan projects Dubai", "Dubai Marina properties", "Downtown Dubai apartments"]
  },
  buy: {
    title: "Properties for Sale in Dubai | Luxury Apartments, Villas & Penthouses | Rafaz Properties",
    description: "Explore premium properties for sale in Dubai. Luxury apartments, villas, penthouses, and townhouses in Dubai Marina, Downtown Dubai, Palm Jumeirah, and Business Bay.",
    keywords: ["properties for sale Dubai", "apartments for sale Dubai", "villas for sale Dubai", "penthouses Dubai", "luxury properties Dubai"]
  },
  rent: {
    title: "Properties for Rent in Dubai | Luxury Rental Apartments & Villas | Rafaz Properties", 
    description: "Find your perfect rental property in Dubai. Luxury apartments, villas, and penthouses for rent in prime locations across Dubai.",
    keywords: ["properties for rent Dubai", "apartments for rent Dubai", "villas for rent Dubai", "rental properties Dubai", "luxury rentals Dubai"]
  },
  offPlans: {
    title: "Off-Plan Properties in Dubai | New Developments & Pre-Construction | Rafaz Properties",
    description: "Invest in Dubai's latest off-plan developments. Discover new construction projects, pre-construction properties, and investment opportunities in Dubai.",
    keywords: ["off-plan properties Dubai", "new developments Dubai", "pre-construction Dubai", "off-plan investment Dubai", "new projects Dubai"]
  },
  communities: {
    title: "Dubai Communities & Areas | Premium Residential Communities | Rafaz Properties",
    description: "Explore Dubai's finest residential communities. From Dubai Marina to Palm Jumeirah, discover the best areas to live and invest in Dubai.",
    keywords: ["Dubai communities", "Dubai areas", "Dubai Marina", "Palm Jumeirah", "Downtown Dubai", "Business Bay"]
  },
  team: {
    title: "Our Expert Real Estate Team | Dubai Property Specialists | Rafaz Properties",
    description: "Meet our experienced real estate professionals. Expert agents specializing in Dubai's luxury property market with years of local knowledge.",
    keywords: ["real estate agents Dubai", "property specialists Dubai", "Dubai real estate team", "property consultants Dubai"]
  },
  service: {
    title: "Real Estate Services in Dubai | Property Management, Mortgages & More | Rafaz Properties",
    description: "Comprehensive real estate services in Dubai. Property management, mortgages, conveyancing, short-term rentals, and investment consulting.",
    keywords: ["real estate services Dubai", "property management Dubai", "mortgages Dubai", "conveyancing Dubai", "property investment Dubai"]
  }
}

// Schema.org structured data templates
export const SCHEMA_TEMPLATES = {
  organization: {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Rafaz Properties",
    "description": "Dubai's premier luxury real estate agency",
    "url": "https://rafazproperties.ae",
    "logo": "https://rafazproperties.ae/images/logo.png",
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
    ]
  },
  
  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Rafaz Properties",
    "url": "https://rafazproperties.ae",
    "description": "Dubai's premier luxury real estate website",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://rafazproperties.ae/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  },

  breadcrumb: (items: Array<{name: string, url: string}>) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  })
}

export default SEO_CONFIG
