import { create } from 'zustand';
import { cachedGet } from '../lib/offline-api';

interface DashboardData {
  ticker: { revenue: number; orders_count: number; vs_yesterday: number; vs_yesterday_label: string } | null;
  comparisons: { current: number; previous: number; delta_pct: number } | null;
  alerts: { id: number; severity: string; message: string }[];
  loading: boolean;
  error: string | null;
  fetchTicker: () => Promise<void>;
  fetchComparisons: (period?: string) => Promise<void>;
  fetchAlerts: () => Promise<void>;
}

export const useDashboardStore = create<DashboardData>((set) => ({
  ticker: null,
  comparisons: null,
  alerts: [],
  loading: false,
  error: null,

  fetchTicker: async () => {
    set({ loading: true });
    try {
      const data = await cachedGet<DashboardData['ticker']>('/sales/ticker', { key: 'ticker', ttl: 60000 });
      set({ ticker: data, loading: false, error: null });
    } catch {
      set({ loading: false });
    }
  },

  fetchComparisons: async (period = '7d') => {
    try {
      const data = await cachedGet<DashboardData['comparisons']>(`/sales/comparisons?period=${period}`, { key: `comparisons:${period}`, ttl: 120000 });
      set({ comparisons: data });
    } catch {}
  },

  fetchAlerts: async () => {
    try {
      const data = await cachedGet<DashboardData['alerts']>('/alerts', { key: 'alerts', ttl: 120000 });
      set({ alerts: data });
    } catch {}
  },
}));
