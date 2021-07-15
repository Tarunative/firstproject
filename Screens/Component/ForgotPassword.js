import React from 'react'
import * as Animatable from 'react-native-animatable';
import {
    SafeAreaView,
    Image,
    TextInput,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView
  } from 'react-native';
import * as constant from './Sizes';
import backIcon from '../Images/backIcon.png';
const ForgotPassword=({navigation})=>{

  const [data,setData]= React.useState({
    email: '',
    isValidEmail: true,
  });
  const handleValidEmail=(val)=>{
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if(reg.test(val)=== true){
         setData({
           ...data,
           email: val,
           isValidEmail: true
         });
    }
    else{
          setData({
            ...data,
            isValidEmail: false
          })
    }
  }
  const checkInput = () =>{
    if(!data.email.trim())
    {
      alert('Please Enter Email');
      return;
    }
  }
    return (
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView>
            <ScrollView showsVerticalScrollIndicator={false}> 
            <TouchableOpacity style={styles.backIcon} onPress={()=>navigation.navigate('Login')}>
            <Image  source={backIcon} resizeMode="contain" />
          </TouchableOpacity>
          
      <View style={styles.container1}>  
          <Text style={styles.ForgotPasswordText}> 
              Forgot {'\n'} Password
          </Text>
          <View style={{paddingBottom: constant.moderateScale(30)}}>
              <Text style={{textAlign: 'center', fontSize: constant.moderateScale(17),color: '#153745',fontFamily: 'ProductSans-Regular'}}>
              Please enter your registered email address. {'\n'} We will send the instructions.
              </Text>
          </View>
          <View style={styles.inputTextview}> 
          <TextInput
              placeholder="Email Address (e.g:-rahul@gmail.com)"
              placeholderTextColor="#153745"
              onChangeText={(val)=> handleValidEmail(val)}
              //onEndEditing={(val)=> handleValidEmail(val)}
              style={styles.input1}
            />
            {data.isValidEmail ? null :
          <Animatable.View style={{marginLeft: constant.moderateScale(20), paddingTop: constant.moderateScale(10)}} animation='fadeInLeft' duration={500}>
          <Text style={styles.errorMsg}>Email format is not valid</Text>
          </Animatable.View>
          }
          </View>
          
          <View style={styles.sendBtnView}>
            <TouchableOpacity style={styles.btnContainer} onPress={checkInput}>
              <Text style={styles.loginText}>Send</Text>
            </TouchableOpacity>
          </View>
          </View> 
          </ScrollView>
          </KeyboardAvoidingView>
      </SafeAreaView>
    );
}
export default ForgotPassword;
const styles = StyleSheet.create({
   container:{
    flex: 1,
    backgroundColor: '#fbe9fb',
    alignItems: 'center',
    //justifyContent: 'center',
   },
   container1:{
    //flex: 3/4
    marginTop: constant.moderateScale(80),
    //justifyContent: 'flex-start'

   },
   backIcon: {
    position: 'absolute',
    top: constant.moderateScale(10),
    left: constant.moderateScale(0)
  },
  ForgotPasswordText: {
    fontSize: constant.moderateScale(38,1), 
    textAlign: 'center',
    lineHeight: constant.moderateScale(54),
    color: '#153745',
    fontFamily: 'TiemposHeadline-Bold',
    paddingBottom: constant.moderateScale(20)
  },
  errorMsg:{
    color: 'red',
    fontFamily: 'ProductSans-Regular',
    
  },
  input1: {
     backgroundColor: '#fff',
     paddingLeft: constant.moderateScale(20),
     fontSize: constant.moderateScale(14, 1),
     fontFamily: 'ProductSans-Regular',
     borderRadius: constant.moderateScale(12),
     height: constant.moderateScale(55, 1),
     width: constant.SCREEN_WIDTH / 1.06, 
     //fontFamily: 'ProductSans-BoldItalic'
  },  
  
  inputTextview: {
     paddingBottom: constant.moderateScale(100),
  }, 
  loginText: {
    textAlign: 'center',
    color: 'white',
    fontSize: constant.moderateScale(17),
    fontFamily: 'ProductSans-Regular',
  },
  sendBtnView:{
    //paddingTop: constant.moderateScale(80)
    //marginBottom: constant.moderateScale(30)
  },
  btnContainer: {
    width: constant.SCREEN_WIDTH / 1.06,
    height: constant.moderateScale(55, 1),
    //margin: constant.moderateScale(10),
    //marginTop: constant.moderateScale(20),
    //paddingBottom: constant.moderateScale(20),
    //bottom: constant.moderateScale(20),
    borderRadius: constant.moderateScale(12),
    justifyContent: 'center',
    backgroundColor: '#cc3399',
  },

})