import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect,useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { collection, getDocs, getFirestore, query,where } from 'firebase/firestore';
import { app } from '../../firebase_config';
import PostItem from '../Components/HomeScreen/postItem';

export default function ItemList() {

    const {params}=useRoute();
    const db = getFirestore(app);
    const [itemList, setItemList] = useState([]); 
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        // console.log(params);
        params&& getItemListByCategory();

    },[params])

    const getItemListByCategory= async()=>{
        setItemList([]);
        setLoading(true);
        const q = query(collection(db, 'UserPost'), where('category','==',params.category));
        const snapshot = await getDocs(q);
        setLoading(false);
        snapshot.forEach(doc=>{
            // console.log(doc.data());
            setItemList(itemList=>[...itemList, doc.data()]);
            setLoading(false);
        })


    }
  return (
    <View className=" p-3">
        {
            loading?

        <ActivityIndicator size={'large'} color={'#3b82f6'} className="mt-24"/>
       : itemList.length >0 ?<FlatList
        data={itemList}
        numColumns={2}
        renderItem={({item, index})=>(
            <PostItem item={item}/>
        )}/>:<Text>No data found</Text>}
    </View>
  )
}