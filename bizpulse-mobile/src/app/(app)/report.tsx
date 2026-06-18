import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, spacing } from '../../types/theme';

export default function Report() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const month = id || 'March 2026';

  return (
    <View style={{ flex: 1, backgroundColor: '#F8FBFF' }}>
      <View style={{ paddingHorizontal: spacing.lg, paddingTop: 60, paddingBottom: spacing.base, backgroundColor: colors.white }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => router.back()}><Text style={{ fontSize: 24, color: colors.deepNavy }}>←</Text></TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: '700', color: colors.deepNavy, flex: 1, marginLeft: spacing.base }}>{month} Report</Text>
          <TouchableOpacity><Text style={{ fontSize: 18, color: colors.textSecondary }}>↗</Text></TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: 100 }}>
        <LinearGradient colors={gradients.hero} style={styles.cover}>
          <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>BIZPULSE MONTHLY REPORT</Text>
          <Text style={{ color: colors.white, fontSize: 28, fontWeight: '700', marginTop: spacing.xs }}>{month}</Text>
          <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, marginTop: spacing.xs }}>eMartway Skincare Limited</Text>
          <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: spacing.xs }}>Generated Apr 1, 2026</Text>
        </LinearGradient>

        <View style={styles.section}>
          <View style={styles.sectionAccent} />
          <Text style={styles.sectionTitle}>EXECUTIVE SUMMARY</Text>
          <View style={{ marginTop: spacing.sm }}>
            <Text style={styles.bullet}>▲ Revenue up 18% vs last month — ৳38.2L</Text>
            <Text style={styles.bullet}>▲ Orders grew 12% — 1,847 total</Text>
            <Text style={styles.bullet}>▼ Return rate increased to 4.2% (from 3.1%)</Text>
            <Text style={styles.bullet}>▲ 247 new customers acquired</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={[styles.sectionAccent, { backgroundColor: colors.primary }]} />
          <Text style={styles.sectionTitle}>REVENUE</Text>
          <View style={{ height: 100, backgroundColor: '#F0F5FA', borderRadius: 12, marginTop: spacing.sm, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: colors.textSecondary }}>📈 Revenue trend chart</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.sm }}>
            <Text style={{ color: colors.textSecondary, fontSize: 12 }}>Gross: ৳38,24,100</Text>
            <Text style={{ color: colors.success, fontSize: 12 }}>+18%</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={[styles.sectionAccent, { backgroundColor: colors.aiPurple }]} />
          <Text style={styles.sectionTitle}>TOP PRODUCTS</Text>
          {['CeraVe Moisturizer (৳5.2L)', 'Somebymi Toner (৳3.8L)', 'Cosrx Snail Mucin (৳2.9L)'].map((p, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm }}>
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary, marginRight: spacing.sm }} />
              <Text style={{ fontSize: 13, color: colors.deepNavy }}>{p}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View style={[styles.sectionAccent, { backgroundColor: colors.success }]} />
          <Text style={styles.sectionTitle}>CUSTOMER HEALTH</Text>
          <Text style={{ fontSize: 13, color: colors.deepNavy, marginTop: spacing.sm }}>8,392 total customers · 82% sentiment · 3 churn risk</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <LinearGradient colors={gradients.ai} style={styles.downloadBtn}><Text style={{ color: colors.white, fontWeight: '600' }}>Download PDF</Text></LinearGradient>
        <TouchableOpacity style={styles.shareOutlineBtn}><Text style={{ color: colors.deepNavy, fontWeight: '600' }}>Share</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cover: { padding: spacing.lg, borderRadius: 24, marginBottom: spacing.xl },
  section: { backgroundColor: colors.white, borderRadius: 16, padding: spacing.base, marginBottom: spacing.md, borderLeftWidth: 4, borderLeftColor: colors.primary },
  sectionAccent: { width: 4, height: 20, backgroundColor: colors.primary, borderRadius: 2, marginBottom: spacing.sm },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: colors.deepNavy },
  bullet: { fontSize: 13, color: colors.deepNavy, marginBottom: spacing.xs },
  bottomBar: { flexDirection: 'row', gap: spacing.md, padding: spacing.base, backgroundColor: colors.white, borderTopWidth: 0.5, borderTopColor: '#E0EAF5', paddingBottom: 24 },
  downloadBtn: { flex: 1, height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  shareOutlineBtn: { flex: 1, height: 48, borderRadius: 16, borderWidth: 1.5, borderColor: colors.deepNavy, justifyContent: 'center', alignItems: 'center' },
});
