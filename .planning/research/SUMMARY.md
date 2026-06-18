# Project Research Summary

**Project:** BizPulse
**Domain:** AI-Powered Business Intelligence (Mobile-first SaaS)
**Researched:** 2026-06-18
**Confidence:** HIGH

## Executive Summary

BizPulse is a mobile-first AI business intelligence platform connecting to any MySQL-backed business system to deliver real-time, conversational intelligence to business owners. The research domain covers BI dashboards, mobile analytics, NL-to-SQL systems, multi-tenant SaaS, and e-commerce analytics.

The recommended approach is a Laravel 12 unified backend with SQL-native analytics (no Python ML runtime for MVP), React Native/Expo for cross-platform mobile, and a phased build starting from data foundation through to AI co-pilot. The PRD and existing execution plan provide a detailed, validated technical strategy. All infrastructure targets free tiers for zero-cost operation until meaningful scale.

Key risk: client data access concerns are mitigated by read-only MySQL connectors and data minimization. The platform is designed for multi-tenancy from day one with schema-level PostgreSQL isolation.

## Key Findings

### Recommended Stack

The PRD defines a cohesive zero-cost stack: Laravel 12 API (Sanctum auth, database queues, scheduler), React Native/Expo for mobile (Victory Native charts, Zustand state, React Query, MMKV offline), PostgreSQL (Supabase free tier) for BizPulse DB with TimescaleDB, Cloudflare R2 for file storage, and Pusher Channels for real-time. AI features use Laravel AI SDK with Claude as primary LLM (owners fund their own API keys). Analytics are SQL-native — RFM, churn heuristics, anomaly detection, forecasting all expressed as scheduled SQL queries and PHP calculations.

**Core technologies:**
- Laravel 12 (PHP): Unified backend — API, auth, queues, scheduling, AI SDK in one framework without context switching
- React Native + Expo SDK: iOS + Android from single JS codebase; EAS Build for store submission
- PostgreSQL + TimescaleDB: Time-series optimized for metric storage; Supabase free tier
- Laravel AI SDK: Unified LLM driver (Claude, OpenAI, Gemini) with owner-funded API keys
- Victory Native XL: Best React Native charting library for BI dashboards

### Expected Features

**Must have (table stakes):**
- Real-time revenue monitoring with live ticker — every BI product has this
- Sales analytics (comparison deltas, heatmaps, trend charts) — users expect drill-down
- Inventory intelligence (dead stock alerts, reorder prediction) — critical for retail/e-commerce
- Customer segmentation and RFM scoring — standard BI expectation
- Financial snapshot (P&L, cash flow) — owners need this without an accountant
- Push notifications for anomalies — proactive alerts are table stakes for mobile BI
- Data sync engine (connector to client DB) — the foundation everything else depends on
- Multi-tenant SaaS architecture — required for the business model

**Should have (competitive):**
- AI Co-Pilot with NL-to-SQL — core differentiator, no competitor offers this natively
- Churn prediction with win-back automation — turns insight into action
- Sentiment analysis on reviews — unique angle for customer intelligence
- Monthly PDF financial digest — professional output, builds trust
- Biometric login — mobile-native UX expectation
- Offline mode with last-synced data — critical for Bangladesh connectivity

**Defer (v2+):**
- Voice input — v2 feature
- White-label app customization — v2 feature
- WhatsApp integration — v2 feature
- Write-back actions — v2 feature (read-only in v1)
- Restaurant/Clinic/Law firm editions — vertical expansion post-launch

### Architecture Approach

The system has 5 layers defined in the PRD: (1) Client Data Sources (read-only MySQL, external APIs), (2) Data Sync Engine (Laravel queues + scheduler, 5-min polling or webhook), (3) AI & Analytics Engine (SQL-native, no Python for MVP), (4) BizPulse API Server (Laravel 12, Sanctum, multi-tenant), (5) Client Applications (React Native mobile + Next.js web dashboard).

**Major components:**
1. Data Sync Engine — Connects to client MySQL, transforms and aggregates data into BizPulse PostgreSQL
2. Analytics Engine — Scheduled SQL jobs compute RFM, churn, anomalies, forecasts nightly
3. API Server — Laravel 12 REST + WebSocket API with tenant-scoped JWT auth
4. Mobile App — React Native/Expo with Zustand + React Query, Victory Native charts
5. AI Co-Pilot — NL-to-SQL via Laravel AI SDK, owner-funded API keys

### Critical Pitfalls

1. **Client refuses DB access** — Mitigate with read-only MySQL user creation guide; offer API-based integration alternative; offer on-premise data agent
2. **Non-standard client schemas** — Build robust schema discovery with AI auto-mapping; handle messy schemas gracefully
3. **AI Co-Pilot gives incorrect answers** — Always show underlying data source; implement confidence scores; sensitive actions require explicit owner approval
4. **Owner loses interest after initial excitement** — Design for daily habit with morning push notification; weekly check-ins during onboarding
5. **Infrastructure costs exceed projections** — Aggressive caching; per-client cost tracking; SaaS pricing with 70%+ margins

## Implications for Roadmap

Based on the PRD's 10-week build timeline and Execution Plan, suggested phase structure (coarse granularity, 5 phases):

### Phase 1: Data Foundation
**Rationale:** Everything depends on the data pipeline. Multi-tenancy, sync engine, and schema discovery must be solid before any analytics module.
**Delivers:** Read-only MySQL connector, multi-tenant API, schema auto-discovery, aggregate tables, sync commands, admin dashboard
**Addresses:** Sync engine, multi-tenant architecture, API authentication
**Avoids:** Rushing into analytics before the data pipeline is reliable

### Phase 2: Sales & Inventory Intelligence
**Rationale:** Revenue and inventory are the highest-value modules for the pilot client (e-commerce). These deliver immediate ROI.
**Delivers:** Revenue ticker, sales heatmap, anomaly alerts, dead stock radar, reorder prediction, margin per SKU, mobile home dashboard + sales/inventory screens
**Uses:** Victory Native charts, React Query data layer, scheduled SQL analytics
**Implements:** Analytics engine, mobile app shell with priority screens

### Phase 3: Customer & Financial Intelligence
**Rationale:** After sales/inventory are working, customer analytics and financial reporting add depth. RFM depends on order data from Phase 2.
**Delivers:** RFM scoring, churn prediction, CLV, P&L live statement, cash flow projection, logistics cost analysis, mobile customer/financial screens
**Uses:** Nightly SQL jobs for scoring, DomPDF for reports
**Implements:** Customer analytics module, financial snapshot

### Phase 4: AI Co-Pilot & Operations
**Rationale:** AI is the differentiator but depends on working data from prior phases. Operations module rounds out the 6-module suite.
**Delivers:** NL-to-SQL chat, simulation mode, sentiment analysis, employee performance, delivery SLA tracker, PDF report generation
**Uses:** Laravel AI SDK, Claude API
**Implements:** AI Co-Pilot, operations intelligence modules

### Phase 5: Launch Readiness
**Rationale:** Polish, notifications, offline mode, biometric auth, and store submission complete the MVP.
**Delivers:** Push notifications, offline mode with MMKV, biometric login, E2E testing, EAS Build submission, client onboarding flow
**Addresses:** All remaining mobile app features, production readiness

### Phase Ordering Rationale

- Data foundation first (dependency for everything)
- Sales/inventory deliver highest ROI for pilot client (e-commerce)
- Customer/financial build on order data from Phase 2
- AI Co-Pilot needs working data from all modules
- Launch readiness wraps everything with polish

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 1:** Schema discovery/mapping complexity — needs research on client DB patterns
- **Phase 4:** NL-to-SQL accuracy and safety — needs research on prompt engineering and query validation
- **Phase 5:** EAS Build and store submission — needs research on Expo deployment pipeline

Phases with standard patterns (skip research-phase):
- **Phase 2:** Well-documented SQL analytics patterns
- **Phase 3:** Standard RFM and financial reporting implementation

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | PRD defines stack with specific versions and rationale; aligned with developer's existing expertise (Laravel, React Native) |
| Features | HIGH | PRD maps 60+ owner pain points to specific features; table stakes vs differentiators clearly categorized |
| Architecture | HIGH | 5-layer architecture explicitly designed; multi-tenant from day one; SQL-native analytics strategy validated |
| Pitfalls | HIGH | PRD includes 7 categorized risks with specific mitigations; aligned with common BI/analytics project failure modes |

**Overall confidence:** HIGH

### Gaps to Address

- Client DB schema variability — handle during Phase 1 planning with concrete schema discovery approach
- NL-to-SQL safety — design query validation layer during Phase 4 planning
- Push notification reliability in Bangladesh — test Expo Notifications vs Firebase FCM during Phase 5

## Sources

### Primary (HIGH confidence)
- BizPulse_PRD.txt — comprehensive product requirements, technical architecture, stack decisions
- BizPulse_Execution_Plan.md — phase breakdown with specific implementation tasks
- BizPulse_UI_Guide.txt — 30+ screen UI specification

### Secondary (MEDIUM confidence)
- Laravel 12 docs — Sanctum, Queues, Scheduler, AI SDK
- React Native/Expo docs — EAS Build, Expo Notifications, MMKV
- Victory Native docs — charting capabilities

---

*Research completed: 2026-06-18*
*Ready for roadmap: yes*
