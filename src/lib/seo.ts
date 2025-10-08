// SEO utility functions for keyword-based content generation

export interface SEOKeyword {
  keyword: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  relatedKeywords: string[];
  description: string;
}

export interface PropertySEOData {
  id: string;
  title: string;
  location: string;
  propertyType: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  developer: string;
  handoverDate: string;
  keywords: string[];
  metaDescription: string;
  slug: string;
}

// Predefined SEO keywords for Dubai real estate
export const SEO_KEYWORDS: SEOKeyword[] = [
  {
    keyword: "Dubai Marina apartments",
    category: "location",
    priority: "high",
    relatedKeywords: ["Dubai Marina", "Marina apartments", "Dubai Marina properties", "Marina real estate"],
    description: "Premium apartments in Dubai Marina with stunning waterfront views"
  },
  {
    keyword: "Downtown Dubai properties",
    category: "location",
    priority: "high",
    relatedKeywords: ["Downtown Dubai", "Burj Khalifa area", "Downtown apartments", "Downtown Dubai real estate"],
    description: "Luxury properties in Downtown Dubai near Burj Khalifa"
  },
  {
    keyword: "Palm Jumeirah villas",
    category: "location",
    priority: "high",
    relatedKeywords: ["Palm Jumeirah", "Palm villas", "Palm Jumeirah properties", "Palm real estate"],
    description: "Exclusive villas on Palm Jumeirah with private beach access"
  },
  {
    keyword: "Business Bay apartments",
    category: "location",
    priority: "medium",
    relatedKeywords: ["Business Bay", "Business Bay properties", "Business Bay real estate", "Business Bay apartments"],
    description: "Modern apartments in Business Bay with business district access"
  },
  {
    keyword: "JBR properties",
    category: "location",
    priority: "medium",
    relatedKeywords: ["JBR", "Jumeirah Beach Residence", "JBR apartments", "JBR real estate"],
    description: "Beachfront properties in Jumeirah Beach Residence"
  },
  {
    keyword: "off plan Dubai",
    category: "property_type",
    priority: "high",
    relatedKeywords: ["off plan properties", "Dubai off plan", "pre construction", "off plan investment"],
    description: "Exclusive off-plan properties in Dubai with flexible payment plans"
  },
  {
    keyword: "Dubai investment properties",
    category: "investment",
    priority: "high",
    relatedKeywords: ["Dubai investment", "property investment Dubai", "real estate investment", "Dubai ROI"],
    description: "High ROI investment properties in Dubai with guaranteed returns"
  },
  {
    keyword: "luxury apartments Dubai",
    category: "property_type",
    priority: "medium",
    relatedKeywords: ["luxury apartments", "premium apartments", "high end apartments", "luxury real estate"],
    description: "Luxury apartments in Dubai with premium amenities and finishes"
  },
  {
    keyword: "Dubai property prices",
    category: "market",
    priority: "medium",
    relatedKeywords: ["Dubai prices", "property prices", "real estate prices", "Dubai market"],
    description: "Current property prices and market trends in Dubai"
  },
  {
    keyword: "Dubai real estate market",
    category: "market",
    priority: "high",
    relatedKeywords: ["Dubai market", "real estate market", "property market", "Dubai trends"],
    description: "Comprehensive Dubai real estate market analysis and trends"
  }
];

// Generate SEO data for a property
export function generatePropertySEO(property: any): PropertySEOData {
  const location = property.location || property.area || "Dubai";
  const propertyType = property.property_type || "apartment";
  const developer = property.developer || "Premium Developer";
  
  // Generate keywords based on property attributes
  const keywords = generateKeywordsForProperty(property);
  
  // Generate meta description
  const metaDescription = generateMetaDescription(property, keywords);
  
  // Generate slug
  const slug = generateSlug(property);
  
  return {
    id: property.id,
    title: property.title || `${propertyType} in ${location}`,
    location,
    propertyType,
    price: property.price || 0,
    bedrooms: property.bedrooms || 0,
    bathrooms: property.bathrooms || 0,
    area: property.area || 0,
    developer,
    handoverDate: property.handover_date || "",
    keywords,
    metaDescription,
    slug
  };
}

// Generate keywords for a specific property
function generateKeywordsForProperty(property: any): string[] {
  const keywords: string[] = [];
  
  // Location-based keywords
  if (property.location) {
    keywords.push(`${property.location} properties`);
    keywords.push(`${property.location} real estate`);
    keywords.push(`${property.location} apartments`);
  }
  
  // Property type keywords
  if (property.property_type) {
    keywords.push(`${property.property_type.toLowerCase()} Dubai`);
    keywords.push(`Dubai ${property.property_type.toLowerCase()}`);
  }
  
  // Developer keywords
  if (property.developer) {
    keywords.push(`${property.developer} properties`);
    keywords.push(`${property.developer} projects`);
  }
  
  // Bedroom-specific keywords
  if (property.bedrooms) {
    keywords.push(`${property.bedrooms} bedroom ${property.property_type?.toLowerCase() || 'apartment'}`);
  }
  
  // Investment keywords
  keywords.push("Dubai investment properties");
  keywords.push("Dubai real estate investment");
  keywords.push("off plan Dubai");
  
  // Price range keywords
  if (property.price) {
    const priceRange = getPriceRange(property.price);
    keywords.push(`${priceRange} properties Dubai`);
  }
  
  return [...new Set(keywords)]; // Remove duplicates
}

// Generate meta description
function generateMetaDescription(property: any, keywords: string[]): string {
  const location = property.location || "Dubai";
  const propertyType = property.property_type || "apartment";
  const bedrooms = property.bedrooms || 0;
  const bathrooms = property.bathrooms || 0;
  const price = property.price ? `AED ${property.price.toLocaleString()}` : "Price on request";
  
  return `${bedrooms} bedroom ${propertyType} in ${location} for ${price}. ${bathrooms} bathrooms, premium amenities, and excellent investment potential. Contact us for exclusive deals and flexible payment plans.`;
}

// Generate URL slug
function generateSlug(property: any): string {
  const title = property.title || `${property.property_type} in ${property.location}`;
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Get price range category
function getPriceRange(price: number): string {
  if (price < 500000) return "under 500k";
  if (price < 1000000) return "500k to 1M";
  if (price < 2000000) return "1M to 2M";
  if (price < 5000000) return "2M to 5M";
  return "5M plus";
}

// Generate SEO-friendly page titles
export function generatePageTitle(keyword: string, location?: string): string {
  const baseTitle = "Rafaz Real Estate";
  
  if (location) {
    return `${keyword} in ${location} | ${baseTitle}`;
  }
  
  return `${keyword} | ${baseTitle}`;
}

// Generate structured data for properties
export function generateStructuredData(property: PropertySEOData) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Rafaz Real Estate",
    "description": property.metaDescription,
    "url": `https://therafaz.ae/properties/${property.slug}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dubai",
      "addressCountry": "AE"
    },
    "offers": {
      "@type": "Offer",
      "price": property.price,
      "priceCurrency": "AED",
      "availability": "https://schema.org/InStock"
    },
    "itemOffered": {
      "@type": "RealEstateListing",
      "name": property.title,
      "description": property.metaDescription,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": property.location,
        "addressCountry": "AE"
      },
      "floorSize": {
        "@type": "QuantitativeValue",
        "value": property.area,
        "unitCode": "SQM"
      }
    }
  };
}

// Generate breadcrumb data
export function generateBreadcrumbs(path: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": path.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item,
      "item": `https://therafaz.ae/${path.slice(0, index + 1).join('/')}`
    }))
  };
}
