import { View, Text, Image, TouchableOpacity, Linking, Share,Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome5 } from '@expo/vector-icons';
import { useUser } from "@clerk/clerk-expo";
import { collection, deleteDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import { app } from "../../firebase_config";
import Shimmering from "../Animation/Shimmer";
export default function ProductDetails({navigation}) {
  const { params } = useRoute();
  const [product, setProduct] = useState([]);
  const {user} = useUser();
  const db = getFirestore(app);
  const nav = useNavigation();
  useEffect(() => {
    // console.log(params);
    params && setProduct(params.product);
    shareButton();
  }, [params, navigation]);


  const sendEmailMessage=()=>{
    const subject = 'Regarding '+ product.title;
    const body = "Hi "+product.userName+"\n"+" I am interested in this product";
    Linking.openURL('mailto:'+product.userEmail+"?subject="+subject+"&body="+body);
  }

  const deleteUserPost=()=>{
    console.log("user post deleted click");
    Alert.alert('Do you want to delete ?',"Are you want to delete the post ?",[
      {
        text:'Yes',
        onPress:()=>deleteFromFireStore()
      },
      {
        text:'Cancel',
        onPress:()=>console.log("cancel pressed"),
        style:'cancel'
      }
    ])
  }
  
  const deleteFromFireStore=async ()=>{

    const q = query(collection(db, 'UserPost'), where('title','==', product.title));
    const snapshot = await getDocs(q);
    snapshot.forEach(doc=>{
      deleteDoc(doc.ref).then(resp=>{
        console.log("deleted the doc");
        nav.goBack();
      })
    })

  }
  const shareButton = ()=>{
    navigation.setOptions({
      headerRight: () => (
        
        <FontAwesome5 name="share" size={24} onPress={()=>shareProduct()} color="white" style={{marginRight:20}}/>
        
      ),
    });
  }

  const shareProduct=()=>{
    const content = {
      message:product.title+"\n"+product.desc
    }
    Share.share(content).then(resp=>{
      console.log(resp);

    }, (error)=>{
      console.log(error);
    })

  }

  return (
    <ScrollView>
      <Image source={{ uri: product.image }} className="h-[320px] w-full" />
      <View className="p-3">
        <Text className="text-[24px] font-bold">{product?.title}</Text>
        <View className="items-baseline mt-2">
          <Text className="p-2 px-2 rounded-full bg-blue-200 text-blue-500 text-[15px]">
            {product?.category}
          </Text>
        </View>
        <Text className="mt-3 font-bold text-[20px]">Description</Text>
        <Text className="text-[17px] text-gray-500">{product?.desc}</Text>
        <Text className="mt-3 font-bold text-[20px]">Uploaded By:</Text>
      </View>
      
        
        <View className="p-3 flex flex-row items-center gap-3 bg-blue-50">
          <Image
            source={{ uri: product?.userImage }}
            className="w-12 h-12 rounded-full"
          />

          <View>
            <Text className="font-bold text-[18px]">{product?.userName}</Text>
            <Text className="text-gray-500">{product?.userEmail}</Text>
          </View>
        </View>


        {user?.primaryEmailAddress.emailAddress == product.userEmail ?
        <TouchableOpacity 
        onPress={()=>deleteUserPost()}
        className="z-40 bg-red-500 m-2 p-3 rounded-lg">
            <Text className="text-center text-white">Delete Post </Text>
        </TouchableOpacity>  :
        <TouchableOpacity 
        onPress={()=>sendEmailMessage()}
        className="z-40 bg-blue-500 m-2 p-3 rounded-lg">
            <Text className="text-center text-white">Send Message </Text>
        </TouchableOpacity>
        
      }


      <Text>dskdb</Text>
      {/* <Shimmering/> */}
        

        
        
        
    
    </ScrollView>
  );
}
