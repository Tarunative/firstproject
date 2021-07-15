import React, {useState, useEffect, useRef} from "react";
import { StyleSheet, Image, Dimensions, Text, View, TouchableOpacity } from "react-native";
import { color } from "react-native-reanimated";
//import AntDesign from "@expo/vector-icons/AntDesign";
import Swiper from "react-native-swiper";
// import AppLoading from "expo-app-loading";
import OnBoardingScreenimg from '../Images/OnBoardingScreenimg.png';
import OnBoardingScreenimg2 from '../Images/OnBoardingScreenimg2.png';
import OnBoardingScreenimg3 from '../Images/OnBoardingScreenimg3.png';
import * as constant from './Sizes';
const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const TOTAL_NUMBER_OF_PAGES = 3

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#fbe9fb',
  },
  imgView:{
    //justifyContent: 'flex-start',
    flex: 1/(1.7),
    //marginTop: constant.moderateScale(20),
  },
  textview:{
    flex : 1/(2.5),
    backgroundColor: '#153745',
    borderTopLeftRadius: constant.moderateScale(40),
    borderTopRightRadius: constant.moderateScale(40)
  },
  img1: {
      //flex: 2/3,
      resizeMode: 'contain',
    //justifyContent: 'flex-start',
    //paddingBottom: constant.moderateScale(10),
    //alignSelf: 'flex-start',
    //alignSelf: "center",
    // borderTopRightRadius: 80,
    // borderBottomLeftRadius: 80,
    height: h * 0.5,
    width: w ,
  },
  img2:{
    resizeMode: 'contain',
    height: h * 0.6,
    width: w * 0.9,
    alignSelf: 'center',
    marginTop: constant.moderateScale(50)
  },
  img3:{
    resizeMode: 'contain',
    height: h * 0.5,
    width: w * 1.20,
    alignSelf: 'center',
    marginTop: constant.moderateScale(30),
    marginStart: constant.moderateScale(30)
  },
  title: {
    color: 'white',
    fontFamily: 'TiemposHeadline-Semibold',
    alignSelf: 'center',
    textAlign: 'center',
    lineHeight: constant.moderateScale(54),
    // marginTop: 60,
    // marginHorizontal: 10,
    fontSize: constant.moderateScale(32),
    marginTop: constant.moderateScale(20)
  },
  btncontainer:{
    // marginTop: constant.moderateScale(30)
    flex: 1,
    //alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: constant.moderateScale(10)
  },
  btn: {
    borderRadius: constant.moderateScale(32),
    backgroundColor: '#C92489',
    width: constant.moderateScale(100),
    height: constant.moderateScale(45),
    justifyContent: 'center',
   //marginTop: constant.moderateScale(30),
    alignSelf: 'center',
    //position: "absolute",
    //top: h * 0.2
    //bottom: constant.moderateScale(10)
  },
  text: {
    color: 'white',
    fontFamily: 'ProductSans-Bold',
    //marginTop: 20,
    fontSize: constant.moderateScale(17),
    textAlign: 'center'
    //marginLeft: 10,
  },
});

const OnBoardingScreen = ({navigation,onDone}) => {
  
    const swiperRef = useRef()
    const currentStep = useRef(0);
    const onNext = () => {
        if (currentStep.current < TOTAL_NUMBER_OF_PAGES - 1) { 
          swiperRef?.current?.scrollBy(1); // go forward one page
          currentStep.current += 1
        } //else {
          //navigation.navigate('Login')
        //}
      }
    
      const onIndexChanged = (ind) => {
        currentStep.current = ind
      }
  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // } else {
  return (
      <Swiper
      
        // buttonWrapperStyle={{
        //   backgroundColor: "transparent",
        //   flexDirection: "row",
        //   position: "absolute",
        //   bottom: 0,
        //   left: 0,
        //   //flex: 1,
        //   paddingHorizontal: 30,
        //   paddingVertical: 20,
        //   justifyContent: "flex-end",
        //   alignItems: "flex-end",
        // }}
        style={styles.wrapper}
        //yourNewPageIndex={this.state.newIndex}
        showsButtons={false}
        ref={swiperRef}
        onIndexChanged={onIndexChanged}
        activeDotColor="#C92489"
        dotColor="#998FA2"
        paginationStyle={{
          //flex: 2/3,
          alignSelf: 'center',
          //marginRight: w * 0.05,

          marginBottom: h * 0.09,
        }}

        loop={false}
        // nextButton={
        //   <View
        //     style={{
        //       height: 60,
        //       borderRadius: 30,
        //       alignItems: "center",
        //       justifyContent: "center",
        //       width: 60,
        //       backgroundColor: "#8A56AC",
        //     }}
        //   >
        //     {/* <AntDesign name="arrowright" size={22} color="#FFF" /> */}
        //   </View>
        // }
        // prevButton={
        //   <View
        //     style={{
        //       height: 60,
        //       borderRadius: 30,
        //       alignItems: "center",
        //       justifyContent: "center",
        //       width: 60,
        //       backgroundColor: "#8A56AC",
        //       marginHorizontal: 20,
        //     }}
        //   >
        //     {/* <AntDesign name="arrowleft" size={22} color="#FFF" /> */}
        //   </View>
        // }
      >
        <View style={styles.container}>
            <View style={styles.imgView}>
          <Image source={OnBoardingScreenimg} style={styles.img1} />
          </View>
          <View style={styles.textview}>
          <Text style={styles.title}>Find local {'\n'} Business near you</Text>
          <View style={styles.btncontainer}>
          <TouchableOpacity style={styles.btn} onPress={onNext}> 
              <Text style={styles.text}>
                 Next 
              </Text>
          </TouchableOpacity>
          </View>
          </View>
          
        </View>
        <View style={styles.container}>
        <View style={styles.imgView}>
          <Image source={OnBoardingScreenimg2} style={styles.img2} />
          </View>
          <View style={styles.textview}>
          <Text style={styles.title}>Book your {'\n'} favourite serves</Text>
          <View style={styles.btncontainer}>
          <TouchableOpacity style={styles.btn} onPress={onNext}> 
              <Text style={styles.text}>
                 Next 
              </Text>
          </TouchableOpacity>
          </View>
          </View>
        </View>
        <View style={styles.container}>
        <View style={styles.imgView}>
          <Image source={OnBoardingScreenimg3} style={styles.img3} />
          </View>
          <View style={styles.textview}>
          <Text style={styles.title}>Purchase products {'\n'} directly from the store</Text>
          <View style={styles.btncontainer} >
          <TouchableOpacity style={styles.btn} onPress={onDone}> 
              <Text style={styles.text}>
                 Next 
              </Text>
          </TouchableOpacity>
          </View>
          </View>
        </View>
        {/* <View style={styles.container}>
        <View style={styles.imgView}>
          <Image source={OnBoardingScreen1img} style={styles.img} />
          </View>
          <View style={styles.textview}>
          <Text style={styles.title}>Book your {'\n'} favourite serves</Text>
         
          </View>
        </View> */}
      </Swiper>
  );
  // }
};

export default OnBoardingScreen;
