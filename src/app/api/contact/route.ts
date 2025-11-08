import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Web3Forms API endpoint
    const web3formsApiKey = process.env.WEB3FORMS_ACCESS_KEY;

    if (!web3formsApiKey) {
      console.error('WEB3FORMS_ACCESS_KEY is not set');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Send email via Web3Forms
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        access_key: web3formsApiKey,
        name,
        email,
        message,
        subject: `New contact form submission from ${name}`,
        from_name: 'Portfolio Contact Form',
        replyto: email,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      console.error('Web3Forms error:', data);
      return NextResponse.json(
        { error: data.message || 'Failed to send message' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
