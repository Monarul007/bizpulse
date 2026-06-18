import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Dimensions } from 'react-native';
import { colors, spacing } from '../types/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const steps = [
  { title: 'Your live revenue', body: 'This updates every 60 seconds with real data from your system.', highlight: 'hero' },
  { title: 'AI Alerts', body: 'Smart notifications about churn, stock, and revenue anomalies.', highlight: 'alerts' },
  { title: 'Quick glance metrics', body: 'Orders, AOV, delivery rate — your key numbers at a glance.', highlight: 'metrics' },
  { title: 'Smart navigation', body: 'Switch between Sales, Inventory, Customers, and More tabs.', highlight: 'tabs' },
  { title: 'Ask AI anything', body: 'Type any question about your business and get instant answers.', highlight: 'ai' },
];

interface TourOverlayProps {
  visible: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

export default function TourOverlay({ visible, onComplete, onSkip }: TourOverlayProps) {
  const [step, setStep] = useState(0);
  const current = steps[step];

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else onComplete();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.skipCorner} onPress={onSkip}>
          <Text style={styles.skipCornerText}>Skip tour</Text>
        </TouchableOpacity>
        <View style={styles.tooltip}>
          <View style={styles.tooltipArrow} />
          <Text style={styles.tooltipTitle}>{current.title}</Text>
          <Text style={styles.tooltipBody}>{current.body}</Text>
          <View style={styles.tooltipFooter}>
            <TouchableOpacity onPress={onSkip}><Text style={styles.skipBtn}>Skip tour</Text></TouchableOpacity>
            <Text style={styles.counter}>{step + 1} of {steps.length}</Text>
            <TouchableOpacity onPress={handleNext}><Text style={styles.nextBtn}>{step < steps.length - 1 ? 'Next →' : 'Done'}</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(10,37,64,0.6)', justifyContent: 'center', alignItems: 'center' },
  skipCorner: { position: 'absolute', bottom: 100, right: spacing.lg, backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 20, paddingHorizontal: spacing.md, height: 32, justifyContent: 'center' },
  skipCornerText: { fontSize: 12, color: colors.deepNavy },
  tooltip: { backgroundColor: colors.white, borderRadius: 20, width: SCREEN_WIDTH * 0.8, padding: spacing.base, alignItems: 'center' },
  tooltipArrow: { width: 0, height: 0, borderLeftWidth: 10, borderRightWidth: 10, borderBottomWidth: 8, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: colors.white, position: 'absolute', top: -8 },
  tooltipTitle: { fontSize: 15, fontWeight: '700', color: colors.deepNavy, marginBottom: spacing.xs },
  tooltipBody: { fontSize: 13, color: colors.textSecondary, textAlign: 'center', lineHeight: 20, marginBottom: spacing.base },
  tooltipFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' },
  skipBtn: { fontSize: 13, color: colors.textSecondary },
  counter: { fontSize: 12, color: colors.textSecondary },
  nextBtn: { fontSize: 13, fontWeight: '700', color: colors.primary },
});
