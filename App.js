import { StyleSheet, Platform } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "./src/screen/Home";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.root}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>

          <Stack.Screen 
            name="Home" 
            component={Home}
          />
        
          {/* <Stack.Screen 
            name="PhotoList" 
            component={PhotoList} 
          />

          <Stack.Screen 
            name="Question" 
            component={Question} 
          /> */}

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 5 : 5
  },
 
});
