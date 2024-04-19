import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { app } from '../../../firebase_config';
import { getFirestore, getDocs,collection, addDoc, orderBy  } from "firebase/firestore";
import PostItem from './postItem';

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
          <PostItem item={item}/>
      )}/>
    </View>
  )
}