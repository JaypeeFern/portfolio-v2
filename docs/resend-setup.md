# Resend Contact Form Setup

This document outlines how the contact form in this Next.js portfolio operates, using Resend as the backend email delivery mechanism with a built-in UI fallback.

## Overview

The portfolio uses a custom Next.js API route (`/api/contact`) to safely process contact form submissions server-side. It utilizes the `resend` Node.js SDK and `@react-email/render` to construct and deliver the emails.

### Key Components

1. **`src/app/api/contact/route.ts`**: The backend endpoint that receives the POST request, validates input, checks the honeypot, and triggers the Resend API.
2. **`src/components/Contact.tsx`**: The frontend client component that submits the data via `fetch` and handles loading, success, and error UI states.
3. **`src/components/EmailTemplate.tsx`**: A React component used to format the visual layout of the notification email that lands in your inbox.
4. **`src/lib/resend.ts`**: Initializes the global Resend client.

## Configuration

To run this properly in development or production, you only need one environment variable. 

### Environment Variables
In your `.env.local` or hosting provider settings (e.g., Vercel), set:

```env
RESEND_API_KEY=re_your_api_key_here
```

### Email Routing (from `portfolio.json`)

The "To" and "From" email addresses are not hardcoded in environment variables. Instead, the API route reads directly from your `portfolio.json` file:

```json
"about": {
    "contactEmail": "contact@jpfernandez.dev"
}
```
- **To:** The email is sent *to* `contactEmail`.
- **From:** The email is sent *from* `Portfolio <contactEmail>`.
- **Reply-To:** The email sets the `reply_to` header as the visitor's email address.

> **Important:** The domain of the `contactEmail` (e.g., `jpfernandez.dev`) **MUST** be verified in your Resend dashboard. If the domain is unverified, Resend will reject the API request.

## Security & Anti-Spam

### Honeypot Field
The form includes an invisible input field named `_gotcha`. 
- Real human users cannot see it and will leave it blank.
- Automated spam bots often fill out every field they find.
- If the API route detects text in `_gotcha`, it immediately returns a "success" response without actually sending the email, effectively silently trapping the spam.

### Avoiding the Spam Folder
Because the emails are being sent to *your own inbox*, they might initially land in your Spam folder. 
- **Action:** Click "Not Spam" or "Report as not spam" inside your email client (like Gmail). This trains the algorithm that your portfolio emails are safe. 
- **Note on Mismatched URLs:** Resend's "Insights" dashboard may warn you about mismatched `mailto:` URLs because the visitor's email is rendered as a link. You can safely ignore this warning for personal notification emails.

### DMARC Verification
Resend may warn you about a missing DMARC record. 
- If you use Cloudflare for your DNS, simply enable "DMARC Management" in the Cloudflare dashboard. It will automatically add the correct `_dmarc` TXT record (`v=DMARC1; p=none;`) to your domain.

## UI Fallback Mechanism

If the Resend API fails (e.g., missing API key, service outage, or unverified domain), the `Contact.tsx` component will catch the error and display a graceful fallback to the user.

It renders an error message alongside a standard `mailto:` link populated with your `portfolio.json`'s `contactEmail`, instructing the user to email you directly. This guarantees that visitors always have a working method to contact you, even if the backend is down.
