import { NextRequest, NextResponse } from "next/server";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // In production, integrate with an email service like Resend or SendGrid:
    // await resend.emails.send({
    //   from: 'website@bce.qa',
    //   to: 'info@bce.qa',
    //   subject: `New Contact Form: ${body.name}`,
    //   html: `<p>Name: ${body.name}</p><p>Email: ${body.email}</p><p>Phone: ${body.phone}</p><p>Service: ${body.service}</p><p>Message: ${body.message}</p>`,
    // });

    // For now, log the submission and return success
    console.log("Contact form submission:", {
      name: body.name,
      email: body.email,
      phone: body.phone || "N/A",
      service: body.service || "N/A",
      message: body.message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: true, message: "Thank you! We'll get back to you within 24 hours." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
