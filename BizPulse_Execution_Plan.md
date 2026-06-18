# BizPulse — Execution Plan

## Track A: Web Dashboard (Laravel + Inertia React) — Landlord Admin Only
### Phase 0 — Data Sync Foundation

1. Add `sync_config` JSON column to tenants table
2. Create `config/sync.php` — canonical schema definition
3. Create `app/Sync/SyncConfig.php` — helper class
4. Create `app/Actions/AutoMapSchema.php` — AI auto-mapping on connect
5. Create aggregate table migrations (hourly_sales, daily_sales, products, orders, customers, anomaly_alerts)
6. Create `Admin/TenantController` + Inertia pages (CRUD + test connection) — landlord-only
7. Create column mapping admin UI (landlord sets mappings, AI suggests)
8. Create sync commands (hourly-sales, daily-sales, products, customers, anomalies)
9. Create API endpoints with Redis caching + cursor pagination
10. Build admin dashboard

### Phase 1 — Sales & Revenue
### Phase 2 — Inventory
### Phase 3 — Customer Intelligence
### Phase 4 — Financial Intelligence
### Phase 5 — People & Operations
### Phase 6 — AI Co-Pilot

## Track B: Mobile App (React Native / Expo)
### Phase M — Setup + Priority Screens

M1. Create Expo project
M2. Install deps (victory-native, tanstack-query, zustand, mmkv, expo-notifications, etc.)
M3. Theme setup (colors, typography from UI Guide Appendix A)
M4. Priority 1: Screen 09 — Home Dashboard
M5. Priority 2: Screen 21 — AI Co-Pilot Chat
M6. Priority 3: Screen 11 — Sales Module
M7. Priority 4: Screen 07 — Biometric Login
M8. Priority 5: Screen 15 — Customer Intelligence
M9. Remaining 25 screens
M10. API client + offline + push notifications

## Architectural Rules
- DRY: shared traits, services, scopes
- SOLID: single responsibility per class
- Service Layer: `app/Services/*` for business logic
- Repository Pattern: `app/Repositories/*` for DB queries
- Form Request validation: `app/Http/Requests/*`
- API Resources: `app/Http/Resources/*`
- Multi-tenant: `tenant_id` on all tables, tenant-aware caching
- Scalable: cursor pagination, Redis cache, chunked processing, rate limiting
