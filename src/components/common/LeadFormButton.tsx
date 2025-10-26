"use client";

import { useState } from 'react';
import { Button } from '@/src/components/ui/button';
import { MessageCircle, X, Phone, Mail } from 'lucide-react';
import { useLeadForm } from '@/src/contexts/LeadFormContext';

interface LeadFormButtonProps {
  variant?: 'floating' | 'inline' | 'compact';
  source?: string;
  agentId?: string;
  propertyId?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function LeadFormButton({
  variant = 'floating',
  source = 'Website',
  agentId,
  propertyId,
  className = '',
  children
}: LeadFormButtonProps) {
  const { openLeadForm } = useLeadForm();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    openLeadForm(source, agentId, propertyId);
  };

  if (variant === 'floating') {
    return (
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <div className="relative">
          <Button
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#dbbb90] hover:bg-[#C2A17B] text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>
          
          {/* Tooltip - Hidden on mobile, shown on desktop */}
          <div className={`hidden sm:block absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            Get Free Consultation
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <Button
        onClick={handleClick}
        className={`h-8 sm:h-10 px-3 sm:px-4 bg-[#dbbb90] hover:bg-[#C2A17B] text-white text-xs sm:text-sm font-medium rounded-lg transition-colors ${className}`}
      >
        <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
        {children || 'Get Consultation'}
      </Button>
    );
  }

  return (
    <Button
      onClick={handleClick}
      className={`h-9 sm:h-11 px-4 sm:px-6 bg-[#dbbb90] hover:bg-[#C2A17B] text-white text-sm sm:text-base font-medium rounded-lg transition-colors ${className}`}
    >
      <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
      {children || 'Get Free Consultation'}
    </Button>
  );
}
