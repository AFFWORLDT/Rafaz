"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Settings,
  Home,
  DollarSign,
  Scale,
  Bed,
  Wrench,
  Users,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { cn } from "@/src/lib/utils";
import { Icon } from "@iconify/react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/src/components/ui/hover-card";
import SimpleLanguageSwitcher from "./SimpleLanguageSwitcher";
import { useLanguage } from "@/src/contexts/LanguageContext";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOverlayOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOverlayOpen]);

  const navLinks = [
    { href: "/buy", label: t('navigation.buy') },
    { href: "/rent", label: t('navigation.rent') },
    { href: "/offPlans", label: t('navigation.projects') },
    { href: "/team", label: t('navigation.teams') },
    { href: "/communities", label: t('navigation.areas') },
    { href: "/service", label: t('navigation.services') },
    { href: "/blog", label: t('navigation.blogs') },
    { href: "/contactUs", label: t('navigation.more') },
  ];
  const services = [
    {
      icon: <Settings className="h-4 w-4 text-gray-500" />,
      name: t('services.propertyManagement')
    },
    {
      icon: <Home className="h-4 w-4 text-gray-500" />,
      name: t('services.listYourProperty')
    },
    {
      icon: <DollarSign className="h-4 w-4 text-gray-500" />,
      name: t('services.mortgages')
    },
    {
      icon: <Scale className="h-4 w-4 text-gray-500" />,
      name: t('services.conveyancing')
    },
    {
      icon: <Bed className="h-4 w-4 text-gray-500" />,
      name: t('services.shortTermRentals')
    },
    {
      icon: <Wrench className="h-4 w-4 text-gray-500" />,
      name: t('services.propertySnagging')
    },
    {
      icon: <Users className="h-4 w-4 text-gray-500" />,
      name: t('services.partnerProgram')
    },
    
  ];

  const headerLink = [
    { href: "/buy", label: t('navigation.buy') },
    { href: "/rent", label: t('navigation.rent') },
    { href: "/offPlans", label: t('navigation.projects') },
    { href: "/team", label: t('navigation.teams') },
    { href: "/communities", label: t('navigation.areas') },
    { href: "/service", label: t('navigation.services'), hasDropdown: true },
    { href: "/blog", label: t('navigation.blogs') },
    { href: "/contactUs", label: t('navigation.more') },
  ];
  useEffect(() => {
    if (!isOverlayOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      // Don't close if clicking inside the mobile overlay
      if (target.closest('[data-mobile-overlay]')) {
        return;
      }
      setIsOverlayOpen(false);
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOverlayOpen]);
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      
      <nav
        className={cn(
          "w-full flex items-center relative z-10 px-4 md:px-6",
          isScrolled ? "h-20" : "h-24"
        )}
      >
        {/* Clean Logo - True Left Position */}
        <div className="flex items-center">
          <Link href={"/"} className="transition-all duration-300 hover:scale-105">
            <Image
              src="/images/logo.png"
              alt="Rafaz Real Estate Logo"
              width={220}
              height={80}
              className="object-contain w-52 h-16 sm:w-56 sm:h-18 md:w-60 md:h-20 lg:w-64 lg:h-22 xl:w-72 xl:h-24"
            />
          </Link>
        </div>

        {/* Desktop Nav - Right Position */}
        <div className="hidden lg:flex items-center space-x-8 ml-auto mr-4">
          {headerLink.map((link, i) => {
            if (link.hasDropdown) {
              return (
                <HoverCard key={i} openDelay={200} closeDelay={100}>
                  <HoverCardTrigger asChild>
                    <Link
                      href={link.href}
                      className={cn(
                        "relative pb-2 transition-all duration-300 font-serif text-[16px] font-medium tracking-[0.15em]",
                        isScrolled && pathname === "/" ? "text-gray-900 hover:text-gray-600" : "text-gray-800 hover:text-gray-600",
                        "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0",
                        "after:bg-gray-600 after:transition-all after:duration-300 hover:after:w-full",
                        pathname === link.href && "after:w-full text-gray-900"
                      )}
                    >
                      <span className="relative z-10">{link.label}</span>
                    </Link>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-[500px] p-0" sideOffset={10}>
                    <div className="luxury-glass-gold rounded-2xl shadow-2xl border-2 border-[#D4AF37]/20 overflow-hidden">
                      {/* Ultra-Luxury Header */}
                      <div className="p-6 border-b border-[#D4AF37]/20 luxury-bg">
                        <h3 className="luxury-text-static text-lg font-semibold tracking-[0.1em]">Our Luxury Services</h3>
                        <div className="w-12 h-0.5 luxury-bg-gold mt-2 animate-luxuryShimmer"></div>
                      </div>
                      
                      {/* Services Grid */}
                      <div className="p-4">
                        <div className="grid grid-cols-2 gap-3">
                          {/* Left Column */}
                          <div className="space-y-2">
                            {services.slice(0, 5).map((service, index) => (
                              <Link
                                key={index}
                                href={
                                  service.name === "List Your Property" ? "/list-your-property" :
                                  service.name === "Property Management" ? "/property-management" :
                                  service.name === "Mortgages" ? "/mortgages" :
                                  service.name === "Conveyancing" ? "/conveyancing" :
                                  service.name === "Short Term Rentals" ? "/short-term-rental" :
                                  "/service"
                                }
                                className="flex items-center space-x-3 p-3 rounded-xl hover:luxury-bg-gold/10 transition-all duration-300 cursor-pointer group luxury-hover border border-transparent hover:border-[#D4AF37]/20"
                              >
                                <div className="flex-shrink-0 transition-colors duration-200 group-hover:text-blue-600">
                                  {service.icon}
                                </div>
                                <span className="text-blue-900 font-medium text-sm group-hover:text-blue-700 transition-colors duration-200">
                                  {service.name}
                                </span>
                              </Link>
                            ))}
                          </div>

                          {/* Right Column */}
                          <div className="space-y-2">
                            {services.slice(5, 10).map((service, index) => (
                              <Link
                                key={index + 5}
                                href={
                                  service.name === "List Your Property" ? "/list-your-property" :
                                  service.name === "Property Management" ? "/property-management" :
                                  service.name === "Mortgages" ? "/mortgages" :
                                  service.name === "Conveyancing" ? "/conveyancing" :
                                  service.name === "Short-Term Rental" ? "/short-term-rental" :
                                  "/service"
                                }
                                className="flex items-center space-x-3 p-3 rounded-xl hover:luxury-bg-gold/10 transition-all duration-300 cursor-pointer group luxury-hover border border-transparent hover:border-[#D4AF37]/20"
                              >
                                <div className="flex-shrink-0 transition-colors duration-200 group-hover:text-blue-600">
                                  {service.icon}
                                </div>
                                <span className="text-blue-900 font-medium text-sm group-hover:text-blue-700 transition-colors duration-200">
                                  {service.name}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              );
            }
            
            return (
            <Link
              key={i}
              href={link.href}
              className={cn(
                  "relative pb-2 transition-all duration-300 font-serif text-[16px] font-medium tracking-[0.15em]",
                  isScrolled && pathname === "/" ? "text-gray-900 hover:text-gray-600" : "text-gray-800 hover:text-gray-600",
                "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0",
                "after:bg-gray-600 after:transition-all after:duration-300 hover:after:w-full",
                pathname === link.href && "after:w-full text-gray-900"
              )}
            >
              <span className="relative z-10">{link.label}</span>
            </Link>
            );
          })}
          {/* Language Switcher - Right Corner */}
          <SimpleLanguageSwitcher variant="compact" />
        </div>

        {/* Right Side - Mobile Menu Only */}
        <div className="flex items-center space-x-3 ml-auto lg:hidden">
          {/* Language Switcher for Mobile */}
          <SimpleLanguageSwitcher variant="minimal" />
          {/* Clean Mobile Menu Button */}
          <div
            className="cursor-pointer transition-all duration-300 p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            onClick={() => setIsOverlayOpen(true)}
          >
            <Menu className="h-7 w-7" />
          </div>
        </div>
      </nav>

      {/* Luxury Mobile Overlay */}
      <div
        data-mobile-overlay
        className={`fixed top-0 bottom-0 right-0 w-full md:w-1/3 text-black z-[100] transform transition-transform duration-500 ease-in-out shadow-2xl border-l-2 border-[#D4AF37]/30 ${
          isOverlayOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ backgroundColor: '#ffffff' }}
      >
        {/* Luxury Background Effects */}
        <div className="absolute inset-0 luxury-bg-pattern opacity-3"></div>
        <div className="absolute top-0 left-0 w-full h-1 luxury-bg-gold animate-luxuryShimmer"></div>
        
        <div className="flex items-center justify-between p-6 border-b-2 border-[#D4AF37]/20 relative z-10" style={{ backgroundColor: '#ffffff' }}>
          <div className="flex items-center">
            <div className="relative">
              <Image
                src="/images/logo.png"
                alt="Rafaz Real Estate Logo"
                width={160}
                height={50}
                className="object-contain w-40 h-12"
              />
              <div className="absolute -top-1 -right-1 w-2 h-2 luxury-bg-gold rounded-full animate-luxurySparkle"></div>
            </div>
          </div>
          <button
            onClick={() => setIsOverlayOpen(false)}
            className="text-[#D4AF37] hover:text-[#B8941F] p-2 rounded-xl transition-all duration-300 border border-[#D4AF37]/30 hover:border-[#D4AF37]/50 bg-white hover:bg-[#D4AF37]/5 group"
          >
            <div className="relative">
              <X className="h-6 w-6 transition-all duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 luxury-bg-gold rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-lg"></div>
            </div>
          </button>
        </div>

        <nav className="flex flex-col p-6 space-y-3 relative z-10" style={{ backgroundColor: '#ffffff' }}>
          {navLinks.map((link, i) => {
            if (link.href === "/service") {
              return (
                <div key={i} className="space-y-2">
                  <button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className={cn(
                      "flex items-center justify-between w-full text-left text-black hover:text-[#D4AF37] transition-all duration-300 py-4 px-5 rounded-2xl border border-transparent hover:border-[#D4AF37]/20 bg-white hover:bg-[#D4AF37]/5 font-serif tracking-wider",
                      pathname === link.href && "text-[#D4AF37] font-medium bg-[#D4AF37]/10 border-[#D4AF37]/30"
                    )}
                  >
                    <span className="text-lg font-medium">{link.label}</span>
                    <ChevronDown className={cn(
                      "h-5 w-5 transition-transform duration-300 text-[#D4AF37]",
                      isServicesOpen && "rotate-180"
                    )} />
                  </button>
                  
                  {/* Services Dropdown */}
                  <div className={cn(
                    "overflow-hidden transition-all duration-300",
                    isServicesOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  )}>
                    <div className="pl-4 space-y-2 border-l-2 border-[#D4AF37]/30 bg-[#D4AF37]/5 rounded-r-2xl p-3">
                      {services.map((service, serviceIndex) => (
                        <Link
                          key={serviceIndex}
                          href={
                            service.name === "List Your Property" ? "/list-your-property" :
                            service.name === "Property Management" ? "/property-management" :
                            service.name === "Mortgages" ? "/mortgages" :
                            service.name === "Conveyancing" ? "/conveyancing" :
                            service.name === "Short Term Rentals" ? "/short-term-rental" :
                            "/service"
                          }
                          onClick={() => setIsOverlayOpen(false)}
                          className="flex items-center space-x-3 py-3 px-4 rounded-xl hover:bg-[#D4AF37]/10 transition-all duration-200 border border-transparent hover:border-[#D4AF37]/20"
                        >
                          <div className="flex-shrink-0 text-[#D4AF37] transition-colors duration-200">
                            {service.icon}
                          </div>
                          <span className="text-black text-sm hover:text-[#D4AF37] transition-colors duration-200 font-medium">
                            {service.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            
            return (
            <Link
              key={i}
              href={link.href}
              className={cn(
                  "text-black hover:text-[#D4AF37] transition-all duration-300 py-4 px-5 rounded-2xl border border-transparent hover:border-[#D4AF37]/20 bg-white hover:bg-[#D4AF37]/5 font-serif tracking-wider text-lg font-medium",
                  pathname === link.href && "text-[#D4AF37] font-medium bg-[#D4AF37]/10 border-[#D4AF37]/30"
              )}
              onClick={() => setIsOverlayOpen(false)}
            >
              {link.label}
            </Link>
            );
          })}
        </nav>

        {/* Luxury Footer Section */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t-2 border-[#D4AF37]/20 relative z-10" style={{ backgroundColor: '#ffffff' }}>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#D4AF37] to-[#C2A17B] rounded-full flex items-center justify-center">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
              <span className="luxury-text-static font-serif text-sm font-semibold tracking-wider">
                Rafaz
              </span>
            </div>
            <p className="text-[#D4AF37] font-medium text-xs tracking-wider font-serif mb-4">
              Dubai's NO 1 Luxury Real Estate
            </p>
            <button
              onClick={() => setIsOverlayOpen(false)}
              className="text-[#D4AF37] hover:text-[#B8941F] px-6 py-3 rounded-xl transition-all duration-300 border border-[#D4AF37]/30 hover:border-[#D4AF37]/50 bg-white hover:bg-[#D4AF37]/5 font-serif tracking-wider text-sm font-medium group"
            >
              <div className="relative">
                <span className="relative z-10">Close Menu</span>
                <div className="absolute inset-0 luxury-bg-gold rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </div>
            </button>
          </div>
        </div>

      </div>
    </header>
  );
}
