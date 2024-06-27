
import React, { useEffect, useState, useContext, useCallback } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import S from '../globalStyles/S'
import tw from 'twrnc';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import GradientBtn from '../components/gradientBtn';
import { supabase } from "../../supabase/supabase";

import EventSmallCard from '../components/eventSmallCard';

import { GlobalStateContext } from '../globalState/hasUser'

import Spinner from '../../assets/gif/Spinner.gif';



export default function Favorite(props) {



  const { userId } = useContext(GlobalStateContext);
  const navigation = useNavigation();
  const [favEvents, setFavEvents] = useState()
  const [load, setLoad] = useState(true);


  async function fetchFavoriteNews() {
    const { data: Favorites, error } = await supabase
      .from('Favorites')
      .select('news_ID')
      .eq('users_ID', userId);

      if (error) {
        console.error('Erro ao buscar notícias favoritas:', error.message);
        return [];
      }
  
      // Extrair os IDs das notícias favoritas
    const newsIds = Favorites.map(item => item.news_ID);
    
      // Buscar os detalhes das notícias com base nos IDs encontrados
    const { data: BrNewsLd, error: newsError } = await supabase
      .from('BrNewsLd')
      .select('*')
      .in('id', [newsIds])
      .order('date')
      ;
      if (newsError) {
        console.error('Erro ao buscar detalhes das notícias:', newsError.message);
        return [];
      }
  
      setFavEvents(BrNewsLd);
      return BrNewsLd;
  }
                   
  const fetchFav = () => {
    fetchFavoriteNews();
    if(favEvents != undefined) {
        setTimeout(() => {
          setLoad(false)
        }, 1000);  
      } else {
        setTimeout(() => {
          setLoad(false)
        }, 2500);
      };
  };
                                  
  useEffect(() => {
   fetchFav();
  }, [userId]);
  
  useFocusEffect( 
    useCallback(() => {   
    fetchFav();
  }, [userId])
  )

  return (
    <View style={tw`mt-6 mb-15`}>
      <Text style={tw`ml-4 text-lg font-bold`}>FAv Event</Text>
      <View style={tw`pl-1` }>
        {load &&
          <Image
            source={Spinner}
            alt="loading"
            style={{ width: 40, height: 40, position: 'absolute', zIndex: 9, alignSelf: 'center', backgroundColor: 'white', borderRadius: 50, marginTop: 30, padding: 20 }}
          /> 
        }
        {!load &&  
          <ScrollView 
            showsVerticalScrollIndicator={false}
          >
            {
              favEvents.map((even, id) =>{      
                return (
                  <EventSmallCard key={id} info={even}/>
                )
              })
            }
          </ScrollView>
        }
      </View> 
    </View>
  )
}