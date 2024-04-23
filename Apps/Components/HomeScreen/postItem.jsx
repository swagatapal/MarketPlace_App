import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function PostItem({item}) {

    const navigation = useNavigation();

  return (
    
       <TouchableOpacity onPress={()=>navigation.push('product-details',{
        product:item
       })} className='flex-1 m-1  rounded-lg border-[1px] border-slate-300'>
          <Image source={{uri:item?.image}} className="w-full h-[140px] rounded-lg "/>
          <View>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', paddingTop:3, paddingRight:10}}>
              <Text className="text-[15px] font-bold  pl-2">{item?.title}</Text>
              <MaterialIcons name="favorite" size={24} color="blue" />


            </View>
            
            <Text className="text-[20px] font-bold text-blue-500 pl-2">$ {item?.price}</Text>
            <Text className="text-blue-800 bg-blue-100 p-1 mb-2 ml-2  rounded-full px-1 text-[12px] w-[80px] text-center mt-1">{item?.category}</Text>

            </View>
        </TouchableOpacity>
    
  )
}