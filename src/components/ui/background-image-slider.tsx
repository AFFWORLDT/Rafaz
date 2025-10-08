"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllBuyProperties } from '@/src/api/buy';

interface BackgroundImageSliderProps {
  className?: string;
}

export const BackgroundImageSlider: React.FC<BackgroundImageSliderProps> = ({
  className = "",
}) => {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyImages = async () => {
      try {
        setLoading(true);
        
        // Fetch rent properties
        const queryParams = new URLSearchParams({
          listing_type: "RENT",
          status: "ACTIVE",
          page: "1",
          size: "20", // Get more properties for more images
          sort_by: "total_count",
          sort_order: "desc"
        });

        const response = await getAllBuyProperties(queryParams.toString());
        const properties = response?.properties || [];

        // Extract images from properties
        const propertyImages: string[] = [];
        properties.forEach((property: any) => {
          if (property.photos && Array.isArray(property.photos)) {
            property.photos.forEach((photo: string) => {
              if (photo && photo.trim() !== '') {
                propertyImages.push(photo);
              }
            });
          }
        });

        // If we don't have enough images, add some fallback images
        if (propertyImages.length < 5) {
          const fallbackImages = [
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80",
            "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          ];
          
          // Add fallback images if we don't have enough real images
          const neededImages = 5 - propertyImages.length;
          for (let i = 0; i < neededImages && i < fallbackImages.length; i++) {
            propertyImages.push(fallbackImages[i]);
          }
        }

        setImages(propertyImages.slice(0, 10)); // Limit to 10 images max
      } catch (error) {
        console.error('Error fetching property images:', error);
        // Fallback to luxury property images
        setImages([
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80"
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyImages();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000); // Change image every 6 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  if (loading) {
    return (
      <div className={`absolute inset-0 w-full h-full bg-gray-900 ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className={`absolute inset-0 w-full h-full bg-gray-900 ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <p>No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt={`Property background ${currentIndex + 1}`}
            fill
            className="object-cover"
            priority={currentIndex === 0}
            quality={90}
          />
          
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      </AnimatePresence>

      {/* Image counter (optional) */}
      {images.length > 1 && (
        <div className="absolute top-4 right-4 z-10 bg-black/30 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
};
