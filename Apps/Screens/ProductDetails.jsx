import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

export default function ProductDetails() {
  const { params } = useRoute();
  const [product, setProduct] = useState([]);
  useEffect(() => {
    // console.log(params);
    params && setProduct(params.product);
  }, [params]);

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

        <TouchableOpacity 
        onPress={()=>sendEmailMessage()}
        className="z-40 bg-blue-500 m-2 p-3 rounded-lg">
            <Text className="text-center text-white">Send Message </Text>
        </TouchableOpacity>

        
        
        
    
    </ScrollView>
  );
}
