# Portfolio V2

This is your personal portfolio site.

If you come back to this project after a long time, these are the only things you really need to remember:

## Start Here

- Your actual portfolio content lives in [portfolio.json](/Users/Paul/Desktop/portfolio-v2/portfolio.json)
- The page layout and wording live in [src/components](/Users/Paul/Desktop/portfolio-v2/src/components)
- The overall styling and theme tokens live in [src/app/globals.css](/Users/Paul/Desktop/portfolio-v2/src/app/globals.css)

## Most Common Commands

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
```

Node version:

- use Node `22`
- see [.nvmrc](/Users/Paul/Desktop/portfolio-v2/.nvmrc)

## Where To Edit Things

### Update your personal info

Edit [portfolio.json](/Users/Paul/Desktop/portfolio-v2/portfolio.json)

This includes:

- name
- role
- personal description
- social links
- skills
- projects
- experiences
- metadata URL

### Change the hero section

Edit [src/components/About.tsx](/Users/Paul/Desktop/portfolio-v2/src/components/About.tsx)

Use this file for:

- hero headline
- hero supporting text
- CTA wording
- hero layout

### Change projects or experience section wording

Edit:

- [src/components/Projects.tsx](/Users/Paul/Desktop/portfolio-v2/src/components/Projects.tsx)
- [src/components/Experiences.tsx](/Users/Paul/Desktop/portfolio-v2/src/components/Experiences.tsx)

Use these files for:

- section headings
- intro text
- empty-state messages

### Change cards

Edit:

- [src/components/sub-components/ProjectCard.tsx](/Users/Paul/Desktop/portfolio-v2/src/components/sub-components/ProjectCard.tsx)
- [src/components/sub-components/ExperienceCard.tsx](/Users/Paul/Desktop/portfolio-v2/src/components/sub-components/ExperienceCard.tsx)

Use these files for:

- how each project looks
- how each experience looks
- labels like `Source`, `Live Demo`, or fallback text

### Change navigation

Edit [src/components/Navbar.tsx](/Users/Paul/Desktop/portfolio-v2/src/components/Navbar.tsx)

Use this file for:

- desktop nav
- mobile menu
- top-right CTA

### Change colors, spacing, and theme

Edit [src/app/globals.css](/Users/Paul/Desktop/portfolio-v2/src/app/globals.css)

Use this file for:

- colors
- spacing
- section padding
- glass styles
- light/dark theme variables

## How The Data Works

There are two important rules:

### 1. `portfolio.json` is for portfolio data

Put real content here, like:

- your name
- your projects
- your work history

### 2. Components are for UI wording

Put interface text here, like:

- section titles
- button labels
- empty-state messages

This keeps the JSON focused on your actual information instead of general site copy.

## How To Add A Project

Add an object inside `projects` in [portfolio.json](/Users/Paul/Desktop/portfolio-v2/portfolio.json):

```json
{
  "projectName": "Project Name",
  "projectDescription": "Short description",
  "tools": ["Next.js", "TypeScript"],
  "dateOfDevelopment": {
    "from": "2024",
    "to": "Present"
  }
}
```

Optional links:

```json
"links": {
  "github": "https://github.com/...",
  "live": "https://your-site.com"
}
```

If you do not add links, the UI shows a fallback message instead of buttons.

## How To Add An Experience

Add an object inside `experiences` in [portfolio.json](/Users/Paul/Desktop/portfolio-v2/portfolio.json):

```json
{
  "position": "Job Title",
  "companyName": "Company Name",
  "dateOfEmployment": {
    "from": "2024",
    "to": "Present"
  },
  "description": "Short summary of the work"
}
```

## Why The JSON Has Type Safety

Two files help keep `portfolio.json` safe:

- [portfolio.schema.json](/Users/Paul/Desktop/portfolio-v2/portfolio.schema.json)
- [src/types/portfolio.ts](/Users/Paul/Desktop/portfolio-v2/src/types/portfolio.ts)

What they do:

- show you what fields are required
- help your editor give better hints
- stop TypeScript from breaking when arrays are empty

## Empty Sections

It is okay for these arrays to be empty:

- `projects`
- `experiences`

If they are empty, the page shows a proper empty-state message instead of a blank gap.

## Files That Matter Most

If you only remember six files, remember these:

- [portfolio.json](/Users/Paul/Desktop/portfolio-v2/portfolio.json)
- [src/app/page.tsx](/Users/Paul/Desktop/portfolio-v2/src/app/page.tsx)
- [src/components/About.tsx](/Users/Paul/Desktop/portfolio-v2/src/components/About.tsx)
- [src/components/Navbar.tsx](/Users/Paul/Desktop/portfolio-v2/src/components/Navbar.tsx)
- [src/components/Projects.tsx](/Users/Paul/Desktop/portfolio-v2/src/components/Projects.tsx)
- [src/app/globals.css](/Users/Paul/Desktop/portfolio-v2/src/app/globals.css)

## Safe Workflow

When you change content or UI:

1. Edit the file you need
2. Run `npm run lint`
3. Run `npm run typecheck`
4. Run `npm run build` before shipping
