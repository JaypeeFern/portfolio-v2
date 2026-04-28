# Portfolio V2

Personal portfolio for John Paul Fernandez, built with Next.js, React, TypeScript, and Tailwind CSS. The current design direction is an editorial, results-focused one-page portfolio with light/dark themes, subtle Motion animations, an Embla-powered technology rail, honest empty states, and an inline contact form.

## Quick Start

```powershell
npm install
npm.cmd run dev
```

Useful checks:

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
```

Node requirement: `>=20.9.0`. The local `.nvmrc` currently points to Node `22`.

## Content Source

Portfolio facts should come from `portfolio.json`.

Use it for:

- Name, role, headline, description, status, location, and timezone
- Social links
- CTA links
- Skills shown in the technology rail
- Projects and experiences
- Optional `resumeUrl` and `contactEmail`
- Optional metadata URL

The schema and TypeScript type mirror live beside it:

- `portfolio.schema.json`
- `src/types/portfolio.ts`

When adding new data-driven fields, update all three together: JSON, schema, and TypeScript type.

## Page Structure

The homepage is assembled in `src/app/page.tsx`:

- `src/components/About.tsx` - hero, at-a-glance facts, status/contact panel
- `src/components/Projects.tsx` - selected work section
- `src/components/Experiences.tsx` - experience section
- `src/components/Contact.tsx` - inline contact form

Empty projects or experiences render intentional empty states through `src/components/EmptyState.tsx`. Do not add mock projects, fake metrics, placeholder companies, or invented experience just to fill space.

## UI Systems

- Theme tokens, layout rails, animation CSS, and component utility classes live in `src/app/globals.css`.
- Theme initialization lives in `src/components/ThemeProvider.tsx`.
- Theme switching lives in `src/components/ThemeToggle.tsx`.
- Subtle React animations use Motion via `src/components/Motion.tsx`.
- The technology rail uses Embla in `src/components/SkillMarquee.tsx`.
- Brand icons use `react-icons` through `src/components/BrandIcon.tsx`.
- Lucide icons are used for general UI symbols.

## Contact And Resume

The contact form is inline, not a modal. It submits to `/api/contact` and sends mail through Resend when `RESEND_API_KEY` and `about.contactEmail` are configured. If delivery fails, the form shows a fallback `mailto:` link when `about.contactEmail` exists in `portfolio.json`.

The `Download CV` control is disabled until `about.resumeUrl` exists. Do not point it at a fake file. If a resume PDF is added under `public/`, set `resumeUrl` to that public path.

## Design References

Approved redesign mockups are committed for documentation:

- `docs/design/portfolio-redesign-light.png`
- `docs/design/portfolio-redesign-dark.png`

Use these as visual references when adjusting layout, spacing, or theme direction.

## Common Edits

Add a project in `portfolio.json`:

```json
{
  "projectName": "Project Name",
  "projectDescription": "Short description",
  "tools": ["Next.js", "TypeScript"],
  "dateOfDevelopment": {
    "from": "2024",
    "to": "Present"
  },
  "links": {
    "github": "https://github.com/...",
    "live": "https://example.com"
  }
}
```

Add an experience in `portfolio.json`:

```json
{
  "position": "Role Title",
  "companyName": "Company Name",
  "dateOfEmployment": {
    "from": "2024",
    "to": "Present"
  },
  "description": "Short summary of the work."
}
```

## Before Shipping

Run:

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
```

Also verify the page in both light and dark mode, especially the hero, technology rail, contact form, and empty states.
