"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface LeadFormContextType {
  isOpen: boolean;
  openLeadForm: (source?: string, agentId?: string, propertyId?: string) => void;
  closeLeadForm: () => void;
  source: string;
  agentId?: string;
  propertyId?: string;
}

const LeadFormContext = createContext<LeadFormContextType | undefined>(undefined);

export function LeadFormProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState('Website');
  const [agentId, setAgentId] = useState<string | undefined>(undefined);
  const [propertyId, setPropertyId] = useState<string | undefined>(undefined);

  const openLeadForm = (newSource = 'Website', newAgentId?: string, newPropertyId?: string) => {
    setSource(newSource);
    setAgentId(newAgentId);
    setPropertyId(newPropertyId);
    setIsOpen(true);
  };

  const closeLeadForm = () => {
    setIsOpen(false);
    // Reset after animation
    setTimeout(() => {
      setSource('Website');
      setAgentId(undefined);
      setPropertyId(undefined);
    }, 300);
  };

  return (
    <LeadFormContext.Provider
      value={{
        isOpen,
        openLeadForm,
        closeLeadForm,
        source,
        agentId,
        propertyId,
      }}
    >
      {children}
    </LeadFormContext.Provider>
  );
}

export function useLeadForm() {
  const context = useContext(LeadFormContext);
  if (context === undefined) {
    throw new Error('useLeadForm must be used within a LeadFormProvider');
  }
  return context;
}
