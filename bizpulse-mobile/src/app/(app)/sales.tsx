import { useEffect } from 'react';
import { View,Text,ScrollView,StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDashboardStore } from '../../stores/dashboard';
import { colors, gradients, spacing } from '../../types/theme';

export default function Sales() {
  const { ticker,comparisons,fetchTicker,fetchComparisons } = useDashboardStore();
  useEffect(()=>{fetchTicker();fetchComparisons('7d')},[]);
  return (
    <LinearGradient colors={gradients.bg} style={{flex:1}}>
      <ScrollView contentContainerStyle={{padding:spacing.lg,paddingBottom:100}}>
        <Text style={{fontSize:18,fontWeight:'700',color:colors.deepNavy,marginBottom:spacing.base}}>Sales & Revenue</Text>
        <LinearGradient colors={gradients.hero} style={{padding:spacing.lg,borderRadius:20,marginBottom:spacing.base}}>
          <Text style={{color:'rgba(255,255,255,0.5)',fontSize:11,textTransform:'uppercase',letterSpacing:1}}>TOTAL THIS PERIOD</Text>
          <Text style={{color:colors.white,fontSize:32,fontWeight:'700',marginVertical:4}}>৳{comparisons?.current?.toLocaleString('en-IN')??'---'}</Text>
          <Text style={[comparisons&&comparisons.delta_pct>=0?{color:colors.success}:{color:colors.danger}]}>
            {comparisons?.delta_pct??0}% vs last period
          </Text>
        </LinearGradient>
        <Text style={{fontSize:11,color:colors.textSecondary,textTransform:'uppercase',letterSpacing:1,marginTop:spacing.xl,marginBottom:spacing.md}}>TOP PRODUCTS</Text>
        {[1,2,3,4,5].map(i=>(
          <View key={i} style={{flexDirection:'row',alignItems:'center',backgroundColor:colors.white,borderRadius:12,padding:spacing.md,marginBottom:8}}>
            <Text style={{fontSize:13,fontWeight:'700',color:colors.textSecondary,width:24}}>{i}</Text>
            <View style={{flex:1,height:6,backgroundColor:'#F0F5FA',borderRadius:4,marginHorizontal:spacing.md}}>
              <View style={{width:`${100-i*15}%`,height:6,borderRadius:4,backgroundColor:colors.primary}}/>
            </View>
            <Text style={{fontSize:14,fontWeight:'700',color:colors.deepNavy}}>৳{120000-i*20000}</Text>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}
