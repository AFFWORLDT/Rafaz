"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { motion } from "framer-motion";
import { Bed, Bath, SquareGanttChart, MapPin, Heart } from "lucide-react";
import LazySection from "./LazySection";
import InfiniteScroll from "./InfiniteScroll";

interface Property {
  id: string;
  title: string;
  location: string | { community?: string; city?: string };
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  property_type: string;
  photos: string[];
  developer?: string;
  status?: string;
}

interface OptimizedPropertyGridProps {
  properties: Property[];
  fetchMore?: (page: number) => Promise<Property[]>;
  className?: string;
  useInfiniteScroll?: boolean;
  itemsPerPage?: number;
}

export default function OptimizedPropertyGrid({
  properties,
  fetchMore,
  className = "",
  useInfiniteScroll = false,
  itemsPerPage = 20
}: OptimizedPropertyGridProps) {
  const [displayedProperties, setDisplayedProperties] = useState<Property[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!useInfiniteScroll) {
      setDisplayedProperties(properties.slice(0, itemsPerPage));
    }
  }, [properties, itemsPerPage, useInfiniteScroll]);

  const loadMoreProperties = async (page: number): Promise<Property[]> => {
    if (fetchMore) {
      return await fetchMore(page);
    }
    
    // Fallback: load from existing properties array
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return properties.slice(startIndex, endIndex);
  };

  const renderPropertyCard = (property: Property, index: number) => (
    <LazySection
      key={property.id}
      animation="slideUp"
      delay={index * 0.1}
      className="h-full"
    >
      <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden group">
        <div className="relative h-48 overflow-hidden">
          <img
            src={property.photos?.[0] || "/images/placeholder.jpg"}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute top-4 left-4">
            <Badge 
              variant="secondary" 
              className={`${
                property.status === 'Pre-Launch' 
                  ? 'bg-orange-100 text-orange-800' 
                  : 'bg-green-100 text-green-800'
              }`}
            >
              {property.status || 'Available'}
            </Badge>
          </div>
          <div className="absolute top-4 right-4">
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-primary transition-colors">
            {property.title}
          </h3>
          
          <div className="flex items-center text-sm text-gray-600 mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            {typeof property.location === 'string' ? property.location : 
             property.location?.community ? `${property.location.community}, ${property.location.city}` :
             'Dubai, UAE'}
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
          
          {property.developer && (
            <div className="text-sm text-gray-500 mb-3">
              by {property.developer}
            </div>
          )}
          
          <Button className="w-full rounded-lg group-hover:bg-primary/90 transition-colors">
            View Details
          </Button>
        </CardContent>
      </Card>
    </LazySection>
  );

  if (useInfiniteScroll && fetchMore) {
    return (
      <div className={className}>
        <InfiniteScroll
          fetchMore={loadMoreProperties}
          renderItem={renderPropertyCard}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          itemClassName="h-full"
          pageSize={itemsPerPage}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedProperties.map((property, index) => 
          renderPropertyCard(property, index)
        )}
      </div>
      
      {!useInfiniteScroll && properties.length > displayedProperties.length && (
        <LazySection animation="fadeIn" className="text-center mt-12">
          <Button
            onClick={() => {
              const nextPage = currentPage + 1;
              const startIndex = nextPage * itemsPerPage;
              const endIndex = startIndex + itemsPerPage;
              const newProperties = properties.slice(startIndex, endIndex);
              
              if (newProperties.length > 0) {
                setDisplayedProperties(prev => [...prev, ...newProperties]);
                setCurrentPage(nextPage);
              }
            }}
            variant="outline"
            size="lg"
            className="rounded-lg px-8"
          >
            Load More Properties
          </Button>
        </LazySection>
      )}
    </div>
  );
}
