import nodemailer from 'nodemailer';
import { generateCustomerConfirmationEmail, generateContactConfirmationEmail } from './email-templates';

// Email configuration - using environment variables for security
const emailConfig = {
  host: process.env.ZOHO_SMTP_HOST || 'smtp.zoho.com',
  port: parseInt(process.env.ZOHO_SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.ZOHO_EMAIL_USER || 'info@rafazproperties.ae',
    pass: process.env.ZOHO_EMAIL_PASSWORD || 'Rafaz@@12'
  }
};

// Email recipient - always send to info@rafazproperties.ae
const RECIPIENT_EMAIL = 'info@rafazproperties.ae';
const FROM_EMAIL = 'info@rafazproperties.ae';

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

// Helper function to escape HTML to prevent XSS attacks
const escapeHtml = (text: string | undefined): string => {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

export const sendLeadEmail = async (leadData: LeadFormData): Promise<boolean> => {
  try {
    // Send internal notification email to info@rafazproperties.ae
    const internalMailOptions = {
      from: FROM_EMAIL,
      to: RECIPIENT_EMAIL,
      subject: `New Lead from ${escapeHtml(leadData.source || 'Website')} - ${escapeHtml(leadData.name)}`,
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
                  <td style="padding: 8px 0; color: #666;">${escapeHtml(leadData.name)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #1a202c;">Email:</td>
                  <td style="padding: 8px 0; color: #666;">${escapeHtml(leadData.email)}</td>
                </tr>
                ${leadData.phone ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #1a202c;">Phone:</td>
                  <td style="padding: 8px 0; color: #666;">${escapeHtml(leadData.phone)}</td>
                </tr>
                ` : ''}
                ${leadData.propertyType ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #1a202c;">Property Type:</td>
                  <td style="padding: 8px 0; color: #666;">${escapeHtml(leadData.propertyType)}</td>
                </tr>
                ` : ''}
                ${leadData.budget ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #1a202c;">Budget:</td>
                  <td style="padding: 8px 0; color: #666;">${escapeHtml(leadData.budget)}</td>
                </tr>
                ` : ''}
                ${leadData.location ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #1a202c;">Location:</td>
                  <td style="padding: 8px 0; color: #666;">${escapeHtml(leadData.location)}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #1a202c;">Source:</td>
                  <td style="padding: 8px 0; color: #666;">${escapeHtml(leadData.source || 'Website')}</td>
                </tr>
                ${leadData.agentId ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #1a202c;">Agent ID:</td>
                  <td style="padding: 8px 0; color: #666;">${escapeHtml(leadData.agentId)}</td>
                </tr>
                ` : ''}
                ${leadData.propertyId ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #1a202c;">Property ID:</td>
                  <td style="padding: 8px 0; color: #666;">${escapeHtml(leadData.propertyId)}</td>
                </tr>
                ` : ''}
              </table>
            </div>
            
            ${leadData.message ? `
            <div style="background-color: #f8f6f0; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #1a202c; margin: 0 0 15px 0; font-size: 18px;">Message</h3>
              <p style="color: #666; line-height: 1.6; margin: 0;">${escapeHtml(leadData.message)}</p>
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
    const messageId = `<${Date.now()}-${Math.random().toString(36).substring(2, 15)}@rafazproperties.ae>`;
    const customerMailOptions = {
      from: FROM_EMAIL,
      to: leadData.email,
      subject: `Thank You for Your Interest - Rafaz Properties`,
      html: generateCustomerConfirmationEmail(leadData),
      messageId: messageId,
      headers: {
        'Message-ID': messageId,
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high',
        'X-Auto-Response-Suppress': 'All',
        'Auto-Submitted': 'auto-generated',
        'Precedence': 'bulk',
        'List-Unsubscribe': '<mailto:unsubscribe@rafazproperties.ae>',
        'Thread-Topic': 'Thank You for Your Interest - Rafaz Properties',
        'Thread-Index': '',
        'In-Reply-To': '',
        'References': ''
      }
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
    // Send internal notification email to info@rafazproperties.ae
    const internalMailOptions = {
      from: FROM_EMAIL,
      to: RECIPIENT_EMAIL,
      subject: `Contact Form Submission - ${escapeHtml(contactData.subject || 'General Inquiry')}`,
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
                  <td style="padding: 8px 0; color: #666;">${escapeHtml(contactData.name)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #1a202c;">Email:</td>
                  <td style="padding: 8px 0; color: #666;">${escapeHtml(contactData.email)}</td>
                </tr>
                ${contactData.phone ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #1a202c;">Phone:</td>
                  <td style="padding: 8px 0; color: #666;">${escapeHtml(contactData.phone)}</td>
                </tr>
                ` : ''}
                ${contactData.subject ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #1a202c;">Subject:</td>
                  <td style="padding: 8px 0; color: #666;">${escapeHtml(contactData.subject)}</td>
                </tr>
                ` : ''}
                ${contactData.service ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #1a202c;">Service:</td>
                  <td style="padding: 8px 0; color: #666;">${escapeHtml(contactData.service)}</td>
                </tr>
                ` : ''}
              </table>
            </div>
            
            <div style="background-color: #f8f6f0; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #1a202c; margin: 0 0 15px 0; font-size: 18px;">Message</h3>
              <p style="color: #666; line-height: 1.6; margin: 0;">${escapeHtml(contactData.message)}</p>
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
    const messageId = `<${Date.now()}-${Math.random().toString(36).substring(2, 15)}@rafazproperties.ae>`;
    const customerMailOptions = {
      from: FROM_EMAIL,
      to: contactData.email,
      subject: `Thank You for Contacting Us - Rafaz Properties`,
      html: generateContactConfirmationEmail(contactData),
      messageId: messageId,
      headers: {
        'Message-ID': messageId,
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high',
        'X-Auto-Response-Suppress': 'All',
        'Auto-Submitted': 'auto-generated',
        'Precedence': 'bulk',
        'List-Unsubscribe': '<mailto:unsubscribe@rafazproperties.ae>',
        'Thread-Topic': 'Thank You for Contacting Us - Rafaz Properties',
        'Thread-Index': '',
        'In-Reply-To': '',
        'References': ''
      }
    };

    const customerInfo = await transporter.sendMail(customerMailOptions);
    console.log('Customer contact confirmation email sent successfully:', customerInfo.messageId);
    
    return true;
  } catch (error) {
    console.error('Error sending contact email:', error);
    return false;
  }
};

export default transporter;
