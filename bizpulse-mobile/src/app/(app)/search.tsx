import { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, spacing } from '../../types/theme';

const recentSearches = ['CeraVe moisturizer stock', 'Yesterday revenue', 'Top customers March', 'Churn risk analysis'];
const quickActions = [
  { icon: '🤖', title: 'Ask AI anything', gradient: true, left: colors.aiPurple, right: colors.primary },
  { icon: '📊', title: "Today's sales", bg: '#E8F4FD' },
  { icon: '👥', title: 'Check churn risks', bg: '#FFF0F0', iconColor: colors.danger },
  { icon: '📦', title: 'Inventory alerts', bg: '#FFF8E0', iconColor: colors.warning },
];

export default function Search() {
  const [query, setQuery] = useState('');

  return (
    <LinearGradient colors={gradients.bg} style={{ flex: 1 }}>
      <View style={{ paddingTop: 60, paddingHorizontal: spacing.lg }}>
        <View style={styles.searchBar}>
          <Text style={{ fontSize: 16, color: colors.textTertiary }}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search products, customers, reports..."
            placeholderTextColor={colors.textTertiary}
            value={query}
            onChangeText={setQuery}
            autoFocus
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Text style={{ fontSize: 16, color: colors.textTertiary }}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: 100 }}>
        {query.length === 0 ? (
          <>
            <Text style={styles.sectionLabel}>RECENT SEARCHES</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.xl }}>
              {recentSearches.map((s, i) => (
                <TouchableOpacity key={i} style={styles.recentChip} onPress={() => setQuery(s)}>
                  <Text style={{ color: colors.textTertiary, fontSize: 12 }}>🕐</Text>
                  <Text style={{ fontSize: 13, color: colors.deepNavy, marginLeft: spacing.xs }}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionLabel}>QUICK ACTIONS</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md }}>
              {quickActions.map((qa, i) => (
                <TouchableOpacity key={i} style={[styles.qaCard, qa.gradient ? {} : { backgroundColor: qa.bg }]}>
                  {qa.gradient ? (
                    <LinearGradient colors={[qa.left!, qa.right!]} style={StyleSheet.absoluteFill} borderRadius={12} />
                  ) : null}
                  <Text style={{ fontSize: 24, zIndex: 1 }}>{qa.icon}</Text>
                  <Text style={[styles.qaTitle, qa.gradient && { color: colors.white }]}>{qa.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          <>
            <Text style={styles.sectionLabel}>PRODUCTS</Text>
            <TouchableOpacity style={styles.resultRow}>
              <View style={styles.resultImg} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '700', color: colors.deepNavy }}>CeraVe Moisturizer 250ml</Text>
                <Text style={{ fontSize: 12, color: colors.textTertiary }}>SKU-0024</Text>
              </View>
              <Text style={{ color: colors.textTertiary, fontSize: 16 }}>›</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.resultRow}>
              <View style={styles.resultImg} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '700', color: colors.deepNavy }}>Somebymi Toner 150ml</Text>
                <Text style={{ fontSize: 12, color: colors.textTertiary }}>SKU-0018</Text>
              </View>
              <Text style={{ color: colors.textTertiary, fontSize: 16 }}>›</Text>
            </TouchableOpacity>

            <Text style={[styles.sectionLabel, { marginTop: spacing.base }]}>CUSTOMERS</Text>
            <TouchableOpacity style={styles.resultRow}>
              <LinearGradient colors={gradients.ai} style={styles.resultAvatar}><Text style={{ color: colors.white, fontSize: 12, fontWeight: '700' }}>FB</Text></LinearGradient>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '700', color: colors.deepNavy }}>Farida Begum</Text>
                <Text style={{ fontSize: 12, color: colors.textSecondary }}>Churn risk</Text>
              </View>
              <Text style={{ color: colors.textTertiary, fontSize: 16 }}>›</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: 12, borderWidth: 1.5, borderColor: colors.primary, paddingHorizontal: spacing.md, height: 44 },
  searchInput: { flex: 1, fontSize: 15, color: colors.deepNavy, marginLeft: spacing.sm },
  sectionLabel: { fontSize: 11, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 1, marginBottom: spacing.sm },
  recentChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: 12, borderWidth: 1, borderColor: '#E8F0F8', paddingHorizontal: spacing.md, height: 32 },
  qaCard: { width: '46%', height: 72, borderRadius: 12, padding: spacing.md, justifyContent: 'center', overflow: 'hidden' },
  qaTitle: { fontSize: 13, fontWeight: '700', color: colors.deepNavy, marginTop: spacing.xs, zIndex: 1 },
  resultRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: 12, padding: spacing.md, marginBottom: spacing.xs },
  resultImg: { width: 40, height: 40, borderRadius: 8, backgroundColor: '#F0F5FA', marginRight: spacing.md },
  resultAvatar: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: spacing.md },
});
