import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, spacing } from '../../types/theme';

const notifications = [
  { id: 1, type: 'churn', icon: '🔴', title: 'Churn risk detected', body: "3 VIP customers haven't ordered in 45+ days", time: '2 hours ago', unread: true },
  { id: 2, type: 'ai', icon: '✦', title: 'AI Weekly Insight', body: 'Your top product is running low. Reorder suggestion ready.', time: '5 hours ago', unread: true },
  { id: 3, type: 'report', icon: '📄', title: 'Monthly Report Ready', body: 'March 2026 financial digest is ready to view.', time: 'Yesterday', unread: false },
  { id: 4, type: 'revenue', icon: '📈', title: 'Revenue milestone', body: 'You crossed ৳40L in monthly revenue for the first time!', time: 'Yesterday', unread: false },
  { id: 5, type: 'stock', icon: '📦', title: 'Low stock alert', body: 'CeraVe Moisturizer has only 12 units left.', time: '2 days ago', unread: false },
];

const borderColors: Record<string, string> = { churn: colors.danger, ai: colors.aiPurple, report: colors.success, revenue: colors.primary, stock: colors.warning };
const iconBg: Record<string, string> = { churn: '#FFF0F0', ai: '#F0EEFF', report: '#E0FBF4', revenue: '#E8F4FD', stock: '#FFF8E0' };

export default function Notifications() {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Alerts', 'AI Insights', 'Reports'];
  const filtered = activeTab === 'All' ? notifications
    : activeTab === 'Alerts' ? notifications.filter(n => n.type === 'churn' || n.type === 'stock')
    : activeTab === 'AI Insights' ? notifications.filter(n => n.type === 'ai')
    : notifications.filter(n => n.type === 'report');

  return (
    <LinearGradient colors={gradients.bg} style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: spacing.lg, paddingTop: 60, paddingBottom: spacing.base }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => router.back()}><Text style={{ fontSize: 24, color: colors.deepNavy }}>←</Text></TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: '700', color: colors.deepNavy }}>Notifications</Text>
          <TouchableOpacity><Text style={{ color: colors.primary, fontSize: 13 }}>Mark all read</Text></TouchableOpacity>
        </View>
      </View>
      <View style={{ flexDirection: 'row', gap: 8, paddingHorizontal: spacing.lg, marginBottom: spacing.base }}>
        {tabs.map(t => (
          <TouchableOpacity key={t} style={[styles.tab, activeTab === t && styles.tabActive]} onPress={() => setActiveTab(t)}>
            <Text style={[styles.tabText, activeTab === t && styles.tabActiveText]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: 100 }}>
        <Text style={styles.sectionHeader}>TODAY</Text>
        {filtered.slice(0, 3).map(n => (
          <TouchableOpacity key={n.id} style={[styles.card, n.unread && styles.cardUnread, { borderLeftColor: borderColors[n.type] }]}>
            <View style={[styles.iconCircle, { backgroundColor: iconBg[n.type] }]}>
              <Text style={{ fontSize: 14 }}>{n.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{n.title}</Text>
              <Text style={styles.cardBody} numberOfLines={2}>{n.body}</Text>
            </View>
            <Text style={styles.cardTime}>{n.time}</Text>
            {n.unread && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        ))}
        <Text style={styles.sectionHeader}>YESTERDAY</Text>
        {filtered.slice(3).map(n => (
          <TouchableOpacity key={n.id} style={[styles.card, n.unread && styles.cardUnread, { borderLeftColor: borderColors[n.type] }]}>
            <View style={[styles.iconCircle, { backgroundColor: iconBg[n.type] }]}>
              <Text style={{ fontSize: 14 }}>{n.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{n.title}</Text>
              <Text style={styles.cardBody} numberOfLines={2}>{n.body}</Text>
            </View>
            <Text style={styles.cardTime}>{n.time}</Text>
            {n.unread && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  tab: { paddingHorizontal: spacing.md, height: 36, borderRadius: 8, justifyContent: 'center', backgroundColor: colors.white },
  tabActive: { backgroundColor: colors.primary },
  tabText: { fontSize: 13, color: colors.textSecondary },
  tabActiveText: { color: colors.white, fontWeight: '600' },
  sectionHeader: { fontSize: 11, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 1, marginBottom: spacing.md, marginTop: spacing.base },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: 16, padding: spacing.md, borderLeftWidth: 4, marginBottom: spacing.sm },
  cardUnread: { backgroundColor: '#F5F9FF' },
  iconCircle: { width: 32, height: 32, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: spacing.md },
  cardTitle: { fontWeight: '700', fontSize: 14, color: colors.deepNavy },
  cardBody: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  cardTime: { fontSize: 12, color: colors.textTertiary, marginLeft: spacing.sm },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary, marginLeft: spacing.xs },
});
