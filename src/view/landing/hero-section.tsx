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
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Home, Bed, Search } from "lucide-react";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { useRouter } from "next/navigation";
import { BackgroundImageSlider } from "@/src/components/ui/background-image-slider";

export default function HeroSection() {
  const { t } = useLanguage();
  const router = useRouter();
  
  // Search form state
  const [searchForm, setSearchForm] = useState({
    listingType: "",
    location: "",
    propertyType: "",
    bedrooms: ""
  });

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
      className="relative h-screen md:h-[115vh] w-full flex items-center justify-center text-center luxury-bg overflow-hidden"
    >
      {/* Ultra-Luxury Background Effects */}
      <div className="absolute inset-0 luxury-bg-pattern opacity-20"></div>
      
      {/* Luxury Animated Background Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 luxury-bg-radial rounded-full animate-luxuryFloat opacity-30 blur-xl"></div>
      <div className="absolute top-20 right-20 w-24 h-24 luxury-bg-gold rounded-full animate-luxuryBreathe opacity-20 blur-lg"></div>
      <div className="absolute bottom-20 left-20 w-28 h-28 luxury-bg-bronze rounded-full animate-luxuryPulse opacity-25 blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-36 h-36 luxury-bg-radial rounded-full animate-luxuryFloat opacity-20 blur-2xl"></div>

      {/* Property Images Background */}
      <BackgroundImageSlider className="z-0" />

      {/* Ultra-Luxury Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 z-15" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D4AF37]/5 to-transparent z-16" />
      
      {/* Luxury Cinematic Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/50 z-17" />

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
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-light mb-6 sm:mb-8 text-white font-serif tracking-wider leading-tight">
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

      {/* Ultra-Luxury Search Form - Bottom */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-white px-4 sm:px-6 lg:px-8 container w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
          className="luxury-hover"
        >
        <div className="w-full">
          {/* Compact Luxury Form Container */}
          <div className="relative luxury-glass-gold rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-[#D4AF37]/30 shadow-xl overflow-hidden">
            {/* Minimalist Background Pattern */}
            <div className="absolute inset-0 luxury-bg-pattern opacity-5"></div>
            <div className="absolute top-0 right-0 w-16 h-16 luxury-bg-radial rounded-full blur-2xl opacity-15 animate-luxuryBreathe"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 luxury-bg-gold rounded-full blur-xl opacity-10 animate-luxuryPulse"></div>
            
            {/* Compact Form Grid */}
            <div className="relative z-10 grid grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3">
            {/* Listing Type */}
            <div className="lg:col-span-1 relative">
              <div className="absolute top-2 left-2.5 z-10">
                <Search className="w-3.5 h-3.5 text-[#D4AF37]" />
              </div>
              <Select value={searchForm.listingType} onValueChange={(value) => handleFieldChange('listingType', value)}>
                <SelectTrigger className="w-full h-7 sm:h-8 text-white max-sm:text-black focus:ring-offset-0 focus:ring-transparent bg-white/10 max-sm:bg-white border border-white/30 max-sm:border-gray-300 rounded-lg pl-9 hover:border-[#dbbb90]/50 transition-colors text-sm">
                  <SelectValue placeholder="Search For" className="max-sm:hidden" />
                </SelectTrigger>
                <SelectContent className="bg-white text-gray-900">
                  <SelectItem value="buy">Buy</SelectItem>
                  <SelectItem value="rent">Rent</SelectItem>
                  <SelectItem value="projects">Projects</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="lg:col-span-1 relative">
              <div className="absolute top-2 left-2.5 z-10">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              </div>
              <Select value={searchForm.location} onValueChange={(value) => handleFieldChange('location', value)}>
                <SelectTrigger className="w-full h-7 sm:h-8 text-white max-sm:text-black focus:ring-offset-0 focus:ring-transparent bg-white/10 max-sm:bg-white border border-white/30 max-sm:border-gray-300 rounded-lg pl-9 hover:border-[#dbbb90]/50 transition-colors text-sm">
                  <SelectValue placeholder={t('search.location')} className="max-sm:hidden" />
                </SelectTrigger>
                <SelectContent className="bg-white text-gray-900">
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="dubai-marina">Dubai Marina</SelectItem>
                  <SelectItem value="downtown-dubai">Downtown Dubai</SelectItem>
                  <SelectItem value="palm-jumeirah">Palm Jumeirah</SelectItem>
                  <SelectItem value="business-bay">Business Bay</SelectItem>
                  <SelectItem value="jlt">JLT</SelectItem>
                  <SelectItem value="deira">Deira</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Type */}
            <div className="lg:col-span-1 relative">
              <div className="absolute top-2 left-2.5 z-10">
                <Home className="w-3.5 h-3.5 text-[#D4AF37]" />
              </div>
              <Select value={searchForm.propertyType} onValueChange={(value) => handleFieldChange('propertyType', value)}>
                <SelectTrigger className="w-full h-7 sm:h-8 text-white max-sm:text-black bg-white/10 max-sm:bg-white border border-white/30 max-sm:border-gray-300 rounded-lg focus:ring-offset-0 focus:ring-transparent pl-9 text-sm">
                  <SelectValue placeholder={t('search.type')} className="max-sm:hidden" />
                </SelectTrigger>
                <SelectContent className="bg-white text-gray-900">
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="penthouse">Penthouse</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                  <SelectItem value="studio">Studio</SelectItem>
                  <SelectItem value="Plot">Plot</SelectItem>
                  <SelectItem value="Office">Office</SelectItem>
                </SelectContent>
              </Select>
            </div>


            {/* Bedrooms */}
            <div className="lg:col-span-1 relative">
              <div className="absolute top-2 left-2.5 z-10">
                <Bed className="w-3.5 h-3.5 text-[#D4AF37]" />
              </div>
              <Select value={searchForm.bedrooms} onValueChange={(value) => handleFieldChange('bedrooms', value)}>
                <SelectTrigger className="w-full h-7 sm:h-8 text-white max-sm:text-black bg-white/10 max-sm:bg-white border max-sm:border-gray-300 border-white/30 rounded-lg focus:ring-offset-0 focus:ring-transparent pl-9 text-sm">
                  <SelectValue placeholder={t('search.bedrooms')} className="max-sm:hidden" />
                </SelectTrigger>
                <SelectContent className="bg-white text-gray-900">
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="studio">Studio</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="6+">6+</SelectItem>
                </SelectContent>
              </Select>
            </div>


            {/* Compact Search Button */}
            <div className="lg:col-span-1 col-span-1 flex justify-center">
              <Button 
                onClick={handleSearch}
                className="w-12 h-7 sm:w-14 sm:h-8 luxury-button font-semibold tracking-[0.1em] animate-luxuryGlow shadow-xl hover:shadow-[#D4AF37]/25 hover:shadow-2xl transform hover:scale-102 transition-all duration-300 flex items-center justify-center rounded-lg cursor-pointer"
              >
                <Search className="w-1.5 h-1.5 text-white cursor-pointer" />
              </Button>
            </div>
            </div>
          </div>
        </div>
        </motion.div>
      </div>

    </section>
  );
}
