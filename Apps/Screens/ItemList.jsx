import { View, Text, FlatList } from 'react-native'
import React, { useEffect,useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { collection, getDocs, getFirestore, query,where } from 'firebase/firestore';
import { app } from '../../firebase_config';
import PostItem from '../Components/HomeScreen/postItem';

export default function ItemList() {

    const {params}=useRoute();
    const db = getFirestore(app);
    const [itemList, setItemList] = useState([]); 
    useEffect(()=>{
        // console.log(params);
        params&& getItemListByCategory();

    },[params])

    const getItemListByCategory= async()=>{
        setItemList([]);
        const q = query(collection(db, 'UserPost'), where('category','==',params.category));
        const snapshot = await getDocs(q);
        snapshot.forEach(doc=>{
            // console.log(doc.data());
            setItemList(itemList=>[...itemList, doc.data()]);
        })


    }
  return (
    <View className=" p-3">
        {/* <Text className="font-bold text-[20px] pb-2">Latest Item</Text> */}
       { itemList.length >0 ?<FlatList
        data={itemList}
        numColumns={2}
        renderItem={({item, index})=>(
            <PostItem item={item}/>
        )}/>:<Text>No data found</Text>}
    </View>
  )
}