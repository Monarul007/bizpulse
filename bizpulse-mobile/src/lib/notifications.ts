import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }) as unknown as ReturnType<typeof Notifications.setNotificationHandler> extends void ? never : any,
});

export async function registerPushNotifications() {
  const { status: existing } = await Notifications.getPermissionsAsync();
  let finalStatus = existing;

  if (existing !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') return null;

  const token = await Notifications.getExpoPushTokenAsync();
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#3B9FE8',
    });
  }
  return token.data;
}

export function setupNotificationHandler() {
  const sub = Notifications.addNotificationResponseReceivedListener(res => {
    const data = res.notification.request.content.data;
    if (typeof data?.route === 'string') router.push(data.route);
  });
  return () => sub.remove();
}

export async function scheduleDailyBriefing(hour: number, minute: number) {
  await Notifications.cancelAllScheduledNotificationsAsync();
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '☀️ Good morning, Rahim!',
      body: '৳1,84,320 so far today · 247 orders · 3 alerts need attention.',
      data: { route: '/(app)/morning-briefing' },
    },
    trigger: { type: 'daily' as any, hour, minute },
  });
}
