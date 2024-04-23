import { View, Text, FlatList } from 'react-native'
import React, { useEffect,useState } from 'react'
import { collection,  getDocs, getFirestore, orderBy, query, } from 'firebase/firestore'
import { app } from '../../firebase_config'
import PostItem from '../Components/HomeScreen/postItem'
import { createShimmerPlaceHolder } from 'expo-shimmer-placeholder'
import { LinearGradient } from 'expo-linear-gradient'

const ShimmerPlaceHolder = createShimmerPlaceHolder(LinearGradient);

export default function ExploreScreen() {

  const db = getFirestore(app);    
  
  const [product, setProduct] = useState([]);
  const[loader, setLoader] = useState(false);
  useEffect(()=>{
      getAllProducts();
  },[])
  const getAllProducts=async ()=>{
    setProduct([]);
    setLoader(true);
    const q = query(collection(db, 'UserPost'),orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc)=>{
      // console.log(doc.data());
      setProduct(product=>[...product, doc.data()]);
      setLoader(false);     
    })
  }

  const placeholderData = Array.from({ length: 10 });
  return (
    <View className = "p-5 py-8 ">
      <Text className="text-[24px] font-bold mb-3">Explore More</Text>
      { loader ?
    <FlatList
    data={placeholderData}
    numColumns={2}
    renderItem={() => (
      <ShimmerPlaceHolder className="flex-1 m-1  rounded-lg border-[1px] h-40" shimmerColors={["#564d4d", "#8e8e8e", "#564d4d"]}
        
      />
    )}
    keyExtractor={(item, index) => index.toString()}
  />
        :
        <FlatList
        data={product}
        numColumns={2}
        renderItem={({item, index})=>(
            <PostItem item={item}/>
        )}/>}



        
    </View>
  )
}

