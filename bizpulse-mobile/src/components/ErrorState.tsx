import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing } from '../types/theme';

interface ErrorStateProps {
  cachedRevenue?: string;
  syncedAgo?: string;
  onRetry?: () => void;
  onWorkOffline?: () => void;
}

export default function ErrorState({ cachedRevenue, syncedAgo, onRetry, onWorkOffline }: ErrorStateProps) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={styles.banner}>
        <Text style={{ color: colors.warning, fontSize: 13, fontWeight: '700' }}>⚠ Showing cached data — live updates paused</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.illustration}>🔌</Text>
        <Text style={styles.headline}>Connection lost</Text>
        <Text style={styles.body}>Unable to reach your database. Your last synced data is still available.</Text>
        {(cachedRevenue || syncedAgo) && (
          <View style={styles.cacheCard}>
            <Text style={{ fontSize: 11, color: colors.textSecondary }}>🕐</Text>
            {cachedRevenue && <Text style={styles.cacheAmount}>{cachedRevenue}</Text>}
            <Text style={styles.cacheLabel}>Last synced data</Text>
            {syncedAgo && <Text style={styles.cacheTime}>Synced {syncedAgo}</Text>}
          </View>
        )}
        {onRetry && (
          <TouchableOpacity style={styles.retryBtn} onPress={onRetry}>
            <Text style={styles.retryBtnText}>Retry Connection</Text>
          </TouchableOpacity>
        )}
        {onWorkOffline && (
          <TouchableOpacity onPress={onWorkOffline}>
            <Text style={styles.offlineLink}>Work offline</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: { backgroundColor: '#FFF8E0', height: 40, justifyContent: 'center', alignItems: 'center', paddingHorizontal: spacing.base },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: spacing.lg },
  illustration: { fontSize: 60, marginBottom: spacing.xl },
  headline: { fontSize: 20, fontWeight: '700', color: colors.deepNavy, marginBottom: spacing.sm },
  body: { fontSize: 14, color: colors.textSecondary, textAlign: 'center', maxWidth: 280, lineHeight: 22, marginBottom: spacing.xl },
  cacheCard: { backgroundColor: '#F8FBFF', borderRadius: 12, padding: spacing.md, alignItems: 'center', marginBottom: spacing.xl, borderWidth: 1, borderColor: '#E8F0F8' },
  cacheAmount: { fontSize: 22, fontWeight: '700', color: colors.deepNavy, marginTop: spacing.xs },
  cacheLabel: { fontSize: 11, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 2 },
  cacheTime: { fontSize: 12, color: colors.textTertiary, marginTop: spacing.xs },
  retryBtn: { width: '100%', height: 48, borderRadius: 16, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginBottom: spacing.md },
  retryBtnText: { color: colors.white, fontWeight: '700', fontSize: 14 },
  offlineLink: { color: colors.primary, fontSize: 13 },
});
