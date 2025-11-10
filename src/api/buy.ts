import { api, handleApiError } from "@/src/lib/axios";

export const getAllBuyProperties = async (query?: string) => {
  try {
    console.log("Fetching buy properties with query:", query);
    
    const endpoint = `/properties/get_properties_for_main_site${query ? `?${query}` : ''}`;
    console.log("API endpoint:", endpoint);
    
    const res = await api.get(endpoint);
    console.log("API Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching buy properties:", error);
    console.log("Returning mock data as fallback");
    // Return mock data on error to prevent crashes
    return {
      properties: [
        {
          id: 1,
          title: "Luxury Marina Apartment",
          photos: ["/images/dubai-marina.webp"],
          price: "2,500,000",
          bedrooms: 2,
          bathrooms: 2,
          area: "1200 sq ft",
          location: "Dubai Marina, Dubai"
        },
        {
          id: 2,
          title: "Palm Jumeirah Villa",
          photos: ["/images/Palm-Jumeirah.webp"],
          price: "8,500,000",
          bedrooms: 4,
          bathrooms: 5,
          area: "3500 sq ft",
          location: "Palm Jumeirah, Dubai"
        },
        {
          id: 3,
          title: "Downtown Dubai Penthouse",
          photos: ["/images/building.jpg"],
          price: "4,200,000",
          bedrooms: 3,
          bathrooms: 3,
          area: "1800 sq ft",
          location: "Downtown Dubai, Dubai"
        }
      ],
      total: 3
    };
  }
};
// Helper function to check if a string is a numeric ID
function isNumericId(value: string): boolean {
  return /^\d+$/.test(value);
}

// Helper function to convert URL slug back to property name format
function slugToPropertyName(slug: string): string {
  // Replace underscores with spaces and capitalize first letter of each word
  return slug
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export const getAllBuyPropertiesById = async (idOrSlug: string) => {
  try {
    console.log("Fetching buy property by ID or slug:", idOrSlug);
    
    // Try fetching by property name first (if it's not a numeric ID)
    if (!isNumericId(idOrSlug)) {
      try {
        const propertyName = slugToPropertyName(idOrSlug);
        const propertyNameLower = idOrSlug.replace(/_/g, ' ').toLowerCase();
        const propertyNameOriginal = idOrSlug.replace(/_/g, ' ');
        
        console.log("Trying to fetch by property name:", propertyName);
        console.log("Also trying lowercase:", propertyNameLower);
        console.log("Also trying original:", propertyNameOriginal);
        
        // Try different possible endpoints for name-based lookup with multiple name variations
        const nameVariations = [propertyName, propertyNameLower, propertyNameOriginal];
        const nameEndpoints: string[] = [];
        
        // Generate endpoints for each name variation
        // Try name first (as API returns name, not project_name)
        for (const name of nameVariations) {
          nameEndpoints.push(
            `/properties/get_properties_for_main_site?name=${encodeURIComponent(name)}`,
            `/properties/get_properties_for_main_site?title=${encodeURIComponent(name)}`,
            `/properties/get_properties_for_main_site?project_name=${encodeURIComponent(name)}`,
            `/properties/get_properties_for_main_site?property_name=${encodeURIComponent(name)}`,
          );
        }
        
        for (const endpoint of nameEndpoints) {
          try {
            console.log("Trying endpoint:", endpoint);
            const res = await api.get(endpoint);
            console.log("API Response:", res.data);
            
            // Get all properties from response
            let properties: any[] = [];
            if (res.data?.properties && Array.isArray(res.data.properties)) {
              properties = res.data.properties;
            } else if (res.data?.property) {
              properties = [res.data.property];
            } else if (Array.isArray(res.data)) {
              properties = res.data;
            }
            
            // Find exact match by comparing slug with property name
            if (properties.length > 0) {
              const slugLower = idOrSlug.toLowerCase();
              const slugWithSpaces = idOrSlug.toLowerCase().replace(/_/g, ' ');
              
              // Try to find exact match first - must match exactly
              const exactMatch = properties.find((prop: any) => {
                const propName = (prop.name || prop.title || prop.project_name || prop.property_name || '').toLowerCase();
                const propNameSlug = propName.replace(/\s+/g, '_');
                
                // Exact match: slug matches property name slug, or property name matches slug with spaces
                return propNameSlug === slugLower || 
                       propName === slugWithSpaces ||
                       propName.replace(/\s+/g, '_') === slugLower;
              });
              
              if (exactMatch) {
                console.log("Found exact match:", exactMatch.name || exactMatch.title);
                return { properties: [exactMatch] };
              }
              
              // If no exact match found, don't return wrong property - continue to next endpoint
              console.warn("No exact match found in this response, trying next endpoint");
            }
          } catch (error) {
            console.log(`Endpoint ${endpoint} failed, trying next...`);
            continue;
          }
        }
      } catch (error) {
        console.log("Name-based lookup failed, falling back to ID lookup");
      }
    }
    
    // If it's a numeric ID, we should not allow it - throw error
    if (isNumericId(idOrSlug)) {
      console.error("Numeric ID not allowed - only name-based slugs are supported");
      throw new Error("Property not found. Please use property name in URL.");
    }
    
    // If name-based lookup failed, throw error
    console.error("Property not found with name:", idOrSlug);
    throw new Error(`Property not found: ${idOrSlug}`);
  } catch (error) {
    console.error("Error fetching buy property by ID or slug:", error);
    // Don't return mock data - throw error instead
    throw error;
  }
};
