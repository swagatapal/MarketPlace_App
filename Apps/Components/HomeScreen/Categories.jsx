import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import { getFirestore, getDocs,collection, addDoc  } from "firebase/firestore";
import { app } from '../../../firebase_config';
import React, { useState, useEffect } from 'react';

export default function Categories() {

  const db = getFirestore(app);
  const [categoryList, setCategoryList] = useState([]);
  useEffect(()=>{
    getCategoryList();  
  
  },[])
  const getCategoryList=async ()=>{
    setCategoryList([]); // clear the list whenever 
        const querySnapshot = await getDocs(collection(db, "category"));
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, " => ", doc.data());
          setCategoryList(categoryList=>[...categoryList,doc.data()]);// store the data in the state
        });
  }
  return (
    <View className="mt-3">
      <Text className="font-bold text-[20px] pb-2">Category List</Text>
      <FlatList
      data={categoryList}
      numColumns={4}
      renderItem={({item, index})=>(
        <TouchableOpacity className="flex-1 items-center justify-center p-2 border-[1px] border-blue-200 m-1 h-[80px] rounded-lg bg-blue-50">
          <Image source={{uri:item?.icon}} className="h-[40px] w-[40px]"/>
          <Text className="text-[12px] mt-1">{item.name}</Text>
        </TouchableOpacity>
      )}
      />
    </View>
  )
}