import React from 'react';
import {
    SafeAreaView,
    Image,
    TextInput,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    ScrollView
  } from 'react-native';
  import * as constant from './Sizes';
  import OnBoardingScreen1img2 from '../Images/OnBoardingScreenimg2.png';
  const OnBoardingScreen2=()=>{
      return(
          <View style={styles.container}>
               <View style={styles.header}>
               <Image style={styles.imageView} source={OnBoardingScreen1img2} resizeMode="contain" />
               </View>
               <View style={styles.footer}>
               <Text style={styles.text}>
               Book your {'\n'} favourite serves
               </Text>
               <TouchableOpacity style={styles.button}>
                   <Text style={{textAlign: 'center', alignContent: 'center', color: 'white'}}>
                      Next 
                   </Text>
               </TouchableOpacity>
               </View>
          </View>
      );
  };
  export default OnBoardingScreen2;
  const styles=StyleSheet.create({
        container:{
            flex: 1,
            backgroundColor: '#fbe9fb',
        },
        header:{
            flex: 2,
        },
        imageView:{
            width: constant.moderateScale(253), 
            height: constant.moderateScale(482),
            marginTop: constant.moderateScale(66),
            alignSelf: 'center'
            
        },
        footer:{
            flex : 1,
            backgroundColor: '#153745',
            borderTopLeftRadius: constant.moderateScale(40),
            borderTopRightRadius: constant.moderateScale(40)
        },
        text:{
            color: 'white',
            fontFamily: 'TiemposHeadline-Semibold',
            fontSize: constant.moderateScale(36,0.5),
            textAlign: 'center',
            lineHeight: constant.moderateScale(54),
            paddingTop: constant.moderateScale(20)
        },
        button:{
            backgroundColor: '#C92489',
            borderRadius: constant.moderateScale(20),
            width: constant.moderateScale(90),
            height: constant.moderateScale(40),
            alignSelf: 'center',
            paddingTop: constant.moderateScale(10),
            marginTop: constant.moderateScale(50)
        }
  });