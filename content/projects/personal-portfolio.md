---
slug: "personal-portfolio"
title: "Personal Portfolio with Proxenos"
status: "in-progress"
featured: true
year: 2026
description: "A developer portfolio that replaces passive reading with active conversation, visitors ask Proxenos, an embedded RAG assistant, about projects, skills, and experience, and receive grounded, cited answers instantly."
coverImage: "/images/projects/ai-portfolio-proxenos.png"
liveUrl: ""
githubUrl: ""
category: "Full Stack"
tags: ["Next.js", "TypeScript", "TailwindCSS", "RAG", "Gemini API", "Supabase", "pgvector", "Cloudflare Workers"]
problem: "Static portfolio websites are fundamentally passive. A visitor who wants to know which projects involved a specific technology, or how a particular challenge was solved, has to read everything manually and piece together the answer themselves. In 2026, that friction is unnecessary — and it misses the most meaningful demonstration a full-stack developer can make: treating AI as genuine product functionality rather than something bolted on."
solution: "Proxenos, an embedded RAG assistant, indexes all portfolio content — project writeups, skills, case studies as vector embeddings. Visitors ask natural language questions and receive answers grounded strictly in the portfolio's own content, with source citations linking back to the exact section that answered them."
aiElement: "Full RAG pipeline: section-level chunking with per-chunk metadata, Gemini text-embedding-004 for vector generation, Supabase pgvector for semantic retrieval, Gemini 2.5 Flash for grounded synthesis. Includes source citation rendering, feedback logging to Supabase, prompt injection prevention, and a graceful fallback when the question falls outside indexed content."
techStackDetails: "Next.js 15 with the App Router was chosen for its co-located API routes — the architectural boundary that keeps all API keys strictly server-side. TypeScript in strict mode enforces type safety across the entire codebase. TailwindCSS with shadcn/ui provides a production-quality component system without building from scratch, preserving time for the design layer that matters. Supabase handles both the vector store and feedback logging in a single free-tier instance, reducing service sprawl. The Gemini API consolidates embeddings and LLM calls under one provider with a generous free tier. Cloudflare Workers via the OpenNext adapter provides deployment with unlimited bandwidth and global edge delivery at no cost."
challenges:
  - "Designing a chunking strategy that preserves semantic context without producing retrievals that are either too coarse or too fine. Resolved by chunking at section boundaries — each ## heading in a project writeup becomes one chunk, and each frontmatter field like problem and techStackDetails becomes its own discrete chunk — each carrying metadata that enables precise source citation."
  - "Keeping API keys strictly server-side in a Next.js project where client components can inadvertently expose environment variables. Resolved structurally: a hard architectural rule that all Gemini and Supabase service role calls live exclusively in /app/api routes, enforced through TypeScript environment variable typing."
  - "Designing a content schema that works as markdown today but migrates to a headless CMS without structural rewrites. Resolved by mapping every frontmatter field name directly to what Sanity would expect as a document field — the migration path is mechanical, not architectural."
learnings:
  - "RAG quality is 80% content quality. Vague, under-structured writeups produce vague, uncitable retrieval regardless of how well the pipeline is tuned. The time spent writing precise, section-structured content is directly returned in what Proxenos can answer."
  - "The portfolio as a RAG demo is more persuasive than any description of RAG could be. Every recruiter who interacts with Proxenos experiences the technology rather than reading about it."
---

## Overview

This portfolio is a conversation. Proxenos, an embedded RAG assistant, lets any visitor ask direct questions about projects, skills, and experience and receive grounded, cited answers without reading a single page manually. The portfolio simultaneously demonstrates the work and is the work.

The Codex visual identity — warm editorial dark, serif display typography, amber-gold accent, was designed to feel like a curated manuscript. Every section has a unique layout. Nothing repeats.

## The Problem

Most portfolios are passive archives. A visitor trying to find out whether a developer has worked with a specific technology, or how they approached a particular challenge, has to read everything and reconstruct the answer manually. In 2026, that friction is unnecessary.The more meaningful demonstration is being able to show a production-grade RAG pipeline rather than wrapping an API call in a text box — and that distinction is the most important thing a full-stack developer can make right now.

## The Solution

Proxenos indexes the entire portfolio as vector embeddings in Supabase pgvector. When a visitor asks a question, the retrieval pipeline pulls the most semantically relevant content chunks, passes them to Gemini 2.5 Flash with a strict grounding prompt, and returns a cited answer that links back to the source section. Proxenos knows when it does not know something, and says so exactly.

## Tech Stack

Next.js 15 with the App Router provides co-located API routes — the layer that keeps all API keys server-side without ceremony. TypeScript in strict mode enforces type safety across every API response, component prop, and database row. TailwindCSS with shadcn/ui provides a production-quality component foundation. Supabase handles both the vector store and feedback logging in one free-tier instance. The Gemini API consolidates embeddings and LLM responses under one provider. Cloudflare Workers via OpenNext deploys to the global edge with unlimited bandwidth on the free tier.

## Challenges & How I Resolved Them

Chunking strategy was the first real design decision. Too-coarse chunks contain the right answer buried in irrelevant text; too-fine chunks lose the semantic context needed to answer compound questions. The resolution was section-level chunking — each `##` heading in a project writeup becomes one chunk, each structured frontmatter field becomes another, and every chunk carries metadata that makes the source citation precise rather than approximate.

Keeping API keys strictly server-side requires active structural discipline, not just intent. The resolution was architectural: all Gemini and Supabase service role calls are confined to `/app/api` routes by rule, not by convention. TypeScript environment variable typing makes violations visible at compile time.

Designing a content schema that works as markdown today but migrates to a headless CMS cleanly required mapping every field name to its Sanity equivalent from the start. The migration, when it comes, is a data operation rather than a schema redesign.

## Key Learnings

RAG quality is overwhelmingly determined by the quality of the content being indexed. A well-tuned pipeline cannot recover what a vague writeup loses. The most valuable investment in this project was writing precise, section-structured content before the pipeline code was even written.

The portfolio-as-RAG is a stronger argument than any description of RAG could be. Interacting with Proxenos is understanding it.