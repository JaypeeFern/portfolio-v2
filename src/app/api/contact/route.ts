import { NextResponse } from 'next/server';
import { resend } from '@/lib/resend';
import { EmailTemplate } from '@/components/EmailTemplate';
import { portfolioData } from '@/lib/portfolio';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message, _gotcha } = body;

        // Honeypot check
        if (_gotcha) {
            // Silently accept without sending
            return NextResponse.json({ success: true });
        }

        // Basic validation
        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        if (name.length > 100 || email.length > 254 || message.length > 5000) {
            return NextResponse.json({ error: 'Input exceeds maximum length' }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
        }

        const contactEmail = portfolioData.about.contactEmail;

        // Configuration check
        if (!resend || !contactEmail) {
            console.error('Email configuration missing');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        const { data, error } = await resend.emails.send({
            from: `Portfolio <${contactEmail}>`,
            to: contactEmail,
            subject: `Portfolio inquiry from ${name}`,
            replyTo: email,
            react: EmailTemplate({ name, email, message }),
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Contact API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
