import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer - Rafaz Realestate',
  description: 'Disclaimer for Rafaz Realestate - Important information about our services and limitations.',
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen luxury-bg">
      {/* Proper Navbar Spacing */}
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Ultra-Luxury Content Card */}
          <div className="luxury-card rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 border-2 border-[#D4AF37]/20 relative overflow-hidden">
            
            {/* Luxury Background Effects */}
            <div className="absolute inset-0 luxury-bg-pattern opacity-5"></div>
            <div className="absolute top-0 right-0 w-32 h-32 luxury-bg-radial rounded-full blur-3xl opacity-15 animate-luxuryBreathe"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 luxury-bg-gold rounded-full blur-2xl opacity-10 animate-luxuryPulse"></div>
            
            {/* Content Wrapper */}
            <div className="relative z-10">
              {/* Luxury Header */}
              <div className="text-center mb-16">
                <div className="relative inline-block">
                  {/* Decorative Elements */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-0.5 luxury-bg-gold animate-luxuryShimmer"></div>
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 luxury-bg-gold rounded-full animate-luxurySparkle"></div>
                  
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 font-serif tracking-wide luxury-text-shadow">
                    <span className="luxury-text-static">Disclaimer</span>
                  </h1>
                  
                  {/* Premium Separator */}
                  <div className="flex items-center justify-center gap-4 mt-8">
                    <div className="w-12 h-px luxury-bg-gold animate-luxuryShimmer"></div>
                    <div className="w-3 h-3 luxury-bg-gold rounded-full animate-luxuryPulse"></div>
                    <div className="w-12 h-px luxury-bg-gold animate-luxuryShimmer"></div>
                  </div>
                </div>
              </div>
              
              {/* Last Updated */}
              <div className="text-center mb-12">
                <p className="text-[#D4AF37] font-medium text-lg tracking-wider font-serif">
                  Last updated: January 2025
                </p>
              </div>

              {/* Luxury Content Sections */}
              <div className="space-y-12">

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 font-serif">1. General Information</h2>
              <p className="text-gray-700 mb-4">
                The information contained on this website (therafaz.ae) is for general information purposes only. While we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.
              </p>
              <p className="text-gray-700 mb-4">
                Any reliance you place on such information is therefore strictly at your own risk.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 font-serif">2. Property Information Disclaimer</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3 font-serif">2.1 Accuracy of Property Details</h3>
              <p className="text-gray-700 mb-4">
                All property information, including but not limited to prices, specifications, availability, location details, and images, is provided by third parties and may be subject to change without notice. We do not guarantee the accuracy, completeness, or timeliness of any property information displayed on our website.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 font-serif">2.2 Property Availability</h3>
              <p className="text-gray-700 mb-4">
                Property availability is subject to change at any time. Properties may be sold, rented, or withdrawn from the market without prior notice. We recommend that you verify property availability directly with the relevant parties before making any decisions.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 font-serif">2.3 Property Prices and Valuations</h3>
              <p className="text-gray-700 mb-4">
                All prices, valuations, and financial information are indicative only and may not reflect the current market value or final transaction price. Prices may be subject to negotiation, additional fees, taxes, and other charges not disclosed on our website.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 font-serif">2.4 Property Images and Descriptions</h3>
              <p className="text-gray-700 mb-4">
                Property images and descriptions are provided for illustrative purposes only and may not accurately represent the current condition, size, or features of the property. We recommend conducting a physical inspection before making any property-related decisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 font-serif">3. Real Estate Services Disclaimer</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3 font-serif">3.1 Professional Advice</h3>
              <p className="text-gray-700 mb-4">
                The information provided on this website does not constitute professional real estate, legal, financial, or investment advice. You should consult with qualified professionals before making any real estate or investment decisions.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 font-serif">3.2 Market Information</h3>
              <p className="text-gray-700 mb-4">
                Any market analysis, trends, or forecasts provided on our website are based on available information and should not be considered as definitive predictions of future market performance. Real estate markets are subject to various factors that may affect property values and market conditions.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 font-serif">3.3 Legal and Regulatory Compliance</h3>
              <p className="text-gray-700 mb-4">
                While we strive to provide information that complies with applicable laws and regulations, you are responsible for ensuring that any property transactions comply with all relevant UAE laws, regulations, and requirements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 font-serif">4. Website and Technology Disclaimer</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3 font-serif">4.1 Website Availability</h3>
              <p className="text-gray-700 mb-4">
                We do not guarantee that our website will be available at all times or that it will be free from errors, viruses, or other harmful components. We reserve the right to modify, suspend, or discontinue any part of our website without notice.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 font-serif">4.2 Third-Party Links</h3>
              <p className="text-gray-700 mb-4">
                Our website may contain links to third-party websites. We have no control over the content, privacy policies, or practices of these websites and are not responsible for their content or any damages arising from their use.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 font-serif">4.3 User-Generated Content</h3>
              <p className="text-gray-700 mb-4">
                Any content submitted by users, including reviews, comments, or other materials, represents the views of the individual user and not necessarily the views of Rafaz Realestate. We are not responsible for the accuracy or reliability of user-generated content.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 font-serif">5. Financial and Investment Disclaimer</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3 font-serif">5.1 Investment Risks</h3>
              <p className="text-gray-700 mb-4">
                Real estate investments carry inherent risks, including but not limited to market fluctuations, economic conditions, regulatory changes, and property-specific risks. Past performance does not guarantee future results.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 font-serif">5.2 Financial Information</h3>
              <p className="text-gray-700 mb-4">
                Any financial information, mortgage rates, or investment returns mentioned on our website are for informational purposes only and should not be considered as financial advice. You should consult with qualified financial advisors before making any investment decisions.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 font-serif">5.3 Currency and Exchange Rates</h3>
              <p className="text-gray-700 mb-4">
                Currency conversions and exchange rates are provided for convenience only and may not reflect current market rates. You should verify current exchange rates before making any financial decisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 font-serif">6. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                In no event shall Rafaz Realestate, its officers, directors, employees, agents, or affiliates be liable for any direct, indirect, incidental, special, consequential, or punitive damages, including but not limited to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Loss of profits, data, or other intangible losses</li>
                <li>Damages resulting from the use or inability to use our website or services</li>
                <li>Damages resulting from any property transactions or decisions made based on our website content</li>
                <li>Damages resulting from unauthorized access to or alteration of your data</li>
                <li>Any other damages arising from your use of our website or services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 font-serif">7. Indemnification</h2>
              <p className="text-gray-700 mb-4">
                You agree to indemnify and hold harmless Rafaz Realestate, its officers, directors, employees, agents, and affiliates from any claims, damages, losses, or expenses (including reasonable attorney's fees) arising from:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Your use of our website or services</li>
                <li>Your violation of these terms and conditions</li>
                <li>Your violation of any third-party rights</li>
                <li>Any property transactions or decisions made based on our website content</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 font-serif">8. Force Majeure</h2>
              <p className="text-gray-700 mb-4">
                Rafaz Realestate shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable control, including but not limited to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Acts of God, natural disasters, or extreme weather conditions</li>
                <li>War, terrorism, or civil unrest</li>
                <li>Government actions, regulations, or restrictions</li>
                <li>Technical failures or internet outages</li>
                <li>Labor disputes or strikes</li>
                <li>Pandemics or public health emergencies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 font-serif">9. Governing Law and Jurisdiction</h2>
              <p className="text-gray-700 mb-4">
                This disclaimer is governed by the laws of the United Arab Emirates. Any disputes arising from this disclaimer or your use of our website shall be subject to the exclusive jurisdiction of the courts of Dubai, UAE.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 font-serif">10. Severability</h2>
              <p className="text-gray-700 mb-4">
                If any provision of this disclaimer is found to be invalid or unenforceable, the remaining provisions shall continue to be valid and enforceable to the fullest extent permitted by law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 font-serif">11. Updates to This Disclaimer</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to update this disclaimer at any time without prior notice. Any changes will be posted on this page with an updated "Last updated" date. Your continued use of our website after such changes constitutes acceptance of the updated disclaimer.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 font-serif">12. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this disclaimer, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>Rafaz Realestate</strong></p>
                <p className="text-gray-700 mb-2">Silver Tower - Business Bay - Dubai - United Arab Emirates</p>
                <p className="text-gray-700 mb-2">Dubai, UAE</p>
                <p className="text-gray-700 mb-2">Phone: <a href="tel:+97143307959" className="text-blue-600 hover:underline">+971 43 307 959</a></p>
                <p className="text-gray-700 mb-2">Email: <a href="mailto:legal@therafaz.ae" className="text-blue-600 hover:underline">legal@therafaz.ae</a></p>
                  <p className="text-gray-700">General Email: <a href="mailto:info@rafazproperties.com" className="text-[#D4AF37] hover:text-[#B8941F] font-medium transition-colors">info@rafazproperties.com</a></p>
                </div>
              </section>
              </div>
              
              {/* Luxury Bottom Section */}
              <div className="text-center mt-16 pt-8 border-t border-[#D4AF37]/20">
                <div className="luxury-glass-gold p-6 rounded-2xl border border-[#D4AF37]/20 inline-block">
                  <p className="luxury-text-static font-serif text-lg font-semibold tracking-wider">
                    Dubai's NO 1 Luxury Real Estate
                  </p>
                  <p className="text-gray-600 font-serif mt-2">
                    Clear terms and conditions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
