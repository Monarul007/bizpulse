import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { colors } from '../../types/theme';

function TabIcon({ name }: { name: string }) {
  const icons: Record<string,string> = {index:'🏠',sales:'📊',inventory:'📦',customers:'👥',more:'📌'};
  return <Text style={{fontSize:22}}>{icons[name]||'📄'}</Text>;
}

export default function AppLayout() {
  return (
    <Tabs screenOptions={{
      headerShown:false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: 'rgba(10,37,64,0.4)',
      tabBarStyle: { height: 72, backgroundColor: colors.white, borderTopWidth: 0.5, borderTopColor: '#E0EAF5', paddingBottom: 8 },
      tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
    }}>
      <Tabs.Screen name="index" options={{title:'Home',tabBarIcon:()=><TabIcon name="index"/>}} />
      <Tabs.Screen name="sales" options={{title:'Sales',tabBarIcon:()=><TabIcon name="sales"/>}} />
      <Tabs.Screen name="inventory" options={{title:'Inventory',tabBarIcon:()=><TabIcon name="inventory"/>}} />
      <Tabs.Screen name="customers" options={{title:'Customers',tabBarIcon:()=><TabIcon name="customers"/>}} />
      <Tabs.Screen name="more" options={{title:'More',tabBarIcon:()=><TabIcon name="more"/>}} />
      <Tabs.Screen name="ai-chat" options={{href:null}} />
      <Tabs.Screen name="financials" options={{href:null}} />
      <Tabs.Screen name="cashflow" options={{href:null}} />
      <Tabs.Screen name="team" options={{href:null}} />
      <Tabs.Screen name="notifications" options={{href:null}} />
      <Tabs.Screen name="settings" options={{href:null}} />
      <Tabs.Screen name="search" options={{href:null}} />
      <Tabs.Screen name="ai-result" options={{href:null}} />
      <Tabs.Screen name="report" options={{href:null}} />
      <Tabs.Screen name="winback" options={{href:null}} />
      <Tabs.Screen name="morning-briefing" options={{href:null}} />
      <Tabs.Screen name="anomaly-alert" options={{href:null}} />
      <Tabs.Screen name="product" options={{href:null}} />
      <Tabs.Screen name="customer" options={{href:null}} />
    </Tabs>
  );
}
