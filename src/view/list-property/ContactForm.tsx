import React from 'react';
import LeadCaptureForm from '@/src/components/common/leadCaptureForm';

function ContactForm() {

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl font-bold text-blue-900 mb-6">
              Unleash your property potential<br />
              List, Sell & Succeed with Us
            </h2>
            
            {/* Stats */}
            <div className="flex gap-8 mb-8">
              <div>
                <div className="text-3xl font-bold text-primar">50K+</div>
                <div className="text-gray-600">Home Sold</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">82%</div>
                <div className="text-gray-600">of listings sold in the past 12 months</div>
              </div>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed">
              For over 16 years, Provident has been the go-to choice for landlords and homeowners. 
              With a dedicated team of over 200 area specialists, we specialize in maximizing your returns. 
              Don't miss out on our expertise. Contact Provident today!
            </p>
          </div>

          {/* Right Content - Get Free Consultation Form */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
            <LeadCaptureForm
              title="Get Free Consultation"
              subtitle="Fill out the form below and we'll get back to you soon"
              variant="modal"
              className="p-0"
              buttonColor="orange"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
