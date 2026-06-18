import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, spacing } from '../../types/theme';

const modules = [
  { icon: '🤖', title: 'AI Co-Pilot', route: 'ai-chat', gradient: true as const },
  { icon: '💰', title: 'Financials', route: 'financials', color: colors.deepNavy, bg: '#E8F4FD' },
  { icon: '💵', title: 'Cash Flow', route: 'cashflow', color: colors.deepNavy, bg: '#F0FBF7' },
  { icon: '👥', title: 'Team', route: 'team', color: colors.deepNavy, bg: '#F0EEFF' },
  { icon: '🔔', title: 'Notifications', route: 'notifications', color: colors.deepNavy, bg: '#FFF0F0' },
  { icon: '⚙️', title: 'Settings', route: 'settings', color: colors.deepNavy, bg: '#F8FBFF' },
  { icon: '🔍', title: 'Search', route: 'search', color: colors.deepNavy, bg: '#FFF8E0' },
  { icon: '📄', title: 'Reports', route: 'report', color: colors.deepNavy, bg: '#E0FBF4' },
];

export default function More() {
  return (
    <LinearGradient colors={gradients.bg} style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: spacing.lg, paddingTop: 60, paddingBottom: spacing.base }}>
        <Text style={{ fontSize: 18, fontWeight: '700', color: colors.deepNavy }}>More</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: 100 }}>
        <Text style={styles.sectionHeader}>ALL MODULES</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md }}>
          {modules.map((m, i) => (
            <TouchableOpacity key={i} style={{ width: '46%', height: 88 }} onPress={() => router.push(`/(app)/${m.route}`)}>
              {m.gradient ? (
                <LinearGradient colors={gradients.ai} style={styles.moduleCard}>
                  <Text style={{ fontSize: 28 }}>{m.icon}</Text>
                  <Text style={{ color: colors.white, fontSize: 13, fontWeight: '700', marginTop: spacing.xs }}>{m.title}</Text>
                </LinearGradient>
              ) : (
                <View style={[styles.moduleCard, { backgroundColor: m.bg || colors.white }]}>
                  <Text style={{ fontSize: 28 }}>{m.icon}</Text>
                  <Text style={{ color: m.color || colors.deepNavy, fontSize: 13, fontWeight: '700', marginTop: spacing.xs }}>{m.title}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  sectionHeader: { fontSize: 11, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 1, marginBottom: spacing.md },
  moduleCard: { flex: 1, borderRadius: 16, padding: spacing.base, justifyContent: 'center', overflow: 'hidden' },
});
