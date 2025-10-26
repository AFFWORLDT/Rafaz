import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail, ContactFormData } from '@/src/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const contactData: ContactFormData = {
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone?.trim(),
      subject: body.subject?.trim(),
      message: body.message.trim(),
      service: body.service?.trim(),
    };

    // Send email
    const emailSent = await sendContactEmail(contactData);

    if (emailSent) {
      return NextResponse.json(
        { 
          success: true, 
          message: 'Message sent successfully. We will contact you soon!' 
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: 'Failed to send message. Please try again.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing contact submission:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Contact API endpoint is working' },
    { status: 200 }
  );
}
