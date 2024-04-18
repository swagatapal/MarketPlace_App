import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Header from '../Components/HomeScreen/Header'
import Slider from '../Components/HomeScreen/Slider'
import Categories from '../Components/HomeScreen/Categories'
import LatestItemList from '../Components/HomeScreen/LatestItemList'

export default function HomeScreen() {
  
  return (
    <ScrollView className='py-8 px-6 bg-white flex-1'>
      <View style={{paddingBottom:30}}>
      <Header />
      <Slider/>
      <Categories/>
      <LatestItemList/>

      </View>
      
    </ScrollView>
  )
}