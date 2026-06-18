import { useEffect, useState } from 'react';
import { View,Text,ScrollView,TouchableOpacity,RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useDashboardStore } from '../../stores/dashboard';
import { colors, gradients, spacing } from '../../types/theme';
import TourOverlay from '../../components/TourOverlay';
import ErrorState from '../../components/ErrorState';

export default function HomeDashboard() {
  const { ticker,comparisons,alerts,loading,fetchTicker,fetchComparisons,fetchAlerts } = useDashboardStore();
  const [showTour, setShowTour] = useState(false);
  const [hasError, setHasError] = useState(false);
  useEffect(()=>{
    fetchTicker();fetchComparisons();fetchAlerts();
    const toured = false; // TODO: check AsyncStorage for tour completed
    if (!toured) setShowTour(true);
  },[]);
  useEffect(()=>{if (!loading && !ticker) setHasError(true)},[loading]);

  if (hasError && !loading) return (
    <View style={{flex:1}}>
      <ErrorState cachedRevenue="৳1,84,320" syncedAgo="14 min ago" onRetry={()=>{setHasError(false);fetchTicker()}} onWorkOffline={()=>setHasError(false)} />
    </View>
  );

  return (
    <LinearGradient colors={gradients.bg} style={{flex:1}}>
      <TourOverlay visible={showTour} onComplete={()=>setShowTour(false)} onSkip={()=>setShowTour(false)} />
      <ScrollView contentContainerStyle={{padding:spacing.lg,paddingBottom:100}}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={()=>{fetchTicker();fetchComparisons();fetchAlerts()}}/>}>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:spacing.base}}>
          <Text style={{fontSize:22,fontWeight:'700',color:colors.deepNavy}}>Good morning, Rahim 👋</Text>
          <View style={{flexDirection:'row',gap:spacing.md}}>
            <TouchableOpacity onPress={()=>router.push('/(app)/search')}><Text style={{fontSize:22}}>🔍</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>router.push('/(app)/notifications')}><Text style={{fontSize:22}}>🔔</Text></TouchableOpacity>
          </View>
        </View>
        <LinearGradient colors={gradients.hero} style={{padding:spacing.lg,borderRadius:24,marginBottom:spacing.base}}>
          <Text style={{color:'rgba(255,255,255,0.5)',fontSize:11,textTransform:'uppercase',letterSpacing:1}}>REVENUE TODAY</Text>
          <Text style={{color:colors.white,fontSize:36,fontWeight:'700',marginVertical:4}}>৳{ticker?.revenue?.toLocaleString('en-IN')??'---'}</Text>
          <Text style={[ticker?.vs_yesterday??0>=0?{color:colors.success}:{color:colors.danger}]}>
            {(ticker?.vs_yesterday??0)>=0?'▲':'▼'} {ticker?.vs_yesterday_label??'0%'} vs yesterday
          </Text>
        </LinearGradient>
        <View style={{flexDirection:'row',flexWrap:'wrap',gap:12,marginBottom:spacing.xl}}>
          {[
            {v:ticker?.orders_count??'--',l:'Orders today',c:colors.deepNavy},
            {v:'৳745',l:'Avg order value',c:colors.deepNavy},
            {v:'94%',l:'On-time delivery',c:colors.deepNavy},
            {v:'82%',l:'Sentiment score',c:colors.deepNavy},
          ].map((item,i)=>(
            <View key={i} style={{width:'47%',backgroundColor:colors.white,borderRadius:16,padding:spacing.base}}>
              <Text style={{fontSize:24,fontWeight:'700',color:item.c}}>{item.v}</Text>
              <Text style={{fontSize:12,color:colors.textSecondary,marginTop:2}}>{item.l}</Text>
            </View>
          ))}
        </View>
        <Text style={{fontSize:11,color:colors.textSecondary,textTransform:'uppercase',letterSpacing:1,marginBottom:spacing.md}}>✦ AI ALERTS</Text>
        {alerts.length===0
          ? <View style={{backgroundColor:colors.white,borderRadius:16,padding:spacing.base,borderLeftWidth:4,borderLeftColor:colors.success}}><Text>No critical alerts</Text></View>
          : alerts.slice(0,3).map(a=>(
            <TouchableOpacity key={a.id}>
              <View style={{backgroundColor:colors.white,borderRadius:16,padding:spacing.base,borderLeftWidth:4,borderLeftColor:a.severity==='critical'?colors.danger:a.severity==='warning'?colors.warning:colors.success,marginBottom:spacing.sm}}>
                <Text style={{fontSize:14,fontWeight:'700',color:colors.deepNavy}}>{a.type}</Text>
                <Text style={{fontSize:13,color:colors.textSecondary,marginTop:2}}>{a.message}</Text>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </LinearGradient>
  );
}
