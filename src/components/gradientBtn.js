import React from 'react'
import { Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc';


export default function gradientBtn(props) {

  return (
    <LinearGradient
      colors={['rgba(9,181,211,0.9)', 'rgba(55,131,244,0.9)']}
      end={{x:1, y:1}}
      start={{x:0.1, y:0.2}}
      style={tw`rounded-full ${props.containerClass}`}
    >
      <TouchableOpacity style={tw`p-3 px-4 ${props.buttonClass}`}>
        <Text style={tw`text-white font-bold`}>
          Info
        </Text>
      </TouchableOpacity>

    </LinearGradient>
  )
}