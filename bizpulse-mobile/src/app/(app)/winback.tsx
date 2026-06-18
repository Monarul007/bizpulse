import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, spacing } from '../../types/theme';

export default function WinbackComposer() {
  const [message, setMessage] = useState('Hi Farida! We\'ve missed you at eMartway. Here\'s an exclusive 15% off your next order: FARIDA15. Valid for 7 days.');

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={{ padding: spacing.lg, paddingTop: 60 }}>
        <TouchableOpacity onPress={() => router.back()}><Text style={{ color: colors.primary, fontSize: 16 }}>✕ Win-Back Message</Text></TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <View style={styles.recipientCard}>
          <LinearGradient colors={gradients.ai} style={styles.avatar}><Text style={{ color: colors.white, fontWeight: '700' }}>FB</Text></LinearGradient>
          <View style={{ marginLeft: spacing.md }}>
            <Text style={{ fontWeight: '700', color: colors.deepNavy }}>Farida Begum</Text>
            <Text style={{ fontSize: 12, color: colors.textSecondary }}>Last order: 45 days ago</Text>
          </View>
          <Text style={{ marginLeft: 'auto', fontWeight: '700', color: colors.deepNavy }}>৳1,24,300</Text>
        </View>
        <View style={styles.channelRow}>
          {['SMS', 'WhatsApp', 'Email'].map((ch, i) => (
            <TouchableOpacity key={i} style={[styles.channelTab, i === 0 && styles.channelActive]}>
              <Text style={[styles.channelText, i === 0 && styles.channelActiveText]}>{ch}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.messageCard}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm }}>
            <Text style={styles.aiLabel}>✦ AI-GENERATED MESSAGE</Text>
            <LinearGradient colors={gradients.ai} style={styles.claudeBadge}><Text style={{ color: colors.white, fontSize: 11 }}>Claude</Text></LinearGradient>
          </View>
          <TextInput
            style={styles.messageInput}
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={6}
          />
          <Text style={styles.charCount}>{message.length} / 160 characters</Text>
        </View>
        <View style={styles.offersCard}>
          <View style={styles.offerRow}>
            <Text style={styles.offerLabel}>Discount</Text>
            <View style={styles.stepper}>
              <TouchableOpacity style={styles.stepBtn}><Text>-</Text></TouchableOpacity>
              <Text style={styles.stepValue}>15%</Text>
              <TouchableOpacity style={styles.stepBtn}><Text>+</Text></TouchableOpacity>
            </View>
          </View>
          <View style={styles.offerRow}>
            <Text style={styles.offerLabel}>Validity</Text>
            <View style={styles.stepper}>
              <TouchableOpacity style={styles.stepBtn}><Text>-</Text></TouchableOpacity>
              <Text style={styles.stepValue}>7 days</Text>
              <TouchableOpacity style={styles.stepBtn}><Text>+</Text></TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.previewBtn}><Text style={{ color: colors.deepNavy, fontWeight: '600' }}>Preview Message</Text></TouchableOpacity>
        <TouchableOpacity>
          <LinearGradient colors={['#00C896', '#3B9FE8']} style={styles.sendBtn}>
            <Text style={{ color: colors.white, fontWeight: '700', fontSize: 15 }}>Send Now — Farida Begum</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  recipientCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E8F4FD', borderRadius: 12, padding: spacing.md, marginBottom: spacing.base },
  avatar: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  channelRow: { flexDirection: 'row', gap: 8, marginBottom: spacing.base },
  channelTab: { flex: 1, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F0F5FA' },
  channelActive: { backgroundColor: colors.primary },
  channelText: { fontSize: 13, color: colors.textSecondary },
  channelActiveText: { color: colors.white, fontWeight: '600' },
  messageCard: { backgroundColor: colors.white, borderRadius: 16, padding: spacing.base, borderWidth: 1, borderColor: '#E8F0F8', marginBottom: spacing.base },
  aiLabel: { fontSize: 11, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 1 },
  claudeBadge: { paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: 8 },
  messageInput: { fontSize: 15, color: colors.deepNavy, lineHeight: 24, minHeight: 100, textAlignVertical: 'top' },
  charCount: { fontSize: 12, color: 'rgba(10,37,64,0.4)', textAlign: 'right', marginTop: spacing.sm },
  offersCard: { backgroundColor: colors.white, borderRadius: 16, padding: spacing.base, borderWidth: 1, borderColor: '#E8F0F8', marginBottom: spacing.base },
  offerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: spacing.sm },
  offerLabel: { fontWeight: '700', color: colors.deepNavy, fontSize: 14 },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  stepBtn: { width: 32, height: 32, borderRadius: 16, borderWidth: 1.5, borderColor: colors.deepNavy, justifyContent: 'center', alignItems: 'center' },
  stepValue: { fontSize: 16, fontWeight: '700', color: colors.deepNavy, minWidth: 50, textAlign: 'center' },
  previewBtn: { height: 44, borderRadius: 16, borderWidth: 1.5, borderColor: colors.deepNavy, justifyContent: 'center', alignItems: 'center', marginBottom: spacing.md },
  sendBtn: { height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
});
