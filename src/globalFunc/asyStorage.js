import AsyncStorage from '@react-native-async-storage/async-storage';


//to store multi data in async storage 
export const storeData = async (yesno, userid) => {
  const firstPair = ["@userloged", `${yesno}`]
  const secondPair = ["@userlogedId", `${userid}`]
  try {
    await AsyncStorage.multiSet([firstPair, secondPair])
  } catch (e) {
     // saving error
  }
};




export const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('my-key');
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

export const printAllData = async () => {
      try {
        const allKeys = await AsyncStorage.getAllKeys();
        const data = await AsyncStorage.multiGet(allKeys);
        console.log('Dados salvos no AsyncStorage:');
        data.forEach(item => {
          console.log(`${item[0]}: ${item[1]}`);
        });
      } catch (error) {
        console.error('Erro ao imprimir dados do AsyncStorage:', error);
      }
    };