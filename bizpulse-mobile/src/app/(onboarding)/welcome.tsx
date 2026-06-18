import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, spacing } from '../../types/theme';

export default function Welcome() {
  return (
    <LinearGradient colors={gradients.bg} style={styles.container}>
      <View style={styles.topSection}><Text style={{fontSize:80}}>📱</Text></View>
      <Text style={styles.headline}>Your business,\nin your pocket.</Text>
      <Text style={styles.body}>BizPulse connects to your existing system and gives you real-time answers.</Text>
      <View style={styles.bottom}>
        <View style={styles.dots}>
          <View style={[styles.dot, styles.dotActive]} /><View style={styles.dot} /><View style={styles.dot} />
        </View>
        <TouchableOpacity onPress={()=>router.push('/(onboarding)/connect')}>
          <LinearGradient colors={gradients.ai} style={styles.button}>
            <Text style={{color:colors.white,fontSize:16,fontWeight:'700'}}>Get Started</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>router.push('/(auth)')}>
          <Text style={styles.link}>Already have an account? Sign in</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container:{flex:1},topSection:{flex:0.55,justifyContent:'center',alignItems:'center'},
  headline:{fontSize:28,fontWeight:'700',color:colors.deepNavy,textAlign:'center',lineHeight:36},
  body:{fontSize:14,color:colors.textSecondary,textAlign:'center',maxWidth:300,alignSelf:'center',marginTop:spacing.sm},
  bottom:{position:'absolute',bottom:60,left:0,right:0,alignItems:'center'},
  dots:{flexDirection:'row',gap:6,marginBottom:spacing.xl},
  dot:{width:8,height:8,borderRadius:4,backgroundColor:'#C5D9EA'},
  dotActive:{backgroundColor:colors.deepNavy},
  button:{height:56,borderRadius:16,justifyContent:'center',alignItems:'center',paddingHorizontal:spacing.xl*2,marginBottom:spacing.base},
  link:{color:'rgba(10,37,64,0.6)',fontSize:13},
});
