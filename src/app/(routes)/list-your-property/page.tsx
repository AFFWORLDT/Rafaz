"use client";
import React from 'react';
import HeroSection from '../../../view/list-property/HeroSection';
import WhyProvident from '../../../view/list-property/WhyProvident';
import HowItWorks from '../../../view/list-property/HowItWorks';
import ClientTestimonials from '../../../view/list-property/ClientTestimonials';
import ContactForm from '../../../view/list-property/ContactForm';

export default function ListYourPropertyPage() {
  return (
    <div className="bg-white">
      <HeroSection />
      <WhyProvident />
      <HowItWorks />
      <ClientTestimonials />
      <ContactForm />
    </div>
  );
}
