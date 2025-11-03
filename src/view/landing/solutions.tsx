"use client";

import { ArrowRight, User, Building, Download, MapPin } from "lucide-react";
import { useLanguage } from "@/src/contexts/LanguageContext";
import Link from "next/link";

function Solutions() {
  const { t } = useLanguage();
  const whatsappBase = "https://wa.me/971507815384";
  const solutions = [
    {
      icon: <User className="h-12 w-12 text-[#dbbb90]" />,
      title: t('solutions.connect.title'),
      description: t('solutions.connect.description'),
      arrow: <ArrowRight className="h-6 w-6 text-white" />,
      href: `${whatsappBase}?text=${encodeURIComponent('Hello, I would like to connect with a specialist about my property needs.')}`,
      external: true,
    },
    {
      icon: <Building className="h-12 w-12 text-[#dbbb90]" />,
      title: t('solutions.list.title'),
      description: t('solutions.list.description'),
      arrow: <ArrowRight className="h-6 w-6 text-white" />,
      href: `${whatsappBase}?text=${encodeURIComponent('Hello, I want to list my property. Please guide me through the process.')}`,
      external: true,
    },
    {
      icon: <Download className="h-12 w-12 text-[#dbbb90]" />,
      title: t('solutions.download.title'),
      description: t('solutions.download.description'),
      arrow: <ArrowRight className="h-6 w-6 text-white" />,
      href: '/offPlans',
      external: false,
    },
    {
      icon: <MapPin className="h-12 w-12 text-[#dbbb90]" />,
      title: t('solutions.explore.title'),
      description: t('solutions.explore.description'),
      arrow: <ArrowRight className="h-6 w-6 text-white" />,
      href: '/offPlans',
      external: false,
    },
  ];

  return (
    <section className="py-32 lg:py-40 bg-gradient-to-br from-slate-50 via-white to-gray-50 relative overflow-hidden">
      {/* Ultra-Luxury Background Effects */}
      <div className="absolute inset-0">
        {/* Primary Luxury Pattern */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23dbbb90' fill-opacity='0.2'%3E%3Cpath d='M60 60c0-16.569-13.431-30-30-30s-30 13.431-30 30 13.431 30 30 30 30-13.431 30-30zm30 0c0-16.569-13.431-30-30-30s-30 13.431-30 30 13.431 30 30 30 30-13.431 30-30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        
        {/* Secondary Luxury Pattern */}
        <div className="absolute inset-0 opacity-[0.008]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C2A17B' fill-opacity='0.15'%3E%3Ccircle cx='100' cy='100' r='3'/%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3Ccircle cx='150' cy='50' r='2'/%3E%3Ccircle cx='50' cy='150' r='2'/%3E%3Ccircle cx='150' cy='150' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      {/* Premium Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-white/20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#dbbb90]/5 via-transparent to-[#C2A17B]/5"></div>
      
      {/* Luxury Accent Lines */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-[#dbbb90]/40 to-transparent"></div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-[#dbbb90]/30 to-transparent"></div>
      
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Ultra-Luxury Header */}
          <div className="mb-24 lg:mb-32 text-center relative">
            {/* Decorative Elements */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-[#dbbb90]/10 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-tr from-[#C2A17B]/8 to-transparent rounded-full blur-3xl"></div>
            
            <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-gray-900 leading-[0.9] font-serif tracking-tight relative">
              <span className="block mb-2">{t('solutions.headline.part1')}</span>
              <span className="block mb-2">{t('solutions.headline.part2')}</span>
              <span className="block text-[#dbbb90] font-normal relative">
                {t('solutions.headline.part3')}
                {/* Luxury Underline */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#dbbb90] to-transparent"></div>
              </span>
            </h2>
            
            {/* Premium Separator */}
            <div className="mt-16 flex items-center justify-center space-x-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#dbbb90]/40"></div>
              <div className="w-2 h-2 bg-[#dbbb90] rounded-full"></div>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#dbbb90]/40"></div>
            </div>
          </div>

          {/* Ultra-Luxury Solutions Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {solutions.map((solution, index) => {
              const CardInner = (
                <>
                {/* Ultra-Luxury Decorative Elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-[#dbbb90]/8 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-tr from-[#C2A17B]/6 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                
                {/* Premium Icon Container */}
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#dbbb90]/12 to-[#C2A17B]/8 rounded-3xl flex items-center justify-center group-hover:from-[#dbbb90]/25 group-hover:to-[#C2A17B]/15 transition-all duration-500 shadow-lg group-hover:shadow-xl border border-[#dbbb90]/20 group-hover:border-[#dbbb90]/30">
                    <div className="transform group-hover:scale-110 transition-transform duration-300">
                      {solution.icon}
                    </div>
                  </div>
                  
                  {/* Luxury Accent */}
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-br from-[#dbbb90] to-[#C2A17B] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                </div>

                {/* Premium Title with Arrow */}
                <div className="flex items-start justify-between mb-6">
                  <h3 className="text-gray-900 font-light text-2xl leading-tight font-serif tracking-wide group-hover:text-[#dbbb90] transition-colors duration-500 flex-1">
                    {solution.title}
                  </h3>
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0 ml-6 flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#dbbb90] to-[#C2A17B] rounded-full flex items-center justify-center shadow-lg">
                      {solution.arrow}
                    </div>
                  </div>
                </div>

                {/* Enhanced Description */}
                <p className="text-gray-600 text-lg leading-relaxed font-light font-serif group-hover:text-gray-700 transition-colors duration-300">
                  {solution.description}
                </p>

                {/* Ultra-Luxury Border Effects */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[#dbbb90]/25 transition-all duration-500 pointer-events-none"></div>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#dbbb90]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                {/* Premium Corner Accents */}
                <div className="absolute top-6 right-6 w-3 h-3 border-t-2 border-r-2 border-[#dbbb90]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-6 left-6 w-3 h-3 border-b-2 border-l-2 border-[#dbbb90]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </>
              );

              const CardWrapperClasses = "group relative bg-white/95 backdrop-blur-md border border-gray-200/30 rounded-3xl p-10 hover:shadow-3xl hover:shadow-[#dbbb90]/15 transition-all duration-700 cursor-pointer transform hover:-translate-y-4 hover:border-[#dbbb90]/40 hover:bg-white";

              return solution.external ? (
                <a key={index} href={solution.href} target="_blank" rel="noopener noreferrer" className="block">
                  <div className={CardWrapperClasses}>
                    {CardInner}
                  </div>
                </a>
              ) : (
                <Link key={index} href={solution.href} className="block">
                  <div className={CardWrapperClasses}>
                    {CardInner}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Solutions;
