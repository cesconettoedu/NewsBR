import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, Platform } from 'react-native'
 import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from "expo-linear-gradient";

const Event = (props) => {

  const navigation = useNavigation();
  const [favourite, setFavourite] = useState(false);


  return (
    <SafeAreaView style={styles.container}>
      <View style={tw``}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 50, padding: 5 }}
        >
          <Feather name="arrow-left-circle" size={40} color="gray" />
        </TouchableOpacity>

      </View>
      <View style={styles.imageContainer}>
        <Image
          src={props.route.params.image}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.infoContainer}>    
        <View  style={tw`flex-row justify-between items-center mb-2`}>
          <Text style={styles.title}>{props.route.params.title}</Text>
          <TouchableOpacity
            onPress={() => {setFavourite(!favourite)}}
            style={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 50, padding: 5 }}
            >
            <Ionicons name="heart-circle-outline" size={50} color={favourite ? 'red' : 'gray'}  />
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>{props.route.params.info}</Text>
      </View>
      <View style={styles.locationContainer}>
        <Text style={styles.location}>Link: Under Work</Text>
      </View>
      <View style={styles.locationContainer}>
        <Text style={styles.location}>Location: Under Work</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingTop: Platform.OS === 'android' ? 5 : 50
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
  },
  infoContainer: {
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'justify'
  },
  locationContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 12,
    marginBottom: 15,
  },
  location: {
    fontSize: 16,
    color: '#777',
  },
});

export default Event;


//   shadow: {
//     shadowColor: 'black',
//     shadowRadius: 30,
//     shadowOffset: {width: 0 , height: 30},
//     shadowOpacity: 0.9,
//     elevation: 5 // para sombra funcionar no Android
//   }