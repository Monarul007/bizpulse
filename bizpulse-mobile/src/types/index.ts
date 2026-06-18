export interface SalesTicker {
  revenue: number; orders_count: number; vs_yesterday: number;
  vs_yesterday_label: string; currency: string;
}
export interface SalesComparison { current: number; previous: number; delta_pct: number; period: string; }
export interface SalesHeatmap { [dayOfWeek: string]: { [hour: number]: { revenue: number; orders: number } }; }
export interface SalesForecast { projected_eom: number; daily_average: number; confidence: number; days_remaining: number; trend: 'up' | 'down'; }
export interface AnomalyAlert { id: number; type: string; severity: 'critical' | 'warning' | 'info'; message: string; meta: Record<string, any> | null; created_at: string; is_dismissed: boolean; }
export interface Customer { id: number; client_id: string; name: string; email: string | null; phone: string | null; total_revenue: number; total_orders: number; last_order_at: string | null; segment: string | null; churn_score: number | null; }
export interface Product { id: number; name: string; sku: string | null; price: number; cost_price: number | null; stock_quantity: number; category: string | null; }
