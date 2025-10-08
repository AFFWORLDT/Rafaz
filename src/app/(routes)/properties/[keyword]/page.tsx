"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { motion } from "framer-motion";
import { Bed, Bath, SquareGanttChart, MapPin, Search, Filter } from "lucide-react";
import { SEO_KEYWORDS, generatePageTitle, generatePropertySEO } from "@/src/lib/seo";
// import LeadCaptureForm from "@/src/components/common/LeadCaptureForm";
import PropertyCardSkeleton from "@/src/components/common/property-card-skeleton";

export default function KeywordPropertyPage() {
  const params = useParams();
  const keyword = params.keyword as string;
  const [properties, setProperties] = useState<any[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    priceRange: "all",
    bedrooms: "all",
    propertyType: "all",
    location: "all"
  });

  // Find SEO keyword data
  const seoKeyword = SEO_KEYWORDS.find(k => 
    k.keyword.toLowerCase().replace(/\s+/g, '-') === keyword.toLowerCase()
  );

  useEffect(() => {
    fetchProperties();
  }, [keyword]);

  useEffect(() => {
    applyFilters();
  }, [properties, filters]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      // Mock API call - replace with actual endpoint
      const response = await fetch(`/api/properties/keyword/${keyword}`);
      const data = await response.json();
      setProperties(data.properties || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
      // Fallback to mock data
      setProperties(generateMockProperties());
    } finally {
      setLoading(false);
    }
  };

  const generateMockProperties = () => {
    // Generate mock properties based on keyword
    const baseProperties = [
      {
        id: 1,
        title: "Luxury Marina Apartment",
        location: "Dubai Marina",
        price: 1200000,
        bedrooms: 2,
        bathrooms: 2,
        area: 1200,
        property_type: "APARTMENT",
        photos: ["/images/property1.jpeg"],
        developer: "Emaar Properties"
      },
      {
        id: 2,
        title: "Premium Downtown Residence",
        location: "Downtown Dubai",
        price: 1800000,
        bedrooms: 3,
        bathrooms: 2,
        area: 1500,
        property_type: "APARTMENT",
        photos: ["/images/property2.jpeg"],
        developer: "Sobha Realty"
      },
      {
        id: 3,
        title: "Business Bay Tower",
        location: "Business Bay",
        price: 950000,
        bedrooms: 2,
        bathrooms: 2,
        area: 1100,
        property_type: "APARTMENT",
        photos: ["/images/property3.jpeg"],
        developer: "Damac Properties"
      }
    ];

    return baseProperties.map(prop => generatePropertySEO(prop));
  };

  const applyFilters = () => {
    let filtered = [...properties];

    if (filters.priceRange !== "all") {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(prop => {
        if (max) {
          return prop.price >= min && prop.price <= max;
        }
        return prop.price >= min;
      });
    }

    if (filters.bedrooms !== "all") {
      filtered = filtered.filter(prop => prop.bedrooms === parseInt(filters.bedrooms));
    }

    if (filters.propertyType !== "all") {
      filtered = filtered.filter(prop => prop.propertyType === filters.propertyType);
    }

    if (filters.location !== "all") {
      filtered = filtered.filter(prop => prop.location === filters.location);
    }

    setFilteredProperties(filtered);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const priceRanges = [
    { label: "All Prices", value: "all" },
    { label: "Under AED 500K", value: "0-500000" },
    { label: "AED 500K - 1M", value: "500000-1000000" },
    { label: "AED 1M - 2M", value: "1000000-2000000" },
    { label: "AED 2M - 5M", value: "2000000-5000000" },
    { label: "Above AED 5M", value: "5000000-999999999" }
  ];

  const bedroomOptions = [
    { label: "All Bedrooms", value: "all" },
    { label: "Studio", value: "0" },
    { label: "1 Bedroom", value: "1" },
    { label: "2 Bedrooms", value: "2" },
    { label: "3 Bedrooms", value: "3" },
    { label: "4+ Bedrooms", value: "4" }
  ];

  const propertyTypes = [
    { label: "All Types", value: "all" },
    { label: "Apartment", value: "APARTMENT" },
    { label: "Villa", value: "VILLA" },
    { label: "Townhouse", value: "TOWNHOUSE" },
    { label: "Penthouse", value: "PENTHOUSE" }
  ];

  const locations = [
    { label: "All Locations", value: "all" },
    { label: "Dubai Marina", value: "Dubai Marina" },
    { label: "Downtown Dubai", value: "Downtown Dubai" },
    { label: "Business Bay", value: "Business Bay" },
    { label: "JBR", value: "JBR" },
    { label: "Palm Jumeirah", value: "Palm Jumeirah" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {seoKeyword?.keyword || keyword.replace(/-/g, ' ').toUpperCase()}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {seoKeyword?.description || `Discover premium ${keyword.replace(/-/g, ' ')} in Dubai`}
            </p>
            
            {/* Breadcrumbs */}
            <nav className="flex justify-center mb-8">
              <ol className="flex items-center space-x-2 text-sm text-gray-600">
                <li><a href="/" className="hover:text-primary">Home</a></li>
                <li>/</li>
                <li><a href="/properties" className="hover:text-primary">Properties</a></li>
                <li>/</li>
                <li className="text-primary font-semibold">{keyword.replace(/-/g, ' ')}</li>
              </ol>
            </nav>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Select value={filters.priceRange} onValueChange={(value) => handleFilterChange("priceRange", value)}>
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map(range => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.bedrooms} onValueChange={(value) => handleFilterChange("bedrooms", value)}>
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder="Bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  {bedroomOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.propertyType} onValueChange={(value) => handleFilterChange("propertyType", value)}>
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.location} onValueChange={(value) => handleFilterChange("location", value)}>
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location.value} value={location.value}>
                      {location.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">
              {filteredProperties.length} Properties Found
            </h2>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {keyword.replace(/-/g, ' ')}
            </Badge>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <PropertyCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={property.photos?.[0] || "/images/placeholder.jpg"}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-white/90 text-gray-800">
                          {property.propertyType}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {property.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <MapPin className="w-4 h-4 mr-1" />
                        {property.location}
                      </div>
                      
                      <div className="text-2xl font-bold text-primary mb-4">
                        AED {property.price.toLocaleString()}
                      </div>
                      
                      <div className="flex gap-4 mb-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Bed className="w-4 h-4 mr-1" />
                          {property.bedrooms}
                        </div>
                        <div className="flex items-center">
                          <Bath className="w-4 h-4 mr-1" />
                          {property.bathrooms}
                        </div>
                        <div className="flex items-center">
                          <SquareGanttChart className="w-4 h-4 mr-1" />
                          {property.area} sq ft
                        </div>
                      </div>
                      
                      <Button className="w-full rounded-lg">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && filteredProperties.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                No Properties Found
              </h3>
              <p className="text-gray-600 mb-8">
                Try adjusting your filters to see more properties
              </p>
              <Button 
                onClick={() => setFilters({
                  priceRange: "all",
                  bedrooms: "all",
                  propertyType: "all",
                  location: "all"
                })}
                variant="outline"
                className="rounded-lg"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Lead Capture Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto max-w-4xl">
          {/* <LeadCaptureForm 
            title={`Interested in ${keyword.replace(/-/g, ' ')}?`}
            subtitle="Get personalized property recommendations and expert guidance from our team"
            variant="default"
          /> */}
        </div>
      </section>
    </div>
  );
}
