import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, spacing } from '../../types/theme';

export default function MorningBriefing() {
  const items = [
    { icon: '📈', color: colors.primary, text: 'Revenue yesterday was ৳1,58,400 — your best Tuesday in 3 months.' },
    { icon: '✅', color: colors.success, text: '247 orders so far today. On track to exceed yesterday.' },
    { icon: '🔴', color: colors.danger, text: '3 VIP customers show churn risk. Immediate action recommended.' },
    { icon: '📦', color: colors.warning, text: '2 products need reorder within 3 days.' },
  ];

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.backdrop} onPress={() => router.back()} />
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <View style={styles.header}>
          <Text style={styles.title}>✦ Morning Briefing</Text>
          <Text style={styles.date}>May 22, 2026</Text>
        </View>
        <ScrollView>
          {items.map((item, i) => (
            <TouchableOpacity key={i} style={styles.row}>
              <View style={[styles.iconBox, { backgroundColor: item.color + '20' }]}>
                <Text style={{ fontSize: 18 }}>{item.icon}</Text>
              </View>
              <Text style={styles.rowText}>{item.text}</Text>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.askBtn}>
          <LinearGradient colors={gradients.ai} style={styles.askGradient}>
            <Text style={styles.askText}>Ask about today →</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.dismiss}>Dismiss</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { flex: 1, backgroundColor: 'rgba(10,37,64,0.4)' },
  sheet: {
    backgroundColor: colors.white, borderTopLeftRadius: 24, borderTopRightRadius: 24,
    paddingBottom: 40, maxHeight: '75%',
  },
  handle: { width: 40, height: 4, backgroundColor: '#D1DDE8', borderRadius: 2, alignSelf: 'center', marginTop: spacing.md, marginBottom: spacing.sm },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingBottom: spacing.md },
  title: { fontSize: 18, fontWeight: '700', color: colors.deepNavy },
  date: { fontSize: 13, color: colors.textSecondary },
  row: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.base, paddingHorizontal: spacing.lg,
    borderBottomWidth: 1, borderBottomColor: '#F8FAFC',
  },
  iconBox: { width: 36, height: 36, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  rowText: { flex: 1, fontSize: 14, color: colors.deepNavy, marginLeft: spacing.md },
  chevron: { fontSize: 18, color: 'rgba(10,37,64,0.4)' },
  askBtn: { marginHorizontal: spacing.lg, marginTop: spacing.base },
  askGradient: { height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  askText: { color: colors.white, fontSize: 16, fontWeight: '700' },
  dismiss: { color: '#8FA3B8', fontSize: 14, textAlign: 'center', marginTop: spacing.md },
});
