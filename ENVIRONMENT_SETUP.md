# Environment Setup Guide

## Required Environment Variables

To fully utilize all features of the website, you need to set up the following environment variables in your `.env.local` file:

### 1. reCAPTCHA Configuration (Optional for Development)

```bash
# Get these from https://www.google.com/recaptcha/admin
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key_here
```

**Note:** The website will work without reCAPTCHA keys in development mode. The lead capture form will function normally without the reCAPTCHA widget.

### 2. Email Service Configuration (Optional)

```bash
# Email service API key (SendGrid, Mailgun, etc.)
EMAIL_SERVICE_API_KEY=your_email_service_api_key

# Email addresses
EMAIL_FROM_ADDRESS=noreply@therafaz.ae
EMAIL_TO_ADDRESS=leads@therafaz.ae
```

### 3. Site Configuration

```bash
# Your website URL
NEXT_PUBLIC_SITE_URL=https://therafaz.ae

# Database connection (if using database)
DATABASE_URL=your_database_connection_string
```

## Setup Instructions

1. **Create `.env.local` file** in your project root:
   ```bash
   touch .env.local
   ```

2. **Add the environment variables** to `.env.local`:
   ```bash
   # Copy the variables above and replace with your actual values
   ```

3. **Restart your development server**:
   ```bash
   npm run dev
   ```

## Features That Work Without Configuration

- ✅ Lead capture forms (without reCAPTCHA)
- ✅ All property pages and sections
- ✅ SEO optimization
- ✅ Scroll optimization
- ✅ Design consistency
- ✅ All UI components

## Features Requiring Configuration

- 🔒 reCAPTCHA spam protection (requires reCAPTCHA keys)
- 📧 Email notifications (requires email service)
- 💾 Lead storage (requires database)

## Development vs Production

- **Development**: All features work without environment variables
- **Production**: Set up all environment variables for full functionality

## Getting reCAPTCHA Keys

1. Visit [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Create a new site
3. Choose reCAPTCHA v2 ("I'm not a robot" Checkbox)
4. Add your domain(s)
5. Copy the Site Key and Secret Key to your `.env.local` file

## Testing the Lead Capture Form

The lead capture form will work in development mode without reCAPTCHA. You can test it by:

1. Filling out the form
2. Submitting it
3. Checking the browser console for the API call
4. The form will show a success message

For production, make sure to set up the reCAPTCHA keys and email service for full functionality.
