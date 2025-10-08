import { NextRequest, NextResponse } from 'next/server';

interface LeadData {
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyInterest: string;
  budget: string;
  timeline: string;
  recaptchaToken: string;
  timestamp: string;
  source: string;
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  if (!secretKey) {
    console.error('reCAPTCHA secret key not configured');
    return false;
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();
    return data.success && data.score > 0.5; // For reCAPTCHA v3, score should be > 0.5
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

async function sendEmailNotification(leadData: LeadData) {
  // This is a placeholder for email notification
  // You can integrate with services like SendGrid, Mailgun, or AWS SES
  console.log('New lead received:', {
    name: leadData.name,
    email: leadData.email,
    phone: leadData.phone,
    source: leadData.source,
    timestamp: leadData.timestamp
  });

  // Example email notification (replace with actual email service)
  /*
  const emailData = {
    to: 'leads@yourcompany.com',
    subject: `New Lead from ${leadData.name}`,
    html: `
      <h2>New Lead Received</h2>
      <p><strong>Name:</strong> ${leadData.name}</p>
      <p><strong>Email:</strong> ${leadData.email}</p>
      <p><strong>Phone:</strong> ${leadData.phone}</p>
      <p><strong>Property Interest:</strong> ${leadData.propertyInterest}</p>
      <p><strong>Budget:</strong> ${leadData.budget}</p>
      <p><strong>Timeline:</strong> ${leadData.timeline}</p>
      <p><strong>Message:</strong> ${leadData.message}</p>
      <p><strong>Source:</strong> ${leadData.source}</p>
      <p><strong>Timestamp:</strong> ${leadData.timestamp}</p>
    `
  };
  */
}

async function saveLeadToDatabase(leadData: LeadData) {
  // This is a placeholder for database storage
  // You can integrate with your preferred database (PostgreSQL, MongoDB, etc.)
  console.log('Saving lead to database:', leadData);
  
  // Example database save (replace with actual database integration)
  /*
  const lead = await db.leads.create({
    data: {
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone,
      message: leadData.message,
      propertyInterest: leadData.propertyInterest,
      budget: leadData.budget,
      timeline: leadData.timeline,
      source: leadData.source,
      createdAt: new Date(leadData.timestamp)
    }
  });
  */
}

export async function POST(request: NextRequest) {
  try {
    const leadData: LeadData = await request.json();

    // Validate required fields
    if (!leadData.name || !leadData.email || !leadData.phone || !leadData.recaptchaToken) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA
    const isRecaptchaValid = await verifyRecaptcha(leadData.recaptchaToken);
    if (!isRecaptchaValid) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed' },
        { status: 400 }
      );
    }

    // Save lead to database
    await saveLeadToDatabase(leadData);

    // Send email notification
    await sendEmailNotification(leadData);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Lead submitted successfully',
        leadId: `lead_${Date.now()}` // Generate a unique lead ID
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing lead:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
