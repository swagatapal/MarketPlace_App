import { View, Text } from 'react-native'
import { app } from '../../firebase_config';
import { getFirestore, getDocs,collection  } from "firebase/firestore";
import React, { useState, useEffect } from 'react';

export default function AddPostScreen() {

// fetch the category list from firebase
const db = getFirestore(app);
useEffect(()=>{
  getCategoryList();  

},[])

const getCategoryList=async ()=>{

      const querySnapshot = await getDocs(collection(db, "category"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });


}

  return (
    <View>
      <Text>AddPostScreen</Text>
    </View>
  )
}