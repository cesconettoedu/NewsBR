import React from 'react'
import { View, Text, TouchableOpacity, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc';
import S from '../globalStyles/S';
import { useNavigation } from '@react-navigation/native';


export default function eventCard(props) {

  const navigation = useNavigation();

  
  return (
    <TouchableOpacity 
      onPress={() => {navigation.navigate('Event', {...props.even})}} style={tw`mr-4 mt-3`}>
      <Image
        src={props.even.image}
        style={tw`w-70 h-50 rounded-3xl`}
      />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.6)']}
          style={tw`absolute p-4 h-full w-full flex justify-end rounded-3xl`}
        >
          <View style={tw`bg-cyan-800 bg-opacity-80 rounded`}>
            <Text style={S.textTitle}> {props.even.title}</Text>
          </View>
        </LinearGradient>
    </TouchableOpacity>
  )
}