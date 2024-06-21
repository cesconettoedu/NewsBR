import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import S from '../stylesGlobal/S'
import tw from 'twrnc';
import { supabase } from "../../supabase/supabase";

import GradientBtn from '../components/gradientBtn';
import EventCard from '../components/eventCard';
import {storesData} from '../database/index';
import Spinner from '../../assets/gif/Spinner.gif';



const Home = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [activeStore, setActiveStore] = useState('Action');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [allEvents, setallEvents] = useState();
  const [load, setLoad] = useState(true);
  

  const getAllEvents = async () => {
    let { data: NewsBR, error } = await supabase
  .from('NewsBR')
  .select('*')
  .order('date')  
    setallEvents(NewsBR)
    return NewsBR
  }


  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      getAllEvents();
      setRefreshing(false);
    }, 1000);
  };


  function getTodayDate() {
    const today = new Date();
    return `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}-${('0' + today.getDate()).slice(-2)}`;
  }

  const today = getTodayDate();
  console.log(today);


  useEffect(() => {
    getTodayDate();
    getAllEvents();
    setTimeout(() => {
      setLoad(false)
    }, 1000);
  },[])

  return (
    <LinearGradient
      colors={['rgba(58,131,244,0.4)', 'rgba(9, 181, 211, 0.4)']}
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
                {
                  allEvents.map((even, id) =>{
                   // console.log(even.date);
                    if (even.date == today) {      
                      return (
                        <EventCard key={id} even={even}/>
                      )
                    } 
                    // else  {
                    //   return (
                    //     <EventCard key={id} even={even}/>
                    //   )
                    // }
                
                  })
                }
              </ScrollView>
            </View>
          </View>

          {/* Upcoming events  */}
          <View style={tw`mt-6`}>
            <Text style={tw`ml-4 text-lg font-bold`}>Upcoming Event</Text>
            <View style={tw`pl-1` }>
              <ScrollView 
                style={{height: 320}} showsVerticalScrollIndicator={false}
              >
                {
                  allEvents.map((even, id) =>{
                    let bg= even.id==selectedEvent? 'rgba(255,255,255,0.4)' : 'transparent';
                    if (even.date > today) {
                    return (
                      <TouchableOpacity 
                        style={StyleSheet.compose({ backgroundColor: bg }, tw`mx-4 p-2 mb-2 flex-row mt-2 rounded-2xl`)}
                        onPress={() => {setSelectedEvent(even.id)}}
                        key={id}
                      >
                        <Image
                          src={even.image}
                          style={S.icons}
                        />
                        <View style={tw`flex-1 flex justify-center pl-3`}>
                          <Text style={tw`font-semibold pb-3`}>{even.title}</Text>
                          <Text style={tw`font-semibold`}>{even.date}</Text>
                        </View>
                        <View style={tw`flex justify-center items-center`}>
                          <GradientBtn buttonClass="py-2 px-5"/>
                        </View>
                        
                      </TouchableOpacity>
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