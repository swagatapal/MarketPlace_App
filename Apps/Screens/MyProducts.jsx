import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { app } from '../../firebase_config'
import { useUser } from '@clerk/clerk-expo';
import PostItem from '../Components/HomeScreen/postItem';
import { useNavigation } from '@react-navigation/native';

export default function MyProducts() {

  const db = getFirestore(app);
  const {user} = useUser();
  const [myProduct, setMyProduct]=useState();
  const navigation = useNavigation();

  useEffect(()=>{
    user&&getUserProducts();

  },[user])

  useEffect(()=>{
    navigation.addListener('focus',(e)=>{
      console.log(e);
      getUserProducts();
    })
  },[navigation])
  const getUserProducts=async ()=>{
    setMyProduct([]);
    const q = query(collection(db,'UserPost'), where('userEmail','==', user?.primaryEmailAddress.emailAddress));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc)=>{
      // console.log(doc.data());
      setMyProduct(myProduct=>[...myProduct, doc.data()]);
    })

  }


  return (
    <View className = "p-5 py-8 ">
      <FlatList
        data={myProduct}
        numColumns={2}
        renderItem={({item, index})=>(
            <PostItem item={item}/>
        )}/>
    </View>
  )
}