// Configuration file for environment variables
export const config = {
  // reCAPTCHA Configuration
  recaptcha: {
    siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
    secretKey: process.env.RECAPTCHA_SECRET_KEY || '',
  },
  
  // Email Configuration
  email: {
    fromAddress: process.env.EMAIL_FROM_ADDRESS || 'noreply@therafaz.ae',
    toAddress: process.env.EMAIL_TO_ADDRESS || 'leads@therafaz.ae',
    apiKey: process.env.EMAIL_SERVICE_API_KEY || '',
  },
  
  // Site Configuration
  site: {
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://therafaz.ae',
    name: 'Rafaz Real Estate',
  },
  
  // Database Configuration
  database: {
    url: process.env.DATABASE_URL || '',
  },
};

// Validation function to check if required environment variables are set
export function validateConfig() {
  const requiredVars = [
    'NEXT_PUBLIC_RECAPTCHA_SITE_KEY',
    'RECAPTCHA_SECRET_KEY',
  ];
  
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.warn(`Missing environment variables: ${missingVars.join(', ')}`);
    console.warn('Please set these variables in your .env.local file');
  }
  
  return missingVars.length === 0;
}
