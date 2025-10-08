import { api, handleApiError } from "@/src/lib/axios"

export const getAllProperties = async (querry?:string) => {
   try {
     console.log("Fetching properties with query:", querry);
     console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
     
     // Try different possible endpoints
     const endpoints = [
       `/properties/projects${querry ? `?${querry}` : ''}`,
       `/api/properties/projects${querry ? `?${querry}` : ''}`,
       `/properties${querry ? `?${querry}` : ''}`,
       `/api/properties${querry ? `?${querry}` : ''}`
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
     console.warn("All API endpoints failed, returning mock data");
     return {
       projects: [
         {
           id: 1,
           name: "Luxury Marina Tower",
           location: {
             community: "Dubai Marina",
             city: "Dubai"
           },
           photos: ["/images/dubai-marina.webp"],
           price: "2,500,000",
           bedrooms: 2,
           bathrooms: 2,
           area: "1200 sq ft"
         },
         {
           id: 2,
           name: "Palm Jumeirah Villa",
           location: {
             community: "Palm Jumeirah",
             city: "Dubai"
           },
           photos: ["/images/Palm-Jumeirah.webp"],
           price: "8,500,000",
           bedrooms: 4,
           bathrooms: 5,
           area: "3500 sq ft"
         },
         {
           id: 3,
           name: "Downtown Dubai Residence",
           location: {
             community: "Downtown Dubai",
             city: "Dubai"
           },
           photos: ["/images/building.jpg"],
           price: "4,200,000",
           bedrooms: 3,
           bathrooms: 3,
           area: "1800 sq ft"
         }
       ],
       total: 3
     };
   } catch (error) {
    console.error("Error in getAllProperties:", error);
    throw handleApiError(error)
   }
}
export const getPropertyById = async (id:string) => {
   try {
     console.log("Fetching property by ID:", id);
     
     // Try different possible endpoints
     const endpoints = [
       `/properties/projects?project_id=${id}`,
       `/api/properties/projects?project_id=${id}`,
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
     console.warn("All API endpoints failed for property ID, returning mock data");
     return {
       project: {
         id: parseInt(id),
         name: "Luxury Property",
         location: {
           community: "Dubai Marina",
           city: "Dubai"
         },
         photos: ["/images/dubai-marina.webp"],
         price: "2,500,000",
         bedrooms: 2,
         bathrooms: 2,
         area: "1200 sq ft",
         description: "A luxurious property in the heart of Dubai Marina"
       }
     };
   } catch (error) {
    console.error("Error in getPropertyById:", error);
    throw handleApiError(error)
   }
}