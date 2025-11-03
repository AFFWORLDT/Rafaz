"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Home, Bed, Search } from "lucide-react";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { useRouter } from "next/navigation";
import LeadFormButton from "@/src/components/common/LeadFormButton";
// Removed BackgroundImageSlider import - using video instead

export default function HeroSection() {
  const { t } = useLanguage();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  
  // Search form state
  const [searchForm, setSearchForm] = useState({
    listingType: "",
    location: "",
    propertyType: "",
    bedrooms: ""
  });

  // Check if device is mobile for video optimization
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle search form submission
  const handleSearch = () => {
    const { listingType, location, propertyType, bedrooms } = searchForm;
    
    // Build query parameters
    const params = new URLSearchParams();
    
    if (listingType) {
      if (listingType === 'buy') {
        router.push('/buy');
        return;
      } else if (listingType === 'rent') {
        router.push('/rent');
        return;
      } else if (listingType === 'projects') {
        router.push('/offPlans');
        return;
      }
    }
    
    // If no specific listing type, go to buy page with filters
    if (location && location !== 'any') params.append('location', location);
    if (propertyType && propertyType !== 'any') params.append('type', propertyType);
    if (bedrooms && bedrooms !== 'any') params.append('bedrooms', bedrooms);
    
    const queryString = params.toString();
    router.push(`/buy${queryString ? `?${queryString}` : ''}`);
  };

  // Handle form field changes
  const handleFieldChange = (field: string, value: string) => {
    setSearchForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <section 
      className={`relative w-full flex items-center justify-center text-center luxury-bg overflow-hidden ${
        isMobile ? 'h-screen' : 'h-screen md:h-[115vh]'
      }`}
    >
      {/* Bright Background Effects - Reduced opacity for cleaner look */}
      <div className="absolute inset-0 luxury-bg-pattern opacity-10"></div>
      
          {/* Bright Animated Background Elements - Increased opacity for brightness */}
          <div className="absolute top-10 left-10 w-32 h-32 luxury-bg-radial rounded-full animate-luxuryFloat opacity-50 blur-xl"></div>
          <div className="absolute top-20 right-20 w-24 h-24 luxury-bg-gold rounded-full animate-luxuryBreathe opacity-40 blur-lg"></div>
          <div className="absolute bottom-20 left-20 w-28 h-28 luxury-bg-bronze rounded-full animate-luxuryPulse opacity-45 blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-36 h-36 luxury-bg-radial rounded-full animate-luxuryFloat opacity-40 blur-2xl"></div>

      {/* Hero Video Background - Mobile Optimized */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="/images/building.jpg"
          preload={isMobile ? "none" : "auto"}
          loading="lazy"
          style={{
            // Brighten the video for a lighter, more vibrant look
            filter: "brightness(1.2) contrast(1.1) saturate(1.1)"
          }}
        >
          <source src="/herooo.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images/building.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(1.2) contrast(1.1)"
            }}
          />
        </video>
      </div>

      {/* Bright Gradient Overlays - Reduced darkness for brighter appearance */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10 z-15" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D4AF37]/10 to-transparent z-16" />
      
      {/* Light vignette for subtle edge darkening only */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/15 z-17" />

      {/* Ultra-Luxury Hero Title - Center */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 text-white text-center max-w-6xl w-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {/* Luxury Decorative Elements */}
          <div className="relative mb-8">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-0.5 luxury-bg-gold animate-luxuryGlow"></div>
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-2 h-2 luxury-bg-gold rounded-full animate-luxurySparkle"></div>
          </div>
          
          <h1 className={`font-light mb-6 sm:mb-8 text-white font-serif tracking-wider leading-tight ${
            isMobile 
              ? 'text-3xl sm:text-4xl' 
              : 'text-4xl sm:text-5xl lg:text-7xl xl:text-8xl'
          }`}>
            <span className="luxury-text-shadow">{t('hero.title')}</span>
            <br />
            <span className="luxury-text inline-block animate-luxuryGoldFlow">{t('hero.subtitle')}</span>
          </h1>
          
          {/* Luxury Separator */}
          <div className="flex items-center justify-center gap-4 mb-6 sm:mb-8">
            <div className="w-12 h-px luxury-bg-gold animate-luxuryShimmer"></div>
            <div className="w-3 h-3 luxury-bg-gold rounded-full animate-luxuryPulse"></div>
            <div className="w-12 h-px luxury-bg-gold animate-luxuryShimmer"></div>
          </div>
          
          <motion.p 
            className="text-base sm:text-lg lg:text-xl xl:text-2xl uppercase max-w-3xl mx-auto text-white/95 leading-relaxed tracking-[0.2em] font-serif luxury-text-shadow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {t('hero.description')}
          </motion.p>
          
          {/* Luxury Decorative Elements Bottom */}
          <div className="relative mt-8">
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-0.5 luxury-bg-gold animate-luxuryGlow"></div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-2 h-2 luxury-bg-gold rounded-full animate-luxurySparkle"></div>
          </div>
        </motion.div>
      </div>


      {/* Compact Search Form - Bottom */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 z-20 text-white px-2 sm:px-3 w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
        >
          {/* Compact Form Container */}
          <div className="relative bg-white rounded-xl p-3 sm:p-4 shadow-2xl border border-gray-100">
            {/* Form Layout */}
            <div className="space-y-3">
              {/* Search Fields Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {/* Search Type */}
                <div className="relative">
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <Search className="w-3.5 h-3.5 text-[#dbbb90]" />
                  </div>
                  <Select value={searchForm.listingType} onValueChange={(value) => handleFieldChange('listingType', value)}>
                    <SelectTrigger className="w-full h-9 bg-white border border-gray-200 rounded-lg pl-8 text-xs font-medium text-gray-600 hover:border-[#dbbb90] focus:border-[#dbbb90]">
                      <SelectValue placeholder="Search For" />
                    </SelectTrigger>
                    <SelectContent className="bg-white text-gray-900">
                      <SelectItem value="buy">Buy</SelectItem>
                      <SelectItem value="rent">Rent</SelectItem>
                      <SelectItem value="projects">Projects</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                <div className="relative">
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <MapPin className="w-3.5 h-3.5 text-[#dbbb90]" />
                  </div>
                  <Select value={searchForm.location} onValueChange={(value) => handleFieldChange('location', value)}>
                    <SelectTrigger className="w-full h-9 bg-white border border-gray-200 rounded-lg pl-8 text-xs font-medium text-gray-600 hover:border-[#dbbb90] focus:border-[#dbbb90]">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent className="bg-white text-gray-900">
                      <SelectItem value="any">Any Location</SelectItem>
                      <SelectItem value="dubai-marina">Dubai Marina</SelectItem>
                      <SelectItem value="downtown-dubai">Downtown Dubai</SelectItem>
                      <SelectItem value="palm-jumeirah">Palm Jumeirah</SelectItem>
                      <SelectItem value="business-bay">Business Bay</SelectItem>
                      <SelectItem value="jlt">JLT</SelectItem>
                      <SelectItem value="deira">Deira</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Property Type */}
                <div className="relative">
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <Home className="w-3.5 h-3.5 text-[#dbbb90]" />
                  </div>
                  <Select value={searchForm.propertyType} onValueChange={(value) => handleFieldChange('propertyType', value)}>
                    <SelectTrigger className="w-full h-9 bg-white border border-gray-200 rounded-lg pl-8 text-xs font-medium text-gray-600 hover:border-[#dbbb90] focus:border-[#dbbb90]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white text-gray-900">
                      <SelectItem value="any">Any Type</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="penthouse">Penthouse</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="plot">Plot</SelectItem>
                      <SelectItem value="office">Office</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Bedrooms */}
                <div className="relative">
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <Bed className="w-3.5 h-3.5 text-[#dbbb90]" />
                  </div>
                  <Select value={searchForm.bedrooms} onValueChange={(value) => handleFieldChange('bedrooms', value)}>
                    <SelectTrigger className="w-full h-9 bg-white border border-gray-200 rounded-lg pl-8 text-xs font-medium text-gray-600 hover:border-[#dbbb90] focus:border-[#dbbb90]">
                      <SelectValue placeholder="Bedrooms" />
                    </SelectTrigger>
                    <SelectContent className="bg-white text-gray-900">
                      <SelectItem value="any">Any Bedrooms</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="1">1 Bedroom</SelectItem>
                      <SelectItem value="2">2 Bedrooms</SelectItem>
                      <SelectItem value="3">3 Bedrooms</SelectItem>
                      <SelectItem value="4">4 Bedrooms</SelectItem>
                      <SelectItem value="5">5 Bedrooms</SelectItem>
                      <SelectItem value="6+">6+ Bedrooms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex gap-2">
                {/* Search Button */}
                <Button 
                  onClick={handleSearch}
                  className="flex-1 h-9 bg-gradient-to-r from-[#dbbb90] to-[#C2A17B] hover:from-[#C2A17B] hover:to-[#dbbb90] text-white font-semibold rounded-lg text-xs flex items-center justify-center gap-1.5"
                >
                  <Search className="w-3.5 h-3.5" />
                  Search
                </Button>
                
                {/* Consultation Button */}
                <LeadFormButton 
                  variant="compact" 
                  source="Hero Section"
                  className="flex-1 h-9 bg-white text-[#dbbb90] border border-[#dbbb90] hover:bg-[#dbbb90] hover:text-white font-semibold rounded-lg text-xs transition-all duration-300 flex items-center justify-center gap-1.5"
                >
                  <div className="w-3.5 h-3.5 rounded-full bg-[#dbbb90] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                  Consultation
                </LeadFormButton>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
