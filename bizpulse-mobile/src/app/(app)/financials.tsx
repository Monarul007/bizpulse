import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, spacing } from '../../types/theme';

export default function Financials() {
  return (
    <LinearGradient colors={gradients.bg} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: 100 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.base }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: colors.deepNavy }}>Financials</Text>
          <TouchableOpacity><Text style={{ color: colors.primary, fontSize: 13 }}>📄</Text></TouchableOpacity>
        </View>
        <LinearGradient colors={gradients.hero} style={styles.pnlCard}>
          <View style={styles.pnlRow}><Text style={styles.pnlLabel}>GROSS REVENUE</Text><Text style={styles.pnlValue}>৳38,24,100</Text></View>
          <View style={styles.pnlRow}><Text style={styles.pnlLabel}>COST OF GOODS</Text><Text style={[styles.pnlValue, { color: 'rgba(255,255,255,0.6)', fontSize: 22 }]}>(৳22,18,300)</Text></View>
          <View style={styles.divider} />
          <View style={styles.pnlRow}><Text style={[styles.pnlLabel, { fontWeight: '700' }]}>GROSS PROFIT</Text><Text style={styles.pnlValue}>৳16,05,800</Text></View>
        </LinearGradient>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: spacing.xl }}>
          {[
            { v: '৳3,75,200', l: 'Behind target', c: colors.danger },
            { v: '৳847', l: 'CAC', c: colors.deepNavy },
            { v: '28%', l: 'Avg margin', c: colors.success },
            { v: '1,847', l: 'Orders', c: colors.deepNavy },
          ].map((m, i) => (
            <View key={i} style={[styles.metricCard, m.c === colors.danger && { backgroundColor: '#FFF8F8' }]}>
              <Text style={[styles.metricVal, { color: m.c }]}>{m.v}</Text>
              <Text style={styles.metricLabel}>{m.l}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.sectionHeader}>BRAND PROFITABILITY</Text>
        <View style={styles.chartCard}>
          {[
            { name: 'The Ordinary', pct: 42, color: colors.success },
            { name: 'Somebymi', pct: 35, color: colors.success },
            { name: 'CeraVe', pct: 24, color: colors.warning },
            { name: 'Cosrx', pct: 18, color: colors.danger },
          ].map((b, i) => (
            <View key={i} style={{ marginBottom: spacing.sm }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 13, color: colors.deepNavy }}>{b.name}</Text>
                <Text style={{ fontSize: 13, fontWeight: '700', color: colors.deepNavy }}>{b.pct}%</Text>
              </View>
              <View style={{ height: 20, backgroundColor: '#F0F5FA', borderRadius: 4, marginTop: 2 }}>
                <View style={{ width: `${b.pct * 2}%`, height: 20, backgroundColor: b.color, borderRadius: 4 }} />
              </View>
            </View>
          ))}
        </View>
        <TouchableOpacity onPress={() => router.push('/(app)/cashflow')}>
          <View style={styles.linkCard}><Text style={{ color: colors.primary, fontWeight: '600' }}>View Cash Flow Projection →</Text></View>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  pnlCard: { padding: spacing.lg, borderRadius: 20, marginBottom: spacing.base },
  pnlRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 4 },
  pnlLabel: { color: 'rgba(255,255,255,0.4)', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1 },
  pnlValue: { color: colors.white, fontSize: 28, fontWeight: '700' },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.2)', marginVertical: spacing.md },
  metricCard: { width: '46%', backgroundColor: colors.white, borderRadius: 12, padding: spacing.md },
  metricVal: { fontSize: 22, fontWeight: '700' },
  metricLabel: { fontSize: 11, color: colors.textSecondary, textTransform: 'uppercase', marginTop: 2 },
  sectionHeader: { fontSize: 11, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 1, marginBottom: spacing.md },
  chartCard: { backgroundColor: colors.white, borderRadius: 16, padding: spacing.base, marginBottom: spacing.xl },
  linkCard: { backgroundColor: colors.white, borderRadius: 16, padding: spacing.base, alignItems: 'center' },
});
