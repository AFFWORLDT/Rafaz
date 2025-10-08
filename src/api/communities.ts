import { api, handleApiError } from "@/src/lib/axios"
import axios from "axios";

export const getAllCommunities = async (page: number = 1, size: number = 100) => {
   try {
     console.log("Fetching communities with page:", page, "size:", size);
     
     // Use the correct endpoint with sorting
     const endpoint = `/locations/communities?sort_by=total_count&sort_order=desc&page=${page}&size=${size}`;
     
     try {
       console.log("Trying endpoint:", endpoint);
       const res = await api.get(endpoint);
       console.log("API Response:", res.data);
       return res.data;
     } catch (error) {
       console.log(`Endpoint ${endpoint} failed:`, error.response?.status);
       
       // If API fails, return mock data as fallback
       console.warn("API endpoint failed, returning mock data for communities");
       return {
         page: 1,
         size: 100,
         total: 509,
         communities: [
           {
             city: "Dubai",
             photos: ["/images/dubai-marina.webp"],
             latitude: 25.078367,
             longitude: 55.14041,
             name: "Dubai Marina",
             sell_properties_count: 0,
             rent_properties_count: 0,
             projects_count: 0,
             pool_projects_count: 26,
             total_count: 26,
             assigned_agents: []
           },
           {
             city: "Dubai",
             photos: ["/images/Palm-Jumeirah.webp"],
             latitude: 25.11492858618,
             longitude: 55.13745518478,
             name: "Palm Jumeirah",
             sell_properties_count: 0,
             rent_properties_count: 2,
             projects_count: 0,
             pool_projects_count: 34,
             total_count: 36,
             assigned_agents: []
           },
           {
             city: "Dubai",
             photos: ["/images/building.jpg"],
             latitude: 25.1949849,
             longitude: 55.2784141,
             name: "Downtown Dubai",
             sell_properties_count: 2,
             rent_properties_count: 0,
             projects_count: 2,
             pool_projects_count: 33,
             total_count: 37,
             assigned_agents: []
           }
         ]
       };
     }
   } catch (error) {
    console.error("Error in getAllCommunities:", error);
    throw handleApiError(error)
   }
}

export const getCommunityArticles = async (communityName: string) => {
  try {
    const encodedName = encodeURIComponent(communityName);
    const response = await axios.get(
      `https://jna-properties-api.propfusion.io/locations/communities/${encodedName}/articles`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching community articles:', error);
    throw error;
  }
};