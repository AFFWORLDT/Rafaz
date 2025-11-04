"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { getAllProperties } from "@/src/api/offPlans";
import { useLanguage } from "@/src/contexts/LanguageContext";
import Link from "next/link";

interface ProjectLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  price?: string;
  bedrooms?: number;
  bathrooms?: number;
  community?: string;
  city?: string;
}

export default function GoogleMapsSection() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [projects, setProjects] = useState<ProjectLocation[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { t } = useLanguage();

  // Check if Google Maps is loaded
  useEffect(() => {
    const checkGoogleMaps = () => {
      if (window.google && window.google.maps) {
        setIsLoaded(true);
        return;
      }
      
      // Wait for Google Maps to load from global script
      const checkInterval = setInterval(() => {
        if (window.google && window.google.maps) {
          setIsLoaded(true);
          clearInterval(checkInterval);
        }
      }, 100);
      
      // Clear interval after 10 seconds
      setTimeout(() => {
        clearInterval(checkInterval);
        if (!window.google || !window.google.maps) {
          setHasError(true);
        }
      }, 10000);
    };

    checkGoogleMaps();
  }, []);

  // Initialize map when Google Maps is loaded
  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    const initMap = () => {
      try {
        const mapInstance = new google.maps.Map(mapRef.current!, {
          center: { lat: 25.2048, lng: 55.2708 }, // Dubai center
          zoom: 11,
          restriction: {
            latLngBounds: {
              north: 25.5,
              south: 24.8,
              east: 55.6,
              west: 54.8
            },
            strictBounds: true
          },
        styles: [
          {
            featureType: "all",
            elementType: "geometry",
            stylers: [{ color: "#f5f5f5" }]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#c9c9c9" }]
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#757575" }]
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#e5e5e5" }]
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#ffffff" }]
          },
          {
            featureType: "road.arterial",
            elementType: "labels.text.fill",
            stylers: [{ color: "#757575" }]
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#dadada" }]
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{ color: "#616161" }]
          },
          {
            featureType: "road.local",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9e9e9e" }]
          },
          {
            featureType: "transit.line",
            elementType: "geometry",
            stylers: [{ color: "#e5e5e5" }]
          },
          {
            featureType: "transit.station",
            elementType: "geometry",
            stylers: [{ color: "#eeeeee" }]
          },
          {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [{ color: "#f5f5f5" }]
          }
        ]
        });

        setMap(mapInstance);
        console.log('Map initialized successfully');
      } catch (error) {
        console.error('Error initializing map:', error);
        setHasError(true);
      }
    };

    initMap();
  }, [isLoaded]);

  // Fetch projects and add markers
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log("Fetching projects from API...");
        const query = "sort_by=total_count&sort_order=desc&page=1&size=24&type=off_plan";
        const data = await getAllProperties(query);
        console.log("Received projects data:", data);
        
        const projectsData = data?.projects || data || [];
        console.log("Projects array:", projectsData);
        
        const projectLocations: ProjectLocation[] = projectsData.map((project: any, index: number) => {
          // Extract location data from project.location object
          const location = project.location || {};
          const latitude = location.latitude || project.latitude || (25.2048 + (Math.random() - 0.5) * 0.1);
          const longitude = location.longitude || project.longitude || (55.2708 + (Math.random() - 0.5) * 0.1);
          
          return {
            id: project.id || index,
            name: project.name || location.sub_community || location.community || `Project ${index + 1}`,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            price: project.price,
            bedrooms: project.bedrooms,
            bathrooms: project.bathrooms,
            community: location.community,
            city: location.city
          };
        });

        console.log("Processed project locations:", projectLocations);
        setProjects(projectLocations);
      } catch (error) {
        console.error("Error fetching projects:", error);
        // Fallback mock data - Dubai area only
        const mockProjects: ProjectLocation[] = [
          { id: 1, name: "Marina Tower", latitude: 25.0772, longitude: 55.1308, price: "2,500,000", bedrooms: 2, bathrooms: 2, community: "Dubai Marina", city: "Dubai" },
          { id: 2, name: "Palm Jumeirah Villa", latitude: 25.1124, longitude: 55.1390, price: "8,500,000", bedrooms: 4, bathrooms: 5, community: "Palm Jumeirah", city: "Dubai" },
          { id: 3, name: "Downtown Residence", latitude: 25.1972, longitude: 55.2744, price: "4,200,000", bedrooms: 3, bathrooms: 3, community: "Downtown Dubai", city: "Dubai" },
          { id: 4, name: "Business Bay Office", latitude: 25.1881, longitude: 55.2650, price: "3,800,000", bedrooms: 2, bathrooms: 2, community: "Business Bay", city: "Dubai" },
          { id: 5, name: "JLT Apartment", latitude: 25.0657, longitude: 55.1713, price: "1,800,000", bedrooms: 1, bathrooms: 1, community: "JLT", city: "Dubai" },
          { id: 6, name: "DIFC Tower", latitude: 25.2138, longitude: 55.2719, price: "5,500,000", bedrooms: 3, bathrooms: 3, community: "DIFC", city: "Dubai" },
          { id: 7, name: "JBR Beachfront", latitude: 25.0784, longitude: 55.1308, price: "3,200,000", bedrooms: 2, bathrooms: 2, community: "JBR", city: "Dubai" }
        ];
        setProjects(mockProjects);
      }
    };

    fetchProjects();
  }, []);

  // Add markers to map
  useEffect(() => {
    if (!map || projects.length === 0) return;

    const markers: google.maps.Marker[] = [];

    projects.forEach((project) => {
      const marker = new google.maps.Marker({
        position: { lat: project.latitude, lng: project.longitude },
        map: map,
        title: project.name,
        icon: {
          url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
            <svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 0C8.954 0 0 8.954 0 20c0 15 20 30 20 30s20-15 20-30c0-11.046-8.954-20-20-20z" fill="#dbbb90"/>
              <circle cx="20" cy="20" r="8" fill="white"/>
              <text x="20" y="25" text-anchor="middle" font-family="Arial" font-size="12" fill="#dbbb90">★</text>
            </svg>
          `),
          scaledSize: new google.maps.Size(40, 50),
          anchor: new google.maps.Point(20, 50)
        }
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div class="p-4 max-w-xs">
            <h3 class="font-serif text-lg font-light text-gray-900 mb-2">${project.name}</h3>
            ${project.community ? `<p class="text-sm text-gray-700 mb-1">${project.community}${project.city ? `, ${project.city}` : ''}</p>` : ''}
            ${project.price ? `<p class="text-sm text-[#dbbb90] font-medium mb-1">AED ${project.price}</p>` : ''}
            ${project.bedrooms ? `<p class="text-xs text-gray-600">${project.bedrooms} Bed • ${project.bathrooms} Bath</p>` : ''}
          </div>
        `
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });

      markers.push(marker);
    });

    // Fit map to show all markers within Dubai bounds
    if (markers.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      markers.forEach(marker => bounds.extend(marker.getPosition()!));
      
      // Ensure bounds are within Dubai area
      const dubaiBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(24.8, 54.8), // Southwest corner
        new google.maps.LatLng(25.5, 55.6)  // Northeast corner
      );
      
      // If markers are within Dubai bounds, fit to markers, otherwise use Dubai bounds
      if (bounds.getNorthEast().lat() <= 25.5 && bounds.getSouthWest().lat() >= 24.8 &&
          bounds.getNorthEast().lng() <= 55.6 && bounds.getSouthWest().lng() >= 54.8) {
        map.fitBounds(bounds);
      } else {
        map.fitBounds(dubaiBounds);
      }
    }

    return () => {
      markers.forEach(marker => marker.setMap(null));
    };
  }, [map, projects]);

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      {/* Luxury Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23dbbb90' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm20 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4 font-serif">
              {t('map.title')}
              <span className="text-[#dbbb90] block">{t('map.subtitle')}</span>
            </h2>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#dbbb90] to-transparent mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg font-light max-w-2xl mx-auto leading-relaxed font-serif">
              {t('map.description')}
            </p>
          </motion.div>
        </div>

        {/* Map Container */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200/50"
          >
            {/* Map */}
            <div 
              ref={mapRef} 
              className="w-full h-[500px] md:h-[600px] lg:h-[700px]"
            />
            
            {/* Map Overlay Info - clickable */}
            <Link href="/off-plan-projects-in-dubai" className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200/50 cursor-pointer hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-[#dbbb90] rounded-full"></div>
                <span className="text-sm font-medium text-gray-700 font-serif">
                  {projects.length} {t('map.properties')}
                </span>
              </div>
            </Link>

            {/* Loading State */}
            {!isLoaded && !hasError && (
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-[#dbbb90]/30 border-t-[#dbbb90] rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600 font-light font-serif">{t('map.loading')}</p>
                </div>
              </div>
            )}

            {/* Error State - Show Static Map Fallback */}
            {hasError && (
              <div className="absolute inset-0 bg-gray-100">
                {/* Static Map Fallback */}
                <div className="w-full h-full bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center relative overflow-hidden">
                  {/* Dubai Skyline Background */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="w-full h-full bg-gradient-to-t from-gray-300 via-gray-200 to-gray-100"></div>
                  </div>
                  
                  {/* Property Markers */}
                  <div className="relative z-10 grid grid-cols-3 gap-4 p-8">
                    {projects.slice(0, 6).map((project, index) => (
                      <div key={project.id} className="bg-white rounded-lg p-4 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                        <div className="w-3 h-3 bg-[#dbbb90] rounded-full mx-auto mb-2"></div>
                        <h4 className="text-sm font-medium text-gray-900 text-center mb-1 font-serif">{project.name}</h4>
                        <p className="text-xs text-gray-600 text-center">{project.community}</p>
                        {project.price && (
                          <p className="text-xs text-[#dbbb90] font-medium text-center mt-1">AED {project.price}</p>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* Overlay Message */}
                  <Link href="/off-plan-projects-in-dubai" className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200/50 cursor-pointer hover:shadow-xl transition-shadow">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-[#dbbb90] rounded-full"></div>
                      <span className="text-sm font-medium text-gray-700 font-serif">
                        {projects.length} {t('map.properties')}
                      </span>
                    </div>
                  </Link>
                  
                  {/* Retry Button */}
                  <div className="absolute top-6 right-6">
                    <button 
                      onClick={() => {
                        setHasError(false);
                        setIsLoaded(false);
                        window.location.reload();
                      }}
                      className="bg-[#dbbb90] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#dbbb90]/90 transition-colors text-sm"
                    >
                      {t('map.loadInteractive')}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 md:mt-16"
        >
          {[
            { label: t('map.stats.properties'), value: projects.length.toString() },
            { label: t('map.stats.communities'), value: "12+" },
            { label: t('map.stats.yearsExperience'), value: "15+" },
            { label: t('map.stats.happyClients'), value: "500+" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-light text-[#dbbb90] mb-2 font-serif">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 font-light font-serif">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
