## How to add a new theme

You can add additional color themes that plug into the app's semantic token system. The app exposes a small set of CSS variables (tokens) used by components (background, foreground, primary, muted, card, border, ring, etc.). Follow these steps to add a new theme:

1. Create a theme file
    - Add a new file under `src/themes/`, for example `src/themes/theme-rose.css`.
    - Provide a `.theme-<name>` block for the light variant and a `.theme-<name>.dark` block for the dark variant. Example skeleton:

    .theme-rose {
    --radius: 0.625rem;
    --background: #fff7f7;
    --foreground: #3b0a0a;
    --card: #ffffff;
    --card-foreground: #3b0a0a;
    --primary: #e11d48;
    --primary-foreground: #ffffff;
    --muted: #fff1f2;
    --muted-foreground: #9f1239;
    --destructive: #ef4444;
    --destructive-foreground: #ffffff;
    --border: #fee2e2;
    --input: #fed7e2;
    --ring: #e11d48;
    --hover-overlay: rgba(225, 29, 72, 0.08);
    /_ chart, sidebar tokens... _/
    }

    .theme-rose.dark {
    --background: #1b0b0c;
    --foreground: #fff5f6;
    --card: #2a0f12;
    --card-foreground: #fff5f6;
    --primary: #fb7185;
    --primary-foreground: #1b0b0c;
    --muted: #2a0f12;
    --muted-foreground: #ffdce3;
    --destructive: #ff6b6b;
    --destructive-foreground: #ffffff;
    --border: #3a1215;
    --input: #3a1215;
    --ring: #fb7185;
    --hover-overlay: rgba(251, 113, 133, 0.08);
    }

2. Use the same token names as other themes
    - Copy the token names used in `src/themes/theme-emerald.css` (for example `--background`, `--foreground`, `--card`, `--primary`, `--muted`, `--destructive`, `--border`, `--input`, `--ring`, `--hover-overlay`, sidebar/chart tokens, and `--destructive-foreground`). Keeping the same token set ensures components behave the same across themes.

Available tokens (copy these into your new theme file)

- --radius : Base border radius (used to derive --radius-sm/md/lg/xl)
- --radius-sm
- --radius-md
- --radius-lg
- --radius-xl
- --background : Page background
- --foreground : Primary text color on background
- --card : Card/panel background
- --card-foreground : Text color used on cards
- --popover : Popover/overlay background
- --popover-foreground : Text color for popovers
- --primary : Primary action color (buttons, links)
- --primary-foreground : Text color used on primary surfaces
- --secondary : Secondary accent color
- --secondary-foreground: Text color used on secondary surfaces
- --muted : Muted background (subtle surfaces)
- --muted-foreground : Muted text color
- --accent : Additional accent color used in some components
- --accent-foreground : Accent foreground color
- --success : Semantic success / positive action color
- --success-foreground : Foreground color used on success surfaces
- --destructive : Semantic destructive / negative color
- --destructive-foreground: Foreground color used on destructive surfaces
- --destructive-foreground: Small helper token for destructive text (keeps components theme-aware)
- --border : Border color for inputs, cards, separators
- --input : Input background / subtle surface
- --ring : Ring / focus color for outlines
- --hover-overlay : RGBA overlay used for subtle hover states (keeps contrast predictable)
- --chart-1 : Chart / series color 1
- --chart-2 : Chart / series color 2
- --chart-3 : Chart / series color 3
- --chart-4 : Chart / series color 4
- --chart-5 : Chart / series color 5
- --sidebar : Sidebar background
- --sidebar-foreground : Sidebar text color
- --sidebar-primary : Sidebar primary accent (icons / active)
- --sidebar-primary-foreground: Foreground used on sidebar primary backgrounds
- --sidebar-accent : Sidebar accent color
- --sidebar-accent-foreground: Foreground used on sidebar accents
- --sidebar-border : Sidebar border color
- --sidebar-ring : Sidebar ring / focus color
- --font-geist-sans : (optional) font-family token used by --font-sans
- --font-geist-mono : (optional) font-family token used by --font-mono
- --font-sans : Alias used in `globals.css` for component fonts
- --font-mono : Alias used in `globals.css` for monospace fonts

Notes

- Keep the same variable names above for both the light `.theme-<name>` block and the dark `.theme-<name>.dark` block so components pick up the correct values at runtime.
- You can add additional tokens (for charts, maps, or third-party widgets) if needed; place them alongside the standard tokens and import the theme in `globals.css`.

3. Import the theme in `src/app/globals.css`
    - Add `@import "../themes/theme-rose.css";` (or the file name you chose) near the top where other theme files are imported. Because `globals.css` lives in `src/app/`, the correct relative path to the centralized theme files is `../themes/`.

4. Enable the theme in the app (manual step)
    - This project uses a manual mechanism for applying themes: add the `theme-<name>` class to the `html` or `body` element in `src/app/layout.tsx` (or whichever top-level layout you prefer). For example, to enable `theme-rose` by default edit `src/app/layout.tsx` and add the class:

    <html lang="en" className="theme-rose dark w-screen min-h-screen box-border">
    - Note: There is a temporary test component `ThemeSwitcher` in the codebase used during development. In production usage, apply the theme class manually in `layout.tsx` or provide a custom mechanism you control.

5. Validate contrast and hover states
    - Run the app and check key pages in light & dark. Ensure `--foreground` vs `--background` and `--muted-foreground` vs `--muted` pass contrast checks for your target (WCAG AA recommended).

6. Optional: add a `--primary-variant` or `--sidebar-*` tokens if you need more fine-grained control for special components (charts, sidebars, etc.).

Example quick checklist

- [ ] New theme file created in `src/themes/`
- [ ] All standard tokens added (see `src/themes/theme-emerald.css` for reference)
- [ ] Imported in `src/app/globals.css` using `@import "../themes/<your-theme>.css"`
- [ ] Visual and contrast QA performed in light/dark

## How to style components that follow the semantic styling system

This project uses a small, shared set of semantic CSS variables (tokens) exposed in `src/app/globals.css` and overridden per-theme in `src/themes/*.css`. When creating or updating components, prefer these tokens and helper classes so themes apply consistently across the app.

Guidelines

- Use token-aware helper classes where available (for example `bg-card`, `text-foreground`, `text-muted-foreground`, `bg-primary`, `text-primary-foreground`, `border-border`, `ring-primary`). These map to CSS variables and will follow the active theme.
- Avoid hard-coded Tailwind color utilities (like `text-white`, `bg-emerald-500`, `hover:bg-emerald-600`) for colors that should adapt to themes.
- Keep interactive states accessible: prefer `hover:bg-primary/10` and `hover:text-primary` instead of toggling `-foreground` tokens on neutral backgrounds which may cause low-contrast hover states.
- Use `--radius` for component border-radius and `--hover-overlay` for subtle hover overlays when available.

Examples

- Button (semantic):
    - className: `bg-primary text-primary-foreground hover:bg-primary/10 rounded-md px-4 py-2`
    - Rationale: primary color and foreground come from the theme; hover uses a translucent primary background which keeps contrast predictable.

- Card container:
    - className: `bg-card/80 border border-border rounded-lg p-4 text-foreground`
    - Rationale: card background and border follow theme; foreground token ensures text contrasts with the card in both light/dark.

- Muted text:
    - className: `text-sm text-muted-foreground`
    - Rationale: uses the muted token so color is consistent with the active theme.

- Success / positive actions
    - Tokens: `--success` and `--success-foreground` are available in the theme files.
    - Example (edit/confirm buttons): `className="bg-success text-success-foreground hover:bg-success/90 rounded-md p-2"`
    - Rationale: semantic success token communicates positive or confirm actions (edit, save). It's theme-aware so each theme can pick a green or complementary color that meets contrast requirements.

Accessibility notes

- Run contrast checks when adding new tokens or selecting new colors for a theme. Aim for WCAG AA for normal text (4.5:1) or ensure large text meets 3:1 when appropriate.
- When in doubt, test both light and dark variants and validate hover/active states on neutral backgrounds.

Advanced

- If a component needs fine-grained color control (for charts, maps, or third-party widgets), add new tokens to the theme files (for example `--chart-series-1`) and consume them with semantic helper classes or inline `style={{ color: 'var(--chart-series-1)' }}`.

The goal is to keep component styles driven by the token set so a single theme change updates the whole app predictably.
