"use client";
import { getAllBuyProperties } from "@/src/api/buy";
import { PropertyCard } from "@/src/components/common/card";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import React from "react";
import { useLanguage } from "@/src/contexts/LanguageContext";

export default function Property() {
  const [property, setProperty] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { t } = useLanguage();

  const fetchproperty = async () => {
    setLoading(true);
    const query = "sort_by=total_count&sort_order=desc&page=1&size=3";
    try {
      console.log("Starting to fetch buy properties...");
      const res = await getAllBuyProperties(query);
      console.log("Received buy properties data:", res);
      
      // Handle different response structures
      let propertiesArray: any[] = [];
      
      if (res?.properties && Array.isArray(res.properties) && res.properties.length > 0) {
        // Transform the location object to string for each property
        propertiesArray = res.properties.map((prop: any) => ({
          ...prop,
          location: typeof prop.location === 'object' && prop.location !== null
            ? `${prop.location.community || ''}, ${prop.location.city || 'Dubai'}`.replace(/^,\s*|,\s*$/g, '')
            : prop.location || 'Dubai, UAE'
        }));
        console.log("Set buy properties:", res.properties.length);
      } else if (Array.isArray(res) && res.length > 0) {
        propertiesArray = res.map((prop: any) => ({
          ...prop,
          location: typeof prop.location === 'object' && prop.location !== null
            ? `${prop.location.community || ''}, ${prop.location.city || 'Dubai'}`.replace(/^,\s*|,\s*$/g, '')
            : prop.location || 'Dubai, UAE'
        }));
        console.log("Set buy properties from array:", res.length);
      } else if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
        propertiesArray = res.data.map((prop: any) => ({
          ...prop,
          location: typeof prop.location === 'object' && prop.location !== null
            ? `${prop.location.community || ''}, ${prop.location.city || 'Dubai'}`.replace(/^,\s*|,\s*$/g, '')
            : prop.location || 'Dubai, UAE'
        }));
        console.log("Set buy properties from res.data:", res.data.length);
      } else if (res?.results && Array.isArray(res.results) && res.results.length > 0) {
        propertiesArray = res.results.map((prop: any) => ({
          ...prop,
          location: typeof prop.location === 'object' && prop.location !== null
            ? `${prop.location.community || ''}, ${prop.location.city || 'Dubai'}`.replace(/^,\s*|,\s*$/g, '')
            : prop.location || 'Dubai, UAE'
        }));
        console.log("Set buy properties from res.results:", res.results.length);
      } else if (res && typeof res === 'object' && !Array.isArray(res)) {
        // If it's a single object, check if it has property structure
        console.log("Received single object, checking structure:", res);
        
        // Check if this is a single property object with keys like id, property_name, etc.
        if (res.hasOwnProperty('id') || res.hasOwnProperty('property_name') || res.hasOwnProperty('city')) {
          // Transform single property object to array format
          const transformedProperty = {
            id: res.id,
            title: res.property_name || res.title || res.name,
            location: typeof res.location === 'object' && res.location !== null
              ? `${res.location.community || ''}, ${res.location.city || 'Dubai'}`.replace(/^,\s*|,\s*$/g, '')
              : res.community ? `${res.community}, ${res.city || 'Dubai'}` : 'Dubai, UAE',
            price: res.price || res.price_display || "2,500,000",
            bedrooms: res.bedrooms || res.bedroom_count || 2,
            bathrooms: res.bathrooms || res.bathroom_count || 2,
            area: res.area || res.size || res.square_feet || "1,200 sq ft",
            photos: res.photos || res.images || [res.photo] || ["/images/building.jpg"]
          };
          propertiesArray = [transformedProperty];
          console.log("Transformed single property object to array");
        } else {
          console.warn("Single object doesn't match expected structure, skipping");
          propertiesArray = [];
        }
      } else {
        console.warn("No buy properties found in response:", res);
        propertiesArray = [];
      }
      
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
            property.map((obj: any, i: number) => (
              <PropertyCard
                photos={obj?.photos?.[0] || "/images/building.jpg"}
                title={obj?.title || "Luxury Property"}
                location={obj?.location || "Dubai, UAE"}
                price={obj?.price || "2,500,000"}
                bedrooms={obj?.bedrooms || 2}
                bathrooms={obj?.bathrooms || 2}
                area={obj?.area || "1,200 sq ft"}
                propertyId={obj?.id?.toString() || "1"}
                key={i}
              />
            ))
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
