import React, { useState, useContext } from 'react'
import { View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, Platform, Alert } from 'react-native'
 import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../supabase/supabase'; 

import { GlobalStateContext } from '../globalState/hasUser'

import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

// import { LinearGradient } from "expo-linear-gradient";

const Event = (props) => {

  console.log(props.route.params.id);

  const navigation = useNavigation();
  const { userLoged, userId, updateGlobalVariable } = useContext(GlobalStateContext);
  const [favorite, setFavorite] = useState(false);

  const handleFav = () => {
    if(userLoged) {
      setFavorite(!favorite);
      console.log(favorite, userId, props.route.params.id);
      
      // aqui ela insere na tabela
      insertFavEvents()
      
      if(favorite) {
      //aqui ela NAO insere, mas eu tenho que conferir se favorito ta com true ou false  
      insertFavEvents()
      } else {
        console.log('remover fav');      
      }
    
    } else {
      Alert.alert('Please login');
    }
  }

 // nao insere na tabela

  const insertFavEvents = async () => {
    const { data, error } = await supabase
      .from('Favorites')
      .insert([
          { news_ID: `${props.route.params.id}` , users_ID: `${userId}`},
        ])
      .select()
  }


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
            onPress={() => handleFav()}
            style={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 50, padding: 5 }}
            >
            <Ionicons name="heart-circle-outline" size={50} color={favorite ? 'red' : 'gray'}  />
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