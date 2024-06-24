import React from 'react'
import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


const Event = (props) => {
  const navigation = useNavigation();

  return (
    <View style={tw`flex-1`}>
      <SafeAreaView style={tw`mt-4`}>
        <View style={tw`mx-4 flex-row justify-between items-center`}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left-circle" size={50} color="red" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
             <Ionicons name="heart-circle-outline" size={50} color="red" />
          </TouchableOpacity>
        </View>
        <View style={tw`flex-row justify-center `}>
           <Image
             src={props.route.params.image}
             style={tw`h-60 w-80 rounded-2xl`}
          /> 
        </View>
      </SafeAreaView>
    </View>
  )
}

export default Event