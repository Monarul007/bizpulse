# Security Guidelines

## Principle: Defense in Depth

BizPulse connects to clients' production databases. Every layer must enforce security.

## Database Access

### Client MySQL — Read-Only Only

```
DO:    CREATE USER 'bizpulse_reader'@'%' IDENTIFIED BY '...';
       GRANT SELECT ON client_db.* TO 'bizpulse_reader'@'%';

DON'T: GRANT INSERT, UPDATE, DELETE, DROP, ALTER to bizpulse user.
       Never use the client's admin credentials.
```

- Secondary DB connection in `config/database.php` with read-only user
- Connection credentials encrypted at rest (Laravel's encrypted cast on Tenant model)
- Never log or expose client DB credentials in error messages

### BizPulse DB — Isolation

- `tenant_id` column on every table — mandatory, indexed
- Global scope or manual scoping on ALL queries: `->where('tenant_id', $tenantId)`
- Schema-level isolation per tenant
- No cross-tenant queries ever

## Authentication

### API (JWT / Sanctum)

```
DO:    Token scoped to tenant_id in JWT claims
       Refresh tokens with rotation
       Short-lived access tokens (15 min)

DON'T: Store tokens in localStorage on mobile
       Use long-lived tokens without rotation
       Accept tokens for wrong tenant
```

- Sanctum SPA auth for web dashboard, API tokens for mobile
- Mobile: store token in expo-secure-store (Keychain/Keystore)
- Token validation checks tenant scope on every request
- Force re-auth on password change

### Mobile — Biometric + PIN

- Biometric auth via `expo-local-authentication`
- PIN as fallback (6-digit minimum)
- Rate limiting: 5 failed attempts → 30-second lockout; 10 → 5-minute lockout
- Token stored in device secure enclave, not in app storage

## API Security

### Rate Limiting

```php
// config/sync.php or middleware
RateLimiter::for('api', function (Request $request) {
    $tenantId = $request->user()?->tenant_id;
    return Limit::perMinute(60)->by('bp:ratelimit:'.$tenantId.':'.$request->path());
});
```

- Default: 60 requests/minute per tenant
- Auth endpoints: 5 requests/minute
- AI query endpoints: 10 requests/minute (cost protection)

### Input Validation

- Every request → Form Request class (never inline `$request->validate()`)
- Whitelist approach: define expected fields, reject everything else
- SQL injection: never concatenate user input into queries; use Eloquent/Query Builder parameter binding
- XSS: all output escaped via Blade/React; API returns JSON, never HTML

### AI Co-Pilot — Query Safety

```
DO:    Validate LLM-generated SQL before execution:
       1. Must be SELECT only
       2. Tables must be in allowlist (sync config)
       3. No DDL, DML, or dangerous functions
       4. Enforce row limits (MAX 500 rows)
       5. Query timeout (5 seconds max)

DON'T: Execute LLM output directly without validation
       Allow queries against non-allowlisted tables
       Return raw SQL errors to user
```

- Query validator parses SQL before execution
- Reject: `INSERT`, `UPDATE`, `DELETE`, `DROP`, `ALTER`, `TRUNCATE`, `EXEC`
- Reject: `LOAD_FILE`, `INTO OUTFILE`, `INTO DUMPFILE`
- Row limit via appended `LIMIT 500` if not present
- Query timeout enforced at DB connection level

## Data Protection

### Data Minimization

- Never store raw client data permanently in BizPulse DB
- Store only computed aggregates (hourly totals, RFM scores, alert metadata)
- PII handling: store customer name/phone only if needed for win-back feature; otherwise use pseudonymous IDs
- Data retention: full deletion on tenant contract termination

### Encryption

| Data | Method |
|------|--------|
| Client DB credentials | AES-256-CBC encrypted at rest (Laravel `encrypted` cast) |
| Data in transit | TLS 1.3 (enforced at server + app transport security) |
| JWT tokens | Signed with HMAC-SHA256 |
| Mobile stored tokens | Device secure enclave (expo-secure-store) |
| PDF reports in R2 | AES-256 server-side encryption (Cloudflare default) |

### Secrets Management

```
DO:    Use .env for local dev, never commit .env files
       Use GitHub Actions secrets for CI
       Rotate API keys on suspected compromise

DON'T: Hardcode secrets in config files
       Commit .env or credentials to git
       Share API keys via chat/email
```

## Multi-Tenant Isolation Checklist

```
[ ] All queries scoped by tenant_id
[ ] Cache keys prefixed with tenant ID
[ ] Queue jobs tagged with tenant ID
[ ] File storage paths segmented by tenant
[ ] Rate limits keyed per tenant
[ ] API tokens cannot cross tenant boundaries
[ ] Admin login is landlord-only (separate from tenant users)
[ ] Tenant middleware runs before any business logic
```

## Security Headers (API)

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'none'; frame-ancestors 'none'
Referrer-Policy: strict-origin-when-cross-origin
```

## Incident Response

If a security issue is discovered:

1. Rotate compromised credentials immediately
2. Audit access logs for unauthorized queries
3. Notify affected clients within 24 hours
4. Deploy fix, verify with penetration test
5. Post-mortem within 48 hours → update this document
