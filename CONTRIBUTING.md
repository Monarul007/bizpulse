# Contributing to BizPulse

## Development Workflow

### Branch Strategy

- `main` — production-ready, protected
- `feature/<description>` — new features
- `fix/<description>` — bug fixes
- `chore/<description>` — tooling, config, CI

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add sales heatmap chart
fix: correct dead stock alert threshold
chore: update GitHub Actions workflow
docs: add API setup guide
test: add anomaly alert edge case coverage
refactor: extract RFM scoring to service class
```

### Before You Push

```bash
# Lint everything
pnpm run lint

# Format everything
pnpm run format

# Run API tests
pnpm run test:api

# TypeScript checks
cd bizpulse-api && pnpm run types:check
cd bizpulse-mobile && npx tsc --noEmit
```

Pre-commit hooks run lint-staged automatically. If a hook blocks your commit, fix the issues and try again.

## Architecture Conventions

### API (`bizpulse-api/`)

Follow Laravel best practices from `.opencode/rules.md`:

- **Service Layer**: Business logic in `app/Services/`
- **Repository Pattern**: DB queries in `app/Repositories/`
- **Form Requests**: Validation in `app/Http/Requests/`
- **API Resources**: Response formatting in `app/Http/Resources/`
- **Multi-Tenant**: All queries scoped by `tenant_id`
- **Testing**: Pest PHP, all service classes covered

### Mobile (`bizpulse-mobile/`)

```
src/
├── app/           # Expo Router file-based routing
├── components/    # Reusable UI components
├── lib/           # API client, utilities
├── stores/        # Zustand state stores
└── types/         # TypeScript type definitions
```

- **State**: Zustand for client state, React Query for server state
- **Charts**: Victory Native XL
- **Offline**: MMKV cache with connectivity detection
- **Auth**: expo-local-authentication + Sanctum tokens

## Code Style

- **Indentation**: 4 spaces (`.editorconfig` enforced)
- **Quotes**: Single quotes for JS/TS, double for JSON
- **Semicolons**: Required
- **Curly braces**: 1TBS style, always required
- **Import order**: Built-in → external → internal → parent → sibling → index (alphabetical)
- **Type imports**: `import type { Foo }` (not `import { type Foo }`)

## Pull Requests

1. Create a feature/fix branch from `main`
2. Make atomic commits with conventional commit messages
3. Ensure CI passes (lint, tests, type check)
4. Request review
5. Squash merge to `main`

## GSD Planning

This project uses GSD for phased execution. Planning artifacts are in `.planning/`.

- `/gsd-plan-phase N` — Plan phase N
- `/gsd-execute-phase` — Execute current phase
- `/gsd-progress` — Check overall progress

See `.planning/ROADMAP.md` for the full phase structure.
