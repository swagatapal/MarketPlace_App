import { View, Text, FlatList, Image } from 'react-native';
import { getFirestore, getDocs,collection, addDoc  } from "firebase/firestore";
import { app } from '../../../firebase_config';
import React, { useState, useEffect } from 'react';

export default function Slider() {


    const db = getFirestore(app);
    const [sliderList, setSliderList] = useState([]);
    useEffect(()=>{
        getSlider();  
      
      },[])
    
    const getSlider=async ()=>{
        setSliderList([]);
        const querySnapshot = await getDocs(collection(db, "slider"));
        querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            setSliderList(sliderList=>[...sliderList,doc.data()]);// store the data in the state
        });

    }
  return (
    <View className="mt-5">
      <FlatList
      data={sliderList}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({item, index})=>(
        <View>
            {/* <Text>{index}</Text> */}
        <Image source={{uri: item?.image}} className="h-[170px] w-[300px] mr-3 rounded-lg object-contain"/>
        </View>
      )}/>
    </View>
  )
}