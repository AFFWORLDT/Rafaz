"use client";

import { getPropertyById } from "@/src/api/offPlans";
import Image from "next/image";
import { useEffect, useState } from "react";
import moment from "moment";
import EnquireForm from "@/src/components/common/enquireForm";
import { Dialog, DialogContent, DialogTitle } from "@/src/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";
import LocationSection from "./Location";
import PaymentPlanSection from "./PaymentPlanSection";

export default function DetailPage({ id }: any) {
  const [property, setProperty] = useState<any>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  useEffect(() => {
    async function fetchProperty() {
      const data = await getPropertyById(id);
      setProperty(data?.projects?.[0]);
    }
    fetchProperty();
  }, [id]);

  useEffect(() => {
    if (!property?.photos || property.photos.length <= 1) return;

    const interval = setInterval(() => {
      setHeroImageIndex(
        (prevIndex) => (prevIndex + 1) % property.photos.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [property?.photos]);

  const nextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === property.photos.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? property.photos.length - 1 : prev - 1
    );
  };

  const goToImage = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  if (!property?.photos || property.photos.length === 0) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="bg-white min-h-screen">
      <section 
        className="relative h-screen md:h-screen w-full flex items-center justify-center text-center overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        <div className="absolute inset-0 w-full h-full">
          <div className="relative w-full h-full">
            {property?.photos?.map((photo: string, index: number) => (
              <Image
                key={index}
                src={photo}
                alt="Luxury Living in Dubai"
                layout="fill"
                objectFit="cover"
                quality={85}
                priority={index === 0}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === heroImageIndex
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0"
                }`}
                style={{
                  transform: index === heroImageIndex 
                    ? `scale(1.1) translate(${(mousePosition.x - 50) * 0.02}%, ${(mousePosition.y - 50) * 0.02}%)`
                    : 'scale(1)',
                  transformOrigin: 'center center'
                }}
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-black/20 z-20" />
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
            {property?.photos?.map((_: any, index: number) => (
              <button
                key={index}
                onClick={() => setHeroImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === heroImageIndex
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="relative z-30 text-white px-4 sm:px-6 md:px-8 mt-[50vh] md:mt-[60vh]">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-3 md:mb-4 leading-tight tracking-wide">
            {property?.name}
          </h1>
          <p className="text-sm sm:text-base md:text-lg font-light mb-8 md:mb-12 tracking-wider uppercase text-primary max-w-4xl mx-auto">
            {property?.location?.community}, {property?.location?.sub_community}
            , {property?.location?.city}
          </p>
        </div>
      </section>

      <section className="bg-white py-8 md:py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-base md:text-lg font-light uppercase text-primary mb-8 md:mb-12">
            <a
              className="hover:underline cursor-pointer bg-[#dbbb90] text-white px-6 py-3 rounded-lg md:bg-transparent md:text-primary md:px-0 md:py-0 transition-all duration-300"
              onClick={() => setIsOpen(true)}
            >
              Enquire Now
            </a>
            {property?.agent && (
              <>
                <span className="text-gray-300 hidden md:inline">|</span>
                <div className="flex items-center gap-3 md:gap-4 bg-gradient-to-r from-[#F8F6F0] to-[#F2EEE8] px-3 py-2 md:px-4 md:py-3 rounded-xl border border-[#E5E1D8] shadow-lg w-full md:w-auto max-w-sm">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-3 border-[#dbbb90] shadow-md">
                      {property.agent.avatar ? (
                        <Image
                          src={property.agent.avatar}
                          alt={property.agent.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#dbbb90] to-[#C2A17B] flex items-center justify-center">
                          <span className="text-lg font-bold text-white">
                            {property.agent.name?.charAt(0) || 'A'}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-xs md:text-sm font-semibold text-gray-800 uppercase tracking-wide truncate">
                      {property.agent.name}
                    </span>
                    <span className="text-xs text-[#dbbb90] font-medium uppercase tracking-wider">
                      Property Specialist
                    </span>
                  </div>
                  <div className="flex gap-1 md:gap-2 flex-shrink-0">
                    <a
                      href={`https://wa.me/${property.agent.phone?.replace(/[^0-9]/g, '')}?text=Hi ${property.agent.name}, I'm interested in ${property.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 md:w-10 md:h-10 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      <Icon icon="iconoir:whatsapp-solid" className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </a>
                    <a
                      href={`tel:${property.agent.phone}`}
                      className="w-8 h-8 md:w-10 md:h-10 bg-[#dbbb90] hover:bg-[#C2A17B] rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      <Icon icon="line-md:phone-call-filled" className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </a>
                    <a
                      href={`mailto:${property.agent.email}?subject=Inquiry about ${property.name}`}
                      className="w-8 h-8 md:w-10 md:h-10 bg-gray-700 hover:bg-gray-800 rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      <Icon icon="material-symbols:mail-outline" className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>

          <hr className="border-t border-gray-200 mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center mb-8 md:mb-12">
            <div className="bg-gray-50 p-4 md:p-6 rounded-xl">
              <h3 className="text-xs md:text-sm font-light uppercase text-primary mb-3 border-b border-primary inline-block pb-1">
                From
              </h3>
              <p className="text-sm md:text-base font-medium text-gray-800">
                {property?.newParam?.price
                  ? `AED ${property.newParam.price.toLocaleString()}`
                  : property?.price_from
                  ? `AED ${property.price_from.toLocaleString()}`
                  : property?.price
                  ? `AED ${property.price.toLocaleString()}`
                  : "Price on request"}
              </p>
            </div>
            <div className="bg-gray-50 p-4 md:p-6 rounded-xl">
              <h3 className="text-xs md:text-sm font-light uppercase text-primary mb-3 border-b border-primary inline-block pb-1">
                Completion Date
              </h3>
              <p className="text-sm md:text-base font-medium text-gray-800">
                {property?.newParam?.handoverTime
                  ? moment(property?.newParam?.handoverTime).format("MMMM YYYY")
                  : property?.completionDate
                  ? moment(property?.completionDate).format("MMMM YYYY")
                  : property?.handoverTime
                  ? moment(property?.handoverTime).format("MMMM YYYY")
                  : "TBA"}
              </p>
            </div>
            <div className="bg-gray-50 p-4 md:p-6 rounded-xl">
              <h3 className="text-xs md:text-sm font-light uppercase text-primary mb-3 border-b border-primary inline-block pb-1">
                Construction Stage
              </h3>
              <p className="text-sm md:text-base font-medium text-gray-800">
                {property?.constructionStage || property?.completionStatus || "Off-plan"}
              </p>
            </div>
          </div>

          <hr className="border-t border-gray-200 mb-12" />

          <div className="text-center px-2 md:px-0">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-gray-800 mb-6 md:mb-8">
              Description
            </h2>
            <div className="relative">
              <p className={`text-sm md:text-base font-light text-gray-600 leading-relaxed mb-6 transition-all duration-500 text-left md:text-center ${
                isDescriptionExpanded ? '' : 'line-clamp-4'
              }`}>
                {property?.description}
              </p>
              
              {/* Luxury Read More Button */}
              <div className="flex justify-center mt-6 md:mt-8">
                <motion.button
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="group relative overflow-hidden bg-gradient-to-r from-[#dbbb90] to-[#C2A17B] hover:from-[#C2A17B] hover:to-[#B8956A] text-white font-light tracking-widest uppercase px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl transition-all duration-300 shadow-lg md:shadow-xl hover:shadow-xl md:hover:shadow-2xl transform hover:-translate-y-1 border border-[#dbbb90]/20 w-full max-w-xs md:w-auto"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Luxury Background Effects */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  
                  {/* Button Content */}
                  <div className="relative flex items-center justify-center gap-2 md:gap-3">
                    <span className="font-serif text-sm md:text-base">
                      {isDescriptionExpanded ? 'Read Less' : 'Read More'}
                    </span>
                    <motion.div
                      animate={{ rotate: isDescriptionExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon 
                        icon={isDescriptionExpanded ? "lucide:chevron-up" : "lucide:chevron-down"} 
                        className="w-4 h-4 md:w-5 md:h-5" 
                      />
                    </motion.div>
                  </div>
                  
                  {/* Luxury Accent Line */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></div>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Carousel Section */}
      <section className="bg-white py-8 md:py-16 px-2 md:px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {property?.photos && property.photos.length > 0 && (
            <div className="mb-8 md:mb-16">
              {/* Main Carousel Container */}
              <div className="relative group">
                {/* Main Image Display */}
                <div className="relative h-[250px] sm:h-[350px] md:h-[500px] lg:h-[600px] mb-4 md:mb-6 overflow-hidden rounded-lg">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedImageIndex}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={property.photos[selectedImageIndex]}
                        alt={`${property.name} - Image ${
                          selectedImageIndex + 1
                        }`}
                        layout="fill"
                        objectFit="cover"
                        quality={90}
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Arrows */}
                  {property.photos.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-all duration-200 opacity-100 md:opacity-0 md:group-hover:opacity-100 z-10 backdrop-blur-sm"
                      >
                        <Icon icon="teenyicons:left-outline" fontSize={20} className="md:text-[30px]" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-all duration-200 opacity-100 md:opacity-0 md:group-hover:opacity-100 z-10 backdrop-blur-sm"
                      >
                        <Icon icon="teenyicons:right-outline" fontSize={20} className="md:text-[30px]" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnail Carousel */}
                <div className="relative">
                  <div className="flex gap-2 md:gap-4 overflow-x-auto scrollbar-hide pb-2 px-2 md:px-0">
                    <div className="flex gap-2 md:gap-4 min-w-max">
                      {property.photos.map((photo: string, index: number) => (
                        <button
                          key={index}
                          onClick={() => goToImage(index)}
                          className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 overflow-hidden rounded-lg transition-all duration-200 ${
                            selectedImageIndex === index
                              ? "ring-2 ring-primary opacity-100 scale-105"
                              : "opacity-70 hover:opacity-90 hover:scale-102"
                          }`}
                        >
                          <Image
                            src={photo || "/placeholder.svg"}
                            alt={`${property.name} thumbnail ${index + 1}`}
                            layout="fill"
                            objectFit="cover"
                            quality={75}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Scroll Indicators for Thumbnails */}
                  <div className="flex justify-center mt-4 space-x-1">
                    {Array.from({
                      length: Math.ceil(property.photos.length / 5),
                    }).map((_, pageIndex) => (
                      <div
                        key={pageIndex}
                        className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                          Math.floor(selectedImageIndex / 5) === pageIndex
                            ? "bg-primary"
                            : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {property?.newParam?.permitQRCode && (
          <div className="flex justify-center">
            <div className="bg-[#F2EEE8] border border-white rounded-lg p-4 flex items-center gap-4 shadow-sm max-w-sm">
              {/* QR Code with Palm Tree Emblem */}
              <div className="relative">
                <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center border-2 border-gray-200 overflow-hidden">
                  <Image
                    src={property?.newParam?.permitQRCode}
                    alt="QR Code"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Verification Text */}
              <div className="text-gray-700">
                <p className="text-sm">
                  This Listing has been verified by{" "}
                  <span className="font-bold">Dubai Land Department</span>
                </p>
              </div>
            </div>
          </div>
        )}


        {/* Ultra-Luxury Agents Section */}
        {property?.assigned_agents && property.assigned_agents.length > 0 && (
          <section className="relative py-12 md:py-24 px-4 md:px-6 lg:px-8 overflow-hidden">
            {/* Ultra-Luxury Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-[#F8F6F0]"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23dbbb90%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
            
            {/* Luxury Accent Lines */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#dbbb90]/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#dbbb90]/20 to-transparent"></div>
            
            <div className="relative z-10 max-w-7xl mx-auto">
              {/* Ultra-Luxury Section Header */}
              <div className="text-center mb-12 md:mb-20">
                <div className="relative inline-block">
                  {/* Decorative Elements - Hidden on mobile */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-[#dbbb90]/20 to-transparent rounded-full blur-sm hidden md:block"></div>
                  <div className="absolute -top-2 -right-6 w-6 h-6 bg-gradient-to-br from-[#C2A17B]/20 to-transparent rounded-full blur-sm hidden md:block"></div>
                  <div className="absolute -bottom-4 -right-4 w-10 h-10 bg-gradient-to-br from-[#dbbb90]/15 to-transparent rounded-full blur-sm hidden md:block"></div>
                  
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-gray-800 mb-6 md:mb-8 font-serif leading-tight px-4 md:px-0">
                    Meet Your
                    <span className="block text-[#dbbb90] font-normal mt-1 md:mt-2">Property Specialists</span>
                  </h2>
                </div>
                
                {/* Premium Separator */}
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#dbbb90]"></div>
                  <div className="w-2 h-2 bg-[#dbbb90] rounded-full"></div>
                  <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#dbbb90]"></div>
                </div>
                
                <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-serif px-4 md:px-0">
                  Our distinguished real estate professionals bring decades of expertise and personalized service to guide you through every step of your luxury property journey.
                </p>
              </div>

              {/* Ultra-Premium Agent Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-10 px-4 md:px-0">
                {property.assigned_agents.map((agent: any, index: number) => (
                  <motion.div
                    key={agent.id || index}
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
                    className="group relative"
                  >
                    {/* Ultra-Luxury Agent Card */}
                    <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-xl md:shadow-2xl hover:shadow-2xl md:hover:shadow-3xl transition-all duration-700 border border-white/30 hover:border-[#dbbb90]/40 overflow-hidden transform hover:-translate-y-1 md:hover:-translate-y-2">
                      
                      {/* Ultra-Luxury Background Effects */}
                      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#dbbb90]/15 to-transparent rounded-full blur-3xl"></div>
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#C2A17B]/15 to-transparent rounded-full blur-2xl"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-[#dbbb90]/5 to-[#C2A17B]/5 rounded-full blur-3xl"></div>
                      
                      {/* Premium Corner Accents */}
                      <div className="absolute top-4 right-4 w-2 h-2 bg-[#dbbb90]/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute bottom-4 left-4 w-2 h-2 bg-[#C2A17B]/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Agent Avatar Section */}
                      <div className="relative mb-6 md:mb-8 flex justify-center">
                        <div className="relative">
                          {/* Avatar Container */}
                          <div className="relative w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-2xl md:rounded-3xl overflow-hidden border-3 md:border-4 border-[#dbbb90]/30 shadow-xl md:shadow-2xl group-hover:shadow-2xl md:group-hover:shadow-3xl transition-all duration-500 group-hover:scale-105 group-hover:border-[#dbbb90]/50">
                            {agent.avatar ? (
                              <Image
                                src={agent.avatar}
                                alt={agent.name}
                                width={128}
                                height={128}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-[#dbbb90] to-[#C2A17B] flex items-center justify-center">
                                <span className="text-3xl font-bold text-white">
                                  {agent.name?.charAt(0) || 'A'}
                                </span>
                              </div>
                            )}
                          </div>
                          
                          {/* Premium Online Status */}
                          <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-2 md:border-4 border-white flex items-center justify-center shadow-lg md:shadow-xl">
                            <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full animate-pulse"></div>
                          </div>
                          
                          {/* Luxury Accent Ring */}
                          <div className="absolute inset-0 rounded-2xl md:rounded-3xl border-2 border-[#dbbb90]/20 group-hover:border-[#dbbb90]/40 transition-all duration-500"></div>
                        </div>
                      </div>

                      {/* Agent Information */}
                      <div className="text-center mb-6 md:mb-8">
                        <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 mb-2 md:mb-3 font-serif">
                          {agent.name}
                        </h3>
                        <div className="relative inline-block mb-3 md:mb-4">
                          <p className="text-[#dbbb90] font-medium text-xs md:text-sm uppercase tracking-widest">
                            Property Specialist
                          </p>
                          <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#dbbb90] to-transparent"></div>
                        </div>
                        
                        {/* Agent Contact Details */}
                        <div className="space-y-2 md:space-y-3 text-sm text-gray-600">
                          {agent.phone && (
                            <div className="flex items-center justify-center gap-2 md:gap-3 bg-white/50 rounded-lg md:rounded-xl px-3 py-2 border border-[#dbbb90]/20">
                              <Icon icon="lucide:phone" className="w-3 h-3 md:w-4 md:h-4 text-[#dbbb90] flex-shrink-0" />
                              <span className="font-medium text-xs md:text-sm">{agent.phone}</span>
                            </div>
                          )}
                          {agent.email && (
                            <div className="flex items-center justify-center gap-2 md:gap-3 bg-white/50 rounded-lg md:rounded-xl px-3 py-2 border border-[#dbbb90]/20">
                              <Icon icon="lucide:mail" className="w-3 h-3 md:w-4 md:h-4 text-[#dbbb90] flex-shrink-0" />
                              <span className="font-medium truncate text-xs md:text-sm">{agent.email}</span>
                            </div>
                          )}
                        </div>

                        {/* Languages Section */}
                        {agent.languages && agent.languages.length > 0 && (
                          <div className="mt-4 md:mt-6">
                            <p className="text-xs text-gray-500 uppercase tracking-widest mb-2 md:mb-3 font-medium">Languages</p>
                            <div className="flex flex-wrap justify-center gap-1 md:gap-2">
                              {agent.languages.slice(0, 3).map((lang: string, langIndex: number) => (
                                <span key={langIndex} className="px-2 py-1 md:px-3 md:py-1 bg-gradient-to-r from-[#dbbb90]/10 to-[#C2A17B]/10 text-[#dbbb90] text-xs rounded-full border border-[#dbbb90]/20 font-medium">
                                  {lang.split(':')[1] || lang}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Ultra-Premium Contact Actions */}
                      <div className="flex justify-center gap-2 md:gap-3 lg:gap-4">
                        {agent.phone && (
                          <a
                            href={`https://wa.me/${agent.phone.replace(/[^0-9]/g, '')}?text=Hi ${agent.name}, I'm interested in ${property.name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/btn relative w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg md:shadow-xl hover:shadow-xl md:hover:shadow-2xl transform hover:-translate-y-1 overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                            <Icon icon="iconoir:whatsapp-solid" className="w-5 h-5 md:w-7 md:h-7 text-white group-hover/btn:scale-110 transition-transform duration-200 relative z-10" />
                          </a>
                        )}
                        {agent.phone && (
                          <a
                            href={`tel:${agent.phone}`}
                            className="group/btn relative w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#dbbb90] to-[#C2A17B] hover:from-[#C2A17B] hover:to-[#B8956A] rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg md:shadow-xl hover:shadow-xl md:hover:shadow-2xl transform hover:-translate-y-1 overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                            <Icon icon="lucide:phone" className="w-5 h-5 md:w-7 md:h-7 text-white group-hover/btn:scale-110 transition-transform duration-200 relative z-10" />
                          </a>
                        )}
                        {agent.email && (
                          <a
                            href={`mailto:${agent.email}?subject=Inquiry about ${property.name}`}
                            className="group/btn relative w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg md:shadow-xl hover:shadow-xl md:hover:shadow-2xl transform hover:-translate-y-1 overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                            <Icon icon="lucide:mail" className="w-5 h-5 md:w-7 md:h-7 text-white group-hover/btn:scale-110 transition-transform duration-200 relative z-10" />
                          </a>
                        )}
                      </div>

                      {/* Ultra-Luxury Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#dbbb90]/5 via-transparent to-[#C2A17B]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"></div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Ultra-Premium Bottom CTA */}
              <div className="text-center mt-12 md:mt-20 px-4 md:px-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="relative inline-flex flex-col md:flex-row items-center gap-4 md:gap-6 bg-white/70 backdrop-blur-xl rounded-2xl md:rounded-3xl px-6 py-6 md:px-12 md:py-6 border border-[#dbbb90]/30 shadow-xl md:shadow-2xl overflow-hidden max-w-sm md:max-w-none"
                >
                  {/* Background Effects */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#dbbb90]/5 to-[#C2A17B]/5"></div>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#dbbb90]/10 to-transparent rounded-full blur-xl"></div>
                  
                  <div className="relative flex flex-col md:flex-row items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#dbbb90] to-[#C2A17B] rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                      <Icon icon="lucide:users" className="w-5 h-5 md:w-7 md:h-7 text-white" />
                    </div>
                    <div className="text-center md:text-left">
                      <p className="text-gray-800 font-serif text-base md:text-lg">
                        <span className="font-bold text-[#dbbb90]">{property.assigned_agents.length}</span> specialist{property.assigned_agents.length !== 1 ? 's' : ''} ready to assist you
                      </p>
                      <p className="text-gray-600 text-xs md:text-sm font-serif">Available 24/7 for your convenience</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        )}

        <div className="my-5">
          <LocationSection property={property} />
        </div>

        {/* Payment Plans Section */}
        <PaymentPlanSection property={property} />




        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <AnimatePresence>
            <DialogContent className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-[#F2EEE8] rounded-lg px-8 py-4">
              <motion.div
                key="dialog"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <DialogTitle className="mb-6 flex justify-between">
                  <div>
                    <h2 className="text-2xl  font-mono font-thin text-black text-center">
                      Take the First Step
                    </h2>
                    <p className="font-mono font-thin text-center text-[15px] text-neutral-400">
                      Get a free consultation, personalized investment strategy,
                      and exclusive access to Dubai best properties.
                    </p>
                  </div>
                  <Icon
                    icon={"material-symbols-light:cancel-outline"}
                    fontSize={25}
                    className="text-neutral-400 cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  />
                </DialogTitle>

                <EnquireForm type="offPlan" />
              </motion.div>
            </DialogContent>
          </AnimatePresence>
        </Dialog>
      </section>
    </div>
  );
}
