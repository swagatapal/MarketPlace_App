import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const profileMenu = [
  {
    id: 1,
    name: "Explore",
    icon: "book-search",
    path: "explore",
  },
  {
    id: 2,
    name: "My Products",
    icon: "bookmark",
    path: "my-product",
  },
  {
    id: 3,
    name: "Contact-us",
    icon: "email",
  },
  {
    id: 4,
    name: "Logout", 
    icon: "logout",
  },
];
export default function ProfileScreen() {
  const { user } = useUser();
  const navigation = useNavigation();
  const { isLoaded, signOut } = useAuth();

  const onMenuPress = (item) => {
    if (item.name == "logout") {
      signOut();
      return;
    }
    item?.path ? navigation.navigate(item.path) : null;
  };

  return (
    <View className="p-5">
      <View className="items-center mt-20">
        <Image
          source={{ uri: user?.imageUrl }}
          className="w-[100px] h-[100px] rounded-full"
        />
        <Text className="font-bold text-[25px] mt-2">{user?.fullName}</Text>
        <Text className="text-[18px] mt-1 text-gray-500">
          {user?.primaryEmailAddress.emailAddress}
        </Text>
      </View>

      <View  className="items-center mt-10">
        <FlatList
          data={profileMenu}
          numColumns={2}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{ alignItems: "center", paddingHorizontal: 20 }}
              className=" m-6"
              onPress={() => onMenuPress(item)}
              
            >
              <MaterialCommunityIcons
                name={item.icon}
                size={40}
                color="blue"
              />
              <Text style={{ fontWeight: "bold", fontSize: 25 }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
