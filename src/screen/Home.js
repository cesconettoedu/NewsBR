import React, { useState, useEffect, useCallback, useContext } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc';
import { supabase } from "../../supabase/supabase";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { clearAll, getData, printAllData } from '../globalFunc/asyStorage';

import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import { GlobalStateContext } from '../globalState/hasUser'

import GradientBtn from '../components/gradientBtn';
import EventCard from '../components/eventCard';
import EventSmallCard from '../components/eventSmallCard';

import {storesData} from '../database/index';
import Spinner from '../../assets/gif/Spinner.gif';


const Home = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);
  const [load, setLoad] = useState(true);
  const [activeStore, setActiveStore] = useState('Action');
  const [upCommingEvents, setUpCommingEvents] = useState();
  const [todayEvents, setTodayEvents] = useState();
  const [conditionMet, setConditionMet] = useState(false);

  const { userLoged, updateGlobalVariable } = useContext(GlobalStateContext);

  const handleClick = () => {
    updateGlobalVariable(!userLoged);
  };

  // const getAllEvents = async () => {
  //   let { data: NewsBR, error } = await supabase
  //   .from('NewsBR')
  //   .select('*')
  //   .order('date')  
  //     setallEvents(NewsBR)
  //     return NewsBR
  // }

  const getUpCommingEvents = async () => {
    let { data: BrNewsLd, error } = await supabase
    .from('BrNewsLd')
    .select('*')
    .gte('date', `${today}`)
    .order('date')  
      setUpCommingEvents(BrNewsLd)
      return BrNewsLd
  }

  const getTodayEvents = async () => {
    let { data: BrNewsLd, error } = await supabase
    .from('BrNewsLd')
    .select('*')
    .eq('date', `${today}`)  
      setTodayEvents(BrNewsLd)
      return BrNewsLd
  }


  // serve para na hora que arrasta o dedo para baixo, fazer um refresh na pagina
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


  //fiz tudo dentro dessa funcao para poder usar no useFocus tb
  const loadData = useCallback(async () => {
    try {
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
      };
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  }, []);


  useEffect(() => {
    loadData();
    printAllData(); //para ver tudo salvo no Asyncstorage
  }, [conditionMet]);


  // useFocusEffect para recarregar os dados toda vez que a tela estiver em foco
  // talvez usar para ver se ta logado
  useFocusEffect(
    useCallback(() => {
      console.log('fez reload');
      getData();
      printAllData(); //para ver tudo salvo no Asyncstorage
    }, [])
  );


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

          <View style={tw`flex-row-reverse mt-4 mx-6`} >
            {userLoged ? (
                <TouchableOpacity 
                  //onPress={() => {clearAll(); setConditionMet(false) }}
                  onPress={() => {updateGlobalVariable(false); clearAll();}}
                  
                >
                  <MaterialIcons name="logout" size={34} color="black"/> 
                </TouchableOpacity>
             ) : (
                <TouchableOpacity 
                onPress={() => navigation.navigate('Login')}
                >
                  <Entypo name="emoji-sad" size={34} color="black" /> 
                </TouchableOpacity>
             )
}


            {/* // TESTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE */}
            <TouchableOpacity 
              onPress={() => handleClick ()}
              style={{paddingRight:50 }}
            >
              <MaterialIcons name="change-circle" size={50} color="black" /> 
            </TouchableOpacity>




            
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

