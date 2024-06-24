import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import S from '../stylesGlobal/S'
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import GradientBtn from '../components/gradientBtn';
import { FontAwesome } from '@expo/vector-icons';

export default function eventSmallCard(props) {

  const navigation = useNavigation();
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <View>
      <TouchableOpacity
        style={StyleSheet.compose({ backgroundColor: "rgba(255,255,255,0.3)" },tw`mx-4 p-2 mb-1 flex-row mt-2 rounded-2xl`)}
        onPress={() => {setSelectedEvent(props.info.id); navigation.navigate("Event", { ...props.info });}}
        key={props.info.id}
      >
        <Image src={props.info.image} style={S.icons} />
        <View style={tw`flex-1 flex justify-center pl-3`}>
          <Text style={tw`font-semibold pb-3`}>{props.info.title}</Text>
          <Text style={tw`font-semibold`}>{props.info.date}</Text>
        </View>
        <View style={tw`flex justify-between items-center mr-3`}>
          <View
            style={StyleSheet.compose(
              { backgroundColor: "rgba(255,255,255,0.3)" },
              tw`p-2 rounded-full `
            )}
          >
            {/* mudar quando receber a props do eventCard
              <FontAwesome name="heart" size={20} color={favourite ? 'red' : 'gray'} />
                */}
              <FontAwesome name="heart" size={20} color={'gray'} />
                            
                            
          </View>
          <GradientBtn buttonClass="py-2 px-5" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
