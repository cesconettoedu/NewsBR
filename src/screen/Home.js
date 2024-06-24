import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import S from '../stylesGlobal/S'
import tw from 'twrnc';
import { supabase } from "../../supabase/supabase";
import { useNavigation } from '@react-navigation/native';

import GradientBtn from '../components/gradientBtn';
import EventCard from '../components/eventCard';
import EventSmallCard from '../components/eventSmallCard';

import {storesData} from '../database/index';
import Spinner from '../../assets/gif/Spinner.gif';
//import { HeartIcon } from 'react-native-heroicons/solid'
import { FontAwesome } from '@expo/vector-icons';


const Home = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [load, setLoad] = useState(true);
  const [activeStore, setActiveStore] = useState('Action');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [upCommingEvents, setUpCommingEvents] = useState();
  const [todayEvents, setTodayEvents] = useState();

  const navigation = useNavigation();

  // const getAllEvents = async () => {
  //   let { data: NewsBR, error } = await supabase
  //   .from('NewsBR')
  //   .select('*')
  //   .order('date')  
  //     setallEvents(NewsBR)
  //     return NewsBR
  // }

  const getUpCommingEvents = async () => {
    let { data: NewsBR, error } = await supabase
    .from('NewsBR')
    .select('*')
    .gte('date', `${today}`)
    .order('date')  
      setUpCommingEvents(NewsBR)
      return NewsBR
  }

  const getTodayEvents = async () => {
    let { data: NewsBR, error } = await supabase
    .from('NewsBR')
    .select('*')
    .eq('date', `${today}`)  
      setTodayEvents(NewsBR)
      return NewsBR
  }


  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      getTodayEvents();
      getUpCommingEvents();
      setRefreshing(false);
    }, 1000);
  };


  function getTodayDate() {
    const today = new Date();
    return `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}-${('0' + today.getDate()).slice(-2)}`;
  }

  const today = getTodayDate();


  useEffect(() => {
    getTodayDate();
    getTodayEvents();
    getUpCommingEvents();
    if(upCommingEvents != undefined && todayEvents != undefined) {
      setTimeout(() => {
      setLoad(false)
    }, 1000);  
    } else {
      setTimeout(() => {
        setLoad(false)
      }, 2500);
    }
  },[])

  return (
    <LinearGradient
      // colors={['rgba(58,131,244,0.4)', 'rgba(9, 181, 211, 0.4)']}
      colors={['rgba(253, 252, 160,1)', 'rgba(144, 238, 144, 1)']}
      style={tw`w-full flex-1`}
    >
      <SafeAreaView
        style={tw`flex-1`}
      >

      {load &&
       <Image
          source={Spinner}
          alt="loading"
          style={{ width: 40, height: 40, position: 'absolute', zIndex: 9, alignSelf: 'center', backgroundColor: 'white', borderRadius: 50, marginTop: 30, padding: 20 }}
        /> 
      }
      {!load &&  
      <>
        <ScrollView
            style={{flex: 1}}
            contentContainerStyle={{flexGrow: 1}}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
        >

          <View >
            <Text style={tw`text-center mt-3 text-2xl font-light text-black`}>Home</Text>
          </View>
          
          {/*   STORES */}
          <View style={tw`mt-3`} >
            <Text style={tw`ml-4 text-3xl font-bold`} >Stores</Text>
            <View style={tw`pl-4 mt-2`} >
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {
                  storesData.map(store=> {
                    if (store == activeStore) {
                      return (
                        <GradientBtn key={store.id} containerClass='mr-2' value={store}/>
                      )
                    } else {
                      // show normal
                    }
                    return (
                      <TouchableOpacity
                        onPress={() => setActiveStore(store)}
                        key={store.id}
                        style={tw`bg-blue-200 p-3 px-4 rounded-full mr-2`}
                      >
                      <Text>{store.title}</Text>
                        
                      </TouchableOpacity>
                    )
                  }
                )}
              </ScrollView>
            </View>
          </View>

          {/* {TODAY EVENTS} */}
          <View style={tw`mt-6`}>
            <Text style={tw`ml-4 text-3xl font-bold`}>Today's Event</Text>
            <View style={tw`pl-4`}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                { todayEvents != undefined && todayEvents.length > 0 ? 
                  (
                    todayEvents.map((even, id) =>{   
                      return (
                        <EventCard key={id} even={even}/>
                      )
                    })
                  ) : (
                    <EventCard even={{image: 'https://news.sosevents.org/wp-content/uploads/2019/05/img_0038.png', title: 'No Event Today'}}/>
                  ) 
                }
              </ScrollView>
            </View>
          </View>

          {/* Upcoming events  */}
          <View style={tw`mt-6 mb-15`}>
            <Text style={tw`ml-4 text-lg font-bold`}>Upcoming Event</Text>
            <View style={tw`pl-1` }>
              <ScrollView 
                 showsVerticalScrollIndicator={false}
              >
                {
                  upCommingEvents.map((even, id) =>{
                    if (even.date > today) {
                    return (
                      <EventSmallCard key={id} info={even}/>
                      // <TouchableOpacity 
                      //   style={StyleSheet.compose({ backgroundColor: 'rgba(255,255,255,0.3)' }, tw`mx-4 p-2 mb-1 flex-row mt-2 rounded-2xl`)}
                      //   onPress={() => {setSelectedEvent(even.id); navigation.navigate('Event', {...even})}}
                      //   key={id}
                      // >
                      //   <Image
                      //     src={even.image}
                      //     style={S.icons}
                      //   />
                      //   <View style={tw`flex-1 flex justify-center pl-3`}>
                      //     <Text style={tw`font-semibold pb-3`}>{even.title}</Text>
                      //     <Text style={tw`font-semibold`}>{even.date}</Text>
                      //   </View>
                      //   <View style={tw`flex justify-between items-center mr-3`}>
                      //     <TouchableOpacity
                      //       style={StyleSheet.compose({ backgroundColor: 'rgba(255,255,255,0.3)' },tw`p-2 rounded-full `)}
                      //     >

                      //       {/* mudar quando receber a props do event 
                      //       <FontAwesome name="heart" size={20} color={favourite ? 'red' : 'gray'} />
                            
                      //       */}
                      //     </TouchableOpacity>
                      //     <GradientBtn buttonClass="py-2 px-5"/>
                      //   </View>
                        
                      // </TouchableOpacity>
                    )
                    }
                  })
                }
              </ScrollView>
            </View>
          </View>
          </ScrollView>

        </> 
      } 
      </SafeAreaView>
    </LinearGradient>

  )
}

export default Home

