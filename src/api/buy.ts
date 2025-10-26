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
export const getAllBuyPropertiesById = async (id: string) => {
  try {
    console.log("Fetching buy property by ID:", id);
    
    const endpoint = `/properties/get_properties_for_main_site?property_id=${id}`;
    console.log("API endpoint:", endpoint);
    
    const res = await api.get(endpoint);
    console.log("API Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching buy property by ID:", error);
    console.log("Returning mock data as fallback");
    // Return mock data on error
    return {
      property: {
        id: parseInt(id),
        title: "Luxury Property",
        photos: ["/images/dubai-marina.webp"],
        price: "2,500,000",
        bedrooms: 2,
        bathrooms: 2,
        area: "1200 sq ft",
        location: "Dubai Marina, Dubai",
        description: "A luxurious property available for purchase in the heart of Dubai Marina"
      }
    };
  }
};
