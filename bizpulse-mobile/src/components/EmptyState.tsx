import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing } from '../types/theme';

interface EmptyStateProps {
  module?: string;
  lastSync?: string;
  onRefresh?: () => void;
  onChangeDate?: () => void;
}

export default function EmptyState({ module = 'data', lastSync, onRefresh, onChangeDate }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.illustration}>📊🔍</Text>
      <Text style={styles.headline}>No data yet</Text>
      <Text style={styles.body}>
        Your {module} is still syncing, or there are no records for this period. Check back in a few minutes.
      </Text>
      {lastSync && <Text style={styles.syncTime}>Last sync attempt: {lastSync}</Text>}
      {onRefresh && (
        <TouchableOpacity style={styles.primaryBtn} onPress={onRefresh}>
          <Text style={styles.primaryBtnText}>Refresh Now</Text>
        </TouchableOpacity>
      )}
      {onChangeDate && (
        <TouchableOpacity style={styles.outlineBtn} onPress={onChangeDate}>
          <Text style={styles.outlineBtnText}>Change Date Range</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity><Text style={styles.helpLink}>Need help?</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: spacing.lg, paddingTop: 60 },
  illustration: { fontSize: 60, marginBottom: spacing.xl },
  headline: { fontSize: 20, fontWeight: '700', color: colors.deepNavy, marginBottom: spacing.sm },
  body: { fontSize: 14, color: colors.textSecondary, textAlign: 'center', maxWidth: 280, lineHeight: 22, marginBottom: spacing.sm },
  syncTime: { fontSize: 12, color: colors.textTertiary, marginBottom: spacing.xl },
  primaryBtn: { width: '100%', height: 48, borderRadius: 16, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginBottom: spacing.md },
  primaryBtnText: { color: colors.white, fontWeight: '700', fontSize: 14 },
  outlineBtn: { width: '100%', height: 44, borderRadius: 16, borderWidth: 1.5, borderColor: colors.deepNavy, justifyContent: 'center', alignItems: 'center', marginBottom: spacing.md },
  outlineBtnText: { color: colors.deepNavy, fontWeight: '600', fontSize: 14 },
  helpLink: { color: colors.primary, fontSize: 13, marginTop: spacing.sm },
});
