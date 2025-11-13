// Email templates with real contact information and mobile-optimized design
import { config } from './config';

export const generateCustomerConfirmationEmail = (leadData: any): string => {
  const siteUrl = config.site.url || 'https://rafazproperties.ae';
  // Ensure www is included for logo URL
  const baseUrl = siteUrl.includes('www.') ? siteUrl : siteUrl.replace('https://', 'https://www.');
  const logoUrl = `${baseUrl.replace(/\/$/, '')}/images/logo.png`;
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta http-equiv="X-Auto-Response-Suppress" content="All">
      <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
      <title>Inquiry Confirmation - Rafaz Properties</title>
      <style>
        /* Base styles for all devices */
        .container {
          width: 100%;
          max-width: 600px;
        }
        
        /* Mobile devices (phones) - up to 600px */
        @media only screen and (max-width: 600px) {
          .container {
            width: 100% !important;
            max-width: 100% !important;
          }
          .content {
            padding: 20px 12px !important;
          }
          .header {
            padding: 25px 15px !important;
          }
          .header h1 {
            font-size: 22px !important;
            line-height: 1.3 !important;
          }
          .header p {
            font-size: 13px !important;
            margin-top: 5px !important;
          }
          .logo-img {
            max-width: 140px !important;
            height: auto !important;
            margin-bottom: 12px !important;
          }
          .section {
            padding: 18px 15px !important;
            margin-bottom: 25px !important;
            border-radius: 10px !important;
          }
          .section h3 {
            font-size: 18px !important;
            margin-bottom: 15px !important;
            line-height: 1.4 !important;
          }
          .section h4 {
            font-size: 15px !important;
            margin-bottom: 5px !important;
          }
          .section p {
            font-size: 14px !important;
            line-height: 1.6 !important;
          }
          .info-table td {
            display: block !important;
            width: 100% !important;
            padding: 10px 0 !important;
            border-bottom: none !important;
            font-size: 14px !important;
          }
          .info-table td:first-child {
            font-weight: 600 !important;
            margin-bottom: 5px !important;
            color: #1a202c !important;
          }
          .info-table tr {
            border-bottom: 1px solid #e0e0e0 !important;
            padding-bottom: 12px !important;
            margin-bottom: 12px !important;
            display: block !important;
          }
          .info-table tr:last-child {
            border-bottom: none !important;
            margin-bottom: 0 !important;
            padding-bottom: 0 !important;
          }
          .step-item {
            display: block !important;
            margin-bottom: 20px !important;
            padding-bottom: 20px !important;
          }
          .step-item:last-child {
            margin-bottom: 0 !important;
            padding-bottom: 0 !important;
          }
          .step-number {
            float: left !important;
            margin-right: 15px !important;
            margin-top: 2px !important;
          }
          .step-content {
            overflow: hidden !important;
            padding-left: 0 !important;
          }
          .step-content h4 {
            font-size: 15px !important;
            margin-bottom: 6px !important;
            line-height: 1.4 !important;
          }
          .step-content p {
            font-size: 13px !important;
            line-height: 1.5 !important;
            margin: 0 !important;
          }
          .contact-grid {
            display: block !important;
            width: 100% !important;
          }
          .contact-grid tr {
            display: block !important;
            width: 100% !important;
          }
          .contact-item {
            margin-bottom: 25px !important;
            width: 100% !important;
            display: block !important;
            padding: 15px 0 !important;
            text-align: center !important;
          }
          .contact-item:last-child {
            margin-bottom: 0 !important;
          }
          .contact-item td {
            display: block !important;
            width: 100% !important;
            padding: 0 !important;
          }
          .contact-item p {
            font-size: 14px !important;
            margin: 5px 0 !important;
            line-height: 1.5 !important;
          }
          .contact-item p:first-of-type {
            font-size: 15px !important;
            font-weight: 600 !important;
            margin-top: 10px !important;
          }
          .contact-item p:last-of-type {
            font-size: 13px !important;
            color: #666 !important;
          }
          .contact-icon {
            width: auto !important;
            height: auto !important;
            background-color: transparent !important;
            border-radius: 0 !important;
            margin-bottom: 12px !important;
            padding: 0 !important;
          }
          .contact-icon div {
            font-size: 32px !important;
            line-height: 1 !important;
            color: #dbbb90 !important;
          }
          .cta-button {
            display: block !important;
            width: 100% !important;
            padding: 16px 24px !important;
            box-sizing: border-box !important;
            font-size: 16px !important;
            text-align: center !important;
            margin: 0 auto !important;
          }
          .footer {
            padding: 20px 15px !important;
          }
          .footer h3 {
            font-size: 17px !important;
            margin-bottom: 8px !important;
          }
          .footer p {
            font-size: 12px !important;
            line-height: 1.5 !important;
            margin: 5px 0 !important;
          }
          h2 {
            font-size: 20px !important;
            line-height: 1.4 !important;
            margin: 15px 0 12px 0 !important;
          }
          .thank-you-message p {
            font-size: 15px !important;
            line-height: 1.6 !important;
            padding: 0 5px !important;
          }
        }
        
        /* Tablets - 601px to 768px */
        @media only screen and (min-width: 601px) and (max-width: 768px) {
          .container {
            width: 100% !important;
            max-width: 100% !important;
          }
          .content {
            padding: 25px 20px !important;
          }
          .header {
            padding: 25px 20px !important;
          }
          .contact-grid {
            width: 100% !important;
          }
          .contact-item {
            width: 33.33% !important;
            padding: 0 8px !important;
            display: table-cell !important;
          }
          .section {
            padding: 18px !important;
          }
        }
        
        /* Small laptops - 769px to 1024px */
        @media only screen and (min-width: 769px) and (max-width: 1024px) {
          .container {
            max-width: 600px !important;
          }
          .content {
            padding: 30px 25px !important;
          }
        }
        
        /* Large laptops and desktops - 1025px and above */
        @media only screen and (min-width: 1025px) {
          .container {
            max-width: 600px !important;
          }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f8f6f0; font-family: Arial, sans-serif;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f6f0;">
        <tr>
          <td align="center" style="padding: 20px 0;">
            <table role="presentation" class="container" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; margin: 0 auto; background-color: #f8f6f0;">
      <!-- Header -->
              <tr>
                <td class="header" style="background: linear-gradient(135deg, #dbbb90 0%, #C2A17B 100%); padding: 30px 20px; text-align: center;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 0 auto 15px;">
                    <tr>
                      <td>
                        <img src="${logoUrl}" alt="Rafaz Properties Logo" class="logo-img" width="150" border="0" style="max-width: 150px; height: auto; display: block; margin: 0 auto; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;" />
                      </td>
                    </tr>
                  </table>
        <h1 style="color: white; font-size: 24px; margin: 0; font-weight: 300; letter-spacing: 1px; font-family: Arial, sans-serif;">RAFAZ PROPERTIES</h1>
        <p style="color: white; font-size: 14px; margin: 8px 0 0 0; opacity: 0.9; font-weight: 300; font-family: Arial, sans-serif;">Premium Real Estate in Dubai</p>
                </td>
              </tr>

      <!-- Main Content -->
              <tr>
                <td class="content" style="background-color: white; padding: 30px 20px;">
        <!-- Thank You Message -->
                  <table role="presentation" class="thank-you-message" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td style="text-align: center; padding-bottom: 30px;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                          <tr>
                            <td style="width: 50px; height: 50px; background-color: #dbbb90; border-radius: 50%; text-align: center; vertical-align: middle;">
                              <div style="color: white; font-size: 20px; line-height: 50px;">✓</div>
                            </td>
                          </tr>
                        </table>
                        <h2 style="color: #1a202c; font-size: 22px; margin: 15px 0 10px 0; font-weight: 300; font-family: Arial, sans-serif;">Thank You, ${leadData.name}!</h2>
                        <p style="color: #666; font-size: 16px; margin: 0; line-height: 1.5; font-family: Arial, sans-serif; padding: 0 10px;">
            We've received your inquiry and our expert team will contact you within 24 hours to discuss your property requirements.
          </p>
                      </td>
                    </tr>
                  </table>

        <!-- Your Inquiry Details -->
                  <table role="presentation" class="section" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f6f0; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                    <tr>
                      <td>
          <h3 style="color: #1a202c; font-size: 18px; margin: 0 0 15px 0; font-weight: 400; font-family: Arial, sans-serif;">Your Inquiry Details</h3>
                        <table role="presentation" class="info-table" cellspacing="0" cellpadding="0" border="0" width="100%" style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;">
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #1a202c; width: 30%; border-bottom: 1px solid #e0e0e0; font-size: 14px;">Name:</td>
              <td style="padding: 8px 0; color: #666; border-bottom: 1px solid #e0e0e0; font-size: 14px;">${leadData.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #1a202c; width: 30%; border-bottom: 1px solid #e0e0e0; font-size: 14px;">Email:</td>
              <td style="padding: 8px 0; color: #666; border-bottom: 1px solid #e0e0e0; font-size: 14px;">${leadData.email}</td>
            </tr>
            ${leadData.phone ? `
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #1a202c; width: 30%; border-bottom: 1px solid #e0e0e0; font-size: 14px;">Phone:</td>
              <td style="padding: 8px 0; color: #666; border-bottom: 1px solid #e0e0e0; font-size: 14px;">${leadData.phone}</td>
            </tr>
            ` : ''}
            ${leadData.propertyType ? `
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #1a202c; width: 30%; border-bottom: 1px solid #e0e0e0; font-size: 14px;">Property Type:</td>
              <td style="padding: 8px 0; color: #666; border-bottom: 1px solid #e0e0e0; font-size: 14px;">${leadData.propertyType}</td>
            </tr>
            ` : ''}
            ${leadData.budget ? `
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #1a202c; width: 30%; border-bottom: 1px solid #e0e0e0; font-size: 14px;">Budget:</td>
              <td style="padding: 8px 0; color: #666; border-bottom: 1px solid #e0e0e0; font-size: 14px;">${leadData.budget}</td>
            </tr>
            ` : ''}
            ${leadData.location ? `
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #1a202c; width: 30%; border-bottom: 1px solid #e0e0e0; font-size: 14px;">Location:</td>
              <td style="padding: 8px 0; color: #666; border-bottom: 1px solid #e0e0e0; font-size: 14px;">${leadData.location}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #1a202c; width: 30%; font-size: 14px;">Inquiry Source:</td>
              <td style="padding: 8px 0; color: #666; font-size: 14px;">${leadData.source || 'Website'}</td>
            </tr>
          </table>
                      </td>
                    </tr>
                  </table>

        ${leadData.message ? `
        <!-- Your Message -->
                  <table role="presentation" class="section" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f6f0; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                    <tr>
                      <td>
          <h3 style="color: #1a202c; font-size: 18px; margin: 0 0 10px 0; font-weight: 400; font-family: Arial, sans-serif;">Your Message</h3>
                        <p style="color: #666; font-size: 14px; line-height: 1.5; margin: 0; font-family: Arial, sans-serif;">${leadData.message}</p>
                      </td>
                    </tr>
                  </table>
        ` : ''}

        <!-- What Happens Next -->
                  <table role="presentation" class="section" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f6f0; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                    <tr>
                      <td>
          <h3 style="color: #1a202c; font-size: 18px; margin: 0 0 15px 0; font-weight: 400; font-family: Arial, sans-serif;">What Happens Next?</h3>
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                          <tr>
                            <td class="step-item" style="padding-bottom: 12px;">
                              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                  <td class="step-number" style="width: 25px; vertical-align: top; padding-right: 12px;">
                                    <div style="width: 25px; height: 25px; background-color: #dbbb90; border-radius: 50%; text-align: center; line-height: 25px;">
                <span style="color: white; font-size: 12px; font-weight: bold; font-family: Arial, sans-serif;">1</span>
              </div>
                                  </td>
                                  <td class="step-content" style="vertical-align: top;">
                <h4 style="color: #1a202c; font-size: 14px; margin: 0 0 3px 0; font-weight: 500; font-family: Arial, sans-serif;">Expert Review</h4>
                <p style="color: #666; font-size: 12px; margin: 0; line-height: 1.4; font-family: Arial, sans-serif;">Our team will review your requirements and match you with the best properties.</p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td class="step-item" style="padding-bottom: 12px;">
                              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                  <td class="step-number" style="width: 25px; vertical-align: top; padding-right: 12px;">
                                    <div style="width: 25px; height: 25px; background-color: #dbbb90; border-radius: 50%; text-align: center; line-height: 25px;">
                <span style="color: white; font-size: 12px; font-weight: bold; font-family: Arial, sans-serif;">2</span>
              </div>
                                  </td>
                                  <td class="step-content" style="vertical-align: top;">
                <h4 style="color: #1a202c; font-size: 14px; margin: 0 0 3px 0; font-weight: 500; font-family: Arial, sans-serif;">Personal Contact</h4>
                <p style="color: #666; font-size: 12px; margin: 0; line-height: 1.4; font-family: Arial, sans-serif;">A dedicated agent will contact you within 24 hours to discuss your needs.</p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td class="step-item">
                              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                  <td class="step-number" style="width: 25px; vertical-align: top; padding-right: 12px;">
                                    <div style="width: 25px; height: 25px; background-color: #dbbb90; border-radius: 50%; text-align: center; line-height: 25px;">
                <span style="color: white; font-size: 12px; font-weight: bold; font-family: Arial, sans-serif;">3</span>
              </div>
                                  </td>
                                  <td class="step-content" style="vertical-align: top;">
                <h4 style="color: #1a202c; font-size: 14px; margin: 0 0 3px 0; font-weight: 500; font-family: Arial, sans-serif;">Property Showcase</h4>
                <p style="color: #666; font-size: 12px; margin: 0; line-height: 1.4; font-family: Arial, sans-serif;">We'll present you with curated properties that match your criteria.</p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

        <!-- Contact Information -->
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 30px;">
                    <tr>
                      <td style="text-align: center; padding-bottom: 15px;">
                        <h3 style="color: #1a202c; font-size: 18px; margin: 0; font-weight: 400; font-family: Arial, sans-serif;">Need Immediate Assistance?</h3>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <table role="presentation" class="contact-grid" cellspacing="0" cellpadding="0" border="0" width="100%" style="width: 100%;">
                          <tr>
                            <td class="contact-item" style="text-align: center; width: 33.33%; padding: 0 10px;">
                              <a href="tel:+97143307959" style="text-decoration: none; color: inherit; display: block;">
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 0 auto 12px;">
                                  <tr>
                                    <td class="contact-icon" style="width: 50px; height: 50px; background-color: #dbbb90; border-radius: 50%; text-align: center; vertical-align: middle;">
                                      <div style="color: white; font-size: 20px; line-height: 50px;">📞</div>
                                    </td>
                                  </tr>
                                </table>
                                <p style="color: #1a202c; font-size: 14px; margin: 8px 0 0 0; font-weight: 500; font-family: Arial, sans-serif;">Call Us</p>
                                <p style="color: #666; font-size: 12px; margin: 3px 0 0 0; font-family: Arial, sans-serif; text-decoration: underline;">+971 43 307 959</p>
                              </a>
                            </td>
                            <td class="contact-item" style="text-align: center; width: 33.33%; padding: 0 10px;">
                              <a href="mailto:info@rafazproperties.ae" style="text-decoration: none; color: inherit; display: block;">
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 0 auto 12px;">
                                  <tr>
                                    <td class="contact-icon" style="width: 50px; height: 50px; background-color: #dbbb90; border-radius: 50%; text-align: center; vertical-align: middle;">
                                      <div style="color: white; font-size: 20px; line-height: 50px;">✉️</div>
                                    </td>
                                  </tr>
                                </table>
                                <p style="color: #1a202c; font-size: 14px; margin: 8px 0 0 0; font-weight: 500; font-family: Arial, sans-serif;">Email Us</p>
                                <p style="color: #666; font-size: 12px; margin: 3px 0 0 0; font-family: Arial, sans-serif; text-decoration: underline;">info@rafazproperties.ae</p>
                              </a>
                            </td>
                            <td class="contact-item" style="text-align: center; width: 33.33%; padding: 0 10px;">
                              <a href="https://wa.me/971501608106" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: inherit; display: block;">
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 0 auto 12px;">
                                  <tr>
                                    <td class="contact-icon" style="width: 50px; height: 50px; background-color: #dbbb90; border-radius: 50%; text-align: center; vertical-align: middle;">
                                      <div style="color: white; font-size: 20px; line-height: 50px;">💬</div>
                                    </td>
                                  </tr>
                                </table>
                                <p style="color: #1a202c; font-size: 14px; margin: 8px 0 0 0; font-weight: 500; font-family: Arial, sans-serif;">WhatsApp</p>
                                <p style="color: #666; font-size: 12px; margin: 3px 0 0 0; font-family: Arial, sans-serif; text-decoration: underline;">+971 50 160 8106</p>
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

        <!-- Call to Action -->
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 30px;">
                    <tr>
                      <td style="text-align: center;">
                        <a href="https://rafazproperties.ae" class="cta-button" style="display: inline-block; background: linear-gradient(135deg, #dbbb90 0%, #C2A17B 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 20px; font-weight: 500; font-size: 14px; box-shadow: 0 4px 15px rgba(219, 187, 144, 0.3); font-family: Arial, sans-serif;">
            Browse Our Properties
          </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

      <!-- Footer -->
              <tr>
                <td class="footer" style="background-color: #1a202c; padding: 20px; text-align: center;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td style="padding-bottom: 15px;">
          <h3 style="color: #dbbb90; font-size: 18px; margin: 0; font-weight: 300; letter-spacing: 1px; font-family: Arial, sans-serif;">RAFAZ PROPERTIES</h3>
          <p style="color: #999; font-size: 12px; margin: 8px 0 0 0; font-family: Arial, sans-serif;">Your Trusted Partner in Dubai Real Estate</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="border-top: 1px solid #333; padding-top: 15px;">
          <p style="color: #999; font-size: 10px; margin: 0 0 8px 0; font-family: Arial, sans-serif;">
            This email was sent to ${leadData.email} because you submitted an inquiry on our website.
          </p>
          <p style="color: #999; font-size: 10px; margin: 0; font-family: Arial, sans-serif;">
            © 2024 Rafaz Properties. All rights reserved. | Dubai, UAE
          </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

export const generateContactConfirmationEmail = (contactData: any): string => {
  const siteUrl = config.site.url || 'https://rafazproperties.ae';
  // Ensure www is included for logo URL
  const baseUrl = siteUrl.includes('www.') ? siteUrl : siteUrl.replace('https://', 'https://www.');
  const logoUrl = `${baseUrl.replace(/\/$/, '')}/images/logo.png`;
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>Contact Confirmation - Rafaz Properties</title>
      <style>
        /* Base styles for all devices */
        .container {
          width: 100%;
          max-width: 600px;
        }
        
        /* Mobile devices (phones) - up to 600px */
        @media only screen and (max-width: 600px) {
          .container {
            width: 100% !important;
            max-width: 100% !important;
          }
          .content {
            padding: 20px 12px !important;
          }
          .header {
            padding: 25px 15px !important;
          }
          .header h1 {
            font-size: 22px !important;
            line-height: 1.3 !important;
          }
          .header p {
            font-size: 13px !important;
            margin-top: 5px !important;
          }
          .logo-img {
            max-width: 140px !important;
            height: auto !important;
            margin-bottom: 12px !important;
          }
          .section {
            padding: 18px 15px !important;
            margin-bottom: 25px !important;
            border-radius: 10px !important;
          }
          .section h3 {
            font-size: 18px !important;
            margin-bottom: 15px !important;
            line-height: 1.4 !important;
          }
          .section h4 {
            font-size: 15px !important;
            margin-bottom: 5px !important;
          }
          .section p {
            font-size: 14px !important;
            line-height: 1.6 !important;
          }
          .info-table td {
            display: block !important;
            width: 100% !important;
            padding: 10px 0 !important;
            border-bottom: none !important;
            font-size: 14px !important;
          }
          .info-table td:first-child {
            font-weight: 600 !important;
            margin-bottom: 5px !important;
            color: #1a202c !important;
          }
          .info-table tr {
            border-bottom: 1px solid #e0e0e0 !important;
            padding-bottom: 12px !important;
            margin-bottom: 12px !important;
            display: block !important;
          }
          .info-table tr:last-child {
            border-bottom: none !important;
            margin-bottom: 0 !important;
            padding-bottom: 0 !important;
          }
          .step-item {
            display: block !important;
            margin-bottom: 20px !important;
            padding-bottom: 20px !important;
          }
          .step-item:last-child {
            margin-bottom: 0 !important;
            padding-bottom: 0 !important;
          }
          .step-number {
            float: left !important;
            margin-right: 15px !important;
            margin-top: 2px !important;
          }
          .step-content {
            overflow: hidden !important;
            padding-left: 0 !important;
          }
          .step-content h4 {
            font-size: 15px !important;
            margin-bottom: 6px !important;
            line-height: 1.4 !important;
          }
          .step-content p {
            font-size: 13px !important;
            line-height: 1.5 !important;
            margin: 0 !important;
          }
          .contact-grid {
            display: block !important;
            width: 100% !important;
          }
          .contact-grid tr {
            display: block !important;
            width: 100% !important;
          }
          .contact-item {
            margin-bottom: 25px !important;
            width: 100% !important;
            display: block !important;
            padding: 15px 0 !important;
            text-align: center !important;
          }
          .contact-item:last-child {
            margin-bottom: 0 !important;
          }
          .contact-item td {
            display: block !important;
            width: 100% !important;
            padding: 0 !important;
          }
          .contact-item p {
            font-size: 14px !important;
            margin: 5px 0 !important;
            line-height: 1.5 !important;
          }
          .contact-item p:first-of-type {
            font-size: 15px !important;
            font-weight: 600 !important;
            margin-top: 10px !important;
          }
          .contact-item p:last-of-type {
            font-size: 13px !important;
            color: #666 !important;
          }
          .contact-icon {
            width: auto !important;
            height: auto !important;
            background-color: transparent !important;
            border-radius: 0 !important;
            margin-bottom: 12px !important;
            padding: 0 !important;
          }
          .contact-icon div {
            font-size: 32px !important;
            line-height: 1 !important;
            color: #dbbb90 !important;
          }
          .cta-button {
            display: block !important;
            width: 100% !important;
            padding: 16px 24px !important;
            box-sizing: border-box !important;
            font-size: 16px !important;
            text-align: center !important;
            margin: 0 auto !important;
          }
          .footer {
            padding: 20px 15px !important;
          }
          .footer h3 {
            font-size: 17px !important;
            margin-bottom: 8px !important;
          }
          .footer p {
            font-size: 12px !important;
            line-height: 1.5 !important;
            margin: 5px 0 !important;
          }
          h2 {
            font-size: 20px !important;
            line-height: 1.4 !important;
            margin: 15px 0 12px 0 !important;
          }
          .thank-you-message p {
            font-size: 15px !important;
            line-height: 1.6 !important;
            padding: 0 5px !important;
          }
        }
        
        /* Tablets - 601px to 768px */
        @media only screen and (min-width: 601px) and (max-width: 768px) {
          .container {
            width: 100% !important;
            max-width: 100% !important;
          }
          .content {
            padding: 25px 20px !important;
          }
          .header {
            padding: 25px 20px !important;
          }
          .contact-grid {
            width: 100% !important;
          }
          .contact-item {
            width: 33.33% !important;
            padding: 0 8px !important;
            display: table-cell !important;
          }
          .section {
            padding: 18px !important;
          }
        }
        
        /* Small laptops - 769px to 1024px */
        @media only screen and (min-width: 769px) and (max-width: 1024px) {
          .container {
            max-width: 600px !important;
          }
          .content {
            padding: 30px 25px !important;
          }
        }
        
        /* Large laptops and desktops - 1025px and above */
        @media only screen and (min-width: 1025px) {
          .container {
            max-width: 600px !important;
          }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f8f6f0; font-family: Arial, sans-serif;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f6f0;">
        <tr>
          <td align="center" style="padding: 20px 0;">
            <table role="presentation" class="container" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; margin: 0 auto; background-color: #f8f6f0;">
      <!-- Header -->
              <tr>
                <td class="header" style="background: linear-gradient(135deg, #dbbb90 0%, #C2A17B 100%); padding: 30px 20px; text-align: center;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 0 auto 15px;">
                    <tr>
                      <td>
                        <img src="${logoUrl}" alt="Rafaz Properties Logo" class="logo-img" width="150" border="0" style="max-width: 150px; height: auto; display: block; margin: 0 auto; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;" />
                      </td>
                    </tr>
                  </table>
        <h1 style="color: white; font-size: 24px; margin: 0; font-weight: 300; letter-spacing: 1px; font-family: Arial, sans-serif;">RAFAZ PROPERTIES</h1>
        <p style="color: white; font-size: 14px; margin: 8px 0 0 0; opacity: 0.9; font-weight: 300; font-family: Arial, sans-serif;">Premium Properties in Dubai</p>
                </td>
              </tr>

      <!-- Main Content -->
              <tr>
                <td class="content" style="background-color: white; padding: 30px 20px;">
        <!-- Thank You Message -->
                  <table role="presentation" class="thank-you-message" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td style="text-align: center; padding-bottom: 30px;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                          <tr>
                            <td style="width: 50px; height: 50px; background-color: #dbbb90; border-radius: 50%; text-align: center; vertical-align: middle;">
                              <div style="color: white; font-size: 20px; line-height: 50px;">✓</div>
                            </td>
                          </tr>
                        </table>
                        <h2 style="color: #1a202c; font-size: 22px; margin: 15px 0 10px 0; font-weight: 300; font-family: Arial, sans-serif;">Thank You for Contacting Us!</h2>
                        <p style="color: #666; font-size: 16px; margin: 0; line-height: 1.5; font-family: Arial, sans-serif; padding: 0 10px;">
            We've received your message and our team will get back to you within 24 hours.
          </p>
                      </td>
                    </tr>
                  </table>

        <!-- Your Message Details -->
                  <table role="presentation" class="section" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f6f0; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                    <tr>
                      <td>
          <h3 style="color: #1a202c; font-size: 18px; margin: 0 0 15px 0; font-weight: 400; font-family: Arial, sans-serif;">Your Message Details</h3>
                        <table role="presentation" class="info-table" cellspacing="0" cellpadding="0" border="0" width="100%" style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;">
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #1a202c; width: 30%; border-bottom: 1px solid #e0e0e0; font-size: 14px;">Name:</td>
              <td style="padding: 8px 0; color: #666; border-bottom: 1px solid #e0e0e0; font-size: 14px;">${contactData.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #1a202c; width: 30%; border-bottom: 1px solid #e0e0e0; font-size: 14px;">Email:</td>
              <td style="padding: 8px 0; color: #666; border-bottom: 1px solid #e0e0e0; font-size: 14px;">${contactData.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #1a202c; width: 30%; border-bottom: 1px solid #e0e0e0; font-size: 14px;">Phone:</td>
              <td style="padding: 8px 0; color: #666; border-bottom: 1px solid #e0e0e0; font-size: 14px;">${contactData.phone}</td>
            </tr>
            ${contactData.subject ? `
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #1a202c; width: 30%; border-bottom: 1px solid #e0e0e0; font-size: 14px;">Subject:</td>
              <td style="padding: 8px 0; color: #666; border-bottom: 1px solid #e0e0e0; font-size: 14px;">${contactData.subject}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #1a202c; width: 30%; font-size: 14px;">Message:</td>
              <td style="padding: 8px 0; color: #666; font-size: 14px;">${contactData.message}</td>
            </tr>
          </table>
                      </td>
                    </tr>
                  </table>

        <!-- What Happens Next -->
                  <table role="presentation" class="section" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f6f0; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                    <tr>
                      <td>
          <h3 style="color: #1a202c; font-size: 18px; margin: 0 0 15px 0; font-weight: 400; font-family: Arial, sans-serif;">What Happens Next?</h3>
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                          <tr>
                            <td class="step-item" style="padding-bottom: 12px;">
                              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                  <td class="step-number" style="width: 25px; vertical-align: top; padding-right: 12px;">
                                    <div style="width: 25px; height: 25px; background-color: #dbbb90; border-radius: 50%; text-align: center; line-height: 25px;">
                <span style="color: white; font-size: 12px; font-weight: bold; font-family: Arial, sans-serif;">1</span>
              </div>
                                  </td>
                                  <td class="step-content" style="vertical-align: top;">
                <h4 style="color: #1a202c; font-size: 14px; margin: 0 0 3px 0; font-weight: 500; font-family: Arial, sans-serif;">Message Review</h4>
                <p style="color: #666; font-size: 12px; margin: 0; line-height: 1.4; font-family: Arial, sans-serif;">Our team will review your message and prepare a personalized response.</p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td class="step-item" style="padding-bottom: 12px;">
                              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                  <td class="step-number" style="width: 25px; vertical-align: top; padding-right: 12px;">
                                    <div style="width: 25px; height: 25px; background-color: #dbbb90; border-radius: 50%; text-align: center; line-height: 25px;">
                <span style="color: white; font-size: 12px; font-weight: bold; font-family: Arial, sans-serif;">2</span>
              </div>
                                  </td>
                                  <td class="step-content" style="vertical-align: top;">
                <h4 style="color: #1a202c; font-size: 14px; margin: 0 0 3px 0; font-weight: 500; font-family: Arial, sans-serif;">Personal Response</h4>
                <p style="color: #666; font-size: 12px; margin: 0; line-height: 1.4; font-family: Arial, sans-serif;">A team member will contact you directly to address your inquiry.</p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td class="step-item">
                              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                  <td class="step-number" style="width: 25px; vertical-align: top; padding-right: 12px;">
                                    <div style="width: 25px; height: 25px; background-color: #dbbb90; border-radius: 50%; text-align: center; line-height: 25px;">
                <span style="color: white; font-size: 12px; font-weight: bold; font-family: Arial, sans-serif;">3</span>
              </div>
                                  </td>
                                  <td class="step-content" style="vertical-align: top;">
                <h4 style="color: #1a202c; font-size: 14px; margin: 0 0 3px 0; font-weight: 500; font-family: Arial, sans-serif;">Follow-up</h4>
                <p style="color: #666; font-size: 12px; margin: 0; line-height: 1.4; font-family: Arial, sans-serif;">We'll ensure your inquiry is fully resolved and you're satisfied with our service.</p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

        <!-- Contact Information -->
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 30px;">
                    <tr>
                      <td style="text-align: center; padding-bottom: 15px;">
                        <h3 style="color: #1a202c; font-size: 18px; margin: 0; font-weight: 400; font-family: Arial, sans-serif;">Need Immediate Assistance?</h3>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <table role="presentation" class="contact-grid" cellspacing="0" cellpadding="0" border="0" width="100%" style="width: 100%;">
                          <tr>
                            <td class="contact-item" style="text-align: center; width: 33.33%; padding: 0 10px;">
                              <a href="tel:+97143307959" style="text-decoration: none; color: inherit; display: block;">
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 0 auto 12px;">
                                  <tr>
                                    <td class="contact-icon" style="width: 50px; height: 50px; background-color: #dbbb90; border-radius: 50%; text-align: center; vertical-align: middle;">
                                      <div style="color: white; font-size: 20px; line-height: 50px;">📞</div>
                                    </td>
                                  </tr>
                                </table>
                                <p style="color: #1a202c; font-size: 14px; margin: 8px 0 0 0; font-weight: 500; font-family: Arial, sans-serif;">Call Us</p>
                                <p style="color: #666; font-size: 12px; margin: 3px 0 0 0; font-family: Arial, sans-serif; text-decoration: underline;">+971 43 307 959</p>
                              </a>
                            </td>
                            <td class="contact-item" style="text-align: center; width: 33.33%; padding: 0 10px;">
                              <a href="mailto:info@rafazproperties.ae" style="text-decoration: none; color: inherit; display: block;">
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 0 auto 12px;">
                                  <tr>
                                    <td class="contact-icon" style="width: 50px; height: 50px; background-color: #dbbb90; border-radius: 50%; text-align: center; vertical-align: middle;">
                                      <div style="color: white; font-size: 20px; line-height: 50px;">✉️</div>
                                    </td>
                                  </tr>
                                </table>
                                <p style="color: #1a202c; font-size: 14px; margin: 8px 0 0 0; font-weight: 500; font-family: Arial, sans-serif;">Email Us</p>
                                <p style="color: #666; font-size: 12px; margin: 3px 0 0 0; font-family: Arial, sans-serif; text-decoration: underline;">info@rafazproperties.ae</p>
                              </a>
                            </td>
                            <td class="contact-item" style="text-align: center; width: 33.33%; padding: 0 10px;">
                              <a href="https://wa.me/971501608106" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: inherit; display: block;">
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 0 auto 12px;">
                                  <tr>
                                    <td class="contact-icon" style="width: 50px; height: 50px; background-color: #dbbb90; border-radius: 50%; text-align: center; vertical-align: middle;">
                                      <div style="color: white; font-size: 20px; line-height: 50px;">💬</div>
                                    </td>
                                  </tr>
                                </table>
                                <p style="color: #1a202c; font-size: 14px; margin: 8px 0 0 0; font-weight: 500; font-family: Arial, sans-serif;">WhatsApp</p>
                                <p style="color: #666; font-size: 12px; margin: 3px 0 0 0; font-family: Arial, sans-serif; text-decoration: underline;">+971 50 160 8106</p>
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

        <!-- Call to Action -->
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 30px;">
                    <tr>
                      <td style="text-align: center;">
                        <a href="https://rafazproperties.ae" class="cta-button" style="display: inline-block; background: linear-gradient(135deg, #dbbb90 0%, #C2A17B 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 20px; font-weight: 500; font-size: 14px; box-shadow: 0 4px 15px rgba(219, 187, 144, 0.3); font-family: Arial, sans-serif;">
            Visit Our Website
          </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

      <!-- Footer -->
              <tr>
                <td class="footer" style="background-color: #1a202c; padding: 20px; text-align: center;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td style="padding-bottom: 15px;">
          <h3 style="color: #dbbb90; font-size: 18px; margin: 0; font-weight: 300; letter-spacing: 1px; font-family: Arial, sans-serif;">RAFAZ PROPERTIES</h3>
          <p style="color: #999; font-size: 12px; margin: 8px 0 0 0; font-family: Arial, sans-serif;">Your Trusted Partner in Dubai Real Estate</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="border-top: 1px solid #333; padding-top: 15px;">
          <p style="color: #999; font-size: 10px; margin: 0 0 8px 0; font-family: Arial, sans-serif;">
            This email was sent to ${contactData.email} because you contacted us through our website.
          </p>
          <p style="color: #999; font-size: 10px; margin: 0; font-family: Arial, sans-serif;">
            © 2024 Rafaz Properties. All rights reserved. | Dubai, UAE
          </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};
