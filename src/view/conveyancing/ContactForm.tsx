"use client";

import React from 'react';
import { MessageCircle, Phone, Mail } from 'lucide-react';
import LeadCaptureForm from '../../components/common/leadCaptureForm';

export default function ContactForm() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl font-bold text-blue-900 mb-6 font-serif">
              Your Property Transactions Simplified
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Please fill in the form below and we'll get back to you within 24 hours for further details.
            </p>

            <div className="space-y-6">
              {/* WhatsApp */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">WhatsApp</div>
                  <a href="#" className="text-orange-500 hover:text-orange-600 transition-colors duration-200">
                    Click to WhatsApp
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Phone</div>
                  <div className="text-gray-600">+971 43 307 959</div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Email</div>
                  <a href="mailto:info@rafazproperties.com" className="text-orange-500 hover:text-orange-600 transition-colors duration-200">
                    info@rafazproperties.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <LeadCaptureForm
              title="Get Free Consultation"
              subtitle="Fill out the form below and we'll get back to you soon"
              variant="modal"
              className="p-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
