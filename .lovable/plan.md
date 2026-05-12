
# Thinking Lab — Build Plan

A polished, responsive web app to help users learn System 1 vs System 2 thinking through interactive scenarios with mocked outputs by default.

## Scope

- Home (landing) + Lab (3-panel workspace)
- 4 built-in presets with preloaded fast/slow/bias/takeaway content
- Light (default) + dark theme, toggleable
- Mocked mode (default, polished) + optional Live LLM mode (clearly marked)
- Undo / Redo / Reset
- localStorage persistence (theme, session, recent scenarios, notes, preset, mode)
- No auth, no backend required for core experience

## Routes (TanStack Start)

```
src/routes/
  __root.tsx        existing shell + ThemeProvider + Toaster
  index.tsx         Home (hero, presets grid, how-it-works, CTA)
  lab.tsx           Lab workspace (3-panel desktop, stacked mobile)
  about.tsx         Short page on System 1/2 + biases (SEO)
```

Each route gets its own `head()` metadata (title, description, og tags).

## Information architecture

### Home (`/`)
- Hero: one-line definition of System 1 vs System 2, primary CTA "Open the Lab", secondary "Try a preset"
- Preset cards (4): Hiring, Stock pick, Deadline estimate, Base-rate puzzle — each launches `/lab?preset=<id>`
- "How it works" 4-step strip: Answer fast → Reflect slowly → Reveal bias → Improve judgment
- Footer link to `/about`

### Lab (`/lab`)
Desktop: 3 columns. Tablet: 2 columns (left collapses to top toolbar + drawer). Mobile: single stacked column with sticky top bar (Mode pill, Undo, Redo, Reset).

- **Left panel — Controls**
  - Preset selector (list)
  - Scenario textarea (editable)
  - Mode toggle: Mocked (default) / Live (advanced)
  - Settings: theme toggle, clear session
- **Center panel — Flow**
  - Scenario card
  - Step 1: Fast answer capture (textarea + "Reveal mocked fast answer")
  - Step 2: Slow reflection capture (textarea + "Reveal mocked slow answer")
  - Step 3: Bias reveal card
  - Compare view: fast vs slow side-by-side
- **Right panel — Learning**
  - Explanation of the bias
  - Debiasing checklist (3–5 bullets)
  - Lesson summary
  - "What changed between fast and slow"
  - "Explain this result" action (expands a plain-language paragraph)

## Presets (preloaded content)

Each preset object: `{ id, title, scenario, fastAnswer, slowAnswer, bias, biasExplanation, takeaway, checklist[], quickActions[] }`

1. **Hiring decision** — anchoring & halo effect
2. **Stock pick** — availability heuristic / recency
3. **Project deadline estimate** — planning fallacy
4. **Probability puzzle (Linda / base-rate)** — base-rate neglect / representativeness

Stored in `src/data/presets.ts`.

## State management

Single Zustand store (`src/store/labStore.ts`) wrapping a reducer-style state with built-in undo/redo history (past/present/future arrays). Tracked actions:
- selectPreset, editScenario, setFastAnswer, setSlowAnswer, revealStep, setMode, clearSession

Persistence: `zustand/middleware/persist` to localStorage, key `thinking-lab-v1`. Theme persisted separately via `next-themes`-style hook in `src/hooks/useTheme.ts`.

Reset to home: clears working session but preserves presets and theme; navigates to `/`.

## Design system

Update `src/styles.css` only — keep oklch tokens, refine for a calm neutral palette:
- Light: near-white bg, slate foreground, single muted accent (soft indigo/slate)
- Dark: deep slate bg, off-white foreground, same accent dimmed
- Soft shadows via `--shadow-soft`, generous radii, single accent color
- Typography: system stack with tightened tracking on headings

All components use semantic tokens (`bg-background`, `text-foreground`, `border-border`, `bg-card`, `text-muted-foreground`, `bg-accent`). No raw color classes.

## Components

```
src/components/
  theme-toggle.tsx
  mode-badge.tsx           Mocked / Live pill
  preset-card.tsx
  scenario-card.tsx
  answer-step.tsx          reusable for fast/slow capture
  bias-reveal.tsx
  compare-view.tsx
  debiasing-checklist.tsx
  lesson-summary.tsx
  lab-toolbar.tsx          undo/redo/reset/mode
  panel.tsx                shared panel wrapper
  hero.tsx
  how-it-works.tsx
```

shadcn primitives already present (button, card, textarea, tabs, sheet, tooltip, sonner) cover all needs.

## Live LLM mode (optional, isolated)

- Toggle in left panel; shows a banner "Live mode — responses generated" when active
- Calls a server function `src/lib/llm.functions.ts` using `createServerFn` → Lovable AI Gateway (default model `google/gemini-3-flash-preview`)
- Requires enabling Lovable Cloud; if not enabled, the toggle is disabled with a tooltip explaining how to enable it
- Mocked mode never calls the network and is fully functional offline

I'll ship mocked mode first-class. Live mode is wired but degrades gracefully when Cloud isn't enabled.

## Accessibility

- All interactive elements are real `<button>` / `<a>` with visible `focus-visible:ring`
- Tap targets ≥ 44px on mobile
- Semantic headings, single H1 per route
- Color contrast verified in both themes

## SEO

- Per-route `head()` with unique title (<60), description (<160), og tags
- Single H1 per page, semantic sections

## Technical notes

- Stack: TanStack Start + React 19 + Tailwind v4 + shadcn (already configured)
- New deps: `zustand` for state with undo/redo (small, ~3kb)
- No new routes under `_app/`; layout stays in `__root.tsx`
- Lovable Cloud only required if user opts into Live mode

## Out of scope (for this build)

- Auth, accounts, sharing scenarios across devices
- Saving multiple named sessions (only "current session" + "recent scenarios" list)
- Streaming LLM responses
- Analytics

Ready to implement on approval.
