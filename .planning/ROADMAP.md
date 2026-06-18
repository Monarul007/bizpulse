# Roadmap: BizPulse

**Created:** 2026-06-18
**Granularity:** Coarse (5 phases)
**Mode:** MVP — vertical slices, each phase delivers end-to-end user capability
**Parallelization:** Enabled (independent plans within a phase run simultaneously)

## Phase Map

| Phase | Status | Plans | Progress |
|-------|--------|-------|----------|
| 1 | ○ | 0/4 | 0% |
| 2 | ○ | 0/4 | 0% |
| 3 | ○ | 0/3 | 0% |
| 4 | ○ | 0/3 | 0% |
| 5 | ○ | 0/3 | 0% |

---

### Phase 1: Data Foundation
**Goal:** Establish the data pipeline — client MySQL connection, multi-tenant architecture, sync engine, schema discovery, and API scaffolding — so that every subsequent phase has reliable data to work with.
**Mode:** mvp
**Success Criteria**:
1. A test client MySQL database can be connected via read-only credentials and its schema auto-discovered
2. Data sync runs on a 5-minute schedule, populating aggregate tables (hourly_sales, daily_sales, products, orders, customers) without errors
3. Admin can create a tenant, configure database connection, and see sync status via web dashboard
4. Mobile app project is scaffolded (Expo, dependencies, navigation shell, theme) and connects to API with tenant-scoped auth tokens
5. All API endpoints are authenticated with Sanctum JWT and enforce tenant isolation

**Requirements Covered:**
| Requirement | Phase | Status |
|-------------|-------|--------|
| AUTH-01 | Phase 1 | Pending |
| AUTH-02 | Phase 1 | Pending |
| AUTH-05 | Phase 1 | Pending |
| SYNC-01 | Phase 1 | Pending |
| SYNC-02 | Phase 1 | Pending |
| SYNC-03 | Phase 1 | Pending |
| SYNC-04 | Phase 1 | Pending |
| SYNC-05 | Phase 1 | Pending |
| SYNC-06 | Phase 1 | Pending |
| SYNC-07 | Phase 1 | Pending |
| MOB-01 | Phase 1 | Pending |

**Suggested Plans:**
1. **Multi-Tenant API Foundation** — Laravel 12 project scaffolding, Sanctum auth, tenant middleware, PostgreSQL schema-per-tenant, API resource classes, cursor pagination
2. **Data Sync Engine** — Secondary MySQL connection, auto-mapping schema discovery (AI-assisted), aggregate table migrations, scheduled sync commands (hourly-sales, daily-sales, products, orders, customers), anomaly detection query
3. **Admin Dashboard** — Landlord-only Inertia/React pages for tenant CRUD, connection test UI, column mapping interface, sync status monitoring
4. **Mobile App Scaffold** — Expo project initialization, dependency installation (victory-native, tanstack-query, zustand, mmkv, expo-notifications), theme/typography setup, bottom tab navigation shell, API client with JWT injection

**Dependencies:** None — this is the foundation.

---

### Phase 2: Sales & Inventory Intelligence
**Goal:** Deliver the two highest-value analytics modules — live revenue monitoring with anomaly alerts, and inventory intelligence with dead stock radar and reorder prediction — surfaced through the mobile app home dashboard and module screens.
**Mode:** mvp
**Success Criteria**:
1. Owner opens the app and sees a live revenue ticker with comparison deltas on the home dashboard
2. Revenue anomaly alert fires within 15 minutes when hourly sales drop below 50% of the 7-day rolling average
3. Dead stock radar correctly identifies SKUs with zero sales in 30+ days and shows capital at risk in BDT
4. Reorder prediction accurately estimates stockout dates for products with fewer than 7 days of inventory remaining
5. Sales and inventory module screens (home dashboard, sales detail, inventory list, product detail) are functional in the mobile app with Victory Native charts

**Requirements Covered:**
| Requirement | Phase | Status |
|-------------|-------|--------|
| SALE-01 | Phase 2 | Pending |
| SALE-02 | Phase 2 | Pending |
| SALE-03 | Phase 2 | Pending |
| SALE-04 | Phase 2 | Pending |
| SALE-05 | Phase 2 | Pending |
| SALE-06 | Phase 2 | Pending |
| SALE-07 | Phase 2 | Pending |
| SALE-08 | Phase 2 | Pending |
| SALE-09 | Phase 2 | Pending |
| INV-01 | Phase 2 | Pending |
| INV-02 | Phase 2 | Pending |
| INV-03 | Phase 2 | Pending |
| INV-04 | Phase 2 | Pending |
| INV-05 | Phase 2 | Pending |
| INV-06 | Phase 2 | Pending |
| MOB-04 | Phase 2 | Pending |
| MOB-05 | Phase 2 | Pending |
| MOB-06 | Phase 2 | Pending |

**Suggested Plans:**
1. **Sales Analytics Engine** — Revenue aggregation (hourly + daily), comparison delta calculations, hourly heatmap data, anomaly detection (rolling average threshold), linear trend forecasting, promotion ROI tracking, channel attribution queries, geographic breakdown queries
2. **Inventory Analytics Engine** — Dead stock detection, sell velocity calculation, stockout prediction, margin-per-SKU calculation, seasonal pattern detection, bundle co-occurrence analysis, brand profitability ranking
3. **Sales & Revenue API** — REST endpoints for revenue ticker, sales history, heatmap data, anomaly list, forecast, promos, channels, geography; WebSocket for live ticker push; Redis/file cache for dashboard queries
4. **Mobile Home + Sales + Inventory Screens** — Home dashboard (hero revenue card, at-a-glance grid, AI alert cards), sales module (revenue summary, trend chart, top products, channel chart), inventory module (stats cards, dead stock list, reorder signals, product detail drill-down), Victory Native chart integration, React Query data layer

**Dependencies:** Phase 1 (sync engine must be running with data in aggregate tables)

---

### Phase 3: Customer & Financial Intelligence
**Goal:** Add depth with customer analytics (RFM segmentation, churn prediction, win-back) and financial intelligence (live P&L, cash flow, monthly PDF reports) — rounding out the data foundation with the modules that drive retention and financial clarity.
**Mode:** mvp
**Success Criteria**:
1. Every customer is auto-segmented daily into RFM categories (Champion, Loyal, At Risk, Lost, New) based on SQL-computed scores
2. Owner receives a VIP early warning alert when a top customer's order frequency drops 2x below their personal baseline
3. Live P&L statement shows revenue, COGS, gross profit, and estimated net margin updated daily
4. Monthly PDF financial digest is auto-generated and emailed on the 1st of each month
5. Customer intelligence and financial module screens are functional in the mobile app

**Requirements Covered:**
| Requirement | Phase | Status |
|-------------|-------|--------|
| CUST-01 | Phase 3 | Pending |
| CUST-02 | Phase 3 | Pending |
| CUST-03 | Phase 3 | Pending |
| CUST-04 | Phase 3 | Pending |
| CUST-05 | Phase 3 | Pending |
| CUST-06 | Phase 3 | Pending |
| CUST-07 | Phase 3 | Pending |
| FIN-01 | Phase 3 | Pending |
| FIN-02 | Phase 3 | Pending |
| FIN-03 | Phase 3 | Pending |
| FIN-04 | Phase 3 | Pending |
| FIN-05 | Phase 3 | Pending |
| FIN-06 | Phase 3 | Pending |

**Suggested Plans:**
1. **Customer Analytics Engine** — RFM scoring (nightly SQL: recency/frequency/monetary), churn heuristics (order gap vs 1.5x-3x personal baseline), CLV calculation, next-purchase prediction, cohort retention curves, sentiment keyword matching + LLM classification
2. **Financial Analytics Engine** — P&L daily computation (revenue, COGS, gross profit, operating expenses, net margin), cash flow projection (inflow vs outflow runway), target-vs-actual tracker, logistics cost-per-order breakdown, discount impact model, DomPDF monthly report Blade template, Laravel Mail auto-send with Cloudflare R2 storage
3. **Mobile Customer + Financial Screens** — Customer module (segment overview, RFM bar, VIP list, customer detail with order history chart, win-back composer), financial module (P&L summary card, cash flow projection, logistics breakdown, monthly report preview)

**Dependencies:** Phase 2 (order and product data needed for RFM, CLV, and financial calculations)

---

### Phase 4: AI Co-Pilot & Operations
**Goal:** Deliver the core differentiator — an AI co-pilot that answers business questions in natural language — plus the operations intelligence module for team and delivery management.
**Mode:** mvp
**Success Criteria**:
1. Owner types "Which product made me the most profit last month?" and receives an accurate answer from live data within 5 seconds
2. NL-to-SQL pipeline safely converts natural language to read-only SQL queries with schema context from the LLM
3. Simulation mode returns confidence-ranged projections for price change and promotion scenarios
4. Employee performance dashboard shows ranked scores with objective metrics
5. Delivery SLA tracker shows on-time percentage by courier partner and district
6. AI co-pilot interface is integrated into the mobile app with chat UI and ✦ sparkle branding

**Requirements Covered:**
| Requirement | Phase | Status |
|-------------|-------|--------|
| AI-01 | Phase 4 | Pending |
| AI-02 | Phase 4 | Pending |
| AI-03 | Phase 4 | Pending |
| AI-04 | Phase 4 | Pending |
| AI-05 | Phase 4 | Pending |
| AI-06 | Phase 4 | Pending |
| AI-07 | Phase 4 | Pending |
| OPS-01 | Phase 4 | Pending |
| OPS-02 | Phase 4 | Pending |
| OPS-03 | Phase 4 | Pending |
| OPS-04 | Phase 4 | Pending |
| OPS-05 | Phase 4 | Pending |
| OPS-06 | Phase 4 | Pending |

**Suggested Plans:**
1. **AI Co-Pilot Engine** — Laravel AI SDK integration (owner API key config in settings), NL-to-SQL pipeline (schema context injection → LLM → safe query extraction → read-only execution → result formatting), root cause analysis chain (correlation across anomaly/timeline/courier/review data), simulation mode (price elasticity estimation, what-if calculator), daily insight summary generation, AI content branding (✦ sparkle, confidence badges)
2. **Operations Analytics Engine** — Employee performance scoring (orders processed, CSAT, tickets resolved, response time), delivery SLA tracking (promised vs actual by courier and district), support ticket classification (recurring complaint detection), content ROI correlation (post dates → sales spikes), fraud detection heuristics (new account + large order + address anomalies), capacity planning calculations
3. **Mobile AI Co-Pilot + Operations Screens** — Chat interface with message bubbles (user blue, AI with purple-left-border ✦ prefix), inline charts in AI responses, simulation mode UI with parameter inputs, operations dashboard (employee cards, SLA tracker, ticket analytics, fraud flags), settings screen (API key configuration, notification preferences)

**Dependencies:** Phase 3 (customer data needed for sentiment analysis; financial data needed for simulation mode)

---

### Phase 5: Launch Readiness
**Goal:** Polish the app with biometric auth, push notifications, offline mode, end-to-end testing, and store deployment — making the MVP production-ready for the pilot client.
**Mode:** mvp
**Success Criteria**:
1. Owner can unlock the app via fingerprint/Face ID and fall back to PIN entry
2. Push notification fires within 30 seconds of an anomaly alert being triggered
3. App displays last-synced dashboard data when offline with a clear connectivity status indicator
4. App passes end-to-end testing on pilot client's live data without errors
5. App is submitted to Apple App Store and Google Play Store via EAS Build

**Requirements Covered:**
| Requirement | Phase | Status |
|-------------|-------|--------|
| AUTH-03 | Phase 5 | Pending |
| AUTH-04 | Phase 5 | Pending |
| MOB-02 | Phase 5 | Pending |
| MOB-03 | Phase 5 | Pending |

**Suggested Plans:**
1. **Auth & Security Hardening** — Biometric login (expo-local-authentication for fingerprint + Face ID), PIN entry screen with 6-digit code, secure token storage, session timeout, failed-attempt lockout
2. **Push Notifications & Offline Mode** — Expo Notifications setup (alert triggers for anomalies, churn, daily briefing), MMKV offline storage (cache last-synced dashboard state), connectivity monitor, offline banner UI, background sync on reconnect
3. **Testing & Deployment** — E2E testing on eMartway live data, query performance optimization (cache tuning, index review), Sentry error tracking setup, EAS Build configuration (iOS + Android profiles), App Store + Play Store submission, onboarding documentation for pilot client

**Dependencies:** All prior phases (everything must be functional before launch polish)

---

## Coverage Summary

- **v1 requirements total:** 59
- **Mapped to phases:** 59
- **Unmapped:** 0 ✓

## Phase Flow

```
Phase 1 (Foundation)
    │
    ▼
Phase 2 (Sales & Inventory) ──────┐
    │                              │
    ▼                              ▼
Phase 3 (Customer & Financial)   (independent plans within phases run in parallel)
    │
    ▼
Phase 4 (AI Co-Pilot & Operations)
    │
    ▼
Phase 5 (Launch Readiness) → MVP shipped 🎉
```

---

*Roadmap created: 2026-06-18*
*Last updated: 2026-06-18 after initial definition*
