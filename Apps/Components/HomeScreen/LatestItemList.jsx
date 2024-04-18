import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { app } from '../../../firebase_config';
import { getFirestore, getDocs,collection, addDoc, orderBy  } from "firebase/firestore";
import { MaterialIcons } from '@expo/vector-icons';
export default function LatestItemList() {


  const db = getFirestore(app);
  const[itemList, setItemList] = useState([]);
  useEffect(()=>{
    getLatestPost();
  },[])
  const getLatestPost=async ()=>{
    setItemList([]); // clear the list whenever 
        const querySnapshot = await getDocs(collection(db, "UserPost"), orderBy("createdAt","desc"));
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, " => ", doc.data());
          setItemList(itemList=>[...itemList,doc.data()]);// store the data in the state
        });
  }
  return (
    <View className="mt-3">
      <Text className="font-bold text-[20px] pb-2">Latest Item</Text>


      <FlatList
      data={itemList}
      numColumns={2}
      renderItem={({item, index})=>(
        <TouchableOpacity className='flex-1 m-1  rounded-lg border-[1px] border-slate-300'>
          <Image source={{uri:item?.image}} className="w-full h-[140px] rounded-lg "/>
          <View>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', paddingTop:3}}>
              <Text className="text-[15px] font-bold  pl-2">{item?.title}</Text>
              <MaterialIcons name="favorite" size={24} color="blue" />


            </View>
            
            <Text className="text-[20px] font-bold text-blue-500 pl-2">$ {item?.price}</Text>
            <Text className="text-blue-800 bg-blue-100 p-1 mb-2 ml-2  rounded-full px-1 text-[12px] w-[80px] text-center mt-1">{item?.category}</Text>

            </View>
        </TouchableOpacity>
      )}/>
    </View>
  )
}