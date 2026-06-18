# BizPulse Development Rules

## Architecture
- **DRY**: Shared traits, Service classes, reusable Query Scopes. No duplicated SQL or validation.
- **SOLID**: Single responsibility per class. Services handle business logic, Controllers handle HTTP.
- **Service Layer** (`app/Services/*`): All business logic here. Controllers are thin — call service, return response.
- **Repository Pattern** (`app/Repositories/*`): Data access layer. Especially for client MySQL queries.
- **Laravel Standard**: Form Requests for validation (`app/Http/Requests/*`), API Resources (`app/Http/Resources/*`), route model binding.
- **Validation**: Every input validated via Form Request. Never inline `$request->validate()`.
- **No duplication**: Extract shared logic into traits or service methods immediately.

## Multi-Tenancy
- All BizPulse tables have `tenant_id` as first column + index.
- Tenant-aware global scopes or manual scoping on all queries.
- Cache keys prefixed: `bp:{tenant_id}:{key}`.
- Rate limiting keyed per tenant: `bp:ratelimit:{tenant_id}:{path}`.
- Queue jobs tagged with tenant ID for isolation.

## API Standards
- Cursor-based pagination for list endpoints (no offset pagination).
- Redis cache layer: `Cache::remember()` with tenant-aware tags.
- JSON:API-style responses via API Resources.
- All endpoints rate-limited per tenant (default 60/min).
- Response compression via middleware.

## Mobile App
- Expo managed workflow, file-based routing (Expo Router).
- Shared API types with web dashboard (reuse TypeScript interfaces).
- Offline-first: MMKV cache + TanStack Query `networkMode`.
- 30 screens from BizPulse_UI_Guide.txt.
- Colors/typography from UI Guide Appendix A.

## Sync Engine
- Scheduled commands via Laravel Scheduler in `routes/console.php`.
- Use `SyncConfig` to resolve client column names dynamically.
- Chunked processing for large client tables (1000 rows per chunk).
- Sync results cached with TTL to avoid duplicate work.
- Each sync command isolated per tenant.
