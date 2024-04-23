import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../Screens/ProfileScreen';
import MyProducts from '../Screens/MyProducts';
import ProductDetails from '../Screens/ProductDetails';



const Stack = createStackNavigator();

export default function ProfileScreenStackNav() {
  return (
    <Stack.Navigator>
        <Stack.Screen name = "profile-tab" component={ProfileScreen} options={{headerShown:false}}/>
        <Stack.Screen name = "my-product" component={MyProducts} options={{
                    headerStyle:{
                        backgroundColor:'#3b82f6',
                    },
                    headerTintColor:"#fff",
                    headerTitle:'My Products'

                }}/>
         <Stack.Screen name='product-details' component={ProductDetails} options={{
                    headerStyle:{
                        backgroundColor:'#3b82f6',
                    },
                    headerTintColor:"#fff",
                    headerTitle:'Details'

                }}/>       

    </Stack.Navigator>
  )
}