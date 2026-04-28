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
        <section id="contact" className="section-container section-block">
            <MotionReveal>
                <div className="contact-section">
                    <div className="max-w-md space-y-3">
                        <p className="section-label">Contact</p>
                        <h2 className="font-display text-3xl font-semibold leading-tight tracking-normal text-foreground sm:text-4xl">
                            Start a conversation
                        </h2>
                        <p className="text-base leading-7 text-muted-foreground">
                            Send a short note with what you are building, what you need, and where I can help.
                        </p>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        {/* Honeypot field - visually hidden */}
                        <div style={{ display: 'none' }} aria-hidden="true">
                            <label htmlFor="_gotcha">Don&apos;t fill this out if you&apos;re human:</label>
                            <input type="text" name="_gotcha" id="_gotcha" tabIndex={-1} autoComplete="off" />
                        </div>

                        <label className="form-field">
                            <span>Name</span>
                            <input name="name" type="text" autoComplete="name" required disabled={isSubmitting} maxLength={100} />
                        </label>
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
                                <p>Message sent successfully! I&apos;ll get back to you soon.</p>
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
                                {isSubmitting ? 'Sending...' : 'Send message'}
                                {!isSubmitting && <ArrowRight className="h-4 w-4" strokeWidth={1.8} />}
                            </button>
                        </div>
                    </form>
                </div>
            </MotionReveal>
        </section>
    );
}
