import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, spacing } from '../../types/theme';

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <LinearGradient colors={['#E8F4FD', '#DCF0FF']} style={styles.hero}>
        <TouchableOpacity onPress={() => router.back()}><Text style={styles.back}>← Back</Text></TouchableOpacity>
        <View style={{ flexDirection: 'row', gap: spacing.base, marginTop: spacing.base }}>
          <View style={styles.productImage} />
          <View style={{ flex: 1 }}>
            <Text style={styles.productName}>CeraVe Moisturizer 250ml</Text>
            <Text style={styles.brand}>CeraVe</Text>
            <Text style={styles.sku}>SKU-0024</Text>
            <View style={{ flexDirection: 'row', gap: 8, marginTop: spacing.sm }}>
              <View style={[styles.badge, { backgroundColor: '#FFF0F0' }]}><Text style={{ color: colors.danger, fontSize: 12 }}>DEAD STOCK</Text></View>
              <View style={[styles.badge, { backgroundColor: '#FFF8E0' }]}><Text style={{ color: colors.warning, fontSize: 12 }}>38 days inactive</Text></View>
            </View>
          </View>
        </View>
      </LinearGradient>
      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: spacing.xl }}>
          {[
            { v: '148', l: 'In stock', c: colors.deepNavy },
            { v: '0/day', l: 'Sell velocity', c: colors.danger },
            { v: '৳74,000', l: 'Capital at risk', c: colors.danger },
            { v: '৳500', l: 'Unit cost', c: colors.deepNavy },
          ].map((m, i) => (
            <View key={i} style={styles.metricCard}>
              <Text style={[styles.metricValue, { color: m.c }]}>{m.v}</Text>
              <Text style={styles.metricLabel}>{m.l}</Text>
            </View>
          ))}
        </View>
        <View style={styles.chartCard}><Text style={{ color: colors.textSecondary }}>📊 90-day sales history chart</Text></View>
        <View style={styles.aiCard}>
          <Text style={styles.aiHeader}>✦ AI RECOMMENDATION</Text>
          <Text style={styles.aiText}>
            This product has been inactive for 38 days with ৳74,000 tied up. Consider running a 20% flash sale to clear stock.
          </Text>
          <TouchableOpacity style={styles.actionBtn}>
            <LinearGradient colors={gradients.ai} style={styles.actionGradient}>
              <Text style={{ color: colors.white, fontWeight: '700' }}>Create Promotion</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.outlineBtn}>
            <Text style={{ color: colors.deepNavy }}>Mark for Liquidation</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { padding: spacing.lg, paddingTop: 60 },
  back: { color: colors.primary, fontSize: 16 },
  productImage: { width: 80, height: 80, borderRadius: 12, backgroundColor: '#F0F5FA' },
  productName: { fontSize: 18, fontWeight: '700', color: colors.deepNavy },
  brand: { fontSize: 14, color: colors.textSecondary },
  sku: { fontSize: 12, color: 'rgba(10,37,64,0.3)' },
  badge: { paddingHorizontal: spacing.md, paddingVertical: 4, borderRadius: 12 },
  metricCard: {
    width: '46%', backgroundColor: colors.white, borderRadius: 12, padding: spacing.md,
    borderWidth: 1, borderColor: '#E8F0F8',
  },
  metricValue: { fontSize: 22, fontWeight: '700' },
  metricLabel: { fontSize: 11, color: colors.textSecondary, textTransform: 'uppercase', marginTop: 2 },
  chartCard: { height: 160, backgroundColor: colors.white, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: spacing.xl, borderWidth: 1, borderColor: '#E8F0F8' },
  aiCard: { backgroundColor: colors.white, borderRadius: 16, padding: spacing.base, borderLeftWidth: 4, borderLeftColor: colors.aiPurple },
  aiHeader: { fontSize: 11, color: colors.aiPurple, textTransform: 'uppercase', letterSpacing: 1, marginBottom: spacing.sm },
  aiText: { fontSize: 14, color: colors.deepNavy, lineHeight: 22, marginBottom: spacing.lg },
  actionBtn: { marginBottom: spacing.sm },
  actionGradient: { height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  outlineBtn: { height: 44, borderRadius: 16, borderWidth: 1.5, borderColor: colors.deepNavy, justifyContent: 'center', alignItems: 'center' },
});
