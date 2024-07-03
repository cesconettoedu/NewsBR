import React, { useState, useContext, useCallback } from 'react'
import { View, Text, Image, Pressable, SafeAreaView, StyleSheet, Platform, Alert } from 'react-native'
 import tw from 'twrnc';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { supabase } from '../../supabase/supabase'; 

import { GlobalStateContext } from '../globalState/hasUser'

import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

// This is when you click in a event and open the information

const Event = (props) => {

  //console.log(props.route.params.title);

  const navigation = useNavigation();
  const { userLoged, userId, updateGlobalVariable } = useContext(GlobalStateContext);
  const [favorite, setFavorite] = useState(false);

  const [hasData, setHasData] = useState(false)


  const handleFav = async () => {

    if(userLoged) {
    // console.log(favorite, userId, props.route.params.id);
    // Fazer a checagem  pra ver se ja existe no BD em Favoritos , se existir apaga senao cria
    /////////////////////////////////////////////////////////////////////////////////
      checkExist();

      if(hasData === null || hasData === undefined){
        setFavorite(!favorite);
        insertFavEvents();
        console.log('insert ');

      } else {
        setFavorite(!favorite);
        deletFavEvents();
        console.log('delete ');
      }

    } else {
      Alert.alert('Please login');
    }
  }

  const checkExist = async () => {
    let { data: Favorites, error } = await supabase
    .from('favorite_events')
    .select('*')
    .eq('all_id', `${props.route.params.id}`) 
    .eq('users_id', `${userId}`) 
    .single()
      setHasData(Favorites)
      return Favorites
  }

  const insertFavEvents = async () => {
    const { data, error } = await supabase
      .from('favorite_events')
      .insert([
          { all_id: `${props.route.params.id}` , users_id: `${userId}`, event_title: `${props.route.params.title}`},
        ])
      .select()
  }


  const deletFavEvents = async () => {
    const response = await supabase
    .from('favorite_events')
    .delete()
    .eq('all_id', `${props.route.params.id}`) 
    .eq('users_id', `${userId}`) 
  }


  useFocusEffect(
    useCallback(() => {
      if(userLoged) {
        checkExist();
      }
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={tw``}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 50, padding: 5 }}
        >
          <Feather name="arrow-left-circle" size={40} color="gray" />
        </Pressable>

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
          <Pressable
            onPress={() => handleFav()}
            style={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 50, padding: 5 }}
            >
            {/* <Ionicons name="heart-circle-outline" size={50} color={favorite ? 'red' : 'gray'}  /> */}

            {hasData &&
              <Ionicons name="heart-circle-outline" size={50} color='red'/>
            }
            {!hasData &&
              <Ionicons name="heart-circle-outline" size={50} color='gray'/>
            }


          </Pressable>
        </View>
        <Text style={styles.description}>{props.route.params.info}</Text>
      </View>
      <View style={styles.locationContainer}>
        <Text style={styles.location}>{props.route.params.link}</Text>
      </View>
      <View style={styles.locationContainer}>
        <Text style={styles.location}>{props.route.params.location}</Text>
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