import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, spacing } from '../../types/theme';

export default function PinEntry() {
  const [pin, setPin] = useState('');
  const PIN_LENGTH = 6;

  const handlePress = (digit: string) => {
    if (pin.length < PIN_LENGTH) {
      const next = pin + digit;
      setPin(next);
      if (next.length === PIN_LENGTH) {
        setTimeout(() => router.push('/(app)'), 300);
      }
    }
  };
  const handleBackspace = () => setPin((p) => p.slice(0, -1));

  return (
    <LinearGradient colors={gradients.darkNav} style={styles.container}>
      <View style={styles.avatar}>
        <LinearGradient colors={gradients.ai} style={styles.avatarCircle}>
          <Text style={styles.initials}>RU</Text>
        </LinearGradient>
        <Text style={styles.name}>Rahim Uddin</Text>
        <Text style={styles.business}>eMartway Skincare</Text>
      </View>
      <View style={styles.dots}>
        {Array.from({ length: PIN_LENGTH }).map((_, i) => (
          <View key={i} style={[styles.dot, pin.length > i && styles.dotFilled]} />
        ))}
      </View>
      <Text style={styles.subtext}>Enter your 6-digit PIN</Text>
      <View style={styles.keypad}>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0'].map((digit, i) => (
          <TouchableOpacity
            key={i}
            style={styles.key}
            onPress={() => digit ? handlePress(digit) : null}
            disabled={!digit}
          >
            {digit ? (
              <Text style={styles.keyText}>{digit}</Text>
            ) : i === 9 ? null : null}
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.backKey} onPress={handleBackspace}>
        <Text style={styles.keyText}>⌫</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 100 },
  avatar: { alignItems: 'center', marginBottom: spacing.xl },
  avatarCircle: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  initials: { color: colors.white, fontSize: 16, fontWeight: '700' },
  name: { color: colors.white, fontSize: 16, fontWeight: '700', marginTop: spacing.sm },
  business: { color: 'rgba(255,255,255,0.5)', fontSize: 13 },
  dots: { flexDirection: 'row', gap: 12, marginBottom: spacing.md },
  dot: { width: 16, height: 16, borderRadius: 8, borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)' },
  dotFilled: { backgroundColor: colors.white, borderColor: colors.white },
  subtext: { color: 'rgba(255,255,255,0.6)', fontSize: 14, marginBottom: 40 },
  keypad: {
    flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 16,
    maxWidth: 280,
  },
  key: { width: 72, height: 72, borderRadius: 36, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  keyText: { color: colors.white, fontSize: 24, fontWeight: '700' },
  backKey: { position: 'absolute', bottom: 120, right: 60, width: 72, height: 72, borderRadius: 36, justifyContent: 'center', alignItems: 'center' },
});
