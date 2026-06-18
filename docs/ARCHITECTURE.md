# Architecture

## System Overview

BizPulse is a 5-layer system connecting to client databases (read-only) and delivering AI-powered business intelligence through a mobile app.

```
┌─────────────────────────────────────────────────────────────────────────┐
│ LAYER 5 — CLIENT APPLICATIONS                                             │
│ ┌─────────────────────┐  ┌─────────────────────┐                         │
│ │ React Native / Expo │  │ Next.js Web Dashboard│                         │
│ │ iOS + Android        │  │ (Landlord Admin)     │                         │
│ └──────────┬──────────┘  └──────────┬──────────┘                         │
│            │ REST / WebSocket        │ Inertia / REST                     │
├────────────┴─────────────────────────┴───────────────────────────────────┤
│ LAYER 4 — BIZPULSE API SERVER (Laravel 12)                                │
│ ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌──────────────┐│
│ │ Sanctum   │ │ API       │ │ WebSocket │ │ Queue     │ │ Multi-Tenant ││
│ │ Auth (JWT)│ │ Resources │ │ (Pusher)  │ │ Workers   │ │ Middleware   ││
│ └───────────┘ └───────────┘ └───────────┘ └───────────┘ └──────────────┘│
├─────────────────────────────────────────────────────────────────────────┤
│ LAYER 3 — AI & ANALYTICS ENGINE (SQL-Native + Laravel AI SDK)            │
│ ┌──────────────┐ ┌───────────┐ ┌────────────┐ ┌──────────────────┐      │
│ │ RFM Scoring  │ │ Churn     │ │ Anomaly    │ │ NL-to-SQL        │      │
│ │ (SQL nightly)│ │ Detection │ │ Detection  │ │ (Claude API)     │      │
│ └──────────────┘ └───────────┘ └────────────┘ └──────────────────┘      │
├─────────────────────────────────────────────────────────────────────────┤
│ LAYER 2 — DATA SYNC ENGINE (Laravel Scheduler + Queues)                  │
│ ┌──────────────────┐ ┌───────────────┐ ┌──────────────────┐             │
│ │ MySQL Connector  │ │ Data Transform│ │ Aggregate Tables │             │
│ │ (read-only)      │ │ (chunked)     │ │ (hourly/daily)   │             │
│ └──────────────────┘ └───────────────┘ └──────────────────┘             │
├─────────────────────────────────────────────────────────────────────────┤
│ LAYER 1 — CLIENT DATA SOURCES                                            │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐                       │
│ │ Client MySQL │ │ Laravel REST │ │ External APIs│                       │
│ │ (read-only)  │ │ API (if any) │ │ (courier,FB) │                       │
│ └──────────────┘ └──────────────┘ └──────────────┘                       │
└─────────────────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | Tech |
|-----------|---------------|------|
| Mobile App | 30-screen BI dashboard with AI co-pilot chat, push notifications, offline mode | React Native, Expo SDK 56, Victory Native, Zustand, TanStack Query, MMKV |
| Web Dashboard | Landlord admin: tenant CRUD, connection management, schema mapping, sync status | Inertia, React, shadcn/ui |
| API Server | REST + WebSocket endpoints, JWT auth, rate limiting, multi-tenant routing | Laravel 12, Sanctum, Pusher |
| Sync Engine | Scheduled data pull from client MySQL → aggregate tables; webhook support | Laravel Scheduler, Queue (DB driver) |
| Analytics Engine | RFM scoring, churn heuristics, anomaly detection, forecasting — all SQL-native | Raw SQL via Eloquent, PHP calculations |
| AI Co-Pilot | NL-to-SQL translation, sentiment analysis, root cause analysis, simulation | Laravel AI SDK → Claude API |
| BizPulse DB | Computed metrics, tenant accounts, alert history, user data | PostgreSQL 16 + TimescaleDB |
| Cache | Dashboard query cache, sync result cache | File driver (MVP), Redis (scale) |
| File Storage | PDF reports, CSV exports | Cloudflare R2 (S3-compatible) |

## Data Flow

### Sync Pipeline (every 5 minutes or webhook)

```
Client MySQL ──(read-only query)──> Sync Command (chunked, 1000 rows)
    │                                        │
    │                                        ▼
    │                               Data Transformer
    │                                        │
    │                                        ▼
    │                               Aggregate Tables (BizPulse DB)
    │                                        │
    │                                        ▼
    │                               Cache Layer (60s TTL)
    │                                        │
    ▼                                        ▼
Client Data ──────────────────── API Response ──> Mobile App
```

### AI Co-Pilot Query Flow

```
User Types Question (plain language)
    │
    ▼
Mobile App ──> POST /api/ai/query ──> Laravel AI SDK
                                           │
                                           ▼
                                    Claude API (owner's key)
                                    ├─ Schema context injected
                                    ├─ Returns safe SQL query
                                           │
                                           ▼
                                    Query Validator
                                    ├─ Read-only check
                                    ├─ Table allowlist
                                           │
                                           ▼
                                    Execute on Client MySQL
                                           │
                                           ▼
                                    Result Formatter
                                    ├─ Charts if applicable
                                    ├─ ✦ AI branding
                                           │
                                           ▼
                                    Response ──> Mobile Chat UI
```

### Tenant Isolation

```
Request → Sanctum Auth → Tenant Middleware
                              │
                              ▼
                    Tenant ID from JWT claim
                              │
                              ▼
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
         DB Queries       Cache Keys       Queue Jobs
       scoped to        bp:{tenant}:      tagged with
       tenant_id         {key}            tenant_id
```

## Database Schema (BizPulse DB)

```
tenants
├── id, name, domain, sync_config (JSON)
├── db_host, db_port, db_name, db_user, db_password (encrypted)
├── created_at, updated_at

users
├── id, tenant_id (FK), name, email, password
├── two_factor_secret, two_factor_recovery_codes
└── role (owner|manager|accountant|operations)

hourly_sales
├── tenant_id, date, hour, revenue, order_count
├── average_order_value, channel (app|web|facebook|direct)

daily_sales
├── tenant_id, date, revenue, order_count
├── average_order_value, refund_amount, return_rate

products
├── tenant_id, product_id (client), name, brand, sku
├── purchase_cost, sale_price, current_stock
├── sell_velocity (units/day), last_sale_date
├── dead_stock_flag, stockout_eta_days

orders
├── tenant_id, order_id (client), customer_id
├── total, status, channel, courier, district
├── created_at, delivered_at

customers
├── tenant_id, customer_id (client), name, phone, email
├── rfm_recency_score, rfm_frequency_score, rfm_monetary_score
├── rfm_segment (champion|loyal|at_risk|lost|new)
├── churn_risk_score, lifetime_value, avg_order_gap_days
├── last_order_date, total_orders, total_spend

anomaly_alerts
├── tenant_id, type (revenue_drop|dead_stock|churn|fraud|stockout)
├── severity (critical|warning|info)
├── title, description, metadata (JSON), is_read, is_dismissed
└── created_at
```

## Mobile App Architecture

```
src/
├── app/                    # Expo Router (file-based routing)
│   ├── _layout.tsx         # Root layout (providers)
│   ├── index.tsx           # Entry (redirects to auth or home)
│   ├── (auth)/             # Auth group
│   │   ├── _layout.tsx
│   │   ├── biometric.tsx   # Fingerprint/Face ID
│   │   └── pin.tsx         # PIN fallback
│   ├── (onboarding)/       # Onboarding flow
│   │   ├── _layout.tsx
│   │   ├── welcome.tsx
│   │   ├── ai-intro.tsx
│   │   ├── zero-disruption.tsx
│   │   ├── connect.tsx
│   │   └── sync-progress.tsx
│   └── (app)/              # Main app (authenticated)
│       ├── _layout.tsx     # Tab navigator
│       ├── index.tsx       # Home Dashboard
│       ├── sales.tsx       # Sales module
│       ├── inventory.tsx   # Inventory module
│       ├── customers.tsx   # Customer module
│       ├── financials.tsx  # Financial module
│       ├── ai-chat.tsx     # AI Co-Pilot chat
│       ├── more.tsx        # Settings, team, ops
│       └── ...
├── components/             # Reusable UI
│   ├── EmptyState.tsx
│   ├── ErrorState.tsx
│   └── TourOverlay.tsx
├── lib/                    # Utilities
│   ├── api.ts              # Axios client (JWT injection, base URL)
│   ├── offline.ts          # MMKV cache + connectivity detection
│   ├── offline-api.ts      # Cached API wrapper
│   └── notifications.ts   # Expo push notification setup
├── stores/                 # Zustand
│   ├── auth.ts             # Auth state (token, user, tenant)
│   └── dashboard.ts        # Dashboard data (live metrics, alerts)
└── types/                  # TypeScript interfaces
    ├── index.ts
    └── theme.ts
```

## Key Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| SQL-native analytics (no Python) | Same results at MVP scale without additional runtime; migrate to Python microservice later if needed |
| Single Laravel backend for API + admin | No context switching; built-in auth/queues/scheduler; Wayfinder generates TypeScript types from controllers |
| File-based cache for MVP | Zero infrastructure; upgrade to Redis (Upstash free tier) when traffic demands |
| Database queue driver | No Redis dependency for MVP; jobs table is sufficient for initial scale |
| Read-only client DB access | Zero risk to client's operational system; simpler security model |
| Owner-funded AI API keys | Developer never pays for AI costs; owners choose provider and tier |

## Scaling Path

| Stage | Adjustment |
|-------|-----------|
| 1 client (MVP) | File cache, DB queue driver, all on one server |
| 3+ clients | Upstash Redis free tier for queue driver + cache |
| 10+ clients | Supabase Pro ($25/mo), dedicated VPS consideration |
| 20+ clients | Dedicated VPS, Redis cluster, multiple queue workers |
| ML upgrade | Add Python FastAPI microservice for advanced models; Laravel calls via HTTP API |
