import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser.tsx";
 
WebBrowser.maybeCompleteAuthSession();

 
  
 

export default function LoginScreen() {

  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);


  return (
    <View>
      <Image source={require('./../../assets/Images/login-bg.png')} 
      className="w-full h-[450px] object-cover"/>

      <View className="p-8 mt-[20px] rounded-t-3xl bg-slate-200 h-[400px] shadow-md">
        <Text className="text-[35px] font-bold " >Community MarketPlace</Text>
        <Text className="text-[16px] text-slate-500 mt-6 font-bold">Buy sell marketplace where you can sell your old product abd get real money</Text>
        <TouchableOpacity onPress={onPress} className="p-4 bg-blue-500 rounded-full mt-20">
            <Text className="text-white text-center text-[18px]">Lets's Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}