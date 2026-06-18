import { useState } from 'react';
import { View,Text,TextInput,TouchableOpacity,ScrollView,KeyboardAvoidingView,Platform,StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, spacing } from '../../types/theme';

interface Message { id:string; role:'user'|'ai'; text:string; }

export default function AiChat() {
  const [messages,setMessages] = useState<Message[]>([{id:'1',role:'ai',text:'Hello! I\'m BizPulse AI. Ask me anything about your business.'}]);
  const [input,setInput] = useState('');
  const send = () => {
    if (!input.trim()) return;
    setMessages(p=>[...p,{id:Date.now().toString(),role:'user',text:input}]);
    setInput('');
    setTimeout(()=>setMessages(p=>[...p,{id:(Date.now()+1).toString(),role:'ai',text:'Querying your live data for "'+input+'"...'}]),1000);
  };
  return (
    <View style={{flex:1}}>
      <LinearGradient colors={gradients.darkNav} style={{flex:1,paddingTop:60}}>
        <ScrollView contentContainerStyle={{padding:spacing.base}}>
          {messages.map(msg=>(
            <View key={msg.id} style={[msg.role==='user'
              ? {alignSelf:'flex-end',maxWidth:'70%',backgroundColor:'rgba(255,255,255,0.12)',borderRadius:16,borderBottomRightRadius:4,padding:spacing.md,marginBottom:spacing.sm}
              : {alignSelf:'flex-start',maxWidth:'80%',backgroundColor:'#1E3A5C',borderRadius:16,borderBottomLeftRadius:4,padding:spacing.md,marginBottom:spacing.sm}
            ]}>
              {msg.role==='ai'&&<Text style={{color:'#6C63FF',fontSize:12,marginBottom:4}}>✦</Text>}
              <Text style={{color:colors.white,fontSize:15}}>{msg.text}</Text>
            </View>
          ))}
        </ScrollView>
      </LinearGradient>
      <KeyboardAvoidingView behavior={Platform.OS==='ios'?'padding':'height'}>
        <View style={{backgroundColor:colors.white,borderTopLeftRadius:20,borderTopRightRadius:20,padding:spacing.base,paddingBottom:32}}>
          <View style={{flexDirection:'row',alignItems:'center',gap:spacing.md}}>
            <TextInput style={{flex:1,height:44,fontSize:15,color:colors.deepNavy}}
              value={input} onChangeText={setInput} placeholder="Ask anything..." placeholderTextColor="rgba(10,37,64,0.3)"/>
            <TouchableOpacity onPress={send}>
              <LinearGradient colors={gradients.ai} style={{width:44,height:44,borderRadius:22,justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:colors.white,fontSize:20}}>→</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
