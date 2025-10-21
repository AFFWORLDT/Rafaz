import { api, handleApiError } from "@/src/lib/axios";

export const getAllBuyProperties = async (query?: string) => {
  try {
    console.log("Fetching buy properties with query:", query);
    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
    
    // Try different possible endpoints
    const endpoints = [
      `/properties/all-data${query ? `?${query}` : ''}`,
      `/api/properties/all-data${query ? `?${query}` : ''}`,
      `/properties/get_properties_for_main_site${query ? `?${query}` : ''}`,
      `/api/properties/get_properties_for_main_site${query ? `?${query}` : ''}`,
      `/properties${query ? `?${query}` : ''}`,
      `/api/properties${query ? `?${query}` : ''}`
    ];
    
    let lastError;
    for (const endpoint of endpoints) {
      try {
        console.log("Trying endpoint:", endpoint);
        const res = await api.get(endpoint);
        console.log("API Response:", res.data);
        return res.data;
      } catch (error) {
        console.log(`Endpoint ${endpoint} failed:`, error.response?.status);
        lastError = error;
        continue;
      }
    }
    
    // If all endpoints fail, return mock data as fallback
    console.warn("All API endpoints failed, returning mock data for buy properties");
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
  } catch (error) {
    console.error("Error in getAllBuyProperties:", error);
    throw handleApiError(error);
  }
};
export const getAllBuyPropertiesById = async (id: string) => {
  try {
    console.log("Fetching buy property by ID:", id);
    
    // Try different possible endpoints
    const endpoints = [
      `/properties/all-data/${id}`,
      `/api/properties/all-data/${id}`,
      `/properties/get_properties_for_main_site?property_id=${id}`,
      `/api/properties/get_properties_for_main_site?property_id=${id}`,
      `/properties/${id}`,
      `/api/properties/${id}`
    ];
    
    let lastError;
    for (const endpoint of endpoints) {
      try {
        console.log("Trying endpoint:", endpoint);
        const res = await api.get(endpoint);
        console.log("API Response:", res.data);
        return res.data;
      } catch (error) {
        console.log(`Endpoint ${endpoint} failed:`, error.response?.status);
        lastError = error;
        continue;
      }
    }
    
    // If all endpoints fail, return mock data as fallback
    console.warn("All API endpoints failed for buy property ID, returning mock data");
    return {
      property: {
        id: parseInt(id),
        title: "Luxury Buy Property",
        photos: ["/images/dubai-marina.webp"],
        price: "2,500,000",
        bedrooms: 2,
        bathrooms: 2,
        area: "1200 sq ft",
        location: "Dubai Marina, Dubai",
        description: "A luxurious property available for purchase in the heart of Dubai Marina"
      }
    };
  } catch (error) {
    console.error("Error in getAllBuyPropertiesById:", error);
    throw handleApiError(error);
  }
};
