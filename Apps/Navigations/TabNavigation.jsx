import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import ExploreScreen from '../Screens/ExploreScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import AddPostScreen from '../Screens/AddPostScreen';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import HomeScreenStackNav from './HomeScreenStackNav';

const Tab = createBottomTabNavigator();


export default function TabNavigation() {
  return (
        <Tab.Navigator screenOptions={{headerShown:false}}>
            <Tab.Screen name='home-tab' component={HomeScreenStackNav}
            options={{
                tabBarLabel:({color})=>(
                <Text style={{color:color, fontSize:12, marginTop:-7,marginBottom:3, fontWeight:'bold'}}>Home</Text>
            ),
            tabBarIcon:({color,size})=>(
                <FontAwesome name="home" size={size} color={color} />
            )
            }}/>
            <Tab.Screen name = 'explore' component={ExploreScreen}
            options={{
                tabBarLabel:({color})=>(
                <Text style={{color:color, fontSize:12, marginTop:-7,marginBottom:3, fontWeight:'bold'}}>Explore</Text>
            ),
            tabBarIcon:({color,size})=>(
                <FontAwesome name="search" size={size} color={color} />
            )
            }}/>
            <Tab.Screen name='addPost' component={AddPostScreen}
            options={{
                tabBarLabel:({color})=>(
                <Text style={{color:color, fontSize:12, marginTop:-7,marginBottom:3, fontWeight:'bold'}}>Add Post</Text>
            ),
            tabBarIcon:({color,size})=>(
                <FontAwesome name="camera" size={size} color={color} />
            )
            }}/>
            <Tab.Screen name='profile' component={ProfileScreen}
            options={{
                tabBarLabel:({color})=>(
                <Text style={{color:color, fontSize:12, marginTop:-7,marginBottom:3, fontWeight:'bold'}}>Profile</Text>
            ),
            tabBarIcon:({color,size})=>(
                <Ionicons name="person-circle" size={size} color="black" />            )
            }}/>

            
        </Tab.Navigator>
  )
}