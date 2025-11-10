import { api, handleApiError } from "@/src/lib/axios"

export const getAllProperties = async (querry?:string) => {
   try {
     console.log("Fetching properties with query:", querry);
     console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
     
    // Try different possible endpoints
    const endpoints = [
      `/properties/all-data${querry ? `?${querry}` : ''}`,
      `/api/properties/all-data${querry ? `?${querry}` : ''}`,
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
// Helper function to check if a string is a numeric ID
function isNumericId(value: string): boolean {
  return /^\d+$/.test(value);
}

// Helper function to convert URL slug back to project name format
function slugToProjectName(slug: string): string {
  // Replace underscores with spaces and capitalize first letter of each word
  return slug
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export const getPropertyById = async (idOrSlug: string) => {
   try {
     console.log("Fetching property by ID or slug:", idOrSlug);
     
     // Try fetching by project name first (if it's not a numeric ID)
     if (!isNumericId(idOrSlug)) {
       try {
         const projectName = slugToProjectName(idOrSlug);
         const projectNameLower = idOrSlug.replace(/_/g, ' ').toLowerCase();
         const projectNameOriginal = idOrSlug.replace(/_/g, ' ');
         
         console.log("Trying to fetch by project name:", projectName);
         console.log("Also trying lowercase:", projectNameLower);
         console.log("Also trying original:", projectNameOriginal);
         
         // Try different possible endpoints for name-based lookup with multiple name variations
         const nameVariations = [projectName, projectNameLower, projectNameOriginal];
         const nameEndpoints: string[] = [];
         
         // Generate endpoints for each name variation
         // Try name first (as API returns name, not project_name)
         for (const name of nameVariations) {
           nameEndpoints.push(
             `/properties/all-data?name=${encodeURIComponent(name)}`,
             `/properties/projects?name=${encodeURIComponent(name)}`,
             `/properties/all-data?title=${encodeURIComponent(name)}`,
             `/properties/projects?title=${encodeURIComponent(name)}`,
             `/properties/all-data?project_name=${encodeURIComponent(name)}`,
             `/properties/all-data?property_name=${encodeURIComponent(name)}`,
             `/properties/projects?project_name=${encodeURIComponent(name)}`,
             `/properties/projects?property_name=${encodeURIComponent(name)}`,
           );
         }
         
         for (const endpoint of nameEndpoints) {
           try {
             console.log("Trying endpoint:", endpoint);
             const res = await api.get(endpoint);
             console.log("API Response:", res.data);
             
             // Get all projects from response
             let projects: any[] = [];
             if (res.data?.projects && Array.isArray(res.data.projects)) {
               projects = res.data.projects;
             } else if (res.data?.project) {
               projects = [res.data.project];
             } else if (Array.isArray(res.data)) {
               projects = res.data;
             }
             
             // Format name the same way as formatPropertyNameForUrl does
             const formatNameForSlug = (name: string): string => {
               return name
                 .toLowerCase()
                 .replace(/[^a-z0-9\s-]/g, '') // Remove special characters (keeps spaces and hyphens)
                 .replace(/\s+/g, '_') // Replace spaces with underscores
                 .replace(/-/g, '_') // Normalize hyphens to underscores
                 .replace(/_+/g, '_') // Remove duplicate underscores
                 .trim();
             };
             
             // Find exact match by comparing slug with project name
             if (projects.length > 0) {
               const slugLower = idOrSlug.toLowerCase();
               const slugWithSpaces = idOrSlug.toLowerCase().replace(/_/g, ' ');
               
               // Try to find exact match - use same formatting as card
               const exactMatch = projects.find((project: any) => {
                 const projectNameRaw = project.name || project.title || project.project_name || project.property_name || '';
                 const projectNameFormatted = formatNameForSlug(projectNameRaw);
                 const projectNameWithSpaces = projectNameRaw.toLowerCase();
                 const slugFormatted = formatNameForSlug(slugWithSpaces);
                 
                 // Flexible match: slug matches project name slug, or project name matches slug with spaces
                 return projectNameFormatted === slugLower || 
                        projectNameFormatted === slugFormatted ||
                        projectNameWithSpaces === slugWithSpaces ||
                        projectNameFormatted.replace(/_/g, '') === slugLower.replace(/_/g, '') ||
                        projectNameRaw.toLowerCase().replace(/[^a-z0-9]/g, '') === idOrSlug.toLowerCase().replace(/[^a-z0-9]/g, '');
               });
               
               if (exactMatch) {
                 console.log("Found match:", exactMatch.name || exactMatch.title);
                 return { projects: [exactMatch] };
               }
               
               // If no exact match found, try to return first property if only one result
               if (projects.length === 1) {
                 console.log("Only one project found, returning it:", projects[0].name || projects[0].title);
                 return { projects: [projects[0]] };
               }
               
               // If no exact match found, continue to next endpoint
               console.warn("No match found in this response, trying next endpoint");
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
    console.error("Error in getPropertyById:", error);
    throw handleApiError(error)
   }
}