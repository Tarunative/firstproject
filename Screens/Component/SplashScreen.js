import React, { useState} from 'react'
import { StyleSheet, View, Text, Image} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Splashimage from '../Images/Group-2.png';
import AsyncStorage from '@react-native-community/async-storage';
//import { useState } from 'react/cjs/react.development';
const SplashScreen=()=>{
    
    const navigation = useNavigation();
    // const getStoredData = async () =>{
    //     try{
    //        value= 
    //     }
    // }  
    //alert(setValue());  
        setTimeout((()=>{navigation.replace('OnBoardingScreen')}),3000)
    return (
      <View style={styles.container}>
          <Image source={Splashimage}
          resizeMode="contain"
          />
      </View> 
    );
        
        // else
        // {
        //     setTimeout((()=>{navigation.replace('Login')}),3000)
        //     return (
        //       <View style={styles.container}>
        //           <Image source={Splashimage}
        //           resizeMode="contain"
        //           />
        //       </View> 
        //     ); 
        // }
    //}
}
export default SplashScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCF2F8',
        alignItems: 'center',
        justifyContent: 'center',
      },
      splashtext: {
          fontSize: 40,
          fontFamily: 'serif',
    fontWeight: "bold",
    color: "#cc3399" ,
    marginRight: 10,
    marginTop: 10,
      },
      stext: {
        fontSize: 40, 
        fontFamily: 'serif',
    fontWeight: "bold", 
    color: "#cc3399" ,
    marginTop: -20,
    },
    text: {
        fontSize: 15, 
        fontFamily: 'serif',
    fontWeight: "bold", 
    color: "#cc3399" ,
    marginRight: 80,
    },
    Image: {
        width: 200,
        height: 200
    }
})