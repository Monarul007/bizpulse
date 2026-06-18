import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, spacing } from '../../types/theme';

export default function CustomerDetail() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <LinearGradient colors={['#E8F4FD', '#DCF0FF']} style={styles.hero}>
        <TouchableOpacity onPress={() => router.back()}><Text style={{ color: colors.primary, fontSize: 16 }}>← Back</Text></TouchableOpacity>
        <View style={{ alignItems: 'center', marginTop: spacing.base }}>
          <LinearGradient colors={gradients.ai} style={styles.avatar}><Text style={{ color: colors.white, fontSize: 22, fontWeight: '700' }}>FB</Text></LinearGradient>
          <Text style={styles.name}>Farida Begum</Text>
          <Text style={styles.since}>Customer since Jan 2022</Text>
          <View style={styles.statRow}>
            <View style={{ alignItems: 'center' }}><Text style={styles.statVal}>৳1,24,300</Text><Text style={styles.statLabel}>Lifetime</Text></View>
            <View style={{ alignItems: 'center' }}><Text style={styles.statVal}>38</Text><Text style={styles.statLabel}>Orders</Text></View>
            <View style={{ alignItems: 'center' }}><Text style={styles.statVal}>12 days</Text><Text style={styles.statLabel}>Frequency</Text></View>
          </View>
          <View style={[styles.badge, { backgroundColor: '#FFF0F0' }]}><Text style={{ color: colors.danger, fontWeight: '700', fontSize: 14 }}>CHURN RISK</Text></View>
        </View>
      </LinearGradient>
      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <View style={styles.chartCard}><Text style={{ color: colors.textSecondary }}>📊 Order history — 12 months</Text></View>
        <Text style={{ color: colors.danger, fontWeight: '700', fontSize: 14, textAlign: 'center', marginVertical: spacing.sm }}>Last order: 45 days ago</Text>
        <Text style={styles.sectionHeader}>TOP PURCHASES</Text>
        {['Moisturizers', 'Serums', 'Sunscreens'].map((cat, i) => (
          <View key={i} style={styles.categoryRow}>
            <View style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: colors.lightBlueBg, justifyContent: 'center', alignItems: 'center' }}><Text>🛍️</Text></View>
            <Text style={{ flex: 1, marginLeft: spacing.md, color: colors.deepNavy }}>{cat}</Text>
            <Text style={{ fontWeight: '700', color: colors.deepNavy }}>৳{45000 - i * 12000}</Text>
          </View>
        ))}
        <View style={styles.aiCard}>
          <Text style={{ fontSize: 11, color: colors.aiPurple, textTransform: 'uppercase', letterSpacing: 1 }}>✦ AI INSIGHT</Text>
          <Text style={{ fontSize: 14, color: colors.deepNavy, lineHeight: 22, marginTop: spacing.sm }}>
            Farida typically orders every 12 days. She is now 45 days overdue — 3.75x her normal cycle. Win-back probability is high.
          </Text>
        </View>
        <TouchableOpacity style={{ marginTop: spacing.lg }}>
          <LinearGradient colors={gradients.ai} style={{ height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: colors.white, fontWeight: '700', fontSize: 15 }}>Send Win-Back Message</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { padding: spacing.lg, paddingTop: 60 },
  avatar: { width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center', marginBottom: spacing.sm },
  name: { fontSize: 22, fontWeight: '700', color: colors.deepNavy },
  since: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  statRow: { flexDirection: 'row', gap: spacing.xl, marginVertical: spacing.base },
  statVal: { fontSize: 20, fontWeight: '700', color: colors.deepNavy },
  statLabel: { fontSize: 11, color: colors.textSecondary, textTransform: 'uppercase', marginTop: 2 },
  badge: { paddingHorizontal: spacing.md, paddingVertical: 6, borderRadius: 12 },
  chartCard: { height: 120, backgroundColor: '#F8FBFF', borderRadius: 16, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#E8F0F8' },
  sectionHeader: { fontSize: 11, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 1, marginTop: spacing.xl, marginBottom: spacing.md },
  categoryRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: '#F8FAFC' },
  aiCard: { backgroundColor: colors.white, borderRadius: 16, padding: spacing.base, borderLeftWidth: 4, borderLeftColor: colors.aiPurple, marginTop: spacing.xl },
});
