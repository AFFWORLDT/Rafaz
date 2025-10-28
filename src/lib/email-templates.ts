// Email templates with real contact information and mobile-optimized design
import { config } from './config';

export const generateCustomerConfirmationEmail = (leadData: any): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f8f6f0;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #dbbb90 0%, #C2A17B 100%); padding: 30px 20px; text-align: center;">
        <img src="${config.site.url}/file.png" alt="Rafaz Properties" style="width: 60px; height: 60px; margin: 0 auto 15px; display: block; object-fit: contain;" />
        <h1 style="color: white; font-size: 24px; margin: 0; font-weight: 300; letter-spacing: 1px; font-family: Arial, sans-serif;">RAFAZ PROPERTIES</h1>
        <p style="color: white; font-size: 14px; margin: 8px 0 0 0; opacity: 0.9; font-weight: 300; font-family: Arial, sans-serif;">Premium Real Estate in Dubai</p>
      </div>

      <!-- Main Content -->
      <div style="background-color: white; padding: 30px 20px; margin: 0;">
        <!-- Thank You Message -->
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="width: 50px; height: 50px; background-color: #dbbb90; border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center;">
            <div style="color: white; font-size: 20px;">✓</div>
          </div>
          <h2 style="color: #1a202c; font-size: 22px; margin: 0 0 10px 0; font-weight: 300; font-family: Arial, sans-serif;">Thank You, ${leadData.name}!</h2>
          <p style="color: #666; font-size: 16px; margin: 0; line-height: 1.5; font-family: Arial, sans-serif;">
            We've received your inquiry and our expert team will contact you within 24 hours to discuss your property requirements.
          </p>
        </div>

        <!-- Your Inquiry Details -->
        <div style="background-color: #f8f6f0; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
          <h3 style="color: #1a202c; font-size: 18px; margin: 0 0 15px 0; font-weight: 400; font-family: Arial, sans-serif;">Your Inquiry Details</h3>
          <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;">
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
        </div>

        ${leadData.message ? `
        <!-- Your Message -->
        <div style="background-color: #f8f6f0; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
          <h3 style="color: #1a202c; font-size: 18px; margin: 0 0 10px 0; font-weight: 400; font-family: Arial, sans-serif;">Your Message</h3>
          <p style="color: #666; font-size: 14px; line-height: 1.5; margin: 0; font-style: italic; font-family: Arial, sans-serif;">"${leadData.message}"</p>
        </div>
        ` : ''}

        <!-- What Happens Next -->
        <div style="background-color: #f8f6f0; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
          <h3 style="color: #1a202c; font-size: 18px; margin: 0 0 15px 0; font-weight: 400; font-family: Arial, sans-serif;">What Happens Next?</h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; align-items: flex-start; gap: 12px;">
              <div style="width: 25px; height: 25px; background-color: #dbbb90; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
                <span style="color: white; font-size: 12px; font-weight: bold; font-family: Arial, sans-serif;">1</span>
              </div>
              <div>
                <h4 style="color: #1a202c; font-size: 14px; margin: 0 0 3px 0; font-weight: 500; font-family: Arial, sans-serif;">Expert Review</h4>
                <p style="color: #666; font-size: 12px; margin: 0; line-height: 1.4; font-family: Arial, sans-serif;">Our team will review your requirements and match you with the best properties.</p>
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 12px;">
              <div style="width: 25px; height: 25px; background-color: #dbbb90; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
                <span style="color: white; font-size: 12px; font-weight: bold; font-family: Arial, sans-serif;">2</span>
              </div>
              <div>
                <h4 style="color: #1a202c; font-size: 14px; margin: 0 0 3px 0; font-weight: 500; font-family: Arial, sans-serif;">Personal Contact</h4>
                <p style="color: #666; font-size: 12px; margin: 0; line-height: 1.4; font-family: Arial, sans-serif;">A dedicated agent will contact you within 24 hours to discuss your needs.</p>
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 12px;">
              <div style="width: 25px; height: 25px; background-color: #dbbb90; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
                <span style="color: white; font-size: 12px; font-weight: bold; font-family: Arial, sans-serif;">3</span>
              </div>
              <div>
                <h4 style="color: #1a202c; font-size: 14px; margin: 0 0 3px 0; font-weight: 500; font-family: Arial, sans-serif;">Property Showcase</h4>
                <p style="color: #666; font-size: 12px; margin: 0; line-height: 1.4; font-family: Arial, sans-serif;">We'll present you with curated properties that match your criteria.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Information -->
        <div style="text-align: center; margin-bottom: 30px;">
          <h3 style="color: #1a202c; font-size: 18px; margin: 0 0 15px 0; font-weight: 400; font-family: Arial, sans-serif;">Need Immediate Assistance?</h3>
          <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
            <div style="text-align: center;">
              <div style="width: 40px; height: 40px; background-color: #dbbb90; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px;">
                <span style="color: white; font-size: 16px;">📞</span>
              </div>
              <p style="color: #1a202c; font-size: 14px; margin: 0; font-weight: 500; font-family: Arial, sans-serif;">Call Us</p>
              <p style="color: #666; font-size: 12px; margin: 3px 0 0 0; font-family: Arial, sans-serif;">+971 4 123 4567</p>
            </div>
            <div style="text-align: center;">
              <div style="width: 40px; height: 40px; background-color: #dbbb90; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px;">
                <span style="color: white; font-size: 16px;">✉️</span>
              </div>
              <p style="color: #1a202c; font-size: 14px; margin: 0; font-weight: 500; font-family: Arial, sans-serif;">Email Us</p>
              <p style="color: #666; font-size: 12px; margin: 3px 0 0 0; font-family: Arial, sans-serif;">info@rafazproperties.ae</p>
            </div>
            <div style="text-align: center;">
              <div style="width: 40px; height: 40px; background-color: #dbbb90; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px;">
                <span style="color: white; font-size: 16px;">💬</span>
              </div>
              <p style="color: #1a202c; font-size: 14px; margin: 0; font-weight: 500; font-family: Arial, sans-serif;">WhatsApp</p>
              <p style="color: #666; font-size: 12px; margin: 3px 0 0 0; font-family: Arial, sans-serif;">+971 50 123 4567</p>
            </div>
          </div>
        </div>

        <!-- Call to Action -->
        <div style="text-align: center; margin-bottom: 30px;">
          <a href="https://rafazproperties.ae" style="display: inline-block; background: linear-gradient(135deg, #dbbb90 0%, #C2A17B 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 20px; font-weight: 500; font-size: 14px; box-shadow: 0 4px 15px rgba(219, 187, 144, 0.3); font-family: Arial, sans-serif;">
            Browse Our Properties
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div style="background-color: #1a202c; padding: 20px; text-align: center;">
        <div style="margin-bottom: 15px;">
          <h3 style="color: #dbbb90; font-size: 18px; margin: 0; font-weight: 300; letter-spacing: 1px; font-family: Arial, sans-serif;">RAFAZ PROPERTIES</h3>
          <p style="color: #999; font-size: 12px; margin: 8px 0 0 0; font-family: Arial, sans-serif;">Your Trusted Partner in Dubai Real Estate</p>
        </div>
        <div style="border-top: 1px solid #333; padding-top: 15px;">
          <p style="color: #999; font-size: 10px; margin: 0 0 8px 0; font-family: Arial, sans-serif;">
            This email was sent to ${leadData.email} because you submitted an inquiry on our website.
          </p>
          <p style="color: #999; font-size: 10px; margin: 0; font-family: Arial, sans-serif;">
            © 2024 Rafaz Properties. All rights reserved. | Dubai, UAE
          </p>
        </div>
      </div>
    </div>
  `;
};

export const generateContactConfirmationEmail = (contactData: any): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f8f6f0;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #dbbb90 0%, #C2A17B 100%); padding: 30px 20px; text-align: center;">
        <img src="${config.site.url}/file.png" alt="Rafaz Properties" style="width: 60px; height: 60px; margin: 0 auto 15px; display: block; object-fit: contain;" />
        <h1 style="color: white; font-size: 24px; margin: 0; font-weight: 300; letter-spacing: 1px; font-family: Arial, sans-serif;">RAFAZ PROPERTIES</h1>
        <p style="color: white; font-size: 14px; margin: 8px 0 0 0; opacity: 0.9; font-weight: 300; font-family: Arial, sans-serif;">Premium Real Estate in Dubai</p>
      </div>

      <!-- Main Content -->
      <div style="background-color: white; padding: 30px 20px; margin: 0;">
        <!-- Thank You Message -->
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="width: 50px; height: 50px; background-color: #dbbb90; border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center;">
            <div style="color: white; font-size: 20px;">✓</div>
          </div>
          <h2 style="color: #1a202c; font-size: 22px; margin: 0 0 10px 0; font-weight: 300; font-family: Arial, sans-serif;">Thank You for Contacting Us!</h2>
          <p style="color: #666; font-size: 16px; margin: 0; line-height: 1.5; font-family: Arial, sans-serif;">
            We've received your message and our team will get back to you within 24 hours.
          </p>
        </div>

        <!-- Your Message Details -->
        <div style="background-color: #f8f6f0; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
          <h3 style="color: #1a202c; font-size: 18px; margin: 0 0 15px 0; font-weight: 400; font-family: Arial, sans-serif;">Your Message Details</h3>
          <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;">
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
        </div>

        <!-- What Happens Next -->
        <div style="background-color: #f8f6f0; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
          <h3 style="color: #1a202c; font-size: 18px; margin: 0 0 15px 0; font-weight: 400; font-family: Arial, sans-serif;">What Happens Next?</h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; align-items: flex-start; gap: 12px;">
              <div style="width: 25px; height: 25px; background-color: #dbbb90; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
                <span style="color: white; font-size: 12px; font-weight: bold; font-family: Arial, sans-serif;">1</span>
              </div>
              <div>
                <h4 style="color: #1a202c; font-size: 14px; margin: 0 0 3px 0; font-weight: 500; font-family: Arial, sans-serif;">Message Review</h4>
                <p style="color: #666; font-size: 12px; margin: 0; line-height: 1.4; font-family: Arial, sans-serif;">Our team will review your message and prepare a personalized response.</p>
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 12px;">
              <div style="width: 25px; height: 25px; background-color: #dbbb90; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
                <span style="color: white; font-size: 12px; font-weight: bold; font-family: Arial, sans-serif;">2</span>
              </div>
              <div>
                <h4 style="color: #1a202c; font-size: 14px; margin: 0 0 3px 0; font-weight: 500; font-family: Arial, sans-serif;">Personal Response</h4>
                <p style="color: #666; font-size: 12px; margin: 0; line-height: 1.4; font-family: Arial, sans-serif;">A team member will contact you directly to address your inquiry.</p>
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 12px;">
              <div style="width: 25px; height: 25px; background-color: #dbbb90; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
                <span style="color: white; font-size: 12px; font-weight: bold; font-family: Arial, sans-serif;">3</span>
              </div>
              <div>
                <h4 style="color: #1a202c; font-size: 14px; margin: 0 0 3px 0; font-weight: 500; font-family: Arial, sans-serif;">Follow-up</h4>
                <p style="color: #666; font-size: 12px; margin: 0; line-height: 1.4; font-family: Arial, sans-serif;">We'll ensure your inquiry is fully resolved and you're satisfied with our service.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Information -->
        <div style="text-align: center; margin-bottom: 30px;">
          <h3 style="color: #1a202c; font-size: 18px; margin: 0 0 15px 0; font-weight: 400; font-family: Arial, sans-serif;">Need Immediate Assistance?</h3>
          <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
            <div style="text-align: center;">
              <div style="width: 40px; height: 40px; background-color: #dbbb90; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px;">
                <span style="color: white; font-size: 16px;">📞</span>
              </div>
              <p style="color: #1a202c; font-size: 14px; margin: 0; font-weight: 500; font-family: Arial, sans-serif;">Call Us</p>
              <p style="color: #666; font-size: 12px; margin: 3px 0 0 0; font-family: Arial, sans-serif;">+971 4 123 4567</p>
            </div>
            <div style="text-align: center;">
              <div style="width: 40px; height: 40px; background-color: #dbbb90; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px;">
                <span style="color: white; font-size: 16px;">✉️</span>
              </div>
              <p style="color: #1a202c; font-size: 14px; margin: 0; font-weight: 500; font-family: Arial, sans-serif;">Email Us</p>
              <p style="color: #666; font-size: 12px; margin: 3px 0 0 0; font-family: Arial, sans-serif;">info@rafazproperties.ae</p>
            </div>
            <div style="text-align: center;">
              <div style="width: 40px; height: 40px; background-color: #dbbb90; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px;">
                <span style="color: white; font-size: 16px;">💬</span>
              </div>
              <p style="color: #1a202c; font-size: 14px; margin: 0; font-weight: 500; font-family: Arial, sans-serif;">WhatsApp</p>
              <p style="color: #666; font-size: 12px; margin: 3px 0 0 0; font-family: Arial, sans-serif;">+971 50 123 4567</p>
            </div>
          </div>
        </div>

        <!-- Call to Action -->
        <div style="text-align: center; margin-bottom: 30px;">
          <a href="https://rafazproperties.ae" style="display: inline-block; background: linear-gradient(135deg, #dbbb90 0%, #C2A17B 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 20px; font-weight: 500; font-size: 14px; box-shadow: 0 4px 15px rgba(219, 187, 144, 0.3); font-family: Arial, sans-serif;">
            Visit Our Website
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div style="background-color: #1a202c; padding: 20px; text-align: center;">
        <div style="margin-bottom: 15px;">
          <h3 style="color: #dbbb90; font-size: 18px; margin: 0; font-weight: 300; letter-spacing: 1px; font-family: Arial, sans-serif;">RAFAZ PROPERTIES</h3>
          <p style="color: #999; font-size: 12px; margin: 8px 0 0 0; font-family: Arial, sans-serif;">Your Trusted Partner in Dubai Real Estate</p>
        </div>
        <div style="border-top: 1px solid #333; padding-top: 15px;">
          <p style="color: #999; font-size: 10px; margin: 0 0 8px 0; font-family: Arial, sans-serif;">
            This email was sent to ${contactData.email} because you contacted us through our website.
          </p>
          <p style="color: #999; font-size: 10px; margin: 0; font-family: Arial, sans-serif;">
            © 2024 Rafaz Properties. All rights reserved. | Dubai, UAE
          </p>
        </div>
      </div>
    </div>
  `;
};
