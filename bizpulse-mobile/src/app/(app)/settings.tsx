import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, spacing } from '../../types/theme';

type SettingRow = { icon: string; title: string; subtitle?: string; right?: 'chevron' | 'toggle'; value?: boolean };

const sections: { header: string; rows: SettingRow[] }[] = [
  {
    header: 'CONNECTION',
    rows: [
      { icon: '🗄️', title: 'Database Connection', subtitle: 'Connected', right: 'chevron' },
      { icon: '🔄', title: 'Sync Frequency', subtitle: '5 minutes', right: 'chevron' },
      { icon: '⚡', title: 'Manual Sync Now', subtitle: undefined, right: 'chevron' },
    ],
  },
  {
    header: 'AI CO-PILOT',
    rows: [
      { icon: '🤖', title: 'AI Provider', subtitle: 'Gemini 1.5 Flash', right: 'chevron' },
      { icon: '🔑', title: 'API Key', subtitle: '••••••••3f9a', right: 'chevron' },
      { icon: '🌐', title: 'AI Language', subtitle: 'Bengali + English', right: 'chevron' },
    ],
  },
  {
    header: 'NOTIFICATIONS',
    rows: [
      { icon: '📊', title: 'Revenue Alerts', right: 'toggle', value: true },
      { icon: '👥', title: 'Churn Alerts', right: 'toggle', value: true },
      { icon: '📦', title: 'Stock Alerts', right: 'toggle', value: true },
      { icon: '☀️', title: 'Daily Briefing', right: 'toggle', value: true },
    ],
  },
  {
    header: 'SECURITY',
    rows: [
      { icon: '🔒', title: 'Biometric Login', right: 'toggle', value: true },
      { icon: '🔢', title: 'Change PIN', right: 'chevron' },
      { icon: '💻', title: 'Active Sessions', subtitle: '2 devices', right: 'chevron' },
    ],
  },
];

export default function Settings() {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    'Revenue Alerts': true,
    'Churn Alerts': true,
    'Stock Alerts': true,
    'Daily Briefing': true,
    'Biometric Login': true,
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#F8FBFF' }}>
      <View style={{ paddingHorizontal: spacing.lg, paddingTop: 60, paddingBottom: spacing.base, backgroundColor: colors.white }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => router.back()}><Text style={{ fontSize: 24, color: colors.deepNavy }}>←</Text></TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: '700', color: colors.deepNavy, marginLeft: spacing.base }}>Settings</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <LinearGradient colors={['#E8F4FD', '#DCF0FF']} style={styles.profileCard}>
          <LinearGradient colors={gradients.ai} style={styles.avatar}>
            <Text style={{ color: colors.white, fontWeight: '700', fontSize: 22 }}>RU</Text>
          </LinearGradient>
          <Text style={styles.profileName}>Rahim Uddin</Text>
          <Text style={styles.profileBiz}>eMartway Skincare</Text>
          <View style={styles.planBadge}><Text style={{ color: colors.primary, fontSize: 12, fontWeight: '600' }}>Growth Plan</Text></View>
          <TouchableOpacity><Text style={{ color: colors.primary, fontSize: 13, marginTop: spacing.sm }}>Edit Profile</Text></TouchableOpacity>
        </LinearGradient>

        {sections.map((section, si) => (
          <View key={si} style={{ marginTop: spacing.xl }}>
            <Text style={styles.sectionLabel}>{section.header}</Text>
            <View style={styles.sectionCard}>
              {section.rows.map((row, ri) => (
                <TouchableOpacity key={ri} style={styles.settingRow}>
                  <View style={styles.settingIconBox}>
                    <Text style={{ fontSize: 18 }}>{row.icon}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.settingTitle}>{row.title}</Text>
                    {row.subtitle && <Text style={styles.settingSub}>{row.subtitle}</Text>}
                  </View>
                  {row.right === 'chevron' && <Text style={{ color: colors.textTertiary, fontSize: 16 }}>›</Text>}
                  {row.right === 'toggle' && row.title && (
                    <Switch
                      value={toggles[row.title]}
                      onValueChange={v => setToggles(prev => ({ ...prev, [row.title!]: v }))}
                      trackColor={{ false: '#C5D9EA', true: colors.primary }}
                      thumbColor={colors.white}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.signOut}>
          <Text style={{ color: colors.danger, fontSize: 14, fontWeight: '600' }}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  profileCard: { margin: spacing.lg, borderRadius: 16, padding: spacing.lg, alignItems: 'center' },
  avatar: { width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center' },
  profileName: { fontSize: 18, fontWeight: '700', color: colors.deepNavy, marginTop: spacing.sm },
  profileBiz: { fontSize: 14, color: colors.textSecondary, marginTop: 2 },
  planBadge: { backgroundColor: '#E8F4FD', borderRadius: 12, paddingHorizontal: spacing.md, paddingVertical: 2, marginTop: spacing.sm },
  sectionLabel: { fontSize: 12, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5, paddingHorizontal: spacing.lg, marginBottom: spacing.sm },
  sectionCard: { backgroundColor: colors.white, borderRadius: 16, marginHorizontal: spacing.lg, overflow: 'hidden' },
  settingRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, height: 56, borderBottomWidth: 1, borderBottomColor: '#F8FAFC' },
  settingIconBox: { width: 32, height: 32, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: spacing.md },
  settingTitle: { fontSize: 14, fontWeight: '700', color: colors.deepNavy },
  settingSub: { fontSize: 13, color: colors.textSecondary, marginTop: 1 },
  signOut: { marginHorizontal: spacing.lg, marginTop: spacing.xl, height: 56, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.white, borderRadius: 16 },
});
