import { StyleSheet, Platform } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default StyleSheet.create({
  root: {
    flex: 1,
    margin: 10,
    padding: 10,
    paddingTop: Platform.OS === 'android' ? 5 : 5,
  },
  container: {
    flex: 1,
    padding: Platform.OS === 'android' ? 5 : 5,
  },
  textTitle:{
    fontSize: hp(4),
    color: 'white',
    fontWeight:'500'
  },
  textNormal: {
    fontSize: hp(2)
  },
  icons: {
    width: wp(20),
    height: wp(19),
    borderRadius: 10
  },
  


  storeColors: {
    text: '#0D163A',
    redHeart: '#F73434'
  } 
  
});