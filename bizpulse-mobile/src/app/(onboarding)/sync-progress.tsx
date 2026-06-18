import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing } from '../../types/theme';
import { scheduleDailyBriefing } from '../../lib/notifications';

export default function SyncProgress() {
  const [simulated, setSimulated] = useState(0);

  useEffect(() => {
    if (simulated >= 100) return;
    const t = setTimeout(() => setSimulated(s => Math.min(s + 15, 100)), 800);
    return () => clearTimeout(t);
  }, [simulated]);

  const isDone = simulated >= 100;

  const handleFinish = async () => {
    await scheduleDailyBriefing(7, 0);
    router.replace('/(app)');
  };

  return (
    <LinearGradient colors={['#0A2540', '#1E3A5F']} style={styles.container}>
      <View style={styles.center}>
        <View style={styles.ring}>
          <Text style={styles.pct}>{simulated}%</Text>
        </View>
        <Text style={styles.headline}>Discovering your data</Text>
        <View style={styles.steps}>
          {simulated >= 15 && <Text style={styles.done}>✓ Orders table — 12,847 records</Text>}
          {simulated >= 30 && <Text style={styles.done}>✓ Products table — 1,024 SKUs</Text>}
          {simulated >= 50 && <Text style={styles.done}>✓ Customers table — 8,392 customers</Text>}
          {simulated >= 70 && <Text style={styles.done}>✓ Sales metrics — aggregated</Text>}
          {simulated < 100 && <Text style={styles.current}>● Calculating metrics...</Text>}
        </View>
      </View>
      <View style={styles.bottomCard}>
        <Text style={styles.cardText}>
          {isDone
            ? 'Your data is synced! Your morning briefing is scheduled for 7:00 AM.'
            : 'First sync takes 2–5 minutes. You\'ll get a notification when ready.'}
        </Text>
        {isDone && (
          <TouchableOpacity onPress={handleFinish} style={styles.startBtn}>
            <Text style={styles.startBtnText}>Go to Dashboard →</Text>
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  ring: {
    width: 120, height: 120, borderRadius: 60, borderWidth: 8,
    borderColor: 'rgba(108,99,255,0.5)', justifyContent: 'center', alignItems: 'center',
    marginBottom: spacing.lg,
  },
  pct: { color: colors.white, fontSize: 28, fontWeight: '700' },
  headline: { color: colors.white, fontSize: 20, fontWeight: '700', marginBottom: spacing.xl },
  steps: { maxWidth: 280, gap: 8 },
  done: { color: colors.white, fontSize: 14 },
  current: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },
  bottomCard: {
    backgroundColor: colors.white, borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: spacing.lg, paddingBottom: 40, alignItems: 'center',
  },
  cardText: { color: 'rgba(10,37,64,0.6)', fontSize: 14, textAlign: 'center' },
  startBtn: {
    backgroundColor: colors.primary, borderRadius: 16, height: 48,
    justifyContent: 'center', alignItems: 'center', paddingHorizontal: spacing.xl,
    marginTop: spacing.md, width: '100%',
  },
  startBtnText: { color: colors.white, fontSize: 16, fontWeight: '700' },
});
