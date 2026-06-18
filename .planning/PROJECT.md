# BizPulse

## What This Is

BizPulse is a mobile-first AI business intelligence platform that plugs into any existing business system (MySQL) and gives the business owner a real-time, conversational view of their entire operation — sales, inventory, customers, finances, and team — through a React Native mobile app. It is an AI co-pilot that monitors everything, alerts proactively, and answers business questions in plain language via an NL-to-SQL engine backed by Claude AI. The product operates as a multi-tenant SaaS deployable for any business type without changing the client's existing systems.

## Core Value

Give every business owner real-time, conversational intelligence about their entire business — accessible from their pocket, without requiring them to log into admin panels, run reports, or change their existing workflow.

## Business Context

- **Customer**: Business owners / Managing Directors of small-to-medium businesses (10-500 employees) with existing operational systems
- **Revenue model**: SaaS subscription with per-tenant pricing; pilot client is eMartway Skincare Limited (Bangladesh's largest beauty e-commerce platform, 300+ brands, 1,000+ SKUs)
- **Success metric**: Daily active users (owners checking the app every morning) and reduction in time-to-answer for business questions (from hours/manual reports to seconds/conversational)
- **Strategy notes**: White-label SaaS long-term goal; platform-independent architecture with zero vendor lock-in

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Real-time revenue monitoring with live ticker and comparison deltas
- [ ] Sales analytics — hourly heatmap, anomaly alerts, promotion ROI, channel attribution
- [ ] Inventory intelligence — dead stock radar, reorder prediction, margin per SKU, seasonal patterns
- [ ] Customer intelligence — RFM segmentation, churn prediction, CLV, win-back automation
- [ ] Financial intelligence — live P&L, cash flow projection, logistics cost analysis
- [ ] People & operations intelligence — employee performance, delivery SLA, support analytics
- [ ] AI Co-Pilot — natural language query, NL-to-SQL, simulation mode, action capabilities
- [ ] Biometric login (fingerprint / Face ID)
- [ ] Push notifications for proactive alerts
- [ ] Offline mode with last-synced data
- [ ] Monthly PDF financial digest auto-generation
- [ ] Multi-tenant architecture with schema-level isolation
- [ ] Read-only MySQL connector to client databases
- [ ] Data sync engine (5-min polling or webhook-triggered)
- [ ] Web dashboard for landlord admin (Next.js)

### Out of Scope

- Writing back to the client's database — read-only only in v1
- Native POS or order management system
- Full ERP replacement
- Direct payment processing
- White-label app customization — v2 feature
- Voice input — v2 feature
- Real-time chat — high complexity, not core to BI value
- OAuth login — email/password sufficient for v1

## Context

BizPulse targets business owners in Bangladesh (and globally) who are rich in data but poor in answers. They have custom admin systems, sales reports, spreadsheets — but no single place to ask "How is my business doing right now?" and get an instant, intelligent response. The pilot client, eMartway Skincare, operates a custom Laravel + MySQL e-commerce system.

The mobile app is built with React Native (Expo SDK) for iOS and Android. The API server is Laravel 12 with database queue driver and file cache for MVP. Analytics are SQL-native — no Python ML runtime required. AI features use Laravel AI SDK with Claude as the primary LLM (owners fund their own API keys). Infrastructure targets free tiers: Supabase PostgreSQL, Cloudflare R2, Fly.io or client's own VPS.

The project has 3 components:
1. **bizpulse-api** — Laravel 12 backend (existing codebase)
2. **bizpulse-mobile** — React Native/Expo mobile app (existing codebase)
3. **Web dashboard** — Next.js landlord admin (planned)

## Constraints

- **Tech stack**: Laravel 12 (PHP) for API, React Native/Expo for mobile, Next.js for web dashboard, PostgreSQL for BizPulse DB, MySQL read-only for client DB
- **Cost**: Zero infrastructure investment for developer — all free/open-source tiers; AI API costs funded by client's own API keys
- **Security**: Read-only database access only; biometric auth for mobile; JWT/Sanctum tokens; multi-tenant isolation via middleware
- **Platform**: iOS + Android via single React Native codebase (Expo managed workflow)
- **Language/Region**: Primary market is Bangladesh; Bengali language support for AI co-pilot; BDT currency display
- **Architecture**: No vendor lock-in — every component replaceable and self-hostable; all analytics SQL-native for MVP

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Laravel 12 as unified backend instead of Python/FastAPI | Developer's primary expertise; eliminates context switching; built-in queue/scheduler/auth; Laravel AI SDK provides LLM driver interface | — Pending |
| SQL-native analytics instead of Python ML libraries | Identical output at MVP scale without infrastructure overhead; RFM, churn, forecasting all expressible in SQL + PHP | — Pending |
| React Native/Expo instead of Flutter | Developer's existing skill; iOS + Android from single JS codebase; EAS Build handles store submission | — Pending |
| Claude AI via Laravel AI SDK for co-pilot | First-party Laravel package; unified driver interface works with Claude, OpenAI, Gemini; owners fund own API keys | — Pending |
| Multi-tenant via schema-level isolation in single PostgreSQL | Simpler than database-per-tenant for MVP; Supabase free tier covers 500MB | — Pending |
| Read-only client DB access | Zero risk to client's operational system; no write-back complexity; simpler security model | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-06-18 after initialization*
