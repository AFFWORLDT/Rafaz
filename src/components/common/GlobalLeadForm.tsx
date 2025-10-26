"use client";

import { useLeadForm } from '@/src/contexts/LeadFormContext';
import PopupLeadForm from './PopupLeadForm';

export default function GlobalLeadForm() {
  const { isOpen, closeLeadForm, source, agentId, propertyId } = useLeadForm();

  return (
    <PopupLeadForm
      isOpen={isOpen}
      onClose={closeLeadForm}
      source={source}
      agentId={agentId}
      propertyId={propertyId}
      title="Get Your Dream Property"
      subtitle="Fill out the form below and we'll get back to you soon"
    />
  );
}
