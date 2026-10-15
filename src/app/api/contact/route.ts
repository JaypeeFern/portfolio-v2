import { NextResponse } from 'next/server';
import { render } from '@react-email/render';
import { resend } from '@/lib/resend';
import { EmailTemplate } from '@/components/EmailTemplate';
import { portfolioData } from '@/lib/portfolio';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getFormValue(value: unknown) {
    return typeof value === 'string' ? value.trim() : '';
}

export async function POST(request: Request) {
    try {
        const body: unknown = await request.json();

        if (!body || typeof body !== 'object') {
            return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
        }

        const formBody = body as Record<string, unknown>;
        const email = getFormValue(formBody.email);
        const message = getFormValue(formBody.message);
        const gotcha = getFormValue(formBody._gotcha);

        // Honeypot check
        if (gotcha) {
            // Silently accept without sending
            return NextResponse.json({ success: true });
        }

        // Basic validation
        if (!email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        if (email.length > 254 || message.length > 5000) {
            return NextResponse.json({ error: 'Input exceeds maximum length' }, { status: 400 });
        }

        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
        }

        const contactEmail = portfolioData.about.contactEmail;

        const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown IP';
        const date = new Date().toLocaleString('en-US', { 
            timeZoneName: 'short',
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric', 
            hour: 'numeric', 
            minute: 'numeric' 
        });

        // Configuration check
        if (!resend || !contactEmail) {
            console.error('Email configuration missing');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        const html = await render(EmailTemplate({ email, message, ip, date }));

        const { data, error } = await resend.emails.send({
            from: `Portfolio <${contactEmail}>`,
            to: contactEmail,
            subject: 'Portfolio inquiry',
            replyTo: email,
            html,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json({ error: 'Unable to send message right now' }, { status: 500 });
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
