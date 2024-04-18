import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Feather } from '@expo/vector-icons';

export default function Header() {


    const {user}= useUser();
  return (

    <View>
            <View className = "flex flex-row items-center gap-2 ">
                <Image source={{uri:user?.imageUrl}} style = {{
                    width:45,
                    height:45,
                    borderRadius:99,
                }}/>

                <View>
                    <Text className = "text-[16px]">Wellcome !!!</Text>
                    <Text className = "text-[20px] font-bold">{user.fullName}</Text>
                </View>
            </View>

            <View className="P-3 px-5 flex flex-row items-center bg-white rounded-full mt-5 border-[2px] border-blue-500">
                <Feather name="search" size={24} color="blue" />
                <TextInput 
                className="p-3 text-[20px]" 
                placeholder='Search'
                onChangeText={(value)=>{console.log(value)}}/>
            </View>

    </View>
    
  )
}