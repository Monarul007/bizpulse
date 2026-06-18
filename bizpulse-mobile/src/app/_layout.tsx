import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { registerPushNotifications, setupNotificationHandler } from '../lib/notifications';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60 * 1000, retry: 2, refetchOnWindowFocus: true } },
});

export default function RootLayout() {
  useEffect(() => {
    registerPushNotifications();
    return setupNotificationHandler();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(app)" />
      </Stack>
    </QueryClientProvider>
  );
}
