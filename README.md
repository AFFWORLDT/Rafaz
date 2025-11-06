            # Rafaz Real Estate 

A premium real estate platform built with Next.js 15, featuring luxury property listings, off-plan projects, and comprehensive real estate services in Dubai.

## Features

- 🏠 **Property Listings**: Buy, rent, and explore luxury properties
- 🏗️ **Off-Plan Projects**: Discover upcoming developments
- 🏘️ **Communities**: Explore Dubai's premium neighborhoods
- 💼 **Services**: Property management, mortgages, conveyancing
- 📱 **Responsive Design**: Optimized for all devices
- 🎨 **Modern UI**: Built with Tailwind CSS and shadcn/ui

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui with Radix UI
- **Animations**: Framer Motion
- **Icons**: Lucide React & Iconify
- **Forms**: React Hook Form with Zod validation
- **Font**: Trajan Pro (Custom luxury font)

## Getting Started

1. Install dependencies:
```bash
npm install
# or
pnpm install
```

2. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://therafaz-api.propfusion.io
NEXT_PUBLIC_API_BEARER_TOKEN=your_api_bearer_token_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://therafaz.ae

# reCAPTCHA Configuration
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key_here

# Email Configuration
EMAIL_FROM_ADDRESS=noreply@therafaz.ae
EMAIL_TO_ADDRESS=leads@therafaz.ae
EMAIL_SERVICE_API_KEY=your_email_service_api_key_here

# Database Configuration
DATABASE_URL=your_database_url_here
```

3. Run the development server:
```bash
npm run dev
# or
pnpm dev
```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
├── view/               # Page-specific components
├── lib/                # Utility functions
├── hooks/              # Custom React hooks
└── utils/              # Configuration and utilities
```

## License

© 2025 Rafaz Real Estate. All rights reserved.
