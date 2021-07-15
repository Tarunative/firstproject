
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import React and Component
import React, {useRef, useState, useEffect} from 'react';

// Import Navigators from React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import Mobile_Verification from './Screens/Component/Mobile_Verification';
// Import Screens

import Login from './Screens/Component/Login'
import SplashScreen from './Screens/Component/SplashScreen'
import ForgotPassword from './Screens/Component/ForgotPassword'
import OnBoardingScreen from './Screens/Component/OnBoardingScreen';
import OnBoardingScreen2 from './Screens/Component/OnBoardingScreen2';
import SignUpScreen from './Screens/Component/SignUpScreen'
import SplashScreen2 from './Screens/Component/SplashScreen2';
import HomeScreen from './Screens/Component/HomeScreen';
import PaymentGateway from './Screens/Component/PaymentGateway';
//import Try from './Screens/Component/Try';
const Stack = createStackNavigator();
//const Tab = createBottomTabNavigator();
// const Auth = ({navigation}) => {
//   // Stack Navigator for Login and Sign up Screen
//   return (
//     <Stack.Navigator>
//       {/* <Stack.Screen
//         name="Try"
//         // component={Try}
//         // options={{ headerShown: false }}
//       >
//         {() => <Try onDone={handleDone} />}
//         </Stack.Screen> */}
//       {/* <Stack.Screen
//         name="OnBoardingScreen"
//         component={OnBoardingScreen}
//         options={{ headerShown: false }}
//       /> */}
//       {/* <Stack.Screen
//         name="OnBoardingScreen2"
//         component={OnBoardingScreen2}
//         options={{ headerShown: false }}
//       /> */}
//       {/* <Stack.Screen
//         name="Login"
//         component={Login}
//         options={{ headerShown: false }}
//       /> */}
//       <Stack.Screen
//         name="ForgotPassword"
//         component={ForgotPassword}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// };
var flag=0;
const App = ({navigation}) => {
  //const [counter, setCounter]=useState(true)
  
  const [loading, setLoading]=  useState(true);
  const [isFirstTimeLoad, setIsFirstTimeLoad]= useState(false);
  const checkForFirstTimeLoaded = async ()=> {
    const result = await AsyncStorage.getItem('isFirstTimeOpen');
    if(result === null)
    {
      setIsFirstTimeLoad(true);
    }
    setLoading(false)
  }
  useEffect(()=>{
    checkForFirstTimeLoaded()
  },[]);
  const handleDone = () =>{
       setIsFirstTimeLoad(false);
       flag=1
       //setCounter(false)
       AsyncStorage.setItem('isFirstTimeOpen','no')
  }
  if(loading)
  {
    return null;
  }if(isFirstTimeLoad){
     return(
      <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* SplashScreen which will come once for 5 Seconds */}

        {/* Auth Navigator: Include Login and Signup */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false}}
        /> */}
         <Stack.Screen
         name="OnBoardingScreen"
         //component={OnBoardingScreen}
         options={{ headerShown: false }}
       >
         {() => <OnBoardingScreen onDone={handleDone} />}
         </Stack.Screen>
         {/* <Stack.Screen 
          name="Login"
          component={Login}
          options={{headerShown: false}}          
          /> */}
         <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
       />
       
      </Stack.Navigator>
    </NavigationContainer>
     )
  }
  if(!isFirstTimeLoad && flag==1)
  { 
    //AsyncStorage.setItem('FirstLaunch','yes')
    //setCounter(false)
    return(
      <NavigationContainer>
        <Stack.Navigator>
        {/* <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{ headerShown: false }}
        /> */}
        {/* <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{ headerShown: false }}
        /> */}
          <Stack.Screen 
          name="Login"
          component={Login}
          options={{headerShown: false}}          
          />
          <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
       />
       <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ headerShown: false }}
       />
       <Stack.Screen 
       name="Mobile_Verification"
       component={Mobile_Verification}
       options={{headerShown: false}}
       />
       <Stack.Screen 
       name='HomeScreen'
       component={HomeScreen}
       options={{headerShown: false}}
       />
       <Stack.Screen 
       name="PaymentGateway"
       component={PaymentGateway}
       options={{headerShown: false}}
       />
        </Stack.Navigator>
      </NavigationContainer>
    ) 
  }
  else{
    
    //setValue();
    //alert(JSON.stringify(AsyncStorage.getItem('value')))
    return(
      
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen2">
        <Stack.Screen
          name="SplashScreen2"
          component={SplashScreen2}
          // Hiding header for Splash Screen
          options={{ headerShown: false }}
        />

        <Stack.Screen 
        name="Login"
        component={Login}
        options={{headerShown: false}}          
        />
        <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
       />
       <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ headerShown: false }}
       />
       <Stack.Screen 
       name="Mobile_Verification"
       component={Mobile_Verification}
       options={{headerShown: false}}
       />
       <Stack.Screen 
       name='HomeScreen'
       component={HomeScreen}
       options={{headerShown: false}}
       />
       <Stack.Screen 
       name="PaymentGateway"
       component={PaymentGateway}
       options={{headerShown: false}}
       />
        </Stack.Navigator>
      </NavigationContainer>
    ) 
  }
};
export default App;