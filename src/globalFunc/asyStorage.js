import AsyncStorage from '@react-native-async-storage/async-storage';

  //to set the data in async storage and pass to App.js to keep login and show the FAVORITE
export const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('my-key', `${value}`);
  } catch (e) {
     // saving error
  }
};


export const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('my-key');
    console.log('getData:value:', value);
    if (value !== null) {
      setConditionMet(true);
    }
  } catch (e) {
    // error reading value
  }
};


export const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // clear error
    }
    console.log('Clear All Done.')
}




// export const getAllKeys = async () => {
//   let keys = []
//   try {
//     keys = await AsyncStorage.getAllKeys()
//   } catch(e) {
//     // read key error
//   }

//   console.log('asyStorage.js keys=',keys)
//   // example console.log result:
//   // ['@MyApp_user', '@MyApp_key']
// }