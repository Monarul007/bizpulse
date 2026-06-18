import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, spacing } from '../../types/theme';

export default function Cashflow() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={{ padding: spacing.lg, paddingTop: 60 }}>
        <TouchableOpacity onPress={() => router.back()}><Text style={{ color: colors.primary, fontSize: 16 }}>← Cash Flow</Text></TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <LinearGradient colors={['#FF4757', '#FF6B7A']} style={styles.urgentBanner}>
          <Text style={{ color: colors.white, fontWeight: '700', fontSize: 14 }}>⚠ Projected cash gap in 22 days</Text>
          <Text style={{ color: colors.white, fontWeight: '700', fontSize: 18 }}>৳3,50,000 shortfall</Text>
        </LinearGradient>
        <View style={styles.chartCard}><Text style={{ color: colors.textSecondary }}>📊 30-day cash flow projection chart</Text></View>
        <View style={{ flexDirection: 'row', gap: 12, marginBottom: spacing.xl }}>
          <View style={[styles.flowCard, { borderColor: colors.success }]}>
            <Text style={[styles.flowAmount, { color: colors.success }]}>৳18,24,000</Text>
            <Text style={styles.flowLabel}>Projected inflows</Text>
            <Text style={styles.flowItem}>Revenue ৳16,20,000</Text>
            <Text style={styles.flowItem}>Collections ৳2,04,000</Text>
          </View>
          <View style={[styles.flowCard, { borderColor: colors.danger }]}>
            <Text style={[styles.flowAmount, { color: colors.danger }]}>৳21,74,000</Text>
            <Text style={styles.flowLabel}>Projected outflows</Text>
            <Text style={styles.flowItem}>Restock ৳18,00,000</Text>
            <Text style={styles.flowItem}>Logistics ৳2,44,000</Text>
          </View>
        </View>
        <View style={styles.aiCard}>
          <Text style={{ fontSize: 11, color: colors.aiPurple, textTransform: 'uppercase', letterSpacing: 1 }}>✦ AI RECOMMENDATION</Text>
          <Text style={{ fontSize: 14, color: colors.deepNavy, lineHeight: 22, marginTop: spacing.sm }}>
            You need ৳3,50,000 in 22 days. Options: (1) Accelerate collections from wholesale orders, (2) Delay non-urgent restock, (3) Apply for short-term credit.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  urgentBanner: { padding: spacing.lg, borderRadius: 16, marginBottom: spacing.base },
  chartCard: { height: 180, backgroundColor: '#F8FBFF', borderRadius: 16, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#E8F0F8', marginBottom: spacing.base },
  flowCard: { flex: 1, backgroundColor: '#F8FBFF', borderRadius: 12, padding: spacing.md, borderWidth: 1 },
  flowAmount: { fontSize: 22, fontWeight: '700' },
  flowLabel: { fontSize: 11, color: colors.textSecondary, textTransform: 'uppercase', marginVertical: spacing.xs },
  flowItem: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  aiCard: { backgroundColor: colors.white, borderRadius: 16, padding: spacing.base, borderLeftWidth: 4, borderLeftColor: colors.aiPurple },
});
