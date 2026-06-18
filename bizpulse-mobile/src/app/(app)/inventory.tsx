import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, spacing } from '../../types/theme';
import { cachedGet } from '../../lib/offline-api';
import { useEffect, useState } from 'react';
import EmptyState from '../../components/EmptyState';

interface DeadStockItem {
  id: number; name: string; sku: string; stock_quantity: number;
  price: number; cost_price: number; capital_at_risk: number; category: string; days_inactive: number;
}

interface MarginProduct {
  id: number; name: string; sku: string; price: number; cost_price: number;
  margin: number; margin_pct: number; stock_quantity: number; category: string;
}

export default function Inventory() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [deadStock, setDeadStock] = useState<DeadStockItem[]>([]);
  const [margins, setMargins] = useState<MarginProduct[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      cachedGet<DeadStockItem[]>('/inventory/dead-stock', { key: 'inventory:dead-stock', ttl: 300000 }),
      cachedGet<any>('/inventory/margin-analysis', { key: 'inventory:margins', ttl: 600000 }),
    ]).then(([ds, ma]) => {
      setDeadStock(ds);
      setMargins(ma.products);
      setSummary(ma.summary);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const tabs = ['Overview', 'Dead Stock', 'Margins'];

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
        <Text style={styles.title}>Inventory</Text>
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
                <Text style={styles.statValue}>{summary?.total_products ?? 0}</Text>
                <Text style={styles.statLabel}>Products</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={[styles.statValue, { color: deadStock.length > 0 ? colors.danger : colors.deepNavy }]}>
                  {deadStock.length}
                </Text>
                <Text style={styles.statLabel}>Dead stock</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={[styles.statValue, { color: summary?.low_margin_count > 0 ? colors.warning : colors.deepNavy }]}>
                  {summary?.low_margin_count ?? 0}
                </Text>
                <Text style={styles.statLabel}>Low margin</Text>
              </View>
            </View>

            {summary && (
              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>AVERAGE MARGIN</Text>
                <Text style={styles.summaryValue}>{summary.avg_margin_pct}%</Text>
                <Text style={styles.summarySub}>Total potential profit: ৳{(summary.total_potential_profit ?? 0).toLocaleString()}</Text>
              </View>
            )}

            <Text style={styles.sectionHeader}>✦ DEAD STOCK RADAR</Text>
            {deadStock.length === 0 ? (
              <EmptyState headline="No dead stock" body="All products with stock have been ordered recently." />
            ) : (
              deadStock.slice(0, 5).map((item, i) => (
                <TouchableOpacity key={i} style={[styles.alertCard, { borderLeftColor: item.capital_at_risk > 200000 ? colors.danger : colors.warning }]}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: '700', color: colors.deepNavy }}>{item.name}</Text>
                    <Text style={{ fontSize: 12, color: colors.textSecondary }}>SKU: {item.sku}</Text>
                    <Text style={{ fontSize: 12, color: colors.danger }}>৳{(item.capital_at_risk).toLocaleString()} at risk</Text>
                  </View>
                  <View style={styles.pill}><Text style={{ color: colors.warning, fontSize: 12 }}>{item.stock_quantity} units</Text></View>
                </TouchableOpacity>
              ))
            )}
          </>
        )}

        {activeTab === 'Dead Stock' && (
          <>
            <Text style={styles.sectionHeader}>✦ ALL DEAD STOCK</Text>
            {deadStock.length === 0 ? (
              <EmptyState headline="No dead stock" body="All products are actively selling." />
            ) : (
              deadStock.map((item, i) => (
                <TouchableOpacity key={i} style={[styles.alertCard, { borderLeftColor: item.capital_at_risk > 200000 ? colors.danger : colors.warning }]}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: '700', color: colors.deepNavy }}>{item.name}</Text>
                    <Text style={{ fontSize: 12, color: colors.textSecondary }}>{item.category} · SKU: {item.sku}</Text>
                    <Text style={{ fontSize: 12, color: colors.danger }}>৳{(item.capital_at_risk).toLocaleString()} · {item.days_inactive} days inactive</Text>
                  </View>
                  <View style={styles.pill}><Text style={{ color: colors.warning, fontSize: 12 }}>{item.stock_quantity} units</Text></View>
                </TouchableOpacity>
              ))
            )}
          </>
        )}

        {activeTab === 'Margins' && (
          <>
            {summary && (
              <View style={styles.summaryCard}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={[styles.statValue, { color: colors.success }]}>{summary.high_margin_count}</Text>
                    <Text style={styles.statLabel}>High margin</Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={styles.statValue}>{summary.avg_margin_pct}%</Text>
                    <Text style={styles.statLabel}>Avg margin</Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={[styles.statValue, { color: summary.low_margin_count > 0 ? colors.danger : colors.deepNavy }]}>{summary.low_margin_count}</Text>
                    <Text style={styles.statLabel}>Low margin</Text>
                  </View>
                </View>
              </View>
            )}
            <Text style={styles.sectionHeader}>✦ MARGIN BY PRODUCT</Text>
            {margins.length === 0 ? (
              <EmptyState headline="No margin data" body="Add cost prices to products to see margin analysis." />
            ) : (
              margins.slice(0, 20).map((item, i) => (
                <View key={i} style={styles.marginRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: '600', color: colors.deepNavy, fontSize: 14 }}>{item.name}</Text>
                    <Text style={{ fontSize: 11, color: colors.textSecondary }}>৳{item.cost_price} → ৳{item.price}</Text>
                  </View>
                  <Text style={[styles.marginValue, { color: item.margin_pct > 40 ? colors.success : item.margin_pct > 10 ? colors.warning : colors.danger }]}>
                    {item.margin_pct}%
                  </Text>
                </View>
              ))
            )}
          </>
        )}
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
  statValue: { fontSize: 20, fontWeight: '700', color: colors.deepNavy },
  statLabel: { fontSize: 11, color: colors.textSecondary, textTransform: 'uppercase', marginTop: 2 },
  summaryCard: {
    backgroundColor: colors.white, borderRadius: 16, padding: spacing.lg, marginBottom: spacing.xl,
    shadowColor: colors.deepNavy, shadowOpacity: 0.08, shadowOffset: { width: 0, height: 4 }, shadowRadius: 12, elevation: 2,
  },
  summaryLabel: { fontSize: 11, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 1 },
  summaryValue: { fontSize: 28, fontWeight: '700', color: colors.deepNavy, marginVertical: spacing.xs },
  summarySub: { fontSize: 13, color: colors.textSecondary },
  sectionHeader: { fontSize: 11, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 1, marginBottom: spacing.md, marginTop: spacing.base },
  alertCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: 16, padding: spacing.base,
    borderLeftWidth: 4, marginBottom: spacing.sm,
  },
  pill: { backgroundColor: '#FFF3E0', borderRadius: 20, paddingHorizontal: spacing.md, paddingVertical: 4 },
  marginRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: 12,
    padding: spacing.base, marginBottom: spacing.xs,
  },
  marginValue: { fontSize: 16, fontWeight: '700', minWidth: 50, textAlign: 'right' },
});
