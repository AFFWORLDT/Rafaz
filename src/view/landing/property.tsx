"use client";
import { getAllBuyProperties } from "@/src/api/buy";
import { getAllProperties } from "@/src/api/offPlans";
import { PropertyCard } from "@/src/components/common/card";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import React from "react";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { useRouter } from "next/navigation";

// URL Formatting Function
function formatPropertyNameForUrl(name: string): string {
  if (!name) return '';
  
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters (keeps spaces and hyphens)
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .replace(/-/g, '_') // Normalize hyphens to underscores
    .replace(/_+/g, '_') // Remove duplicate underscores
    .trim();
}

export default function Property() {
  const [property, setProperty] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { t } = useLanguage();
  const router = useRouter();

  const fetchproperty = async () => {
    setLoading(true);
    const query = "sort_by=total_count&sort_order=desc&page=1&size=3";
    try {
      console.log("Starting to fetch properties...");
      // Fetch both buy properties and off-plan properties
      const [buyPropertiesRes, offPlanPropertiesRes] = await Promise.allSettled([
        getAllBuyProperties(query),
        getAllProperties(query)
      ]);
      
      console.log("Buy Properties Response:", buyPropertiesRes);
      console.log("Off-Plan Properties Response:", offPlanPropertiesRes);
      
      // Extract properties from buy properties response
      let buyProperties: any[] = [];
      if (buyPropertiesRes.status === 'fulfilled') {
        const res = buyPropertiesRes.value;
      
        // Handle different response structures for buy properties
        if (res?.properties && Array.isArray(res.properties) && res.properties.length > 0) {
          buyProperties = res.properties;
        } else if (Array.isArray(res) && res.length > 0) {
          buyProperties = res;
        } else if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
          buyProperties = res.data;
        } else if (res?.results && Array.isArray(res.results) && res.results.length > 0) {
          buyProperties = res.results;
        }
      }
      
      // Extract properties from off-plan properties response
      let offPlanProperties: any[] = [];
      if (offPlanPropertiesRes.status === 'fulfilled') {
        const res = offPlanPropertiesRes.value;
        if (res?.projects && Array.isArray(res.projects) && res.projects.length > 0) {
          offPlanProperties = res.projects;
        } else if (res?.properties && Array.isArray(res.properties) && res.properties.length > 0) {
          offPlanProperties = res.properties;
        } else if (Array.isArray(res) && res.length > 0) {
          offPlanProperties = res;
        }
      }
      
      // Combine and limit to 3 properties total
      const allProperties = [...buyProperties, ...offPlanProperties].slice(0, 3);
      
      // Transform properties with location formatting and navigation info
      const propertiesArray = allProperties.map((prop: any) => {
        const isOffPlan = offPlanProperties.some((op: any) => op.id === prop.id || op.name === prop.name);
        
        // Prioritize 'name' field as it's what the API searches by
        // For buy properties, use: name, title, property_name
        // For off-plan properties, use: name, project_name, title
        const propertyName = isOffPlan 
          ? (prop.name || prop.project_name || prop.title || prop.property_name || `Property ${prop.id || 'Unknown'}`)
          : (prop.name || prop.title || prop.property_name || prop.project_name || `Property ${prop.id || 'Unknown'}`);
        
        return {
          ...prop,
          id: prop.id?.toString() || prop.propertyId,
          title: prop.title || propertyName,
          // Store the original name field for navigation (this is what API searches by)
          name: prop.name || propertyName,
          project_name: prop.project_name || prop.property_name || prop.name || prop.title || propertyName,
          property_name: prop.property_name || prop.name || prop.title || propertyName,
          // Store the navigation name separately to ensure we use the correct one
          navigationName: propertyName,
          location: typeof prop.location === 'object' && prop.location !== null
            ? `${prop.location.community || ''}, ${prop.location.city || 'Dubai'}`.replace(/^,\s*|,\s*$/g, '')
            : prop.location || 'Dubai, UAE',
          price: prop.price || prop.price_display || "2,500,000",
          bedrooms: prop.bedrooms || prop.bedRooms || prop.bedroom_count || 2,
          bathrooms: prop.bathrooms || prop.bathroom_count || 2,
          area: prop.area || prop.size || prop.square_feet || "1,200 sq ft",
          photos: prop.photos || prop.images || [prop.photo] || ["/images/building.jpg"],
          isOffPlan: isOffPlan
        };
      });
      
      setProperty(propertiesArray);
    } catch (error) {
      console.error("Error fetching buy properties:", error);
      // Set empty array on error to prevent crashes
      setProperty([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchproperty();
  }, []);

  const handleFavorite = (item: any) => {
    console.log("Added to favorites:", item);
    // Add your favorite logic here
  };

  return (
    <div className="min-h-screen bg-[#F2EEE8] text-[#1A202C]">
      <main className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
        <section className="text-center mb-12">
          <h2 className="text-black text-sm font-light tracking-widest mb-2 uppercase">
            {t('property.title')}
          </h2>
          <h1 className="text-3xl sm:text-4xl font-mono mb-4 text-[#1A202C] tracking-wide">
            {t('property.headline')}
          </h1>
          <p className="max-w-4xl mx-auto text-sm font-light text-gray-700 leading-relaxed">
            {t('property.description')}
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {loading ? (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-600">Loading properties...</p>
            </div>
          ) : Array.isArray(property) && property.length > 0 ? (
            property.map((obj: any, i: number) => {
              // Use navigationName if available, otherwise fall back to name field
              // This ensures we use the exact property name that the API will recognize
              const propertyName = obj?.navigationName || obj?.name || obj?.title || obj?.project_name || obj?.property_name || `Property ${obj?.id || 'Unknown'}`;
              
              // Only create slug if we have a valid property name (not a fallback)
              if (!propertyName || propertyName.startsWith('Property ')) {
                console.warn('Property missing name field:', obj);
              }
              
              const propertySlug = formatPropertyNameForUrl(propertyName);
              const detailUrl = obj?.isOffPlan 
                ? `/off-plan-projects-in-dubai/details/${propertySlug}`
                : `/buy/details/${propertySlug}`;
              
              return (
                <PropertyCard
                  photos={obj?.photos?.[0] || "/images/building.jpg"}
                  title={obj?.title || propertyName || "Luxury Property"}
                  location={obj?.location || "Dubai, UAE"}
                  price={typeof obj?.price === 'number' ? `AED ${obj.price.toLocaleString()}` : (obj?.price || "AED 2,500,000")}
                  bedrooms={obj?.bedrooms || 2}
                  bathrooms={obj?.bathrooms || 2}
                  area={typeof obj?.area === 'number' ? `${obj.area} sq ft` : (obj?.area || "1,200 sq ft")}
                  propertyId={obj?.id?.toString() || "1"}
                  key={obj?.id || i}
                  onClick={() => {
                    console.log('Property clicked - Landing Page:', { 
                      id: obj?.id, 
                      originalName: obj?.name,
                      navigationName: obj?.navigationName,
                      title: obj?.title,
                      project_name: obj?.project_name,
                      property_name: obj?.property_name,
                      finalName: propertyName,
                      slug: propertySlug,
                      url: detailUrl,
                      isOffPlan: obj?.isOffPlan,
                      fullObject: obj
                    });
                    
                    // Navigate to the detail page
                    router.push(detailUrl);
                  }}
                />
              );
            })
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-600">No properties available</p>
            </div>
          )}
        </section>

        <div className="text-center">
         <Link href={"/buy"}>
           <Button className="bg-[#D4B88C] hover:bg-[#C2A77B] text-white px-8 py-6 text-lg font-light tracking-wider rounded-lg shadow-md uppercase">
            {t('property.viewAll')}
          </Button>
         </Link>
        </div>
      </main>
    </div>
  );
}
