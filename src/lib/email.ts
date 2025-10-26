import nodemailer from 'nodemailer';
import { generateCustomerConfirmationEmail, generateContactConfirmationEmail } from './email-templates';

// Email configuration
const emailConfig = {
  host: 'smtp.zoho.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'info@rafazproperties.ae',
    pass: 'Rafaz12@@'
  }
};

// Create transporter
const transporter = nodemailer.createTransport(emailConfig);

// Verify connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Email configuration error:', error);
  } else {
    console.log('Email server is ready to take our messages');
  }
});

export interface LeadFormData {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  propertyType?: string;
  budget?: string;
  location?: string;
  source?: string; // Where the form was submitted from
  agentId?: string;
  propertyId?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  service?: string;
}

export const sendLeadEmail = async (leadData: LeadFormData): Promise<boolean> => {
  try {
    // Send internal notification email
    const internalMailOptions = {
      from: 'info@rafazproperties.ae',
      to: 'info@rafazproperties.ae',
      subject: `New Lead from ${leadData.source || 'Website'} - ${leadData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #dbbb90; font-size: 28px; margin: 0;">New Lead Received</h1>
              <p style="color: #666; margin: 10px 0 0 0;">Rafaz Properties</p>
            </div>
            
            <div style="background-color: #f8f6f0; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #1a202c; margin: 0 0 15px 0; font-size: 20px;">Lead Information</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #1a202c; width: 30%;">Name:</td>
                  <td style="padding: 8px 0; color: #666;">${leadData.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #1a202c;">Email:</td>
                  <td style="padding: 8px 0; color: #666;">${leadData.email}</td>
                </tr>
                ${leadData.phone ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #1a202c;">Phone:</td>
                  <td style="padding: 8px 0; color: #666;">${leadData.phone}</td>
                </tr>
                ` : ''}
                ${leadData.propertyType ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #1a202c;">Property Type:</td>
                  <td style="padding: 8px 0; color: #666;">${leadData.propertyType}</td>
                </tr>
                ` : ''}
                ${leadData.budget ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #1a202c;">Budget:</td>
                  <td style="padding: 8px 0; color: #666;">${leadData.budget}</td>
                </tr>
                ` : ''}
                ${leadData.location ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #1a202c;">Location:</td>
                  <td style="padding: 8px 0; color: #666;">${leadData.location}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #1a202c;">Source:</td>
                  <td style="padding: 8px 0; color: #666;">${leadData.source || 'Website'}</td>
                </tr>
                ${leadData.agentId ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #1a202c;">Agent ID:</td>
                  <td style="padding: 8px 0; color: #666;">${leadData.agentId}</td>
                </tr>
                ` : ''}
                ${leadData.propertyId ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #1a202c;">Property ID:</td>
                  <td style="padding: 8px 0; color: #666;">${leadData.propertyId}</td>
                </tr>
                ` : ''}
              </table>
            </div>
            
            ${leadData.message ? `
            <div style="background-color: #f8f6f0; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #1a202c; margin: 0 0 15px 0; font-size: 18px;">Message</h3>
              <p style="color: #666; line-height: 1.6; margin: 0;">${leadData.message}</p>
            </div>
            ` : ''}
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #999; font-size: 14px; margin: 0;">
                This lead was submitted from the Rafaz Properties website.<br>
                Please respond to the customer within 24 hours for best results.
              </p>
            </div>
          </div>
        </div>
      `
    };

    const internalInfo = await transporter.sendMail(internalMailOptions);
    console.log('Internal lead email sent successfully:', internalInfo.messageId);

    // Send confirmation email to customer
    const customerMailOptions = {
      from: 'info@rafazproperties.ae',
      to: leadData.email,
      subject: `Thank You for Your Interest - Rafaz Properties`,
      html: generateCustomerConfirmationEmail(leadData)
    };

    const customerInfo = await transporter.sendMail(customerMailOptions);
    console.log('Customer confirmation email sent successfully:', customerInfo.messageId);
    
    return true;
  } catch (error) {
    console.error('Error sending lead email:', error);
    return false;
  }
};

export const sendContactEmail = async (contactData: ContactFormData): Promise<boolean> => {
  try {
    // Send internal notification email
    const internalMailOptions = {
      from: 'info@rafazproperties.ae',
      to: 'info@rafazproperties.ae',
      subject: `Contact Form Submission - ${contactData.subject || 'General Inquiry'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #dbbb90; font-size: 28px; margin: 0;">Contact Form Submission</h1>
              <p style="color: #666; margin: 10px 0 0 0;">Rafaz Properties</p>
            </div>
            
            <div style="background-color: #f8f6f0; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #1a202c; margin: 0 0 15px 0; font-size: 20px;">Contact Information</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #1a202c; width: 30%;">Name:</td>
                  <td style="padding: 8px 0; color: #666;">${contactData.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #1a202c;">Email:</td>
                  <td style="padding: 8px 0; color: #666;">${contactData.email}</td>
                </tr>
                ${contactData.phone ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #1a202c;">Phone:</td>
                  <td style="padding: 8px 0; color: #666;">${contactData.phone}</td>
                </tr>
                ` : ''}
                ${contactData.subject ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #1a202c;">Subject:</td>
                  <td style="padding: 8px 0; color: #666;">${contactData.subject}</td>
                </tr>
                ` : ''}
                ${contactData.service ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #1a202c;">Service:</td>
                  <td style="padding: 8px 0; color: #666;">${contactData.service}</td>
                </tr>
                ` : ''}
              </table>
            </div>
            
            <div style="background-color: #f8f6f0; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #1a202c; margin: 0 0 15px 0; font-size: 18px;">Message</h3>
              <p style="color: #666; line-height: 1.6; margin: 0;">${contactData.message}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #999; font-size: 14px; margin: 0;">
                This message was submitted from the Rafaz Properties website.<br>
                Please respond to the customer within 24 hours for best results.
              </p>
            </div>
          </div>
        </div>
      `
    };

    const internalInfo = await transporter.sendMail(internalMailOptions);
    console.log('Internal contact email sent successfully:', internalInfo.messageId);

    // Send confirmation email to customer
    const customerMailOptions = {
      from: 'info@rafazproperties.ae',
      to: contactData.email,
      subject: `Thank You for Contacting Us - Rafaz Properties`,
      html: generateContactConfirmationEmail(contactData)
    };

    const customerInfo = await transporter.sendMail(customerMailOptions);
    console.log('Customer contact confirmation email sent successfully:', customerInfo.messageId);
    
    return true;
  } catch (error) {
    console.error('Error sending contact email:', error);
    return false;
  }
};

// Generate premium contact confirmation email
const generateContactConfirmationEmail = (contactData: ContactFormData): string => {
  return `
    <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f8f6f0;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #dbbb90 0%, #C2A17B 100%); padding: 40px 30px; text-align: center;">
        <div style="background-color: white; width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
          <div style="font-size: 32px; color: #dbbb90; font-weight: bold;">R</div>
        </div>
        <h1 style="color: white; font-size: 32px; margin: 0; font-weight: 300; letter-spacing: 2px;">RAFAZ PROPERTIES</h1>
        <p style="color: white; font-size: 16px; margin: 10px 0 0 0; opacity: 0.9; font-weight: 300;">Premium Real Estate in Dubai</p>
      </div>

      <!-- Main Content -->
      <div style="background-color: white; padding: 50px 30px; margin: 0;">
        <!-- Thank You Message -->
        <div style="text-align: center; margin-bottom: 40px;">
          <div style="width: 60px; height: 60px; background-color: #dbbb90; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
            <div style="color: white; font-size: 24px;">✓</div>
          </div>
          <h2 style="color: #1a202c; font-size: 28px; margin: 0 0 15px 0; font-weight: 300;">Thank You for Contacting Us!</h2>
          <p style="color: #666; font-size: 18px; margin: 0; line-height: 1.6;">
            We've received your message and our team will get back to you within 24 hours.
          </p>
        </div>

        <!-- Your Message Details -->
        <div style="background-color: #f8f6f0; padding: 30px; border-radius: 10px; margin-bottom: 40px;">
          <h3 style="color: #1a202c; font-size: 20px; margin: 0 0 20px 0; font-weight: 400;">Your Message Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; font-weight: 600; color: #1a202c; width: 30%; border-bottom: 1px solid #e0e0e0;">Name:</td>
              <td style="padding: 12px 0; color: #666; border-bottom: 1px solid #e0e0e0;">${contactData.name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; font-weight: 600; color: #1a202c; width: 30%; border-bottom: 1px solid #e0e0e0;">Email:</td>
              <td style="padding: 12px 0; color: #666; border-bottom: 1px solid #e0e0e0;">${contactData.email}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; font-weight: 600; color: #1a202c; width: 30%; border-bottom: 1px solid #e0e0e0;">Phone:</td>
              <td style="padding: 12px 0; color: #666; border-bottom: 1px solid #e0e0e0;">${contactData.phone}</td>
            </tr>
            ${contactData.subject ? `
            <tr>
              <td style="padding: 12px 0; font-weight: 600; color: #1a202c; width: 30%; border-bottom: 1px solid #e0e0e0;">Subject:</td>
              <td style="padding: 12px 0; color: #666; border-bottom: 1px solid #e0e0e0;">${contactData.subject}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 12px 0; font-weight: 600; color: #1a202c; width: 30%;">Message:</td>
              <td style="padding: 12px 0; color: #666;">${contactData.message}</td>
            </tr>
          </table>
        </div>

        <!-- What Happens Next -->
        <div style="background-color: #f8f6f0; padding: 30px; border-radius: 10px; margin-bottom: 40px;">
          <h3 style="color: #1a202c; font-size: 20px; margin: 0 0 20px 0; font-weight: 400;">What Happens Next?</h3>
          <div style="display: flex; flex-direction: column; gap: 15px;">
            <div style="display: flex; align-items: flex-start; gap: 15px;">
              <div style="width: 30px; height: 30px; background-color: #dbbb90; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
                <span style="color: white; font-size: 14px; font-weight: bold;">1</span>
              </div>
              <div>
                <h4 style="color: #1a202c; font-size: 16px; margin: 0 0 5px 0; font-weight: 500;">Message Review</h4>
                <p style="color: #666; font-size: 14px; margin: 0; line-height: 1.5;">Our team will review your message and prepare a personalized response.</p>
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 15px;">
              <div style="width: 30px; height: 30px; background-color: #dbbb90; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
                <span style="color: white; font-size: 14px; font-weight: bold;">2</span>
              </div>
              <div>
                <h4 style="color: #1a202c; font-size: 16px; margin: 0 0 5px 0; font-weight: 500;">Personal Response</h4>
                <p style="color: #666; font-size: 14px; margin: 0; line-height: 1.5;">A team member will contact you directly to address your inquiry.</p>
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 15px;">
              <div style="width: 30px; height: 30px; background-color: #dbbb90; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
                <span style="color: white; font-size: 14px; font-weight: bold;">3</span>
              </div>
              <div>
                <h4 style="color: #1a202c; font-size: 16px; margin: 0 0 5px 0; font-weight: 500;">Follow-up</h4>
                <p style="color: #666; font-size: 14px; margin: 0; line-height: 1.5;">We'll ensure your inquiry is fully resolved and you're satisfied with our service.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Information -->
        <div style="text-align: center; margin-bottom: 40px;">
          <h3 style="color: #1a202c; font-size: 20px; margin: 0 0 20px 0; font-weight: 400;">Need Immediate Assistance?</h3>
          <div style="display: flex; justify-content: center; gap: 30px; flex-wrap: wrap;">
            <div style="text-align: center;">
              <div style="width: 50px; height: 50px; background-color: #dbbb90; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px;">
                <span style="color: white; font-size: 20px;">📞</span>
              </div>
              <p style="color: #1a202c; font-size: 16px; margin: 0; font-weight: 500;">Call Us</p>
              <p style="color: #666; font-size: 14px; margin: 5px 0 0 0;">+971 4 XXX XXXX</p>
            </div>
            <div style="text-align: center;">
              <div style="width: 50px; height: 50px; background-color: #dbbb90; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px;">
                <span style="color: white; font-size: 20px;">✉️</span>
              </div>
              <p style="color: #1a202c; font-size: 16px; margin: 0; font-weight: 500;">Email Us</p>
              <p style="color: #666; font-size: 14px; margin: 5px 0 0 0;">info@rafazproperties.ae</p>
            </div>
            <div style="text-align: center;">
              <div style="width: 50px; height: 50px; background-color: #dbbb90; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px;">
                <span style="color: white; font-size: 20px;">💬</span>
              </div>
              <p style="color: #1a202c; font-size: 16px; margin: 0; font-weight: 500;">WhatsApp</p>
              <p style="color: #666; font-size: 14px; margin: 5px 0 0 0;">+971 XX XXX XXXX</p>
            </div>
          </div>
        </div>

        <!-- Call to Action -->
        <div style="text-align: center; margin-bottom: 40px;">
          <a href="https://rafazproperties.ae" style="display: inline-block; background: linear-gradient(135deg, #dbbb90 0%, #C2A17B 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: 500; font-size: 16px; box-shadow: 0 4px 15px rgba(219, 187, 144, 0.3);">
            Visit Our Website
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div style="background-color: #1a202c; padding: 30px; text-align: center;">
        <div style="margin-bottom: 20px;">
          <h3 style="color: #dbbb90; font-size: 24px; margin: 0; font-weight: 300; letter-spacing: 2px;">RAFAZ PROPERTIES</h3>
          <p style="color: #999; font-size: 14px; margin: 10px 0 0 0;">Your Trusted Partner in Dubai Real Estate</p>
        </div>
        <div style="border-top: 1px solid #333; padding-top: 20px;">
          <p style="color: #999; font-size: 12px; margin: 0 0 10px 0;">
            This email was sent to ${contactData.email} because you contacted us through our website.
          </p>
          <p style="color: #999; font-size: 12px; margin: 0;">
            © 2024 Rafaz Properties. All rights reserved. | Dubai, UAE
          </p>
        </div>
      </div>
    </div>
  `;
};

// Generate premium customer confirmation email
const generateCustomerConfirmationEmail = (leadData: LeadFormData): string => {
  return `
    <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f8f6f0;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #dbbb90 0%, #C2A17B 100%); padding: 40px 30px; text-align: center;">
        <div style="background-color: white; width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
          <div style="font-size: 32px; color: #dbbb90; font-weight: bold;">R</div>
        </div>
        <h1 style="color: white; font-size: 32px; margin: 0; font-weight: 300; letter-spacing: 2px;">RAFAZ PROPERTIES</h1>
        <p style="color: white; font-size: 16px; margin: 10px 0 0 0; opacity: 0.9; font-weight: 300;">Premium Real Estate in Dubai</p>
      </div>

      <!-- Main Content -->
      <div style="background-color: white; padding: 50px 30px; margin: 0;">
        <!-- Thank You Message -->
        <div style="text-align: center; margin-bottom: 40px;">
          <div style="width: 60px; height: 60px; background-color: #dbbb90; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
            <div style="color: white; font-size: 24px;">✓</div>
          </div>
          <h2 style="color: #1a202c; font-size: 28px; margin: 0 0 15px 0; font-weight: 300;">Thank You, ${leadData.name}!</h2>
          <p style="color: #666; font-size: 18px; margin: 0; line-height: 1.6;">
            We've received your inquiry and our expert team will contact you within 24 hours to discuss your property requirements.
          </p>
        </div>

        <!-- Your Inquiry Details -->
        <div style="background-color: #f8f6f0; padding: 30px; border-radius: 10px; margin-bottom: 40px;">
          <h3 style="color: #1a202c; font-size: 20px; margin: 0 0 20px 0; font-weight: 400;">Your Inquiry Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; font-weight: 600; color: #1a202c; width: 30%; border-bottom: 1px solid #e0e0e0;">Name:</td>
              <td style="padding: 12px 0; color: #666; border-bottom: 1px solid #e0e0e0;">${leadData.name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; font-weight: 600; color: #1a202c; width: 30%; border-bottom: 1px solid #e0e0e0;">Email:</td>
              <td style="padding: 12px 0; color: #666; border-bottom: 1px solid #e0e0e0;">${leadData.email}</td>
            </tr>
            ${leadData.phone ? `
            <tr>
              <td style="padding: 12px 0; font-weight: 600; color: #1a202c; width: 30%; border-bottom: 1px solid #e0e0e0;">Phone:</td>
              <td style="padding: 12px 0; color: #666; border-bottom: 1px solid #e0e0e0;">${leadData.phone}</td>
            </tr>
            ` : ''}
            ${leadData.propertyType ? `
            <tr>
              <td style="padding: 12px 0; font-weight: 600; color: #1a202c; width: 30%; border-bottom: 1px solid #e0e0e0;">Property Type:</td>
              <td style="padding: 12px 0; color: #666; border-bottom: 1px solid #e0e0e0;">${leadData.propertyType}</td>
            </tr>
            ` : ''}
            ${leadData.budget ? `
            <tr>
              <td style="padding: 12px 0; font-weight: 600; color: #1a202c; width: 30%; border-bottom: 1px solid #e0e0e0;">Budget:</td>
              <td style="padding: 12px 0; color: #666; border-bottom: 1px solid #e0e0e0;">${leadData.budget}</td>
            </tr>
            ` : ''}
            ${leadData.location ? `
            <tr>
              <td style="padding: 12px 0; font-weight: 600; color: #1a202c; width: 30%; border-bottom: 1px solid #e0e0e0;">Location:</td>
              <td style="padding: 12px 0; color: #666; border-bottom: 1px solid #e0e0e0;">${leadData.location}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 12px 0; font-weight: 600; color: #1a202c; width: 30%;">Inquiry Source:</td>
              <td style="padding: 12px 0; color: #666;">${leadData.source || 'Website'}</td>
            </tr>
          </table>
        </div>

        ${leadData.message ? `
        <!-- Your Message -->
        <div style="background-color: #f8f6f0; padding: 30px; border-radius: 10px; margin-bottom: 40px;">
          <h3 style="color: #1a202c; font-size: 20px; margin: 0 0 15px 0; font-weight: 400;">Your Message</h3>
          <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0; font-style: italic;">"${leadData.message}"</p>
        </div>
        ` : ''}

        <!-- What Happens Next -->
        <div style="background-color: #f8f6f0; padding: 30px; border-radius: 10px; margin-bottom: 40px;">
          <h3 style="color: #1a202c; font-size: 20px; margin: 0 0 20px 0; font-weight: 400;">What Happens Next?</h3>
          <div style="display: flex; flex-direction: column; gap: 15px;">
            <div style="display: flex; align-items: flex-start; gap: 15px;">
              <div style="width: 30px; height: 30px; background-color: #dbbb90; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
                <span style="color: white; font-size: 14px; font-weight: bold;">1</span>
              </div>
              <div>
                <h4 style="color: #1a202c; font-size: 16px; margin: 0 0 5px 0; font-weight: 500;">Expert Review</h4>
                <p style="color: #666; font-size: 14px; margin: 0; line-height: 1.5;">Our team will review your requirements and match you with the best properties.</p>
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 15px;">
              <div style="width: 30px; height: 30px; background-color: #dbbb90; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
                <span style="color: white; font-size: 14px; font-weight: bold;">2</span>
              </div>
              <div>
                <h4 style="color: #1a202c; font-size: 16px; margin: 0 0 5px 0; font-weight: 500;">Personal Contact</h4>
                <p style="color: #666; font-size: 14px; margin: 0; line-height: 1.5;">A dedicated agent will contact you within 24 hours to discuss your needs.</p>
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 15px;">
              <div style="width: 30px; height: 30px; background-color: #dbbb90; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
                <span style="color: white; font-size: 14px; font-weight: bold;">3</span>
              </div>
              <div>
                <h4 style="color: #1a202c; font-size: 16px; margin: 0 0 5px 0; font-weight: 500;">Property Showcase</h4>
                <p style="color: #666; font-size: 14px; margin: 0; line-height: 1.5;">We'll present you with curated properties that match your criteria.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Information -->
        <div style="text-align: center; margin-bottom: 40px;">
          <h3 style="color: #1a202c; font-size: 20px; margin: 0 0 20px 0; font-weight: 400;">Need Immediate Assistance?</h3>
          <div style="display: flex; justify-content: center; gap: 30px; flex-wrap: wrap;">
            <div style="text-align: center;">
              <div style="width: 50px; height: 50px; background-color: #dbbb90; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px;">
                <span style="color: white; font-size: 20px;">📞</span>
              </div>
              <p style="color: #1a202c; font-size: 16px; margin: 0; font-weight: 500;">Call Us</p>
              <p style="color: #666; font-size: 14px; margin: 5px 0 0 0;">+971 4 XXX XXXX</p>
            </div>
            <div style="text-align: center;">
              <div style="width: 50px; height: 50px; background-color: #dbbb90; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px;">
                <span style="color: white; font-size: 20px;">✉️</span>
              </div>
              <p style="color: #1a202c; font-size: 16px; margin: 0; font-weight: 500;">Email Us</p>
              <p style="color: #666; font-size: 14px; margin: 5px 0 0 0;">info@rafazproperties.ae</p>
            </div>
            <div style="text-align: center;">
              <div style="width: 50px; height: 50px; background-color: #dbbb90; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px;">
                <span style="color: white; font-size: 20px;">💬</span>
              </div>
              <p style="color: #1a202c; font-size: 16px; margin: 0; font-weight: 500;">WhatsApp</p>
              <p style="color: #666; font-size: 14px; margin: 5px 0 0 0;">+971 XX XXX XXXX</p>
            </div>
          </div>
        </div>

        <!-- Call to Action -->
        <div style="text-align: center; margin-bottom: 40px;">
          <a href="https://rafazproperties.ae" style="display: inline-block; background: linear-gradient(135deg, #dbbb90 0%, #C2A17B 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: 500; font-size: 16px; box-shadow: 0 4px 15px rgba(219, 187, 144, 0.3);">
            Browse Our Properties
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div style="background-color: #1a202c; padding: 30px; text-align: center;">
        <div style="margin-bottom: 20px;">
          <h3 style="color: #dbbb90; font-size: 24px; margin: 0; font-weight: 300; letter-spacing: 2px;">RAFAZ PROPERTIES</h3>
          <p style="color: #999; font-size: 14px; margin: 10px 0 0 0;">Your Trusted Partner in Dubai Real Estate</p>
        </div>
        <div style="border-top: 1px solid #333; padding-top: 20px;">
          <p style="color: #999; font-size: 12px; margin: 0 0 10px 0;">
            This email was sent to ${leadData.email} because you submitted an inquiry on our website.
          </p>
          <p style="color: #999; font-size: 12px; margin: 0;">
            © 2024 Rafaz Properties. All rights reserved. | Dubai, UAE
          </p>
        </div>
      </div>
    </div>
  `;
};

export default transporter;
