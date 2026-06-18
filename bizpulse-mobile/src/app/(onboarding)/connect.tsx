import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, spacing } from '../../types/theme';

export default function Connect() {
  const [form, setForm] = useState({ host: '', port: '3306', database: '', username: '', password: '' });
  return (
    <LinearGradient colors={['#F8FBFF', '#EDF5FF']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <TouchableOpacity onPress={() => router.back()} style={styles.back}>
          <Text style={styles.backText}>{'< Back'}</Text>
        </TouchableOpacity>
        <View style={styles.iconWrap}><Text style={styles.icon}>🗄️</Text></View>
        <Text style={styles.headline}>Connect to your MySQL database</Text>
        <Text style={styles.subtext}>Your credentials are encrypted.</Text>
        {(['host', 'port', 'database', 'username', 'password'] as const).map(f => (
          <View key={f} style={styles.fieldCard}>
            <Text style={styles.label}>{f}</Text>
            <TextInput
              style={styles.input}
              value={form[f]}
              onChangeText={v => setForm({ ...form, [f]: v })}
              secureTextEntry={f === 'password'}
              keyboardType={f === 'port' ? 'number-pad' : 'default'}
            />
          </View>
        ))}
        <TouchableOpacity style={styles.testBtn}>
          <Text style={styles.testBtnText}>Test Connection</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(onboarding)/sync-progress')}>
          <LinearGradient colors={gradients.ai} style={styles.connectBtn}>
            <Text style={styles.connectBtnText}>Connect & Start Syncing</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(auth)')}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: spacing.lg, paddingTop: 80 },
  back: { marginBottom: spacing.base },
  backText: { color: colors.primary, fontSize: 16, fontWeight: '600' },
  iconWrap: { alignItems: 'center', marginBottom: spacing.base },
  icon: { fontSize: 64 },
  headline: { fontSize: 22, fontWeight: '700', color: colors.deepNavy, textAlign: 'center' },
  subtext: { fontSize: 14, color: colors.textSecondary, textAlign: 'center', marginVertical: spacing.sm },
  fieldCard: {
    backgroundColor: colors.white, borderRadius: 16, padding: spacing.base,
    marginBottom: spacing.md, borderWidth: 1, borderColor: '#DCE8F5',
  },
  label: {
    fontSize: 12, fontWeight: '500', color: '#6B8FAF', textTransform: 'uppercase',
    letterSpacing: 0.5, marginBottom: spacing.xs,
  },
  input: { height: 48, fontSize: 16, color: colors.deepNavy },
  testBtn: {
    height: 56, borderRadius: 16, borderWidth: 1.5, borderColor: colors.deepNavy,
    justifyContent: 'center', alignItems: 'center', marginBottom: spacing.md,
  },
  testBtnText: { color: colors.deepNavy, fontWeight: '600', fontSize: 16 },
  connectBtn: { height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  connectBtnText: { color: colors.white, fontWeight: '700', fontSize: 16 },
  skip: { color: 'rgba(10,37,64,0.5)', fontSize: 13, textAlign: 'center', marginTop: spacing.md },
});
