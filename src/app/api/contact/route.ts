import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Rate limiting implementation
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_REQUESTS_PER_IP = 5; // Maximum 5 requests per IP per hour

// In-memory store for rate limiting (would use Redis or similar in production)
const ipRequestCounts: Record<string, { count: number, timestamp: number }> = {};

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  Object.keys(ipRequestCounts).forEach(ip => {
    if (now - ipRequestCounts[ip].timestamp > RATE_LIMIT_WINDOW) {
      delete ipRequestCounts[ip];
    }
  });
}, 60 * 60 * 1000); // Clean up every hour

export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
    // Check rate limit
    if (ipRequestCounts[ip]) {
      if (ipRequestCounts[ip].count >= MAX_REQUESTS_PER_IP) {
        const timeElapsed = Date.now() - ipRequestCounts[ip].timestamp;
        if (timeElapsed < RATE_LIMIT_WINDOW) {
          return NextResponse.json(
            { error: 'Rate limit exceeded. Please try again later.' },
            { status: 429 }
          );
        } else {
          // Reset if window has passed
          ipRequestCounts[ip] = { count: 1, timestamp: Date.now() };
        }
      } else {
        // Increment count
        ipRequestCounts[ip].count += 1;
      }
    } else {
      // First request from this IP
      ipRequestCounts[ip] = { count: 1, timestamp: Date.now() };
    }
    
    const body = await request.json();
    const { name, email, subject, message } = body;
    
    // Input validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }
    
    // Check for required environment variables
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_PORT || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Missing email configuration environment variables');
      return NextResponse.json(
        { error: 'Server configuration error. Please try again later or contact directly via email.' },
        { status: 500 }
      );
    }
    
    // Create a transporter with environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    
    // Create email content
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <h2 style="color: #3b82f6;">New message from your portfolio website</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f3f4f6; border-left: 4px solid #3b82f6;">
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          </div>
        </div>
      `,
    };
    
    try {
      // Send email
      await transporter.sendMail(mailOptions);
      return NextResponse.json({ success: true });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      return NextResponse.json(
        { error: 'Failed to send message. Please try again later or contact directly via email.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again later.' },
      { status: 500 }
    );
  }
}
