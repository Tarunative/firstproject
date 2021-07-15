import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//import { vw,vh } from 'react-native-viewport-units';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather'
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { LoginManager, GraphRequest, GraphRequestManager } from "react-native-fbsdk";
// import { LoginButton, AccessToken } from 'react-native-fbsdk';

import AsyncStorage from '@react-native-community/async-storage';
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
  Alert,
  KeyboardAvoidingView,
  StatusBar
} from 'react-native';
import * as constant from './Sizes';
import backIcon from '../Images/backIcon.png';
import flowerpot from '../Images/Group21.png';
import appleImg from '../Images/apple.png';
import fbImg from '../Images/facebook_icon.png';
import { useState } from 'react/cjs/react.production.min';
const { width, height } = Dimensions.get('window');
const Login = () => {
  // const [userloginData,setuserloginData]=useState();
  //const [logidata, setLoginData] = useState();
  const [data,setData]= React.useState({
    email: '',
    password: '',
    userloginData: '',
    isValidEmail: true,
    visible: true,
    isValidPassword: true,
    secureTextEntry: true
  });
  
  //console.warn(AsyncStorage.getItem('alreadyLaunched'));
  const navigation = useNavigation();
  // const TextInputChange=(val)=>{
       
  // }
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
            email: '',
            isValidEmail: false
          })
    }
  }
  const handleValidPassword=(val)=>{
    if(val.trim().length >= 9){
      setData({
        ...data,
        password: val,
        isValidPassword: true
      })
    }
    else
    {
      setData({
        ...data,
        password: '',
        isValidPassword: false
      })
    }
  }
  const updateSecureTextEntry=()=>{
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    })
  }
  
  const fbLogin=(resCallback)=>{
  LoginManager.logOut;
  return LoginManager.logInWithPermissions(['email',"public_profile"]).then(
    result=> {
      console.log("fb result=======>" ,result)
      if(result.declinedPermissions && result.declinedPermissions.includes("email"))
      {
        resCallback({message: 'Email is required'})
      }
      if (result.isCancelled) {
        console.log("Login cancelled");
      } else {
        const infoRequest=new GraphRequest(
          '/me?fields=emal,name,picture',
          null,
          resCallback
        )
        new GraphRequestManager().addRequest(infoRequest).start()
        console.log(
          "Login success with permissions: " +
            result.grantedPermissions.toString()
        );
      }
    },
  
    function(error) {
      console.log("Login fail with error: " + error);
    }
  );
  }
  const onfblogin= async()=>{
    try{
      await fbLogin(_responseInfoCallBack)
    }catch (error){
      console.log(LoginManager.logInWithPermissions)
      console.log("error raised",error)
    }
  }
  const _responseInfoCallBack= async(error,result)=>{
    if(error){
      console.log("error top",error)
    }
    else{
      const userData=result;
      console.log("user_data+======", userData)
    }
  }
  const UserLogin = async () => {
    //setData(prev => ({...prev, visible: true}));
    if(data.email!='' && data.password!='')
    {
    const params = {
      login_via : "manual",
      social_id : "",
      email: data.email,
      password: data.password,
      device_type : "android",
      device_id : "asdf123456asdf",
      device_token : "" 
      
        
    };

    console.log('#. UserLogin() params : ', params);
    // const formData = createFormData(state.address);
    // console.log("#. formData : ", formData);
    await axios
      .post(' http://13.235.176.85/blossom/api/user/login', params, {timeout: 3000})
      .then(async response => {
        // console.log('#. UserLogin() :: ', response.data.result);
        if (response.data.statusCode === 200) {
          Alert.alert('Login Successfull');
          // setuserloginData(userloginData = response.data.result)
          setData(prev => ({...prev, userloginData: response.data.result}));
          console.log("LoGin Details========>",data.userloginData.first_name)
        } else {
          setData(prev => ({...prev, visible: false}));
          console.log('#. UserLogin() else part : ', response.data);
          Alert.alert('Please enter valid email or password');
        }
      })
      .catch(error => {
        setData(prev => ({...prev, visible: false}));
        console.log('#. UserLogin() error : ', error);
        Alert.alert('FirstApp', ' ' + error.response.data.message);
      });
    }
    else{
      if(data.email=='')
      {
        alert('please enter your enail')
      }
      if(data.password=='')
      {
        alert('please enter password')
      }
    }
  };
  const SendUserData=()=>{
    navigation.navigate('PaymentGateway',
                         {paymentDetails: data.userloginData
                         })
  }
  return (  
    
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={false}
        backgroundColor="black"
        //translucent={true}
        barStyle='dark-content'
        //showHideTransition={statusBarTransition}
        hidden={false} />
      <KeyboardAvoidingView>
      <ScrollView showsVerticalScrollIndicator={false}>     
      {/* <KeyboardAwareScrollView> */}
        <View style={{marginBottom: constant.moderateScale(40)}}> 
          <TouchableOpacity>
            <Image style={styles.backIcon} source={backIcon} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={styles.welcome}>Login to your account</Text>
          <View style={styles.inputText}>
            <Image style={styles.flowerpot} source={flowerpot} resizeMode="contain" />
            <TextInput
              placeholder="Email Address (e.g:-rahul@gmail.com)"
              placeholderTextColor="#153745"
              style={styles.input1}
              dataValue={data.email}
              //onChangeText={(val)=> TextInputChange(val)}
              onEndEditing={(e)=> handleValidEmail(e.nativeEvent.text)}
              underlineColorAndroid="transparent"
              // spellCheck={false}
              // autoCorrect={false}
              keyboardType='email-address'
            />
            
          </View>
          {data.isValidEmail ? null :
          <Animatable.View style={{marginLeft: constant.moderateScale(20)}} animation='fadeInLeft' duration={500}>
          <Text style={styles.errorMsg}>Email format is not valid</Text>
          </Animatable.View>
          }
          <View style={styles.inputText}>
            <TextInput
            
              placeholder="Password"
              placeholderTextColor="#153745"
              dataValue={data.password}
              secureTextEntry={data.secureTextEntry? true: false}
              style={styles.input1}
              //underlineColorAndroid="transparent"
              autoCapitalize="none"
              onChangeText={(val)=> handleValidPassword(val)}
            />
            <TouchableOpacity style={{position: 'absolute',right: 20}} onPress={updateSecureTextEntry}>
              {data.secureTextEntry?
              <Feather 
              name="eye-off"
              color="grey"
              size={20}
              />:
              <Feather 
              name="eye"
              color="grey"
              size={20}
              />
            }
            </TouchableOpacity>
            
          </View>
          {data.isValidPassword ? null :
          <Animatable.View style={{marginLeft: constant.moderateScale(20)}} animation='fadeInLeft' duration={500}>
          <Text style={styles.errorMsg}>Password must be 8 chracters long</Text>
          </Animatable.View>
          }
          <View style={{ alignItems: 'flex-end', marginEnd: constant.moderateScale(10), marginTop: constant.moderateScale(10) }}>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={{ color: '#153745' ,fontFamily: 'ProductSans-Regular',fontSize: constant.moderateScale(17, 1)}}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={UserLogin}>
              <Text style={styles.loginText}>Log In</Text>
              
            </TouchableOpacity>
          </View>
          <Text style={styles.loginwith}>Or Login With</Text>
          {/* <View>
        <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")}/>
      </View> */}
          <View style={styles.loginwithContainer}>
            <TouchableOpacity style={styles.applecontainer} onPress={SendUserData}>
              <Image style={styles.appleImg} source={appleImg}

              />
              <Text style={styles.applebtn}>Apple</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applecontainer} onPress={onfblogin}>
              <Image style={styles.appleImg} source={fbImg}
              />
              <Text style={styles.applebtn}>Facebook</Text>
            </TouchableOpacity>
          </View>        
          </View>
          {/* </ScrollView>  */}
                 
          
      
      </ScrollView>
      </KeyboardAvoidingView>  
      {/* </KeyboardAwareScrollView> */}
      <View style={styles.signupview}>
        <Text style={styles.didnottext}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={styles.signupText}>  SignUp</Text>
        </TouchableOpacity>
      </View>
         
      
    </SafeAreaView> 
  );
};
export default Login;
const styles = StyleSheet.create({
  container: {
    //width: width,
    //height: height,
    flex: 1,
    backgroundColor: '#fbe9fb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    //position: 'absolute',
    top: constant.moderateScale(10),
    left: constant.moderateScale(10)
  },
  welcome: {
    // top: constant.moderateScale(20),
    fontSize: constant.moderateScale(38, 1.5),
    // fontWeight: 'bold',
    color: '#153745',
    textAlign: 'center',
    marginBottom: constant.moderateScale(40),
    marginTop: constant.moderateScale(20),
    fontFamily: 'TiemposHeadline-Bold',
    marginHorizontal: constant.moderateScale(40)
  },
  flowerpot: {
    position: 'absolute',
    width: constant.moderateScale(50),
    height: constant.moderateScale(100),
    alignSelf: 'flex-end',
    bottom: constant.moderateScale(55, 1),
    right: constant.moderateScale(10),
  },
  errorMsg:{
    color: 'red',
    fontFamily: 'ProductSans-Regular', 
  },
  inputText: {
    flexDirection: 'row',
    margin: constant.moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  input1: {
    width: constant.SCREEN_WIDTH / 1.06,
    height: constant.moderateScale(55, 1),
    backgroundColor: '#fff',
    paddingLeft: constant.moderateScale(20),
    fontSize: constant.moderateScale(14, 1),
    borderRadius: constant.moderateScale(12),
    fontFamily: 'ProductSans-Regular'
  },
  
  btnContainer: {
    width: constant.SCREEN_WIDTH / 1.06,
    height: constant.moderateScale(55, 1),
    margin: constant.moderateScale(10),
    marginTop: constant.moderateScale(20),
    borderRadius: constant.moderateScale(12),
    justifyContent: 'center',
    backgroundColor: '#cc3399',
  },

  loginText: {
    textAlign: 'center',
    color: 'white',
    fontSize: constant.moderateScale(17),
    fontFamily: 'ProductSans-Regular'
  },
  loginwith: {
    marginTop: constant.moderateScale(5),
    color: '#153745',
    alignSelf: 'center',
    fontSize: constant.moderateScale(17),
    fontFamily: 'ProductSans-Regular'
  },
  loginwithContainer: {
    flexDirection: 'row',
    //height: constant.moderateScale(55, 1),
    justifyContent: 'space-around',
    marginTop: constant.moderateScale(10),
  },
  applecontainer: {
    flexDirection: 'row',
    height: constant.moderateScale(55, 1),
    marginTop: constant.moderateScale(10),
    width: constant.moderateScale(150),
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    //marginBottom: constant.moderateScale(40)
  },
  applebtn: {
    color: '#153745',
    fontSize: constant.moderateScale(17, 1),
    paddingLeft: constant.moderateScale(15),
    fontFamily: 'ProductSans-Regular'
  },
  appleImg: { 
    paddingLeft: constant.moderateScale(20), 
    width: constant.moderateScale(20), 
    height: constant.moderateScale(24), 
     resizeMode: 'contain'
},
  // fbImage: { 
  //   width: constant.moderateScale(25), 
  //   height: constant.moderateScale(24), 
  //   resizeMode: 'contain'
  // },
  signupview: {
    //flex: 1/2,
    backgroundColor: '#fbe9fb',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    //marginTop: constant.moderateScale(10),
    paddingBottom: constant.moderateScale(10),
    //paddingTop: constant.moderateScale(10),
    flexDirection: 'row',
    justifyContent: 'center',
    //alignSelf: 'center'
    //left: constant.moderateScale(20)
  },
  didnottext: {
    fontSize: constant.moderateScale(20, 1),
    fontFamily: 'ProductSans-Regular',
    color: '#000000',
  },
  signupText: {
    fontSize: constant.moderateScale(20, 1),
    //fontWeight: 'bold',
    color: '#cc3399',
    fontFamily: 'ProductSans-Bold'
  },
});