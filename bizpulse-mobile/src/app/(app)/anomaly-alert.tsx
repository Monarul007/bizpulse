import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, spacing } from '../../types/theme';

export default function AnomalyAlert() {
  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <View style={styles.iconCircle}>
          <Text style={styles.exclamation}>!</Text>
        </View>
        <Text style={styles.title}>Revenue Alert</Text>
        <Text style={styles.message}>Sales dropped 42% in the last 2 hours</Text>
        <View style={styles.contextBox}>
          <Text style={styles.contextMain}>⬇ ৳45,200 below 2-hour average</Text>
          <Text style={styles.contextSub}>Expected: ৳1,08,000 · Actual: ৳62,800</Text>
        </View>
        <Text style={styles.aiLabel}>✦ POSSIBLE CAUSES — AI ANALYSIS</Text>
        {[
          'Website may be experiencing issues',
          'Courier delays reported in your area',
          'Check if a promo code expired',
        ].map((cause, i) => (
          <Text key={i} style={styles.cause}>• {cause}</Text>
        ))}
        <TouchableOpacity style={styles.investigateBtn}>
          <LinearGradient colors={gradients.ai} style={styles.investigateGradient}>
            <Text style={styles.investigateText}>Investigate Now</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.back()} style={styles.dismissBtn}>
          <Text style={styles.dismissText}>Dismiss</Text>
        </TouchableOpacity>
        <Text style={styles.timestamp}>Detected at 2:34 PM today</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(10,37,64,0.8)', justifyContent: 'center', alignItems: 'center', padding: spacing.lg },
  card: { backgroundColor: colors.white, borderRadius: 24, width: '100%', maxWidth: 360, padding: spacing.lg },
  iconCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: colors.danger, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' },
  exclamation: { color: colors.white, fontSize: 28, fontWeight: '700' },
  title: { color: colors.danger, fontSize: 20, fontWeight: '700', textAlign: 'center', marginTop: spacing.md },
  message: { color: colors.deepNavy, fontSize: 16, fontWeight: '700', textAlign: 'center', marginVertical: spacing.sm },
  contextBox: { backgroundColor: '#FFF0F0', borderRadius: 8, padding: spacing.md, marginBottom: spacing.md },
  contextMain: { color: colors.danger, fontSize: 14, fontWeight: '700' },
  contextSub: { color: 'rgba(10,37,64,0.5)', fontSize: 12, marginTop: 4 },
  aiLabel: { color: colors.textSecondary, fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, marginBottom: spacing.sm },
  cause: { color: colors.deepNavy, fontSize: 14, marginBottom: 6, marginLeft: spacing.sm },
  investigateBtn: { marginTop: spacing.lg },
  investigateGradient: { height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  investigateText: { color: colors.white, fontSize: 15, fontWeight: '700' },
  dismissBtn: { height: 44, justifyContent: 'center', alignItems: 'center', marginTop: spacing.sm, borderWidth: 1.5, borderColor: colors.deepNavy, borderRadius: 16 },
  dismissText: { color: colors.deepNavy, fontSize: 15 },
  timestamp: { color: 'rgba(10,37,64,0.4)', fontSize: 12, textAlign: 'center', marginTop: spacing.md },
});
