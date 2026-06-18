import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, spacing } from '../../types/theme';

export default function AiResult() {
  const { q } = useLocalSearchParams<{ q?: string }>();
  const query = q || 'Best selling products today';

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={{ paddingHorizontal: spacing.lg, paddingTop: 60, paddingBottom: spacing.base }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => router.back()}><Text style={{ fontSize: 24, color: colors.deepNavy }}>←</Text></TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: '700', color: colors.deepNavy, flex: 1, marginLeft: spacing.base }} numberOfLines={1}>{query}</Text>
          <TouchableOpacity><Text style={{ fontSize: 18, color: colors.textSecondary }}>↗</Text></TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: 100 }}>
        <View style={styles.queryCard}>
          <Text style={{ color: colors.aiPurple, fontSize: 12 }}>✦ </Text>
          <Text style={{ color: colors.deepNavy, fontSize: 13, fontStyle: 'italic', flex: 1 }}>{query}</Text>
          <Text style={{ fontSize: 11, color: colors.textTertiary }}>Asked just now</Text>
        </View>

        <View style={styles.answerCard}>
          <Text style={styles.aiBadge}>✦ AI ANSWER</Text>
          <Text style={styles.answerText}>
            Based on today's sales data, your best selling product is CeraVe Moisturizer 250ml with 47 units sold (৳23,500). 
            Somebymi Toner follows with 32 units (৳14,080), and Cosrx Snail Mucin with 28 units (৳12,600).
          </Text>
        </View>

        <Text style={styles.sectionHeader}>DATA VISUALIZATION</Text>
        <View style={styles.chartCard}>
          {[
            { name: 'CeraVe Moisturizer', rev: 23500, pct: 100 },
            { name: 'Somebymi Toner', rev: 14080, pct: 60 },
            { name: 'Cosrx Snail Mucin', rev: 12600, pct: 54 },
            { name: 'The Ordinary Serum', rev: 9800, pct: 42 },
            { name: 'La Roche-Posay', rev: 7200, pct: 31 },
          ].map((p, i) => (
            <View key={i} style={{ marginBottom: spacing.sm }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 13, color: colors.deepNavy, flex: 1 }} numberOfLines={1}>{p.name}</Text>
                <Text style={{ fontSize: 13, fontWeight: '700', color: colors.deepNavy }}>৳{p.rev.toLocaleString('en-IN')}</Text>
              </View>
              <View style={{ height: 20, backgroundColor: '#F0F5FA', borderRadius: 4, marginTop: 2 }}>
                <LinearGradient colors={gradients.ai} style={{ width: `${p.pct}%`, height: 20, borderRadius: 4 }} />
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.rawToggle}>
          <Text style={{ color: colors.primary, fontSize: 13 }}>View raw data ▾</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', gap: spacing.md, marginTop: spacing.xl }}>
          <TouchableOpacity style={styles.exportBtn}><Text style={{ color: colors.deepNavy, fontWeight: '600' }}>Export CSV</Text></TouchableOpacity>
          <LinearGradient colors={gradients.ai} style={styles.shareBtn}>
            <Text style={{ color: colors.white, fontWeight: '600' }}>Share Report</Text>
          </LinearGradient>
        </View>

        <Text style={{ color: colors.textTertiary, fontSize: 11, textAlign: 'center', marginTop: spacing.base }}>
          ✦ Answer generated from live data · April 12, 2026 2:41 PM
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  queryCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0EEFF', borderRadius: 12, padding: spacing.md, marginBottom: spacing.base },
  answerCard: { backgroundColor: colors.white, borderRadius: 16, padding: spacing.base, borderWidth: 1, borderColor: '#E8F0F8', marginBottom: spacing.xl },
  aiBadge: { fontSize: 11, color: colors.aiPurple, textTransform: 'uppercase', letterSpacing: 1, marginBottom: spacing.sm },
  answerText: { fontSize: 15, color: colors.deepNavy, lineHeight: 24 },
  sectionHeader: { fontSize: 11, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 1, marginBottom: spacing.md },
  chartCard: { backgroundColor: colors.white, borderRadius: 16, padding: spacing.base, borderWidth: 1, borderColor: '#E8F0F8', marginBottom: spacing.base },
  rawToggle: { padding: spacing.md, alignItems: 'center' },
  exportBtn: { flex: 1, height: 44, borderRadius: 16, borderWidth: 1.5, borderColor: colors.deepNavy, justifyContent: 'center', alignItems: 'center' },
  shareBtn: { flex: 1, height: 44, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
});
