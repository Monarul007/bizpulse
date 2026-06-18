import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, spacing } from '../../types/theme';

export default function ZeroDisruption() {
  return (
    <LinearGradient colors={gradients.bg} style={styles.container}>
      <View style={styles.top}>
        <Text style={{ fontSize: 28 }}>🔒</Text>
        <View style={{ flexDirection: 'row', gap: 20, marginTop: spacing.base }}>
          <View style={{ width: 100, height: 120, backgroundColor: '#C5D9EA', borderRadius: 12, opacity: 0.5 }} />
          <Text style={{ fontSize: 24, color: colors.primary, alignSelf: 'center' }}>→</Text>
          <View style={{ width: 100, height: 120, backgroundColor: colors.primary, borderRadius: 12 }} />
        </View>
      </View>
      <Text style={styles.headline}>Zero disruption.{'\n'}Plug in and go.</Text>
      <Text style={styles.body}>
        BizPulse reads your database with read-only access. Nothing changes in your current system.
      </Text>
      <View style={styles.bottom}>
        <View style={styles.dots}>
          <View style={styles.dot} /><View style={styles.dot} /><View style={[styles.dot, styles.active]} />
        </View>
        <TouchableOpacity onPress={() => router.push('/(onboarding)/connect')}>
          <LinearGradient colors={gradients.ai} style={styles.button}>
            <Text style={styles.btnText}>Connect My Business</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.security}>🔒 Read-only access. Your data stays yours.</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  top: { flex: 0.5, justifyContent: 'center', alignItems: 'center' },
  headline: { fontSize: 28, fontWeight: '700', color: colors.deepNavy, textAlign: 'center', lineHeight: 36 },
  body: { fontSize: 15, color: colors.textSecondary, textAlign: 'center', maxWidth: 300, alignSelf: 'center', marginTop: spacing.sm },
  bottom: { position: 'absolute', bottom: 60, left: 0, right: 0, alignItems: 'center' },
  dots: { flexDirection: 'row', gap: 6, marginBottom: spacing.xl },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#C5D9EA' },
  active: { backgroundColor: colors.deepNavy },
  button: { height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center', paddingHorizontal: spacing.xl * 2, marginBottom: spacing.md },
  btnText: { color: colors.white, fontSize: 16, fontWeight: '700' },
  security: { color: 'rgba(10,37,64,0.5)', fontSize: 12 },
});
