import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, spacing } from '../../types/theme';

export default function AiIntro() {
  return (
    <LinearGradient colors={gradients.bg} style={styles.container}>
      <View style={styles.top}><Text style={{ fontSize: 60 }}>💬</Text></View>
      <Text style={styles.headline}>Ask anything.{'\n'}Get answers instantly.</Text>
      <Text style={styles.body}>
        Type a question in plain language. BizPulse queries your live data and answers in seconds.
      </Text>
      <View style={styles.bottom}>
        <View style={styles.dots}>
          <View style={styles.dot} /><View style={[styles.dot, styles.active]} /><View style={styles.dot} />
        </View>
        <TouchableOpacity onPress={() => router.push('/(onboarding)/zero-disruption')}>
          <LinearGradient colors={gradients.ai} style={styles.button}>
            <Text style={styles.btnText}>See How It Works</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(auth)')}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  top: { flex: 0.5, justifyContent: 'center', alignItems: 'center' },
  headline: { fontSize: 28, fontWeight: '700', color: colors.deepNavy, textAlign: 'center', lineHeight: 36 },
  body: { fontSize: 15, color: colors.textSecondary, textAlign: 'center', maxWidth: 300, alignSelf: 'center', marginTop: spacing.sm, lineHeight: 22 },
  bottom: { position: 'absolute', bottom: 60, left: 0, right: 0, alignItems: 'center' },
  dots: { flexDirection: 'row', gap: 6, marginBottom: spacing.xl },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#C5D9EA' },
  active: { backgroundColor: colors.deepNavy },
  button: { height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center', paddingHorizontal: spacing.xl * 2, marginBottom: spacing.base },
  btnText: { color: colors.white, fontSize: 16, fontWeight: '700' },
  skip: { color: 'rgba(10,37,64,0.5)', fontSize: 13 },
});
