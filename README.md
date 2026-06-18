# BizPulse

AI-Powered Business Intelligence Mobile App. Connects to any MySQL-backed business system and delivers real-time, conversational intelligence to business owners — in their pocket, without changing their existing workflow.

## Architecture

```
bizpulse/
├── bizpulse-api/       # Laravel 12 API + Inertia admin dashboard
├── bizpulse-mobile/    # React Native / Expo mobile app (iOS + Android)
├── docker-compose.yml  # Local dev services (PostgreSQL, Redis, Mailpit)
└── .planning/          # GSD planning artifacts (PROJECT.md, ROADMAP.md, etc.)
```

| Layer | Technology | Purpose |
|-------|-----------|---------|
| API | Laravel 12 (PHP 8.3) | Multi-tenant REST API, data sync engine, analytics |
| Admin | Inertia + React | Landlord dashboard (tenant management, schema mapping) |
| Mobile | React Native + Expo SDK 56 | Cross-platform mobile app with BI dashboards |
| AI | Laravel AI SDK + Claude | NL-to-SQL, sentiment analysis, AI co-pilot |
| DB | PostgreSQL 16 | BizPulse metrics storage (Supabase free tier) |
| Cache | Redis / File | Dashboard query caching |

## Prerequisites

- **Node.js** >= 22
- **pnpm** >= 9 (install via `corepack enable`)
- **PHP** >= 8.3 with pgsql extension
- **Composer** >= 2
- **Docker** (for local PostgreSQL, Redis, Mailpit)

## Quick Start

```bash
# Clone and enter
git clone <repo-url> && cd BizPulse

# Install all dependencies
pnpm run setup

# Start all services
pnpm run dev
```

### Manual Setup

```bash
# 1. Install dependencies
pnpm install                          # All JS packages (root + sub-packages)
cd bizpulse-api && composer install   # PHP packages

# 2. Start local services
docker compose up -d                  # PostgreSQL, Redis, Mailpit

# 3. Configure API environment
cp bizpulse-api/.env.example bizpulse-api/.env
cd bizpulse-api && php artisan key:generate

# 4. Run migrations
cd bizpulse-api && php artisan migrate

# 5. Configure mobile environment
cp bizpulse-mobile/.env.example bizpulse-mobile/.env

# 6. Start development
pnpm run dev   # API (port 8000) + Mobile (Expo)
```

## Development Scripts

| Command | Description |
|---------|-------------|
| `pnpm run dev` | Start API + Mobile in parallel |
| `pnpm run dev:api` | Start Laravel API only |
| `pnpm run dev:mobile` | Start Expo mobile only |
| `pnpm run lint` | Lint all packages (ESLint + Pint) |
| `pnpm run format` | Format all packages (Prettier + Pint) |
| `pnpm run test:api` | Run PHP tests (Pest) |
| `pnpm run db:up` | Start Docker services |
| `pnpm run db:down` | Stop Docker services |

## Pre-Commit Hooks

Husky + lint-staged run automatically on `git commit`:
- **JS/TS** files → ESLint fix + Prettier format
- **PHP** files → Laravel Pint
- Staged files that fail linting block the commit

## CI/CD

| Workflow | Trigger | What it does |
|----------|---------|-------------|
| `lint.yml` | Push/PR to main | ESLint + Prettier + Pint + TypeScript check (API + Mobile) |
| `api-tests.yml` | Push/PR changing `bizpulse-api/` | Pest PHP tests with PostgreSQL |
| `mobile-preview.yml` | PR changing `bizpulse-mobile/` | Expo doctor + TypeScript check |

## Documentation

- [BizPulse PRD](BizPulse_PRD.txt) — Full product requirements
- [Execution Plan](BizPulse_Execution_Plan.md) — Phase breakdown
- [UI Guide](BizPulse_UI_Guide.txt) — Screen-by-screen design spec
- [Planning](./.planning/) — GSD roadmap, requirements, project context
- [Contributing](CONTRIBUTING.md) — Dev workflow and conventions

## License

MIT — see [LICENSE](LICENSE)
