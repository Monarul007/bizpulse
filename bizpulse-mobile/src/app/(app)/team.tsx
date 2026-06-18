import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, spacing } from '../../types/theme';

const employees = [
  { rank: 1, initials: 'AK', name: 'Abdul Karim', role: 'Senior Sales', score: 94, orders: 147, csat: 96, response: '2.1m' },
  { rank: 2, initials: 'FN', name: 'Fatima Noor', role: 'Support Lead', score: 88, orders: 123, csat: 94, response: '1.8m' },
  { rank: 3, initials: 'RH', name: 'Rafiq Hossain', role: 'Logistics', score: 76, orders: 98, csat: 89, response: '3.2m' },
  { rank: 4, initials: 'SI', name: 'Sadia Islam', role: 'Content', score: 72, orders: 45, csat: 92, response: '4.0m' },
  { rank: 5, initials: 'MH', name: 'Mahbub Hasan', role: 'Sales', score: 61, orders: 67, csat: 78, response: '5.5m' },
];

const rankGradients: Record<number, string[]> = { 1: gradients.gold, 2: gradients.silver, 3: gradients.bronze };
const rankBgs: Record<number, string> = { 4: '#F0F5FA', 5: '#F0F5FA' };

export default function Team() {
  const [dept, setDept] = useState('All');
  const depts = ['All', 'Sales', 'Support', 'Logistics', 'Content'];

  return (
    <LinearGradient colors={gradients.bg} style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: spacing.lg, paddingTop: 60, paddingBottom: spacing.base }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => router.back()}><Text style={{ fontSize: 24, color: colors.deepNavy }}>←</Text></TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: '700', color: colors.deepNavy }}>Team</Text>
          <Text style={{ fontSize: 13, color: colors.textSecondary }}>April 2026</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: 100 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: spacing.xl }}>
          <View style={{ flexDirection: 'row', gap: spacing.sm }}>
            {depts.map(d => (
              <TouchableOpacity key={d} style={[styles.deptChip, dept === d && styles.deptChipActive]} onPress={() => setDept(d)}>
                <Text style={[styles.deptText, dept === d && styles.deptTextActive]}>{d}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <Text style={styles.sectionHeader}>PERFORMANCE LEADERBOARD</Text>
        {employees.map(e => (
          <View key={e.rank} style={styles.card}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {e.rank <= 3 ? (
                <LinearGradient colors={rankGradients[e.rank]} style={styles.rankBadge}>
                  <Text style={{ color: colors.white, fontWeight: '700', fontSize: 18 }}>{e.rank}</Text>
                </LinearGradient>
              ) : (
                <View style={[styles.rankBadge, { backgroundColor: rankBgs[e.rank] }]}>
                  <Text style={{ color: colors.textSecondary, fontWeight: '700', fontSize: 18 }}>{e.rank}</Text>
                </View>
              )}
              <LinearGradient colors={gradients.ai} style={styles.avatar}>
                <Text style={{ color: colors.white, fontWeight: '700', fontSize: 14 }}>{e.initials}</Text>
              </LinearGradient>
              <View style={{ flex: 1, marginLeft: spacing.md }}>
                <Text style={{ fontWeight: '700', fontSize: 15, color: colors.deepNavy }}>{e.name}</Text>
                <Text style={{ fontSize: 13, color: colors.textSecondary }}>{e.role}</Text>
              </View>
              <View style={[styles.scorePill, { backgroundColor: e.score >= 80 ? '#E0FBF4' : e.score >= 60 ? '#FFF8E0' : '#FFF0F0' }]}>
                <Text style={{ color: e.score >= 80 ? colors.success : e.score >= 60 ? colors.warning : colors.danger, fontWeight: '700', fontSize: 14 }}>{e.score}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', gap: spacing.base, marginTop: spacing.sm }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}><Text style={{ fontSize: 12, color: colors.deepNavy, fontWeight: '600' }}>📦 {e.orders}</Text><Text style={{ fontSize: 10, color: colors.textSecondary, marginLeft: 2 }}>orders</Text></View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}><Text style={{ fontSize: 12, color: colors.deepNavy, fontWeight: '600' }}>⭐ {e.csat}%</Text><Text style={{ fontSize: 10, color: colors.textSecondary, marginLeft: 2 }}>CSAT</Text></View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}><Text style={{ fontSize: 12, color: colors.deepNavy, fontWeight: '600' }}>⏱ {e.response}</Text><Text style={{ fontSize: 10, color: colors.textSecondary, marginLeft: 2 }}>response</Text></View>
            </View>
            <View style={{ height: 4, backgroundColor: '#F0F5FA', borderRadius: 4, marginTop: spacing.sm }}>
              <View style={{ width: `${e.score}%`, height: 4, borderRadius: 4, backgroundColor: colors.primary }} />
            </View>
          </View>
        ))}

        <Text style={styles.sectionHeader}>TEAM ALERTS</Text>
        <View style={[styles.alertCard, { borderLeftColor: colors.warning }]}>
          <Text style={{ fontWeight: '700', color: colors.deepNavy }}>⚠ Abdul Karim — 3 late dispatches this week</Text>
          <Text style={{ fontSize: 13, color: colors.textSecondary, marginTop: 2 }}>Review required before end of day</Text>
        </View>
        <View style={[styles.alertCard, { borderLeftColor: colors.danger }]}>
          <Text style={{ fontWeight: '700', color: colors.deepNavy }}>🔴 Support queue breached 30-min response SLA</Text>
          <Text style={{ fontSize: 13, color: colors.textSecondary, marginTop: 2 }}>2 unresolved tickets from yesterday</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  deptChip: { paddingHorizontal: spacing.md, height: 32, borderRadius: 20, justifyContent: 'center', backgroundColor: colors.white, borderWidth: 1, borderColor: '#DCE8F5' },
  deptChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  deptText: { fontSize: 13, color: colors.textSecondary },
  deptTextActive: { color: colors.white, fontWeight: '600' },
  sectionHeader: { fontSize: 11, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 1, marginBottom: spacing.md },
  card: { backgroundColor: colors.white, borderRadius: 16, padding: spacing.base, marginBottom: spacing.sm },
  rankBadge: { width: 36, height: 36, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: spacing.md },
  avatar: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  scorePill: { paddingHorizontal: spacing.md, paddingVertical: 4, borderRadius: 20 },
  alertCard: { backgroundColor: colors.white, borderRadius: 16, padding: spacing.base, borderLeftWidth: 4, marginBottom: spacing.sm },
});
