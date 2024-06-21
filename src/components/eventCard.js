import React from 'react'
import { View, Text, TouchableOpacity, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc';
import S from '../stylesGlobal/S';

export default function eventCard(props) {

  return (
    <TouchableOpacity 
      //onPress={} vai para a pagina do evento com mais detalhes
      style={tw`mr-4 mt-3 relative`}>
      <Image
        src={props.even.image}
        style={tw`w-70 h-50 rounded-3xl`}
      />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.6)']}
          style={tw`absolute p-4 h-full w-full flex justify-end rounded-3xl`}
        >
          <View style={tw`bg-cyan-800 bg-opacity-80 rounded`}>
            <Text style={S.textTitle}>{props.even.title}</Text>
          </View>
        </LinearGradient>
    </TouchableOpacity>
  )
}