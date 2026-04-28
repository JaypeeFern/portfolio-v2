'use client'

import type { ComponentProps } from "react";
import { ArrowRight } from "lucide-react";
import { portfolioData } from "@/lib/portfolio";
import { MotionReveal } from "./Motion";

type FormSubmitHandler = NonNullable<ComponentProps<"form">["onSubmit"]>;

export default function Contact() {
    const contactEmail = portfolioData.about.contactEmail;

    const handleSubmit: FormSubmitHandler = (event) => {
        event.preventDefault();

        if (!contactEmail) {
            return;
        }

        const formData = new FormData(event.currentTarget);
        const name = String(formData.get("name") ?? "");
        const email = String(formData.get("email") ?? "");
        const message = String(formData.get("message") ?? "");
        const subject = encodeURIComponent(`Portfolio inquiry from ${name || "visitor"}`);
        const body = encodeURIComponent([
            name && `Name: ${name}`,
            email && `Email: ${email}`,
            "",
            message,
        ].filter(Boolean).join("\n"));

        window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
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
                        <label className="form-field">
                            <span>Name</span>
                            <input name="name" type="text" autoComplete="name" required />
                        </label>
                        <label className="form-field">
                            <span>Email</span>
                            <input name="email" type="email" autoComplete="email" required />
                        </label>
                        <label className="form-field">
                            <span>Message</span>
                            <textarea name="message" rows={5} required />
                        </label>

                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            <button type="submit" className="button-primary" disabled={!contactEmail}>
                                Send message
                                <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
                            </button>
                            {!contactEmail && (
                                <p className="text-sm text-muted-foreground">
                                    Direct sending is not available yet.
                                </p>
                            )}
                        </div>
                    </form>
                </div>
            </MotionReveal>
        </section>
    );
}
