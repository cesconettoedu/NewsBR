import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Platform, View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo, MaterialIcons, Fontisto } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";

import { GlobalStateProvider, GlobalStateContext } from './src/globalState/hasUser'

import Home from "./src/screen/Home";
import Favorite from "./src/screen/Favorite";
import Stores from "./src/screen/Stores";
import Event from "./src/screen/Event";
import Login from "./src/screen/Login"

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  
  return (
      <GlobalStateProvider>
    <SafeAreaView style={styles.root}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" >

            <Stack.Screen name="Home" options={{headerShown: false}} component={HomeTabs} />
            <Stack.Screen name="Event" options={{headerShown: false}} component={Event} />
            <Stack.Screen name="Login" options={{headerShown: false}} component={Login} />

          </Stack.Navigator>
        </NavigationContainer>
    </SafeAreaView>
      </GlobalStateProvider>
  );
}

function HomeTabs() {

  const { userLoged, updateGlobalVariable } = useContext(GlobalStateContext);
  const navigation = useNavigation();


  //to get the async storage login data in Login.js and keep loged
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('my-key');
      if (value !== null) {
        setConditionMet(true)
      }
    } catch (e) {
      // error reading value
    }
  };


  useEffect(() => {
    getData();
    // Simulação de uma condição assíncrona (por exemplo, verificação de login)
    // setTimeout(() => {
    //   setConditionMet(false); // Condição definida como verdadeira após um tempo simulado
    // }, 2000); // Tempo simulado de 2 segundos
  }, []);

  return(
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          elevation: 0,
          height: "8%",
          backgroundColor: '#fff',
          paddingTop: Platform.OS == "ios" ? 20 : 5,
        }
      }}
    >
      <Tab.Screen name="store" component={Stores} 
        options={{
          tabBarIcon: ({focused}) => {
            return(
            <View style={{ alignItems: 'center', justifyContent: 'center'}}>
              <Fontisto name="shopping-store" size={20} color={focused ? "green" : "gray"} />
              <Text style={{fontSize: 12, color: "#16247d"}} >STORES</Text>
            </View>
            )
          }
        }}
      />

      <Tab.Screen name="home" component={Home} 
        options={{
          tabBarIcon: ({focused}) => {
            return(
            <LinearGradient
              colors={['rgba(9,181,211,0.9)', 'rgba(55,131,244,0.9)']}
              end={{x:1, y:1}}
              start={{x:0.1, y:0.2}}
              style={StyleSheet.compose(styles.btnHome, tw`rounded-3xl `)}
            >
              <Entypo name="home" size={24} color={focused ? "blue" : "gray"} />
              <Text style={{fontSize: 12, color: "#fff"}} >HOME</Text>
            </LinearGradient>
            )
          }
        }}
      />
      
      <Tab.Screen name="favorite" component={Favorite} 
        options={{
          tabBarIcon: ({focused}) => {
            return(
            <View style={{ alignItems: 'center', justifyContent: 'center'}}>
              <MaterialIcons name="favorite" size={24} color={focused ? "red" : "gray"} />
              <Text style={{fontSize: 12, color: "#16247d"}} >FAVORITE</Text>
            </View>
            )
          },
          tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                onPress={() => {
                  getData ();
                  if (userLoged) {
                    props.onPress(); // runs the navigation if condition is met
                  } else {
                    // if condition is NOT met
                    console.log('Condição não atendida para abrir ScreenB');
                    navigation.navigate('Login')
                  }
                }}
              />
            ),
        }}
      />
    </Tab.Navigator>
  )
}


const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 5 : 5
  },
  btnHome:{
    alignItems: 'center', 
    justifyContent: 'center',
    width: Platform.OS == "ios" ? 70 : 70,
    height: Platform.OS == "ios" ? 70 : 70,
    top: Platform.OS == "ios" ? -10 : -15,
    borderRadius: Platform.OS == "ios" ? 25 : 25,             
  }
 
});
