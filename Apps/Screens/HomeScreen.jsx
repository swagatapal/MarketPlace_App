import { View, Text } from 'react-native'
import React from 'react'
import Header from '../Components/HomeScreen/Header'
import Slider from '../Components/HomeScreen/Slider'

export default function HomeScreen() {
  
  return (
    <View className='py-8 px-6 bg-white flex-1'>
      <Header />
      <Slider/>
    </View>
  )
}