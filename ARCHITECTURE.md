# ARCHITECTURE.md

This document is the complete architectural and design context for this project.
Read it in full before acting on any mission brief.
Do not make assumptions that contradict decisions documented here.
If you identify a genuine improvement or conflict, surface it before proceeding.

---

## What This Project Is

A personal developer portfolio for a Full Stack Developer with a focus on AI integration.
The portfolio features Proxenos — an embedded RAG assistant that lets visitors ask
natural language questions about the developer's projects, skills, and experience,
and receive answers grounded strictly in the portfolio's own content, with source citations.

The portfolio simultaneously IS the project demonstrating RAG.

---

## Locked Tech Stack

| Layer            | Decision                                              |
|------------------|-------------------------------------------------------|
| Framework        | Next.js 15, App Router, TypeScript strict mode        |
| Styling          | TailwindCSS + shadcn/ui, mobile-first                 |
| Deployment       | Cloudflare Workers via @opennextjs/cloudflare         |
| Vector Store     | Supabase pgvector (free tier)                         |
| Embeddings       | Gemini gemini-embedding-001 (server-side only).       |
|                  | output_dimensionality: 768 must be explicitly passed. |
| LLM              | Gemini 2.5 Flash (server-side only).                  |
|                  | Free tier limits: 10 RPM / 250 RPD.                   |
| Email            | Resend (server-side only, footer contact form)        |
| Content          | Git-based Markdown + JSON in /content directory       |

---

## Non-Negotiable Principles

1. TypeScript strict mode is on. Zero `any` types. No exceptions.
2. API keys are never on the client. All Gemini and Supabase service role calls
   live exclusively in /app/api routes. No NEXT_PUBLIC_ prefix on sensitive vars.
3. Mobile-first CSS on every component, every time.
4. Conventional Commits on every commit:
   feat: / fix: / content: / docs: / chore: / refactor:
5. shadcn/ui components are added only as needed — never bulk-installed.
6. Every API route returns a typed error shape and the correct HTTP status code.
7. No default exports from component files except for Next.js pages and layouts.
8. Tailwind v4 is in use. All design tokens and shadcn semantic colors are
   configured in app/globals.css via @theme inline {}. Do not create or
   reference tailwind.config.ts — it does not exist.
9. Server and client components cannot coexist in the same file.
   If a server component needs a client sub-component, extract the client
   component into a sibling file and import it. Never make an entire parent
   component a client component just to accommodate one interactive child.
10. Proxenos open/close state is managed via ProxenosContext
   (components/proxenos/proxenos-context.tsx).
   Any client component that needs to open or close Proxenos
   consumes useProxenos() — never prop-drills through server components.
11. The /api/chat/route.ts route is streaming-first. It uses
   generateContentStream() from the Gemini SDK and returns a
   ReadableStream via new Response(stream). The blocking
   generateContent() variant is never used for this route.

---

## Visual Identity — Codex

This portfolio uses the "Codex" design language. Every visual decision should
reinforce it. Do not substitute generic component defaults without flagging it.

| Element            | Value                                      |
|--------------------|--------------------------------------------|
| Background         | #0D0D0F (near-black, warm undertone)       |
| Primary text       | #F5F0E8 (warm cream)                       |
| Accent             | #E8A83E (amber-gold)                       |
| Heading typeface   | Instrument Serif (display, editorial)      |
| Technical typeface | Geist Mono (code, labels, project numbers) |
| Body typeface      | Geist Sans                                 |
| Layout rhythm      | Each section has a unique layout.          |
|                    | No repeated card grids across sections.    |
| Project display    | Numbered entries (01, 02...) with          |
|                    | full-width reveals on hover                |
| Interactions       | Deliberate weight, not snappy.             |
|                    | Page-turn transitions, not quick fades.    |
| Hero               | Cursor/touch-following amber bloom (350px  |
|                    | radius, concentrated, 10% opacity centre). |
|                    | Follows mouse on desktop, touch on mobile. |

---

## Proxenos — The RAG Assistant

Proxenos is the embedded AI assistant. Its name appears in mono small-caps
above the chat window.

**Trigger:** A fixed floating amber orb (`bottom-6 right-6`) with a pulsing
ping ring and "ASK" label. Disappears while the panel is open.

**Panel (desktop ≥ 768px):** Fixed sidebar (`w-[420px]`) that slides in from
the right with spring physics. Main page content shifts left via a
`motion.div marginRight` animation — non-blocking, fully interactive behind
the panel. Only applied on desktop; on mobile marginRight stays 0.

**Panel (mobile < 768px):** Full-width panel starting below the fixed header
(`top-16`) so the X close button is never obscured by the navbar.

**Close:** X button in panel header, OR click/tap the semi-transparent
backdrop (`z-30`) that covers the page behind the panel — works on both
desktop and mobile.

State is managed via `ProxenosContext` (`components/proxenos/proxenos-context.tsx`).
Any client component that needs to open or close Proxenos consumes
`useProxenos()` — never prop-drills.

Behaviour rules:
- Answers only from indexed portfolio content. Never from general knowledge.
- Always cites the source section at the end of every answer.
- Fallback response (when no relevant context exists):
  "I don't have details on that yet — feel free to reach out directly."
- Feedback buttons ("Was this helpful?") appear below every response.
- Feedback is logged to Supabase chat_feedback table.
- Prompt injection prevention: all user input is sanitized before
  being passed to the retrieval or LLM layer.

Proxenos API route: /app/api/chat/route.ts
Proxenos UI components: /components/proxenos/

---

## Folder Structure

portfolio/
├── .github/workflows/
│   ├── deploy.yml          # push to main → Cloudflare Workers
│   ├── embed.yml           # changes to content/** → re-run embed script
│   └── keepalive.yml       # scheduled 5-day cron; fires a read-only HTTP
│                           # request against portfolio_embeddings (anon key)
│                           # to prevent Supabase free-tier auto-pause.
│                           # No Node.js setup or npm steps.
├── app/
│   ├── layout.tsx
│   ├── page.tsx            # Home — hero, Q&A about, education timeline
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── stack/page.tsx
│   └── api/
│       ├── chat/route.ts
│       ├── feedback/route.ts
│       └── contact/route.ts
├── components/
│   ├── ui/                 # shadcn/ui only
│   ├── layout/
│   │   ├── contact-form.tsx
│   │   ├── header.tsx
│   │   ├── footer.tsx      # Contact form + social links
│   │   ├── hero.tsx
│   │   ├── layout-client.tsx  # 'use client' — ProxenosProvider + margin animation
│   │   └── nav.tsx
│   ├── portfolio/
│   │   ├── project-entry.tsx
│   │   ├── project-grid.tsx
│   │   ├── skill-badge.tsx
│   │   ├── skill-grid.tsx
│   │   └── education-timeline.tsx  # Vertical timeline, hover/tap expand
│   └── proxenos/
│       ├── proxenos-context.tsx    # Context + Provider + useProxenos hook
│       ├── proxenos-trigger.tsx    # Floating amber orb (fixed bottom-right)
│       ├── proxenos-panel.tsx      # Push-content sidebar (desktop) / full-screen (mobile)
│       ├── proxenos-message.tsx
│       ├── source-citation.tsx
│       └── feedback-buttons.tsx
├── content/
│   ├── projects/
│   │   ├── _template.md
│   │   ├── personal-portfolio.md
│   │   └── unified-content-dashboard.md
│   ├── about.md
│   ├── skills.json
│   └── education.json
├── lib/
│   ├── content/loader.ts
│   ├── proxenos/
│   │   ├── chunker.ts
│   │   ├── embeddings.ts
│   │   ├── retrieval.ts
│   │   └── prompt.ts
│   └── supabase/client.ts
├── scripts/
│   └── embed.ts            # npm run embed
├── types/
│   ├── project.ts
│   ├── skill.ts
│   ├── about.ts
│   ├── education.ts
│   └── chat.ts
├── public/images/projects/
├── .env.local              # Gitignored
├── .env.example            # Committed
├── wrangler.jsonc          # Cloudflare Workers config
├── next.config.ts
├── app/globals.css         # Codex design tokens live here via @theme inline {} # Tailwind v4 installed — no tailwind.config.ts
├── tsconfig.json
└── README.md

---

## Content Schema

Content lives in /content as Markdown and JSON.
The schema is designed to be Sanity-compatible for future CMS migration.
Do not restructure field names — they map directly to future Sanity document types.

See /types/ for the TypeScript interfaces that correspond to each content file.
See /content/projects/_template.md for the project authoring guide.

---

## Routes

/                    Home — hero, selected projects, Q&A about section,
                     education timeline (vertical, hover/tap-to-expand)
/projects            All projects — numbered, editorial layout
/projects/[slug]     Individual project case study
/stack               Technical competencies by category (no proficiency labels)
Footer               Contact form (Resend) + social links, present on all pages

No /contact page. Contact lives in the footer.
No /about page. About content lives on the home page as a Q&A section.

---

## Supabase Tables

Both tables already exist in the Supabase project.
Do not recreate them. The embed script upserts into portfolio_embeddings
using chunk_key as the unique identifier.

portfolio_embeddings  — vector store for Proxenos
chat_feedback         — evaluation logging

---

## Environment Variables

All documented in .env.example at the root.
GEMINI_API_KEY           — server-side only
NEXT_PUBLIC_SUPABASE_URL — safe to expose
NEXT_PUBLIC_SUPABASE_ANON_KEY — safe to expose
SUPABASE_SERVICE_ROLE_KEY — server-side only
RESEND_API_KEY           — server-side only