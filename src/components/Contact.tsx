'use client'

import { useState } from "react";
import type { ComponentProps } from "react";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { portfolioData } from "@/lib/portfolio";
import { MotionReveal } from "./Motion";

type FormSubmitHandler = NonNullable<ComponentProps<"form">["onSubmit"]>;

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit: FormSubmitHandler = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage("");

        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to send message');
            }

            setSubmitStatus('success');
            (event.target as HTMLFormElement).reset();
        } catch (error) {
            setSubmitStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="folio-section contact-section-wrap">
            <MotionReveal>
                <div className="contact-layout">
                    <div className="contact-intro">
                        <h2>Tell me what you’re building.</h2>
                        <p>A few lines about the product and where you need help is enough.</p>
                        {portfolioData.about.contactEmail && (
                            <a className="contact-email" href={`mailto:${portfolioData.about.contactEmail}`}>
                                {portfolioData.about.contactEmail}
                            </a>
                        )}
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        {/* Honeypot field - visually hidden */}
                        <div style={{ display: 'none' }} aria-hidden="true">
                            <label htmlFor="_gotcha">Don&apos;t fill this out if you&apos;re human:</label>
                            <input type="text" name="_gotcha" id="_gotcha" tabIndex={-1} autoComplete="off" />
                        </div>

                        <label className="form-field">
                            <span>Email</span>
                            <input name="email" type="email" autoComplete="email" required disabled={isSubmitting} maxLength={254} />
                        </label>
                        <label className="form-field">
                            <span>Message</span>
                            <textarea name="message" rows={5} required disabled={isSubmitting} maxLength={5000} />
                        </label>

                        {submitStatus === 'success' && (
                            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-500 bg-green-50 dark:bg-green-500/10 p-3 rounded-md">
                                <CheckCircle2 className="h-4 w-4" />
                                <p>Sent. I’ll get back to you soon.</p>
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div className="flex flex-col gap-2 text-sm text-red-600 dark:text-red-500 bg-red-50 dark:bg-red-500/10 p-3 rounded-md">
                                <div className="flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4 shrink-0" />
                                    <p>{errorMessage}</p>
                                </div>
                                {portfolioData.about.contactEmail && (
                                    <p className="pl-6">
                                        Please email me directly at{" "}
                                        <a 
                                            href={`mailto:${portfolioData.about.contactEmail}`}
                                            className="underline hover:text-red-700 dark:hover:text-red-400"
                                        >
                                            {portfolioData.about.contactEmail}
                                        </a>
                                    </p>
                                )}
                            </div>
                        )}

                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            <button type="submit" className="button-primary" disabled={isSubmitting}>
                                {isSubmitting ? 'Sending...' : 'Send note'}
                                {!isSubmitting && <ArrowRight className="h-4 w-4" strokeWidth={1.8} />}
                            </button>
                        </div>
                    </form>
                </div>
            </MotionReveal>
        </section>
    );
}
