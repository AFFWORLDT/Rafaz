import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions - Rafaz Realestate',
  description: 'Terms and Conditions for Rafaz Realestate - Read our terms of service and user agreement.',
};

export default function TermsConditionsPage() {
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
                    Terms and <span className="luxury-text-static">Conditions</span>
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
                <section className="luxury-hover p-6 rounded-2xl border border-[#D4AF37]/10 hover:border-[#D4AF37]/20 transition-all duration-300">
                  <h2 className="text-3xl font-semibold text-gray-900 mb-6 font-serif luxury-text-static flex items-center gap-3">
                    <span className="w-8 h-8 bg-gradient-to-br from-[#D4AF37] to-[#C2A17B] rounded-full flex items-center justify-center text-white font-bold text-sm">1</span>
                    Acceptance of Terms
                  </h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p className="font-serif text-lg">
                      Welcome to Rafaz Realestate. These Terms and Conditions ("Terms") govern your use of our website <a href="https://therafaz.ae" className="text-[#D4AF37] hover:text-[#B8941F] underline transition-colors">therafaz.ae</a> and our services. By accessing or using our website, you agree to be bound by these Terms.
                    </p>
                    <p className="font-serif text-lg">
                      If you do not agree to these Terms, please do not use our website or services.
                    </p>
                  </div>
                </section>

                <section className="luxury-hover p-6 rounded-2xl border border-[#D4AF37]/10 hover:border-[#D4AF37]/20 transition-all duration-300">
                  <h2 className="text-3xl font-semibold text-gray-900 mb-6 font-serif luxury-text-static flex items-center gap-3">
                    <span className="w-8 h-8 bg-gradient-to-br from-[#D4AF37] to-[#C2A17B] rounded-full flex items-center justify-center text-white font-bold text-sm">2</span>
                    About Rafaz Realestate
                  </h2>
                  <div className="space-y-6 text-gray-700 leading-relaxed">
                    <p className="font-serif text-lg">
                      Rafaz Realestate is a real estate platform based in Dubai, UAE, providing property listings, real estate services, and related services. We are committed to connecting property buyers, sellers, and renters in the Dubai real estate market.
                    </p>
                    <div className="luxury-glass-gold p-6 rounded-2xl border border-[#D4AF37]/20">
                      <p className="text-gray-800 mb-4 font-semibold text-lg font-serif"><span className="luxury-text-static">Company Information:</span></p>
                      <div className="space-y-2 text-gray-700 font-serif">
                        <p className="text-lg font-medium">Rafaz Realestate</p>
                        <p>Silver Tower - Business Bay - Dubai - United Arab Emirates</p>
                        <p>Dubai, UAE</p>
                        <p>Phone: <a href="tel:+97143307959" className="text-[#D4AF37] hover:text-[#B8941F] font-medium transition-colors">+971 43 307 959</a></p>
                        <p>Email: <a href="mailto:info@rafazproperties.com" className="text-[#D4AF37] hover:text-[#B8941F] font-medium transition-colors">info@rafazproperties.com</a></p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="luxury-hover p-6 rounded-2xl border border-[#D4AF37]/10 hover:border-[#D4AF37]/20 transition-all duration-300">
                  <h2 className="text-3xl font-semibold text-gray-900 mb-6 font-serif luxury-text-static flex items-center gap-3">
                    <span className="w-8 h-8 bg-gradient-to-br from-[#D4AF37] to-[#C2A17B] rounded-full flex items-center justify-center text-white font-bold text-sm">3</span>
                    Services Provided
                  </h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p className="font-serif text-lg mb-6">Rafaz Realestate provides the following luxury services:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 bg-[#D4AF37]/5 rounded-xl border border-[#D4AF37]/10">
                        <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                        <span className="font-serif">Property listings for sale and rent</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-[#D4AF37]/5 rounded-xl border border-[#D4AF37]/10">
                        <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                        <span className="font-serif">Off-plan property information and sales</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-[#D4AF37]/5 rounded-xl border border-[#D4AF37]/10">
                        <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                        <span className="font-serif">Community information and details</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-[#D4AF37]/5 rounded-xl border border-[#D4AF37]/10">
                        <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                        <span className="font-serif">Property management services</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-[#D4AF37]/5 rounded-xl border border-[#D4AF37]/10">
                        <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                        <span className="font-serif">Mortgage and financing assistance</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-[#D4AF37]/5 rounded-xl border border-[#D4AF37]/10">
                        <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                        <span className="font-serif">Conveyancing services</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-[#D4AF37]/5 rounded-xl border border-[#D4AF37]/10">
                        <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                        <span className="font-serif">Short-term rental services</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-[#D4AF37]/5 rounded-xl border border-[#D4AF37]/10">
                        <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                        <span className="font-serif">Real estate consultation and advisory</span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Additional sections will maintain the same luxury styling pattern */}
                <section className="luxury-hover p-6 rounded-2xl border border-[#D4AF37]/10 hover:border-[#D4AF37]/20 transition-all duration-300">
                  <h2 className="text-3xl font-semibold text-gray-900 mb-6 font-serif luxury-text-static flex items-center gap-3">
                    <span className="w-8 h-8 bg-gradient-to-br from-[#D4AF37] to-[#C2A17B] rounded-full flex items-center justify-center text-white font-bold text-sm">4</span>
                    User Accounts and Registration
                  </h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 font-serif">4.1 Account Creation</h3>
              <p className="text-gray-700 mb-4">
                To access certain features of our website, you may need to create an account. You agree to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your information to keep it accurate</li>
                <li>Maintain the security of your password and account</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 font-serif">4.2 Account Termination</h3>
              <p className="text-gray-700 mb-4">
                We reserve the right to suspend or terminate your account at any time for violation of these Terms or for any other reason at our sole discretion.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 font-serif">5. Property Listings and Information</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 font-serif">5.1 Accuracy of Information</h3>
              <p className="text-gray-700 mb-4">
                While we strive to provide accurate and up-to-date property information, we cannot guarantee the accuracy, completeness, or timeliness of all listings. Property information is provided by third parties and may change without notice.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 font-serif">5.2 Property Viewing and Transactions</h3>
              <p className="text-gray-700 mb-4">
                All property viewings and transactions are subject to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Availability of the property</li>
                <li>Verification of your identity and financial capacity</li>
                <li>Compliance with UAE real estate laws and regulations</li>
                <li>Execution of proper legal documentation</li>
                <li>Payment of applicable fees and taxes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 font-serif">6. User Conduct and Prohibited Activities</h2>
              <p className="text-gray-700 mb-4">You agree not to:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Use the website for any unlawful purpose or in violation of any applicable laws</li>
                <li>Post false, misleading, or fraudulent information</li>
                <li>Impersonate any person or entity or misrepresent your affiliation</li>
                <li>Interfere with or disrupt the website's functionality</li>
                <li>Attempt to gain unauthorized access to any part of the website</li>
                <li>Use automated systems to access the website without permission</li>
                <li>Post or transmit any harmful, threatening, or offensive content</li>
                <li>Violate any intellectual property rights</li>
                <li>Engage in any form of harassment or discrimination</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 font-serif">7. Intellectual Property Rights</h2>
              <p className="text-gray-700 mb-4">
                The website and its content, including but not limited to text, graphics, logos, images, and software, are the property of Rafaz Realestate or its licensors and are protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p className="text-gray-700 mb-4">
                You may not reproduce, distribute, modify, or create derivative works from any content without our express written permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 font-serif">8. Payment Terms and Fees</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 font-serif">8.1 Service Fees</h3>
              <p className="text-gray-700 mb-4">
                Some services may require payment of fees. All fees are non-refundable unless otherwise specified. Payment terms will be clearly disclosed before any transaction.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 font-serif">8.2 Currency and Taxes</h3>
              <p className="text-gray-700 mb-4">
                All fees are quoted in UAE Dirhams (AED) unless otherwise specified. You are responsible for any applicable taxes, duties, or fees imposed by relevant authorities.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 font-serif">9. Disclaimers and Limitations of Liability</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 font-serif">9.1 Service Availability</h3>
              <p className="text-gray-700 mb-4">
                We do not guarantee that the website will be available at all times. We may suspend or discontinue the website or any part of it at any time without notice.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 font-serif">9.2 Limitation of Liability</h3>
              <p className="text-gray-700 mb-4">
                To the maximum extent permitted by law, Rafaz Realestate shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of the website or services.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 font-serif">9.3 Property Information</h3>
              <p className="text-gray-700 mb-4">
                We are not responsible for the accuracy of property information provided by third parties. Users should verify all property details independently before making any decisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 font-serif">10. Privacy and Data Protection</h2>
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. Our collection and use of personal information is governed by our <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>, which is incorporated into these Terms by reference.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 font-serif">11. Indemnification</h2>
              <p className="text-gray-700 mb-4">
                You agree to indemnify and hold harmless Rafaz Realestate, its officers, directors, employees, and agents from any claims, damages, or expenses arising from your use of the website or violation of these Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 font-serif">12. Governing Law and Dispute Resolution</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 font-serif">12.1 Governing Law</h3>
              <p className="text-gray-700 mb-4">
                These Terms are governed by the laws of the United Arab Emirates. Any disputes arising from these Terms will be subject to the exclusive jurisdiction of the courts of Dubai, UAE.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 font-serif">12.2 Dispute Resolution</h3>
              <p className="text-gray-700 mb-4">
                Before pursuing legal action, we encourage you to contact us to resolve any disputes amicably. We are committed to working with you to find a satisfactory resolution.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 font-serif">13. Force Majeure</h2>
              <p className="text-gray-700 mb-4">
                We shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable control, including but not limited to acts of God, natural disasters, war, terrorism, or government actions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 font-serif">14. Severability</h2>
              <p className="text-gray-700 mb-4">
                If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue to be valid and enforceable.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 font-serif">15. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the updated Terms on our website. Your continued use of the website after such changes constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 font-serif">16. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms and Conditions, please contact us:
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

              {/* Note: Additional sections can be styled similarly with luxury-hover, numbered badges, and gold accents */}
              <section className="luxury-hover p-6 rounded-2xl border border-[#D4AF37]/10 hover:border-[#D4AF37]/20 transition-all duration-300">
                <h2 className="text-3xl font-semibold text-gray-900 mb-6 font-serif luxury-text-static flex items-center gap-3">
                  <span className="w-8 h-8 bg-gradient-to-br from-[#D4AF37] to-[#C2A17B] rounded-full flex items-center justify-center text-white font-bold text-sm">17</span>
                  Entire Agreement
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p className="font-serif text-lg">
                    These Terms, together with our Privacy Policy and any other legal notices published on our website, constitute the entire agreement between you and Rafaz Realestate regarding your use of our website and services.
                  </p>
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
                    Trusted by thousands of discerning clients
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
