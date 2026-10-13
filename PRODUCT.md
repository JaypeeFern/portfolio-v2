# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Potential clients and collaborators are the primary audience. Based on the current project documentation, they use the portfolio to assess professional fit and decide whether to start a conversation.

## Product Purpose

This is John Paul Fernandez's personal portfolio. The repository describes its purpose as establishing professional credibility, showcasing real work, and providing a low-friction contact path. Success means visitors get an accurate sense of his capabilities and can reach out easily.

## Positioning

Undecided. No distinctive mechanism or positioning claim has been confirmed.

## Operating Context

The portfolio is a public, one-page website. Its current content is maintained in `portfolio.json`, with a matching JSON schema and TypeScript type. Visitors can review the profile and skills, browse projects and experience when entries are available, and use the inline contact form.

## Capabilities and Constraints

- The homepage presents profile information, skills, projects, experience, and contact.
- The contact form submits to `/api/contact`; email delivery depends on Resend configuration and the contact address. The form can provide a `mailto:` fallback.
- The resume download stays unavailable until a real resume URL is configured.
- Portfolio facts come from `portfolio.json`. When adding data fields, update `portfolio.schema.json` and `src/types/portfolio.ts` as well.
- Do not invent projects, companies, experience, testimonials, or metrics. Show honest empty states when project or experience data is absent.
- The current `portfolio.json` contains no project or experience entries.

## Evidence on Hand

- `portfolio.json` contains the current profile, skills, social links, availability, contact address, and a `3+` years-building value. That value is present as a source claim; supporting case studies are not currently listed.
- `docs/design/portfolio-redesign-light.png` and `docs/design/portfolio-redesign-dark.png` are existing design references, not evidence of project outcomes.
- No project or experience records are currently present in `portfolio.json`.

## Product Principles

1. Represent experience and capability accurately; never fill gaps with invented work or proof.
2. Keep portfolio facts in the structured content source and its schema and type.
3. Help potential clients and collaborators assess fit and find a clear contact path.
