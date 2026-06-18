# Deployment Guide

## Infrastructure Options

| Environment | Host | Cost |
|-------------|------|------|
| Development | Local Docker + Expo dev client | $0 |
| Staging | Fly.io free tier (3 VMs) | $0 |
| Production (pilot) | Client's VPS or Fly.io | $0-$6/mo |
| Production (scale) | Dedicated VPS + Supabase Pro | $25+/mo |

## Local Development

```bash
# 1. Clone and install
git clone <repo-url>
pnpm run setup              # pnpm install + composer install + docker compose up

# 2. Configure API
cd bizpulse-api
cp .env.example .env
php artisan key:generate
php artisan migrate

# 3. Start all services
cd ..
pnpm run dev                # API (http://localhost:8000) + Mobile (Expo)
pnpm run dev:api            # API only
pnpm run dev:mobile         # Mobile only
```

### Docker Services (docker-compose.yml)

| Service | Port | Purpose |
|---------|------|---------|
| PostgreSQL 16 | 5432 | BizPulse DB |
| Redis 7 | 6379 | Queue driver + cache (optional for MVP) |
| Mailpit | 1025 (SMTP), 8025 (UI) | Email testing |

## API Deployment (Laravel)

### Option A: Client's VPS (recommended for pilot)

```
Requirements:
  - Ubuntu 22.04+ / Debian 12+
  - PHP 8.3 + extensions: pgsql, pdo_pgsql, redis, bcmath, intl
  - Composer 2
  - Nginx or Apache
  - PostgreSQL 16 (or use Supabase)
```

```bash
# On server
cd /var/www
git clone <repo-url> bizpulse
cd bizpulse

# Install
composer install --no-dev --optimize-autoloader
pnpm install --prod

# Configure
cp .env.example .env
# Edit .env: DB credentials, APP_URL, APP_KEY
php artisan key:generate
php artisan migrate --force

# Build
pnpm run build

# Optimize
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Queue worker (via Supervisor)
php artisan queue:work --tries=3 --sleep=3

# Scheduler (crontab)
* * * * * cd /var/www/bizpulse && php artisan schedule:run >> /dev/null 2>&1
```

### Option B: Fly.io (Docker)

```bash
fly launch --name bizpulse-api
# Edit fly.toml with env vars
fly secrets set DB_HOST=... DB_PASSWORD=... APP_KEY=...
fly deploy
```

### Option C: Render.com

```bash
# Web Service
# Build Command: composer install && pnpm install && pnpm run build
# Start Command: php artisan serve --host=0.0.0.0 --port=$PORT
```

### Post-Deployment Checklist

```
[ ] php artisan migrate --force ran successfully
[ ] Storage linked: php artisan storage:link
[ ] .env APP_DEBUG=false
[ ] .env APP_ENV=production
[ ] Config/route/view cached
[ ] Supervisor configured for queue worker
[ ] Crontab configured for scheduler
[ ] Sentry DSN configured
[ ] SSL certificate installed
[ ] Firewall: only ports 80/443 open
[ ] Database backups configured
```

## Mobile Deployment (Expo EAS Build)

### Prerequisites

- Apple Developer account ($99/year)
- Google Play Developer account ($25 one-time)
- EAS CLI: `npm install -g eas-cli`

### iOS Build & Submit

```bash
cd bizpulse-mobile

# Login
eas login

# Configure
eas build:configure

# Build for App Store
eas build --platform ios --profile production

# Submit to App Store
eas submit --platform ios
```

### Android Build & Submit

```bash
cd bizpulse-mobile

# Build for Play Store
eas build --platform android --profile production

# Submit to Play Store
eas submit --platform android
```

### EAS Build Profiles (eas.json)

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  }
}
```

### Environment Variables

```
# Mobile .env (for EAS Build)
EXPO_PUBLIC_API_URL=https://api.bizpulse.app/api
EXPO_PUBLIC_APP_NAME=BizPulse
```

Set secrets in EAS:
```bash
eas secret:push --scope project --env-file .env
```

## CI/CD Pipeline

### GitHub Actions (configured)

| Workflow | Trigger | Actions |
|----------|---------|---------|
| `lint.yml` | Push/PR to main | ESLint + Prettier + Pint + tsc |
| `api-tests.yml` | Push/PR (api changes) | Pest tests on PostgreSQL |
| `mobile-preview.yml` | PR (mobile changes) | Expo doctor + tsc |

### Adding Auto-Deploy

```yaml
# .github/workflows/deploy.yml
name: Deploy API
on:
  push:
    branches: [main]
    paths: ['bizpulse-api/**']
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: superfly/flyctl-actions/setup-flyctl@master
      - run: flyctl deploy --remote-only
        env:
          FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}
```

## Database Migrations

### Safe Migration Rules

```
DO:    Test migrations on staging first
       Run migrations during low-traffic window
       Use --force in production: php artisan migrate --force
       Have a rollback plan

DON'T: Run destructive migrations (DROP COLUMN, DROP TABLE) without backup
       Modify migrations that have already run in production
       Skip migration testing
```

### Backup Strategy

- Supabase: automatic daily backups (Pro tier)
- Self-hosted PostgreSQL: `pg_dump` via cron daily
- Cloudflare R2: automatic replication
- Client DB: never backed up by BizPulse (read-only access only)

## Rollback Procedure

If deployment fails:

```bash
# 1. Roll back code
git revert <bad-commit> --no-edit
git push

# 2. Roll back migrations (if needed)
php artisan migrate:rollback --step=1

# 3. Clear caches
php artisan config:clear
php artisan cache:clear

# 4. Restart queue workers
sudo supervisorctl restart bizpulse-worker:*
```
