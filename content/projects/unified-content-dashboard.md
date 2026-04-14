---
slug: "unified-content-dashboard"
title: "Unified Content Dashboard"
status: "completed"
featured: true
year: 2026
description: "A single-file vanilla JavaScript dashboard that consolidates seven types of fragmented digital content, from browser tabs to local documents, with a vintage analog aesthetic and smart suggestions."
coverImage: "/images/projects/unified-content-dashboard.png"
liveUrl: "https://rayantanveer.github.io/unified-content-dashboard"
githubUrl: "https://github.com/rayantanveer/unified-content-dashboard"
category: "Tool"
tags: ["Vanilla JavaScript", "HTML", "CSS", "State Management", "Single-file Architecture", "Algorithm Design"]
problem: "Digital fragmentation creates cognitive overload. Perpetually open browser tabs, scattered bookmarks across browsers, and local files stored haphazardly make it difficult to maintain mental clarity and track content you want to consume. This dashboard solves that problem by providing a single, centralized system for managing all 'to-consume' content."
solution: "A self-contained HTML file that acts as a personal content operating system. Seven content types are unified under one interface, each item assigned a type, priority, and estimated engagement time. A scoring algorithm balances priority against age to surface what deserves attention next, preventing high-priority items from perpetually dominating and allowing older content to surface before it becomes permanently buried."
aiElement: ""
techStackDetails: "Vanilla JavaScript, HTML, CSS - No frameworks or build tools\n- Why: Maximum simplicity, portability, and control for vintage aesthetic\n- Single-file architecture enables instant deployment and easy sharing\n- No dependencies or installation required\n\nIndexedDB - Client-side database\n- Why: Persistent storage without server, works offline, handles large datasets\n- Schema versioning enables future upgrades without breaking existing data\n- Built-in browser support across modern browsers\n\nFile System Access API - For local file handling\n- Why: Native browser capability for reading screenshots and documents\n- Secure, user-controlled file access without server uploads"
challenges:
  - "Managing independent filter states across two views, Active and Archive, without a reactivity system. React handles this with component state and context. In vanilla JS, a manual filterStates object was built to hold each view's state independently, with explicit save and load logic on every view switch and deliberate DOM update calls to prevent state bleed between views."
  - "Manual re-rendering across multiple dependent UI regions. A single 'complete item' action affects four separate DOM regions: the content card, the stats bar, the bulk selection counter, and the stale content badge. Each had to be updated explicitly with disciplined function calls rather than relying on a re-render cycle."
  - "Implementing compound filter logic, multi-select type AND category AND date range AND text search, with correct AND/OR precedence and consistent behaviour when switching views. Resolved by centralizing all filter evaluation into a single pure function that takes the current filter state and full dataset and returns a filtered array, making the logic independently testable."
learnings: "Single-File Architecture Forces Disciplined Code Organization\nBuilding a sophisticated application in one HTML file sounds limiting, but it actually enforced better practices. Without the ability to split concerns into separate files, I had to be extremely deliberate about code structure, clear section headers and comprehensive commenting became necessities\n- Key Insight: Constraints breed discipline. The single-file approach meant every function and class had to justify its existence and location. There was no hiding messy code in a separate module I could ignore. This forced me to think architecturally from the start rather than refactoring later.\n- Technical takeaway: When you remove the escape hatch of 'I'll organize this later,' you organize it now. The portability benefits (one file to backup/deploy/maintain) were worth the upfront discipline.\n\nState Management Without Frameworks Teaches You What Frameworks Actually Do\nReact's useState and Vue's reactivity feel like magic until you implement state management manually. This project made me build view-specific filter states, bulk selection tracking, and form state synchronization entirely in vanilla JavaScript\n- The challenge: When a user switches from Active to Archive view, the filter pills need to visually reflect that view's saved state. When they select 10 items for bulk actions, those selections must persist through filtering and sorting but clear when switching views. Every state change required explicitly updating the DOM, tracking what changed, and ensuring dependent UI elements stayed in sync.\n- What I learned: Frameworks aren't doing 'magic', they're doing the tedious, error-prone work of propagating state changes through the UI. Building this manually gave me deep appreciation for React's reconciliation algorithm and made me a better framework user. I now understand exactly what useEffect dependencies are preventing and why immutable state updates matter.\n- Practical impact: When I return to React projects, I write better state management code because I've seen the complexity frameworks abstract away. I know when to reach for Context, when to lift state up, and when I'm fighting the framework.\n\nPre-Publication Audits Reveal Blind Spots You'll Never Catch Otherwise\nBefore publishing to GitHub, I conducted a systematic audit: code quality, security vulnerabilities, documentation accuracy, and cross-file consistency checks. It caught critical issues I'd completely missed during development.\nWhat the audit found:\n- Defined-but-unused constants: MAX_FILE_SIZE was defined but never referenced - file uploads weren't actually validated for size despite having the limit in code.\n- XSS vulnerability: User-entered tags were rendered as raw HTML (innerHTML instead of textContent). A tag containing <img src=x onerror=alert(1)> would have executed JavaScript.\nWhy this matters: The audit process taught me that 'it works on my machine' isn't the same as 'it's ready for others to see.'\nProcess learned: For portfolio projects, systematic auditing is non-negotiable:\n1. Security scan (user input handling, XSS vectors)\n2. Code quality check (dead code, unused variables)\n3. Cross-file consistency (no contradictions between docs) "
---

## Overview

The Unified Content Dashboard began as a personal tool and became an architectural argument. It consolidates seven types of digital content — browser tabs, bookmarks, YouTube videos, articles, screenshots, text files, and Word documents, into a single interface with a analog aesthetic and a smart suggestion algorithm.

The entire application is one HTML file. There is no build step, no framework, no dependencies. It simply opens by dragging it into a browser.

## The Problem

Digital fragmentation creates cognitive overload. Perpetually open browser tabs, scattered bookmarks across browsers, and local files stored haphazardly make it difficult to maintain mental clarity and track content you want to consume. This dashboard solves that problem by providing a single, centralized system for managing all "to-consume" content.

## The Solution

The dashboard provides:

Unified content hub: All types of content (YouTube videos, articles, websites, screenshots, text files, documents) in one place
Completion tracking: Mark items as complete and move them to a separate archive view
Smart organization: Categories, tags, and time estimates for efficient prioritization
Quick Win filter: Surface items under 10 minutes for momentum-building
Smart Suggestions: Time-budget-aware recommendations with staleness scoring
Content Health: Age badges, Review Queue, and staleness tracking for content freshness
Analog aesthetic: Calming, old-school design that reduces visual clutter

## Tech Stack

Vanilla JavaScript, HTML, CSS - No frameworks or build tools

- Why: Maximum simplicity, portability, and control for vintage aesthetic
- Single-file architecture enables instant deployment and easy sharing
- No dependencies or installation required

IndexedDB - Client-side database

- Why: Persistent storage without server, works offline, handles large datasets
- Schema versioning enables future upgrades without breaking existing data
- Built-in browser support across modern browsers

File System Access API - For local file handling

- Why: Native browser capability for reading screenshots and documents
- Secure, user-controlled file access without server uploads

## Challenges & How I Resolved Them

State management without reactivity was the central architectural challenge. The dashboard has two independent views — Active and Archive — each with its own filter configuration. Without React's component model, a `filterStates` object was constructed manually to hold each view's state independently. Every view switch explicitly saves the departing view's state, loads the arriving view's state, and updates every UI element affected by the transition.

Manual re-rendering required knowing exactly what each action touches. Completing a single item affects four separate DOM regions: the content card disappears, the stats bar recalculates, the bulk selection counter updates, and any stale badge clears. In React, a re-render cycle handles this automatically. In vanilla JS, each of these updates is an explicit, deliberate call. Missing one means a UI that silently lies about the application's state.

Compound filtering across type, category, date range, and text search simultaneously required implementing the AND/OR precedence that a state library would abstract away. The resolution was a single pure filter function that takes the complete filter state and the full dataset and returns a result, fully independent of the DOM. This made the logic testable in isolation and predictable across view switches.

## Key Learnings

Building without a framework makes every abstraction visible. The virtual DOM, component reactivity, co-located state — these stop being features of a tool and become problems you understand because you solved them manually. Every React or Next.js pattern used in subsequent projects has carried a different weight since.

The single-file constraint was not a limitation, it was the best architectural forcing function in any project so far. With no file system to distribute complexity across, every decision had to be deliberate, every function had to earn its place, and the entire application had to be held in one coherent mental model.