"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getAllAgents, Agent } from "@/src/api/agents";
import { useLanguage } from "@/src/contexts/LanguageContext";

export default function TeamPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const { t } = useLanguage();

  // Utility function to parse nationality
  const parseNationality = (nationality: string) => {
    try {
      if (typeof nationality === 'string' && nationality.startsWith('{')) {
        const parsed = JSON.parse(nationality);
        return parsed.label || nationality;
      }
      return nationality;
    } catch (error) {
      return nationality;
    }
  };

  useEffect(() => {
    async function fetchAgents() {
      try {
        setError(null);
        const response = await getAllAgents();
        setAgents(response || []);
      } catch (error) {
        console.error('Error fetching agents:', error);
        // Don't set error state if we have mock data fallback
        setAgents([]);
      } finally {
        setLoading(false);
      }
    }
    fetchAgents();
  }, []);


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8F6F0] via-white to-[#F2EEE8] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#dbbb90] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-light">{t('team.loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8F6F0] via-white to-[#F2EEE8] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon icon="lucide:alert-circle" className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Team</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-left">
            <h3 className="font-semibold text-yellow-800 mb-2">To fix this issue:</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Create a <code className="bg-yellow-100 px-1 rounded">.env.local</code> file</li>
              <li>• Add <code className="bg-yellow-100 px-1 rounded">NEXT_PUBLIC_API_BASE_URL</code></li>
              <li>• Add <code className="bg-yellow-100 px-1 rounded">NEXT_PUBLIC_API_BEARER_TOKEN</code></li>
              <li>• Restart your development server</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen luxury-bg">
      {/* Hero Section - Ultra Compact */}
      <section className="relative pt-8 md:pt-10 pb-6 md:pb-8 px-4 md:px-6 lg:px-8">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F8F6F0] via-white to-[#F2EEE8]"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-6 md:mb-8"
          >
            {/* Main Title - Ultra Compact */}
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-xl sm:text-2xl md:text-3xl font-light text-gray-800 mb-2 md:mb-3 leading-tight tracking-tight font-serif"
            >
              {t('team.title')} <span className="text-[#dbbb90] font-normal relative inline-block">
                {t('team.titleHighlight')}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#dbbb90] to-[#C2A17B] rounded-full"
                />
              </span> {t('team.titleSuffix')}
            </motion.h1>
            
            {/* Subtitle - Ultra Compact */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm md:text-base text-gray-600 font-light max-w-2xl mx-auto leading-relaxed"
            >
              {t('team.subtitle')} {t('team.location')}
            </motion.p>
            
            {/* Decorative Line - Ultra Compact */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#dbbb90] to-transparent mx-auto mt-3 md:mt-4"
            />
          </motion.div>
        </div>
      </section>

      {/* Team Grid - Ultra Compact */}
      <section className="py-4 md:py-6 lg:py-8 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header - Ultra Compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-6 md:mb-8"
          >
            <h2 className="text-lg md:text-xl lg:text-2xl font-light text-gray-700 mb-2">
              {t('team.meetExperts')} <span className="text-[#dbbb90] font-normal">{t('team.meetExpertsHighlight')}</span>
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-xl mx-auto">
              {t('team.expertsDescription')}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
          >
            <AnimatePresence>
              {agents.map((agent) => (
                <motion.div
                  key={agent.id}
                  variants={cardVariants}
                  layout
                  className="group cursor-pointer"
                  onClick={() => setSelectedAgent(agent)}
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-white/60 hover:border-[#dbbb90]/30 group h-full flex flex-col">
                    {/* Agent Avatar - Compact */}
                    <div className="relative mb-3 md:mb-4">
                      <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto rounded-full overflow-hidden border-2 md:border-3 border-[#dbbb90] shadow-md group-hover:shadow-lg group-hover:border-[#C2A17B] transition-all duration-300 relative">
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#dbbb90]/20 to-[#C2A17B]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                        {agent.avatar ? (
                          <Image
                            src={agent.avatar}
                            alt={agent.name}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 relative z-0"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#dbbb90] to-[#C2A17B] flex items-center justify-center relative z-0">
                            <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                              {agent.name?.charAt(0) || 'A'}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"></div>
                      </div>
                    </div>

                    {/* Agent Info - Compact */}
                    <div className="text-center mb-3 md:mb-4 flex-1">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 leading-tight">
                        {agent.name}
                      </h3>
                      <p className="text-[#dbbb90] font-medium text-xs sm:text-sm uppercase tracking-wider mb-1">
                        {agent.designation || 'Real Estate Agent'}
                      </p>
                      {agent.team_name && agent.team_name !== 'No team assigned' && (
                        <p className="text-[#dbbb90] font-medium text-xs uppercase tracking-wider mb-1">
                          {agent.team_name}
                        </p>
                      )}
                      {agent.experience_years && (
                        <p className="text-gray-600 text-xs">
                          {agent.experience_years} Years Experience
                        </p>
                      )}
                    </div>

                    {/* Stats - Compact */}
                    <div className="grid grid-cols-2 gap-2 mb-3 md:mb-4">
                      <div className="text-center">
                        <div className="text-sm sm:text-base md:text-lg font-bold text-[#dbbb90]">
                          {agent.experience_years || 1}+
                        </div>
                        <div className="text-xs text-gray-600 uppercase tracking-wider">
                          {t('team.yearsExp')}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm sm:text-base md:text-lg font-bold text-[#dbbb90]">
                          {agent.specialities?.length || 1}
                        </div>
                        <div className="text-xs text-gray-600 uppercase tracking-wider">
                          {t('team.specialties')}
                        </div>
                      </div>
                    </div>

                    {/* Contact Buttons - Compact */}
                    <div className="flex justify-center gap-2 md:gap-3 mt-auto">
                      <a
                        href={`https://wa.me/${agent.phone?.replace(/[^0-9]/g, '')}?text=Hi ${agent.name}, I'm interested in luxury properties in Dubai`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 hover:scale-105"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Icon icon="iconoir:whatsapp-solid" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                      </a>
                      <a
                        href={`tel:${agent.phone}`}
                        className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-[#dbbb90] to-[#C2A17B] hover:from-[#C2A17B] hover:to-[#B8956A] rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 hover:scale-105"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Icon icon="line-md:phone-call-filled" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                      </a>
                      <a
                        href={`mailto:${agent.email}?subject=Luxury Property Inquiry`}
                        className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 hover:scale-105"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Icon icon="material-symbols:mail-outline" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section - Compact */}
      <section className="py-8 md:py-12 lg:py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-[#F8F6F0] to-[#F2EEE8]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-800 mb-4">
              {t('team.ctaTitle')} <span className="text-[#dbbb90] font-normal">{t('team.ctaTitleHighlight')}</span>{t('team.ctaTitleSuffix')}
            </h2>
            <p className="text-sm md:text-base text-gray-600 mb-6 max-w-xl mx-auto">
              {t('team.ctaDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/contactUs"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#dbbb90] hover:bg-[#C2A17B] text-white font-medium rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 text-sm"
              >
                {t('team.getInTouch')}
              </a>
              <a
                href="/buy"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-[#dbbb90] text-[#dbbb90] hover:bg-[#dbbb90] hover:text-white font-medium rounded-full transition-all duration-300 text-sm"
              >
                {t('team.browseProperties')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Agent Detail Modal */}
      <AnimatePresence>
        {selectedAgent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedAgent(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4 md:mb-6">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-3 md:border-4 border-[#dbbb90]">
                    {selectedAgent.avatar ? (
                      <Image
                        src={selectedAgent.avatar}
                        alt={selectedAgent.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#dbbb90] to-[#C2A17B] flex items-center justify-center">
                        <span className="text-xl md:text-2xl font-bold text-white">
                          {selectedAgent.name?.charAt(0) || 'A'}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-lg md:text-2xl font-semibold text-gray-800 leading-tight">
                      {selectedAgent.name}
                    </h2>
                    {selectedAgent.team_name && selectedAgent.team_name !== 'No team assigned' && (
                      <p className="text-[#dbbb90] font-medium text-sm md:text-base uppercase tracking-wider">
                        {selectedAgent.team_name}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAgent(null)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <Icon icon="material-symbols:close" className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {selectedAgent.remarks && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{t('team.about')}</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedAgent.remarks}</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                {selectedAgent.experience_years && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1 text-sm md:text-base">{t('team.experience')}</h4>
                    <p className="text-gray-600 text-sm md:text-base">{selectedAgent.experience_years} Years</p>
                  </div>
                )}
                {selectedAgent.nationality && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1 text-sm md:text-base">{t('team.nationality')}</h4>
                    <p className="text-gray-600 text-sm md:text-base">
                      {parseNationality(selectedAgent.nationality)}
                    </p>
                  </div>
                )}
                {selectedAgent.kyc_verification && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1 text-sm md:text-base">{t('team.verification')}</h4>
                    <p className="text-green-600 text-sm md:text-base">{t('team.verified')}</p>
                  </div>
                )}
              </div>

              {selectedAgent.languages && selectedAgent.languages.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2">{t('team.languages')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAgent.languages.map((lang, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#dbbb90]/10 text-[#dbbb90] rounded-full text-sm"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedAgent.specialities && selectedAgent.specialities.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2">{t('team.specialtiesModal')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAgent.specialities.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
                <a
                  href={`https://wa.me/${selectedAgent.phone?.replace(/[^0-9]/g, '')}?text=Hi ${selectedAgent.name}, I'm interested in luxury properties in Dubai`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 md:px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg text-sm md:text-base"
                >
                  <Icon icon="iconoir:whatsapp-solid" className="w-4 h-4 md:w-5 md:h-5" />
                  <span>{t('team.whatsapp')}</span>
                </a>
                <a
                  href={`tel:${selectedAgent.phone}`}
                  className="flex items-center justify-center gap-2 bg-[#dbbb90] hover:bg-[#C2A17B] text-white px-4 md:px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg text-sm md:text-base"
                >
                  <Icon icon="line-md:phone-call-filled" className="w-4 h-4 md:w-5 md:h-5" />
                  <span>{t('team.call')}</span>
                </a>
                <a
                  href={`mailto:${selectedAgent.email}?subject=Luxury Property Inquiry`}
                  className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-4 md:px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg text-sm md:text-base"
                >
                  <Icon icon="material-symbols:mail-outline" className="w-4 h-4 md:w-5 md:h-5" />
                  <span>{t('team.email')}</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
