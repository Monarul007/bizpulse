import { View,Text,TouchableOpacity,StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, spacing } from '../../types/theme';

export default function Biometric() {
  return (
    <LinearGradient colors={gradients.darkNav} style={styles.container}>
      <Text style={{position:'absolute',top:100,color:colors.white,fontSize:32,fontWeight:'700'}}>BizPulse</Text>
      <Text style={{color:'rgba(255,255,255,0.8)',fontSize:16,marginTop:-20}}>Welcome back,</Text>
      <Text style={{color:colors.white,fontSize:24,fontWeight:'700',marginTop:4}}>Rahim Uddin</Text>
      <Text style={{color:'rgba(255,255,255,0.5)',fontSize:14,marginTop:4}}>eMartway Skincare</Text>
      <View style={{width:80,height:80,borderRadius:40,justifyContent:'center',alignItems:'center',marginTop:40,marginBottom:spacing.base,borderWidth:2,borderColor:'rgba(59,159,232,0.3)'}}>
        <Text style={{fontSize:40}}>👆</Text>
      </View>
      <Text style={{color:'rgba(255,255,255,0.6)',fontSize:14}}>Touch to unlock</Text>
      <TouchableOpacity onPress={()=>router.push('pin')}><Text style={{color:'#3B9FE8',fontSize:13,marginTop:spacing.md}}>or use PIN →</Text></TouchableOpacity>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({container:{flex:1,justifyContent:'center',alignItems:'center',padding:spacing.lg}});
