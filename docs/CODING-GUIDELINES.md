# Coding Guidelines

## PHP / Laravel (bizpulse-api)

### Architecture

```
DO:    ┌──────────────────────────────────────────────────┐
       │ Controller (thin)                                │
       │  → Validate via Form Request                     │
       │  → Call Service method                           │
       │  → Return API Resource                           │
       └───────────────┬──────────────────────────────────┘
                       ▼
       ┌──────────────────────────────────────────────────┐
       │ Service Layer (all business logic)                │
       │  → Orchestrate operations                        │
       │  → Call Repository for data                      │
       │  → Trigger events / dispatch jobs                │
       └───────────────┬──────────────────────────────────┘
                       ▼
       ┌──────────────────────────────────────────────────┐
       │ Repository / Query (data access)                 │
       │  → Tenant-scoped queries                         │
       │  → Cached if appropriate                         │
       └──────────────────────────────────────────────────┘

DON'T: Put business logic in Controllers
       Put raw SQL in blade views
       Skip the service layer because "it's just one line"
```

### Naming Conventions

```php
// DO:
class SalesAnalyticsService       // Singular, PascalCase for classes
public function getHourlyRevenue(int $tenantId): Collection  // camelCase methods
private const MAX_CACHE_TTL = 3600;   // UPPER_SNAKE for constants

// DON'T:
class sales_analytics             // Underscore class names
public function GetHourlyRevenue() // PascalCase methods
private const maxCacheTtl = 3600;  // camelCase constants
```

### Tenancy — ALWAYS Scope

```php
// DO: Every query scoped
$revenue = HourlySale::where('tenant_id', $tenantId)
    ->whereDate('date', today())
    ->sum('revenue');

// DO: Global scope for automatic scoping
class TenantScope implements Scope
{
    public function apply(Builder $builder, Model $model): void
    {
        if ($tenantId = app('current_tenant_id')) {
            $builder->where('tenant_id', $tenantId);
        }
    }
}

// DON'T: Forget tenant_id on any query
$revenue = HourlySale::whereDate('date', today())->sum('revenue'); // WRONG!

// DON'T: Cross-tenant queries
User::where('email', $email)->first(); // Could return user from wrong tenant!
```

### Validation — Always Form Requests

```php
// DO:
class StoreTenantRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'db_host' => ['required', 'string', 'max:255'],
            'db_port' => ['required', 'integer', 'min:1', 'max:65535'],
            'db_name' => ['required', 'string', 'max:255'],
            'db_username' => ['required', 'string', 'max:255'],
        ];
    }
}

// Controller
public function store(StoreTenantRequest $request): TenantResource
{
    $tenant = $this->tenantService->create($request->validated());
    return new TenantResource($tenant);
}

// DON'T:
public function store(Request $request): JsonResponse
{
    $request->validate([...]); // Inline validation — extract to Form Request
    // Logic mixed in controller...
}
```

### Error Handling

```php
// DO: Specific exceptions with context
throw new SyncFailedException(
    message: "Sync failed for tenant {$tenantId}",
    context: ['tenant_id' => $tenantId, 'last_success' => $lastSync],
);

// DO: Graceful degradation in services
public function getRevenue(int $tenantId): float
{
    if (Cache::has($key)) {
        return Cache::get($key);
    }

    try {
        $revenue = $this->calculateRevenue($tenantId);
        Cache::put($key, $revenue, 60);
        return $revenue;
    } catch (QueryException $e) {
        Log::warning('Revenue calc failed, using stale cache', [
            'tenant_id' => $tenantId,
            'error' => $e->getMessage(),
        ]);
        return Cache::get($key, 0); // Stale fallback
    }
}

// DON'T: Catch-all exceptions without logging
try { ... } catch (\Exception $e) {} // Silent failure!

// DON'T: Expose internals to users
return response()->json(['error' => $e->getMessage()]); // DB credentials leaked!
```

## TypeScript / React Native (bizpulse-mobile)

### Component Patterns

```tsx
// DO: Extract reusable components
function MetricCard({ value, label, delta, deltaType }: MetricCardProps) {
    const deltaColor = deltaType === 'up' ? '#00C896' : '#FF4757';
    return (
        <View style={styles.card}>
            <Text style={styles.value}>{value}</Text>
            <Text style={styles.label}>{label}</Text>
            {delta && <Text style={{ color: deltaColor }}>{delta}</Text>}
        </View>
    );
}

// DON'T: Duplicate the same JSX structure across screens
// DON'T: Inline styles with magic numbers (use theme constants)
```

### State Management

```tsx
// DO: Zustand for client state
const useAuthStore = create<AuthState>((set) => ({
    token: null,
    user: null,
    login: (token, user) => set({ token, user }),
    logout: () => set({ token: null, user: null }),
}));

// DO: TanStack Query for server state
const { data: ticker, isLoading } = useQuery({
    queryKey: ['sales', 'ticker', tenantId],
    queryFn: () => api.getSalesTicker(),
    staleTime: 60_000,  // 1 minute
    gcTime: 300_000,    // 5 minutes
});

// DON'T: Fetch data in useEffect without caching
// DON'T: Mix server state into Zustand (use React Query for API data)
```

### Offline-First

```tsx
// DO: Show cached data immediately, refresh in background
function useSyncQuery<T>(queryKey: string[], queryFn: () => Promise<T>) {
    const { data } = useQuery({
        queryKey,
        queryFn,
        staleTime: 60_000,
    });
    const [offlineData, setOfflineData] = useState<T | null>(null);

    useEffect(() => {
        const cached = mmkvStorage.getString(`cache:${queryKey[0]}`);
        if (cached) setOfflineData(JSON.parse(cached));
    }, []);

    const displayData = data ?? offlineData;
    const isStale = !data && !!offlineData;

    return { data: displayData, isStale };
}

// DON'T: Show blank screen when offline
// DON'T: Cache data forever without invalidation
```

### API Calls

```tsx
// DO: Centralized API client with auth interceptor
const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// DO: Type-safe API responses
interface SalesTickerResponse {
    revenue_today: number;
    revenue_yesterday: number;
    change_percent: number;
    last_updated: string;
}

async function getSalesTicker(): Promise<SalesTickerResponse> {
    const { data } = await api.get('/sales/ticker');
    return data;
}

// DON'T: Use `any` for API responses
// DON'T: Scatter fetch/axios calls across components
```

## Database

### Migrations

```sql
-- DO: Every table starts with tenant_id
CREATE TABLE daily_sales (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenants(id),
    date DATE NOT NULL,
    revenue DECIMAL(15, 2) NOT NULL DEFAULT 0,
    order_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_daily_sales_tenant_date ON daily_sales(tenant_id, date);

-- DON'T: Skip tenant_id on any BizPulse table
-- DON'T: Forget indexes on foreign keys and common query columns
```

### Queries on Client DB

```php
// DO: Read-only, parameterized, with timeouts
$orders = DB::connection('client_mysql')
    ->table('orders')
    ->select('id', 'total', 'status', 'created_at')
    ->where('created_at', '>=', $lastSync)
    ->limit(1000)
    ->get();

// DON'T: SELECT * on client tables (fetch only needed columns)
// DON'T: Run queries without time limits on large client tables
```

## General Rules

### Code Quality

| Rule | Why |
|------|-----|
| No commented-out code | Delete it — git history preserves it |
| No console.log / dd() in production | Use Log::info() with context |
| No magic numbers | Use named constants or config values |
| No `any` in TypeScript | Define proper types — type safety is the point |
| No unused imports | ESLint + IDE should catch these |
| No TODO without ticket link | `// TODO(BIZ-42): Add pagination` |

### Git

```
DO:    Atomic commits — one logical change per commit
       Conventional commit messages: feat:, fix:, chore:, docs:, test:, refactor:
       Branch from main, PR back to main
       Squash merge to keep history clean

DON'T: Commit .env, node_modules, vendor, storage
       Force push to main
       Commit with --no-verify to skip hooks
```

### Testing

```
DO:    Test every service class
       Test API endpoints (happy path + validation errors + auth)
       Test tenant isolation (can't access other tenant's data)
       Use Pest for clean, expressive tests

DON'T: Write tests that test the framework, not your logic
       Skip tests because "the change is small"
       Leave failing tests in main branch
```

### Performance Awareness

```
DO:    Eager load relationships: ->with(['items', 'customer'])
       Use chunk() for large datasets: ->chunk(1000, fn)
       Cache dashboard queries: Cache::remember($key, 60, fn)
       Use cursor pagination: ->cursorPaginate()

DON'T: Run queries in loops (N+1 problem)
       Load entire tables into memory
       Cache without TTL (memory leak)
       Use offset pagination on large tables
```

### Security Awareness

```
DO:    Validate all input via Form Requests
       Scope all queries by tenant_id
       Use parameterized queries (Eloquent/Query Builder)
       Encrypt sensitive config (DB credentials)
       Log security events (failed auth, rate limits, validation failures)

DON'T: Trust user input without validation
       Concatenate strings into SQL
       Log sensitive data (passwords, tokens, credentials)
       Expose stack traces in production (APP_DEBUG=false)
```

## Anti-Patterns

| Anti-Pattern | Problem | Solution |
|-------------|---------|----------|
| God Controller | 500+ line controller with mixed logic | Extract to Service + Form Request |
| Copy-paste code | Bug fixes need to be applied in multiple places | Extract shared trait or service method |
| Premature optimization | Complex caching for queries that take 5ms | Profile first, optimize hot paths |
| Over-abstraction | 3 layers of interfaces for a CRUD operation | Start simple, extract when patterns emerge |
| Sync stupidity | Full table scan every 5 minutes | Incremental sync by `updated_at` |
| Cache everything | Stale data, memory pressure | Cache only hot queries with appropriate TTLs |
| Error suppression | `try {} catch {}` with no logging | Log + rethrow or handle gracefully |
