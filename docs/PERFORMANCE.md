# Performance Guidelines

## Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| Dashboard API response | < 2 seconds | Cached data response time |
| Live data refresh | Every 60 seconds | WebSocket push interval |
| AI Co-Pilot query | < 5 seconds | NL-to-SQL round trip |
| Push notification delivery | < 30 seconds | Trigger to device |
| Sync pipeline (full) | < 5 minutes | Per-tenant full sync |
| Offline dashboard load | < 1 second | MMKV cached read |

## Database Performance

### Index Strategy

```
DO:    Index tenant_id on every table (first column)
       Index foreign keys used in JOINs
       Index columns used in WHERE/ORDER BY
       Use composite indexes for common query patterns
       Run EXPLAIN ANALYZE on slow queries

DON'T: Index every column (write penalty)
       Use SELECT * in production queries
       Run un-indexed queries on client DB (can impact client performance)
```

### Query Optimization

```php
// DO: Eager load relationships
$orders = Order::with(['items', 'customer'])->where('tenant_id', $tenantId)->get();

// DO: Select only needed columns
$sales = HourlySale::select('hour', 'revenue')->where('tenant_id', $tenantId)->get();

// DON'T: N+1 queries in loops
foreach ($customers as $customer) {
    $orders = Order::where('customer_id', $customer->id)->get(); // N+1!
}
```

### Sync Pipeline Chunking

```php
// DO: Chunked processing for large client tables
ClientOrder::on('client_mysql')
    ->where('updated_at', '>', $lastSync)
    ->chunk(1000, function ($orders) use ($tenantId) {
        // Process 1000 rows at a time
        foreach ($orders as $order) {
            // Transform and insert into aggregate table
        }
    });
```

- Batch inserts: use `insert()` not `create()` for bulk operations
- Transaction per chunk, not per row
- Pause between chunks (100ms) to avoid overwhelming client DB

## Caching Strategy

### Cache Layers

| Layer | TTL | What |
|-------|-----|------|
| Dashboard metrics | 60s | Revenue ticker, at-a-glance cards |
| Sales charts | 300s | Trend data, heatmap, channel breakdown |
| Customer lists | 600s | RFM segments, customer search |
| Product lists | 600s | Dead stock, reorder signals |
| Sync state | 60s | Last sync timestamp, sync status |

### Cache Invalidation

```
DO:    Tenant-aware cache keys: bp:{tenant_id}:dashboard:revenue
       Invalidate on sync completion for fresh data
       Use cache tags when Redis is available

DON'T: Use generic cache keys across tenants
       Cache AI query results (they should be fresh)
       Cache error states indefinitely
```

### Cache Warmup

- Dashboard cache warmed on sync completion (pre-compute, don't cold-load)
- Critical path: home dashboard cache should never be cold
- Fallback: return stale data with "updating" indicator if cache miss + DB slow

## API Performance

### Pagination

```
DO:    Cursor-based pagination (before_id / after_id)
       Default page size: 20 items

DON'T: Use offset pagination on large tables
       Allow unbounded queries (enforce max 100 per page)
```

### Response Optimization

- Compress responses > 1KB (Laravel middleware)
- Remove debug data: no stack traces, no DB query logs in production
- API Resources: only include fields the frontend actually uses
- Conditional requests: ETag/If-None-Match for dashboard data

### WebSocket Efficiency

- Push only delta changes, not full datasets
- Throttle ticker updates: min 1 second between pushes
- Reconnect with exponential backoff (1s, 2s, 4s, 8s, max 30s)

## Mobile Performance

### Rendering

```
DO:    Use React.memo on metric cards and list items
       FlatList with getItemLayout for fixed-height rows
       Victory Native with optimized data shapes
       Lazy-load charts below the fold

DON'T: Render all 30 screens at once
       Use heavy animations during data loading
       Re-render entire dashboard on single metric update
```

### Network

```
DO:    TanStack Query with staleTime: 60s, gcTime: 5min
       Background refetch on app foreground
       Offline-first: show cached data immediately, refresh in background

DON'T: Block UI on network requests
       Retry failed requests indefinitely (max 3 retries, exponential backoff)
```

### Storage

```
DO:    MMKV for structured cache (dashboard state, auth tokens)
       AsyncStorage only for small key-value (preferences)

DON'T: Cache large datasets indefinitely (enforce 7-day max age)
       Store binary data (images) in MMKV
```

## Monitoring

### What to Monitor

| Signal | Alert Threshold |
|--------|----------------|
| API response time (p95) | > 3 seconds |
| Sync pipeline duration | > 5 minutes |
| Cache hit rate | < 80% |
| AI query timeout rate | > 5% of queries |
| Push notification delay | > 60 seconds |
| Database connection pool | > 80% utilization |

### Profiling

- Laravel Telescope in development — never in production
- Sentry for error tracking and performance monitoring (free tier)
- DB query log sampling: log queries > 500ms in production
- Mobile: Expo dev tools for render profiling
