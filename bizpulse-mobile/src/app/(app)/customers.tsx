import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, spacing } from '../../types/theme';
import { cachedGet } from '../../lib/offline-api';
import { useEffect, useState } from 'react';
import EmptyState from '../../components/EmptyState';

interface OverviewData {
  total_customers: number; total_revenue: number; total_orders: number;
  revenue_per_customer: number; orders_per_customer: number;
  segments: Record<string, { count: number; revenue: number }>;
  avg_churn_score: number;
}

interface RfmSegment {
  name: string; count: number; revenue: number; avg_rfm: number;
  customers: Array<{
    id: number; name: string; client_id: string; total_revenue: number;
    total_orders: number; days_since_last_order: number; rfm_total: number;
  }>;
}

interface RfmData {
  segments: RfmSegment[];
  distribution: { avg_recency: number; avg_frequency: number; avg_monetary: number; avg_rfm: number; high_value_pct: number };
}

interface ChurnData {
  total_customers: number;
  by_risk_level: Record<string, { count: number; revenue: number }>;
  recently_lost: number; at_risk_revenue: number; retention_rate: number;
}

interface ClvData {
  overall: { avg_order_value: number; avg_clv_historical: number; avg_clv_predicted: number; median_clv: number; top_clv: number };
  by_segment: Record<string, { count: number; avg_clv: number; avg_predicted_clv: number; total_revenue: number }>;
  top_customers: Array<{ id: number; name: string; segment: string; historical_clv: number; avg_order_value: number; total_orders: number }>;
}

export default function Customers() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [overview, setOverview] = useState<OverviewData | null>(null);
  const [rfm, setRfm] = useState<RfmData | null>(null);
  const [churn, setChurn] = useState<ChurnData | null>(null);
  const [clv, setClv] = useState<ClvData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      cachedGet<OverviewData>('/customer/overview', { key: 'customer:overview', ttl: 600000 }),
      cachedGet<RfmData>('/customer/rfm', { key: 'customer:rfm', ttl: 1200000 }),
      cachedGet<ChurnData>('/customer/churn', { key: 'customer:churn', ttl: 1800000 }),
      cachedGet<ClvData>('/customer/clv', { key: 'customer:clv', ttl: 3600000 }),
    ]).then(([ov, r, ch, cv]) => {
      setOverview(ov); setRfm(r); setChurn(ch); setClv(cv);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const tabs = ['Overview', 'RFM', 'Churn', 'CLV'];
  const segmentColors: Record<string, string> = {
    champion: '#1A3A5C', loyal: '#3B9FE8', potential: '#FFB020',
    at_risk: '#FF4757', lost: '#8B4513', new: '#00C896',
  };

  if (loading) {
    return (
      <LinearGradient colors={gradients.bg} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={gradients.bg} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: 100 }}>
        <Text style={styles.title}>Customers</Text>
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: spacing.xl }}>
          {tabs.map(tab => (
            <TouchableOpacity key={tab} style={[styles.tab, activeTab === tab && styles.tabActive]} onPress={() => setActiveTab(tab)}>
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {activeTab === 'Overview' && (
          <>
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: spacing.xl }}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{overview?.total_customers ?? 0}</Text>
                <Text style={styles.statLabel}>Total</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={[styles.statValue, { color: colors.success }]}>
                  ৳{(overview?.revenue_per_customer ?? 0).toLocaleString()}
                </Text>
                <Text style={styles.statLabel}>Rev/customer</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={[styles.statValue, { color: overview && overview.avg_churn_score > 0.4 ? colors.danger : colors.deepNavy }]}>
                  {(overview?.avg_churn_score ?? 0) * 100}%
                </Text>
                <Text style={styles.statLabel}>Avg churn</Text>
              </View>
            </View>

            {rfm?.segments && rfm.segments.length > 0 && (
              <View style={styles.card}>
                <Text style={styles.sectionHeader}>RFM SEGMENTS</Text>
                <View style={{ flexDirection: 'row', height: 24, borderRadius: 8, overflow: 'hidden' }}>
                  {rfm.segments.map((s, i) => (
                    <View key={s.name} style={{ flex: s.count, backgroundColor: segmentColors[s.name] ?? colors.primary, borderRadius: i === 0 ? 8 : i === rfm.segments.length - 1 ? 8 : 0 }} />
                  ))}
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: spacing.sm }}>
                  {rfm.segments.map(s => (
                    <Text key={s.name} style={{ fontSize: 10, color: colors.textSecondary }}>{s.name} ({s.count})</Text>
                  ))}
                </View>
              </View>
            )}

            <Text style={styles.sectionHeader}>TOP CUSTOMERS</Text>
            {(clv?.top_customers?.length ?? 0) === 0 ? (
              <EmptyState headline="No data yet" body="Customer data will appear after syncing orders." />
            ) : (
              clv!.top_customers.slice(0, 5).map((c, i) => (
                <View key={i} style={styles.row}>
                  <LinearGradient colors={gradients.ai} style={styles.avatar}>
                    <Text style={{ color: colors.white, fontWeight: '700' }}>{c.name.charAt(0)}</Text>
                  </LinearGradient>
                  <View style={{ flex: 1, marginLeft: spacing.md }}>
                    <Text style={{ fontWeight: '700', color: colors.deepNavy }}>{c.name}</Text>
                    <Text style={{ fontSize: 12, color: colors.textSecondary }}>
                      ৳{c.historical_clv.toLocaleString()} · {c.total_orders} orders
                    </Text>
                  </View>
                  <View style={[styles.pill, { backgroundColor: (segmentColors[c.segment] || colors.primary) + '20' }]}>
                    <Text style={{ color: segmentColors[c.segment] || colors.primary, fontSize: 11, fontWeight: '600' }}>{c.segment}</Text>
                  </View>
                </View>
              ))
            )}
          </>
        )}

        {activeTab === 'RFM' && rfm && (
          <>
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: spacing.xl }}>
              {(['avg_recency', 'avg_frequency', 'avg_monetary', 'avg_rfm'] as const).map(k => (
                <View key={k} style={styles.statCard}>
                  <Text style={styles.statValue}>{rfm.distribution?.[k] ?? '-'}</Text>
                  <Text style={styles.statLabel}>{k.replace('avg_', '').replace(/_/g, ' ')}</Text>
                </View>
              ))}
            </View>

            {rfm.segments.length === 0 ? (
              <EmptyState headline="No segments yet" body="RFM segments will appear once customers have order data." />
            ) : (
              rfm.segments.map(s => (
                <View key={s.name} style={styles.card}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontWeight: '700', color: colors.deepNavy, textTransform: 'capitalize' }}>{s.name}</Text>
                    <View style={[styles.pill, { backgroundColor: segmentColors[s.name] + '20' }]}>
                      <Text style={{ color: segmentColors[s.name], fontSize: 12 }}>{s.count} customers</Text>
                    </View>
                  </View>
                  <Text style={{ fontSize: 12, color: colors.textSecondary, marginTop: 2 }}>৳{s.revenue.toLocaleString()} · Avg RFM: {s.avg_rfm}</Text>
                  {s.customers.slice(0, 3).map((c, i) => (
                    <View key={i} style={[styles.row, { marginTop: 8, paddingHorizontal: 0, backgroundColor: 'transparent' }]}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 13, fontWeight: '600', color: colors.deepNavy }}>{c.name}</Text>
                        <Text style={{ fontSize: 11, color: colors.textSecondary }}>RFM: {c.rfm_total}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              ))
            )}
          </>
        )}

        {activeTab === 'Churn' && (
          <>
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: spacing.xl }}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{churn?.total_customers ?? 0}</Text>
                <Text style={styles.statLabel}>Customers</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={[styles.statValue, { color: churn && churn.recently_lost > 0 ? colors.danger : colors.deepNavy }]}>
                  {churn?.recently_lost ?? 0}
                </Text>
                <Text style={styles.statLabel}>Recently lost</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={[styles.statValue, { color: colors.success }]}>
                  {churn?.retention_rate ?? 100}%
                </Text>
                <Text style={styles.statLabel}>Retention</Text>
              </View>
            </View>

            {churn?.by_risk_level && Object.keys(churn.by_risk_level).length > 0 ? (
              <>
                <View style={styles.card}>
                  <Text style={styles.sectionHeader}>CHURN RISK BREAKDOWN</Text>
                  {(['high', 'medium', 'low', 'minimal'] as const).map(k => {
                    const r = churn.by_risk_level[k];
                    if (!r) return null;
                    return (
                      <View key={k} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 6 }}>
                        <View style={[styles.riskDot, { backgroundColor: k === 'high' ? colors.danger : k === 'medium' ? colors.warning : k === 'low' ? colors.primary : colors.success }]} />
                        <Text style={{ flex: 1, fontSize: 14, color: colors.deepNavy, textTransform: 'capitalize' }}>{k}</Text>
                        <Text style={{ fontWeight: '700', color: colors.deepNavy }}>{r.count}</Text>
                        <Text style={{ fontSize: 12, color: colors.textSecondary, marginLeft: 8 }}>৳{r.revenue.toLocaleString()}</Text>
                      </View>
                    );
                  })}
                </View>

                {churn.at_risk_revenue > 0 && (
                  <View style={[styles.card, { backgroundColor: '#FFF0F0' }]}>
                    <Text style={styles.sectionHeader}>AT RISK REVENUE</Text>
                    <Text style={{ fontSize: 24, fontWeight: '700', color: colors.danger }}>
                      ৳{churn.at_risk_revenue.toLocaleString()}
                    </Text>
                    <Text style={{ fontSize: 12, color: colors.textSecondary }}>Revenue tied to high/medium risk customers</Text>
                  </View>
                )}
              </>
            ) : (
              <EmptyState headline="No churn data" body="Churn analysis requires customer order history." />
            )}
          </>
        )}

        {activeTab === 'CLV' && clv?.overall ? (
          <>
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: spacing.xl }}>
              <View style={styles.statCard}>
                <Text style={[styles.statValue, { color: colors.success }]}>৳{clv.overall.avg_clv_historical.toLocaleString()}</Text>
                <Text style={styles.statLabel}>Avg CLV</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>৳{clv.overall.avg_order_value.toLocaleString()}</Text>
                <Text style={styles.statLabel}>Avg order</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>৳{clv.overall.median_clv.toLocaleString()}</Text>
                <Text style={styles.statLabel}>Median CLV</Text>
              </View>
            </View>

            {Object.keys(clv.by_segment).length > 0 && (
              <View style={styles.card}>
                <Text style={styles.sectionHeader}>CLV BY SEGMENT</Text>
                {Object.entries(clv.by_segment).sort(([, a], [, b]) => b.avg_clv - a.avg_clv).map(([name, s]) => (
                  <View key={name} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: colors.offWhite }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontWeight: '600', color: colors.deepNavy, textTransform: 'capitalize' }}>{name}</Text>
                      <Text style={{ fontSize: 11, color: colors.textSecondary }}>{s.count} customers</Text>
                    </View>
                    <Text style={{ fontWeight: '700', color: colors.deepNavy }}>৳{s.avg_clv.toLocaleString()}</Text>
                  </View>
                ))}
              </View>
            )}

            <Text style={styles.sectionHeader}>TOP 10 BY CLV</Text>
            {clv.top_customers.length === 0 ? (
              <EmptyState headline="No data" body="CLV data requires customers with orders." />
            ) : (
              clv.top_customers.map((c, i) => (
                <View key={i} style={styles.row}>
                  <View style={[styles.rankBadge, { backgroundColor: i < 3 ? '#FFD700' : colors.offWhite }]}>
                    <Text style={{ fontWeight: '700', color: i < 3 ? colors.deepNavy : colors.textSecondary }}>{i + 1}</Text>
                  </View>
                  <View style={{ flex: 1, marginLeft: spacing.md }}>
                    <Text style={{ fontWeight: '700', color: colors.deepNavy }}>{c.name}</Text>
                    <Text style={{ fontSize: 12, color: colors.textSecondary }}>AOV: ৳{c.avg_order_value.toLocaleString()}</Text>
                  </View>
                  <Text style={{ fontWeight: '700', color: colors.success }}>৳{c.historical_clv.toLocaleString()}</Text>
                </View>
              ))
            )}
          </>
        ) : activeTab === 'CLV' && !clv?.overall ? (
          <EmptyState headline="No CLV data" body="CLV analysis needs customer order history." />
        ) : null}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: '700', color: colors.deepNavy, marginBottom: spacing.base },
  tab: { paddingHorizontal: spacing.md, height: 36, borderRadius: 8, justifyContent: 'center', backgroundColor: colors.white },
  tabActive: { backgroundColor: colors.primary },
  tabText: { fontSize: 13, color: colors.textSecondary },
  tabTextActive: { color: colors.white, fontWeight: '600' },
  statCard: {
    flex: 1, backgroundColor: colors.white, borderRadius: 12, padding: spacing.md,
    shadowColor: colors.deepNavy, shadowOpacity: 0.08, shadowOffset: { width: 0, height: 4 }, shadowRadius: 12, elevation: 2,
  },
  statValue: { fontSize: 18, fontWeight: '700', color: colors.deepNavy },
  statLabel: { fontSize: 11, color: colors.textSecondary, textTransform: 'uppercase', marginTop: 2 },
  card: {
    backgroundColor: colors.white, borderRadius: 16, padding: spacing.lg, marginBottom: spacing.xl,
    shadowColor: colors.deepNavy, shadowOpacity: 0.08, shadowOffset: { width: 0, height: 4 }, shadowRadius: 12, elevation: 2,
  },
  sectionHeader: { fontSize: 11, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 1, marginBottom: spacing.md },
  row: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: 12,
    padding: spacing.md, marginBottom: spacing.sm,
  },
  avatar: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  pill: { paddingHorizontal: spacing.md, paddingVertical: 4, borderRadius: 20 },
  riskDot: { width: 10, height: 10, borderRadius: 5, marginRight: spacing.md },
  rankBadge: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
});
