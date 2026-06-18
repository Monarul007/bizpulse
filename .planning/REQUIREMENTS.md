# Requirements: BizPulse

**Defined:** 2026-06-18
**Core Value:** Give every business owner real-time, conversational intelligence about their entire business — accessible from their pocket, without requiring them to log into admin panels, run reports, or change their existing workflow.

## v1 Requirements

Requirements for initial MVP release. Each maps to roadmap phases.

### Authentication & Access

- [ ] **AUTH-01**: User can sign in with email and password via JWT/Sanctum tokens
- [ ] **AUTH-02**: User session persists across app restarts (refresh tokens)
- [ ] **AUTH-03**: User can unlock app via biometric (fingerprint/Face ID)
- [ ] **AUTH-04**: User can enter 6-digit PIN as fallback authentication
- [ ] **AUTH-05**: API enforces tenant isolation — each token scoped to one business tenant

### Data Sync & Multi-Tenant

- [ ] **SYNC-01**: System connects to client MySQL database with read-only credentials
- [ ] **SYNC-02**: System syncs data every 5 minutes via Laravel Scheduler (polling) or on webhook trigger
- [ ] **SYNC-03**: System auto-discovers client database schema (tables, columns) with AI-assisted mapping
- [ ] **SYNC-04**: Admin can manage tenants via web dashboard (create, configure connection, test, delete)
- [ ] **SYNC-05**: Admin can configure column mappings between client DB and BizPulse aggregate tables
- [ ] **SYNC-06**: System stores computed metrics in schema-isolated PostgreSQL per tenant
- [ ] **SYNC-07**: Sync jobs create aggregate tables (hourly_sales, daily_sales, products, orders, customers, anomaly_alerts)

### Sales & Revenue Intelligence

- [ ] **SALE-01**: User sees live revenue ticker updating every 60 seconds on home dashboard
- [ ] **SALE-02**: Revenue shows comparison deltas vs yesterday, last week, last month with trend indicators
- [ ] **SALE-03**: User sees hourly sales heatmap showing best hours and days by revenue
- [ ] **SALE-04**: User receives anomaly alert when sales drop below 50% of same-hour 7-day rolling average
- [ ] **SALE-05**: Revenue forecast projects end-of-month total based on current trajectory
- [ ] **SALE-06**: User sees promotion/coupon ROI tracking (revenue generated vs discount cost)
- [ ] **SALE-07**: User sees sales attribution by channel (app, website, Facebook, direct)
- [ ] **SALE-08**: User sees geographic sales breakdown by district/region
- [ ] **SALE-09**: User sees top products by revenue in selected time period with rank and bar chart

### Inventory Intelligence

- [ ] **INV-01**: User sees dead stock radar — SKUs with zero sales in 30+ days showing capital at risk in BDT
- [ ] **INV-02**: User sees reorder prediction — stockout date per SKU based on sell velocity with suggested reorder quantity
- [ ] **INV-03**: User sees true margin per SKU (sale price minus purchase cost, logistics, return impact)
- [ ] **INV-04**: User sees seasonal demand pattern detection with proactive restock alerts
- [ ] **INV-05**: User sees bundle opportunity finder — product pairs/triplets frequently bought together
- [ ] **INV-06**: User sees brand-level profitability ranking (which brands earn most margin)

### Customer Intelligence

- [ ] **CUST-01**: User sees RFM segmentation — every customer auto-classified as Champion, Loyal, At Risk, Cooling Down, or Lost
- [ ] **CUST-02**: User sees churn prediction — risk score per customer based on order gap vs personal baseline
- [ ] **CUST-03**: User sees customer lifetime value (CLV) forecast per customer
- [ ] **CUST-04**: User sees win-back automation — AI-drafted personalized messages for at-risk customers with one-tap send approval
- [ ] **CUST-05**: User sees sentiment analysis — brand health score from reviews and support tickets (positive/neutral/negative %)
- [ ] **CUST-06**: User sees VIP early warning — alert when top customer order frequency drops below personal baseline
- [ ] **CUST-07**: User sees cohort retention curves — monthly customer cohort analysis showing retention over time

### Financial Intelligence

- [ ] **FIN-01**: User sees live P&L statement (revenue, COGS, gross profit, operating expenses, estimated net margin) updated daily
- [ ] **FIN-02**: User sees cash flow projection with estimated runway (days until funds needed)
- [ ] **FIN-03**: User sees monthly target vs actual tracker with end-of-month ETA
- [ ] **FIN-04**: User sees logistics cost breakdown per order by courier partner and delivery zone
- [ ] **FIN-05**: User receives auto-generated monthly PDF financial digest via email on the 1st of each month
- [ ] **FIN-06**: User sees discount impact model (revenue lost vs retention gained from promotions)

### People & Operations Intelligence

- [ ] **OPS-01**: User sees employee performance scores with objective metrics (orders processed, CSAT, tickets resolved)
- [ ] **OPS-02**: User sees delivery SLA tracker — on-time % per courier partner per district
- [ ] **OPS-03**: User sees support ticket analytics — average resolution time, recurring complaint categories
- [ ] **OPS-04**: User sees content team ROI — posts/reels correlated with sales spikes
- [ ] **OPS-05**: User sees fraud detection flags — suspicious patterns (unusual bulk orders, repeated delivery failures, fake COD addresses)
- [ ] **OPS-06**: User sees capacity planning alerts — forward-looking hire recommendations based on growth rate

### AI Co-Pilot

- [ ] **AI-01**: User can type natural language questions (Bengali or English) and receive data-driven answers drawn from live data
- [ ] **AI-02**: System translates natural language to safe read-only SQL queries using LLM with schema context
- [ ] **AI-03**: User can ask root cause analysis questions (e.g., "Why did revenue drop last Tuesday?") and receive causal chain explanations
- [ ] **AI-04**: User can run simulation mode to model business scenarios (e.g., price changes, promotion impact) with confidence-ranged projections
- [ ] **AI-05**: User can trigger AI-initiated actions with explicit approval (generate report, draft win-back message, identify customer list)
- [ ] **AI-06**: User receives AI-generated daily insight summary on home dashboard with prioritized alerts
- [ ] **AI-07**: AI Co-Pilot interface shows ✦ sparkle branding on all AI-generated content with confidence indicators

### Mobile App

- [ ] **MOB-01**: App runs on iOS and Android via single React Native/Expo codebase
- [ ] **MOB-02**: User receives push notifications for anomaly alerts, churn warnings, and daily briefing
- [ ] **MOB-03**: App displays last-synced data when offline with connectivity status indicator
- [ ] **MOB-04**: App has bottom tab navigation: Home Dashboard, Sales, Inventory, Customers, More
- [ ] **MOB-05**: User sees onboarding flow — 3 welcome screens + connect business setup + sync progress
- [ ] **MOB-06**: App shows splash screen with BizPulse branding and loading progress

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Enhanced Access

- **AUTH-06**: User can sign in via OAuth (Google, GitHub)
- **AUTH-07**: User can configure multi-user roles (manager, accountant, operations with limited access)

### Enhanced Features

- **AI-08**: User can use voice input to ask questions ("Hey BizPulse, what's today's revenue?")
- **AI-09**: User receives daily business summary via WhatsApp message
- **CUST-08**: System can write back win-back messages to client system (v1 is read-only)
- **MOB-07**: Web dashboard — full Next.js dashboard for desktop power users
- **SYNC-08**: White-label app — published under client's own brand and App Store account
- **SYNC-09**: API marketplace — connect to Shopify, WooCommerce, Tally ERP, bKash

### Vertical Editions

- **VERT-01**: Restaurant edition — table management, kitchen KPIs, food cost analysis
- **VERT-02**: Clinic edition — appointment flow, doctor performance, revenue per service
- **VERT-03**: Law firm edition — billable hours, case win rate, invoice aging

## Out of Scope

| Feature | Reason |
|---------|--------|
| Write-back to client database (v1) | Security risk; read-only architecture simpler and safer for MVP |
| Native POS / order management system | Not a core BI function; competes with client's existing system |
| Full ERP replacement | Massive scope; BizPulse is intelligence layer, not operations system |
| Direct payment processing | Regulatory complexity; out of scope for BI product |
| Real-time chat between users | Not core to BI value proposition; high complexity |
| Video/image posts in reports | Storage/bandwidth costs; PDF and text/chart reports sufficient |
| Competitor benchmarking | Requires data sharing across clients; privacy concern for v1 |
| Multi-location/chains support | v4 feature; MVP targets single-location businesses |

## Traceability

Mapping of v1 requirements to roadmap phases. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| AUTH-01 | Phase 1 | Pending |
| AUTH-02 | Phase 1 | Pending |
| AUTH-03 | Phase 5 | Pending |
| AUTH-04 | Phase 5 | Pending |
| AUTH-05 | Phase 1 | Pending |
| SYNC-01 | Phase 1 | Pending |
| SYNC-02 | Phase 1 | Pending |
| SYNC-03 | Phase 1 | Pending |
| SYNC-04 | Phase 1 | Pending |
| SYNC-05 | Phase 1 | Pending |
| SYNC-06 | Phase 1 | Pending |
| SYNC-07 | Phase 1 | Pending |
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
| MOB-01 | Phase 1 | Pending |
| MOB-02 | Phase 5 | Pending |
| MOB-03 | Phase 5 | Pending |
| MOB-04 | Phase 2 | Pending |
| MOB-05 | Phase 2 | Pending |
| MOB-06 | Phase 2 | Pending |

**Coverage:**
- v1 requirements: 59 total
- Mapped to phases: 59
- Unmapped: 0 ✓

---
*Requirements defined: 2026-06-18*
*Last updated: 2026-06-18 after initial definition*
