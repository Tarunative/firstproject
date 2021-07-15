import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
  TextInput,
} from 'react-native';
import * as Styles from '../../styles/Index';
import {images} from '../../constants/images';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Loader from '../../reusable_components/Loader';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {BASE_URL} from '../../constants/urls';
import {english} from '../../constants/language_texts/english';
import {arabic} from '../../constants/language_texts/arabic';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import CountryPicker from 'react-native-country-picker-modal';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import SplashScreen from 'react-native-splash-screen';

const PhoneNumber = ({navigation}) => {
  const [state, setState] = useState({
    visible: true,
    language: '',
    mobileNumber: '',
    isValidMobileNumber: true,
    googleInfo: {},
    appleInfo: {},
    countryCode: 'SA',
    callingCode: '966',
  });

  /* handle mobile Authentication /
  const handleMobileNumber = val => {
    if (!/^[0-9]+$/.test(val) || val.length < 6 || val.length > 14) {
      setState(prev => ({
        ...prev,
        mobileNumber: val,
        isValidMobileNumber: false,
      }));
    } else {
      setState(prev => ({
        ...prev,
        mobileNumber: val,
        isValidMobileNumber: true,
      }));
    }
  };

  const handleValidMobileNumber = val => {
    if (!/^[0-9]+$/.test(val) || val.length < 6 || val.length > 14) {
      setState(prev => ({
        ...prev,
        mobileNumber: val,
        isValidMobileNumber: false,
      }));
      getOtpAPI();
    } else {
      setState(prev => ({
        ...prev,
        mobileNumber: val,
        isValidMobileNumber: true,
      }));
    }
  };

  /* Login with Google  /
  const googleRegistrationAPI = async userInfo => {
    const headers = {
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
      },
    };
    const params = {
      loginType: 'google',
      socialId: userInfo.user.id,
      fullName: `${userInfo.user.name}`,
      email: `${userInfo.user.email}`,
      profileImage: `${userInfo.user.photo}`,
    };
    console.log('#. params : ', params, ' headers : ', headers);
    await axios
      .post(BASE_URL + 'user/register', params, headers, {timeout: 3000})
      .then(async response => {
        if (response.data.Code === 1) {
          console.log('#. googleRegistrationAPI() : ', response.data.data);
          await AsyncStorage.setItem('userExist', '1');
          await AsyncStorage.setItem('token', response.data.data.token);
          await AsyncStorage.setItem('loginType', 'google');
          await AsyncStorage.setItem('socialId', `${userInfo.user.id}`);
          await AsyncStorage.setItem(
            'userName',
            response.data.data.user.fullName,
          );
          await AsyncStorage.setItem(
            'userEmail',
            response.data.data.user.email,
          );
          await AsyncStorage.setItem('userImage', `${userInfo.user.photo}`);
          await AsyncStorage.setItem(
            'userCallingCode',
            response.data.data.user.countryCode,
          );
          await AsyncStorage.setItem('userId', response.data.data.user._id);

          setState(prev => ({...prev, visible: false}));
          navigation.reset({
            index: 0,
            routes: [{name: 'Authenticator'}],
          });
        } else {
          setState(prev => ({...prev, visible: false}));
          console.log('#. googleRegistrationAPI() else part : ', response);
          Alert.alert('SPARCA', ' ' + response.data.message);
        }
      })
      .catch(error => {
        setState(prev => ({...prev, visible: false}));
        console.log('#. googleRegistrationAPI() error : ', error.response.data);
        Alert.alert('SPARCA', ' ' + error.response.data.message);
      });
  };

  const getOtpAPI = () => {
    if (state.mobileNumber.length > 7) {
      navigation.navigate('Otp', {
        phoneNumber: state.mobileNumber,
        callingCode: state.callingCode,
      });
    } else {
      setState(prev => ({
        ...prev,
        isValidMobileNumber: false,
      }));
    }
  };

  const GoogleConfig = () => {
    GoogleSignin.configure({
      webClientId:
        Platform.OS === 'android'
          ? '1082693498652-t9sqat72e3taocfp4aq4la5uo32je2rn.apps.googleusercontent.com'
          : '1082693498652-l6n6g6q0889of37g5gtj977v6qmpr6q1.apps.googleusercontent.com',
      offlineAccess: true,
    });
  };

  /* GoogleSignin Login /
  const GoogleLoginIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('#. GoogleLoginIn() : ', userInfo);
      setState(prev => ({
        ...prev,
        visible: true,
      }));
      googleRegistrationAPI(userInfo);
    } catch (error) {
      console.log('#. GoogleLoginIn() error : ', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // when user cancels sign in process,
        Alert.alert('Process Cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // when in progress already
        Alert.alert('Process in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // when play services not available
        Alert.alert('Play services are not available');
      } else {
        // some other error
        Alert.alert('Something else went wrong... ', error.toString());
      }
    }
  };

  /* getuser Data API /
  const guestUserLogin = async () => {
    await AsyncStorage.setItem('loginType', 'guest');
    await AsyncStorage.setItem('userExist', '2');
    navigation.reset({
      index: 0,
      routes: [{name: 'Authenticator'}],
    });
  };

  const appleRegistrationAPI = async userInfo => {
    const headers = {
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
      },
    };
    const params = {
      loginType: 'apple',
      socialId: userInfo.user,
    };
    console.log('#. params : ', params, ' headers : ', headers);
    await axios
      .post(BASE_URL + 'user/register', params, headers, {timeout: 3000})
      .then(async response => {
        if (response.data.Code === 1) {
          console.log('#. appleRegistrationAPI() : ', response.data.data);
          await AsyncStorage.setItem('userExist', '1');
          await AsyncStorage.setItem('token', response.data.data.token);
          await AsyncStorage.setItem('loginType', 'apple');
          await AsyncStorage.setItem('socialId', `${userInfo.user}`);
          await AsyncStorage.setItem(
            'userName',
            response.data.data.user.fullName,
          );
          await AsyncStorage.setItem(
            'userEmail',
            response.data.data.user.email,
          );
          await AsyncStorage.setItem(
            'userImage',
            response.data.data.user.profileImage,
          );
          await AsyncStorage.setItem(
            'userCallingCode',
            response.data.data.user.countryCode,
          );
          await AsyncStorage.setItem('userId', response.data.data.user._id);

          setState(prev => ({...prev, visible: false}));
          navigation.reset({
            index: 0,
            routes: [{name: 'Authenticator'}],
          });
        } else {
          setState(prev => ({...prev, visible: false}));
          console.log('#. appleRegistrationAPI() else part : ', response);
          Alert.alert('SPARCA', ' ' + response.data.message);
        }
      })
      .catch(error => {
        setState(prev => ({...prev, visible: false}));
        console.log('#. appleRegistrationAPI() error : ', error.response.data);
        Alert.alert('SPARCA', ' ' + error.response.data.message);
      });
  };

  /* Apple Login  ***/
  const onAppleButtonPress = async () => {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
      console.log('#. onAppleButtonPress() : ', appleAuthRequestResponse);
      setState(prev => ({
        ...prev,
        visible: true,
      }));
      appleRegistrationAPI(appleAuthRequestResponse);
    }
  };

  useEffect(() => {
    GoogleConfig();
  }, []);

  useEffect(() => {
    const selectedLanguage = async () => {
      SplashScreen.hide();
      const lang = await AsyncStorage.getItem('language');
      setState(prev => ({...prev, language: lang, visible: false}));
    };
    selectedLanguage();
  }, []);

  return (
    <View style={Styles.Containers.screenContainer1}>
      {state.visible ? (
        <Loader />
      ) : (
        <>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
            bounces={false}>
            <View style={Styles.Containers.backButtonContainer1}>
              <Text
                style={Styles.TextStyles.loginSkip}
                onPress={() => guestUserLogin()}>
                Skip
              </Text>
            </View>
            <Image
              source={images.phone_number3}
              style={Styles.ImageStyles.phonenumber1}
              resizeMode="contain"
            />
            <Text style={Styles.TextStyles.phonenumber1}>
              {state.language === 'english' ? english.login1 : arabic.login1}
            </Text>
            <Text style={Styles.TextStyles.phonenumber2}>
              {state.language === 'english' ? english.login2 : arabic.login2}
            </Text>
            <View
              style={{backgroundColor: 'transparent', height: 30, width: 30}}
            />
            <View
              style={
                state.isValidMobileNumber
                  ? Styles.Containers.phoneNumberEditView
                  : {
                      ...Styles.Containers.phoneNumberEditView,
                      ...{borderColor: 'red'},
                    }
              }>
              <View style={Styles.Containers.phoneNumberEditView1}>
                <CountryPicker
                  translation="eng"
                  countryCode={state.countryCode}
                  withCallingCodeButton="true"
                  withFlagButton={false}
                  withFilter
                  withCurrency
                  withAlphaFilter
                  onSelect={country => {
                    const code = country.callingCode;
                    console.log(
                      '#. ',
                      country.cca2,
                      ' ',
                      country.callingCode[0],
                    );
                    setState(prev => ({
                      ...prev,
                      countryCode: country.cca2,
                      callingCode: country.callingCode[0],
                    }));
                  }}
                  containerButtonStyle={{
                    marginLeft: 15,
                  }}
                />
                <Image
                  source={images.downDrop}
                  style={Styles.ImageStyles.phoneNumberDropDown}
                  resizeMode="contain"
                />
              </View>
              {/ <View style={{ width: 20, height: 10 }}></View> /}
              <TextInput
                style={Styles.TextStyles.textinputRowStyle}
                value={state.mobileNumber}
                onChangeText={val => handleMobileNumber(val)}
                placeholder={
                  state.language === 'english' ? english.login3 : arabic.login3
                }
                placeholderTextColor={
                  state.isValidMobileNumber
                    ? 'rgba(0,0,0,0.6)'
                    : 'rgb(222, 37, 37)'
                }
                keyboardType="phone-pad"
                returnKeyType="go"
                onSubmitEditing={() =>
                  handleValidMobileNumber(state.mobileNumber)
                }
              />
            </View>

            <LinearGradient
              colors={['rgba(32,45,58,1)', 'rgb(18,27,33)']}
              style={Styles.ButtonStyles.phoneNumber1}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%',
                }}
                onPress={() => getOtpAPI()}>
                <Text style={Styles.TextStyles.welcomeText3}>
                  {state.language === 'english'
                    ? english.login5
                    : arabic.login5}
                </Text>
                <Image
                  source={images.phone_number2}
                  style={Styles.ImageStyles.phonenumber2}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </LinearGradient>
            <View style={Styles.Containers.phoneNumber1}>
              <TouchableOpacity
                style={Styles.ButtonStyles.phoneNumber2}
                onPress={() => GoogleLoginIn()}>
                <Image
                  source={images.phone_number4}
                  style={Styles.ImageStyles.phonenumber3}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity style={Styles.ButtonStyles.phoneNumber2}>
                <Image
                  source={images.phone_number5}
                  style={Styles.ImageStyles.phonenumber3}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              {Platform.OS === 'ios' ? (
                <TouchableOpacity
                  style={Styles.ButtonStyles.phoneNumber2}
                  onPress={() => onAppleButtonPress()}>
                  <Image
                    source={images.phone_number6}
                    style={Styles.ImageStyles.phonenumber3}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          </KeyboardAwareScrollView>
          <Text style={Styles.TextStyles.phonenumber3}>
            {state.language === 'english' ? english.login6 : arabic.login6}{' '}
            <Text
              style={Styles.TextStyles.phonenumber4}
              onPress={() => alert('under development')}>
              {state.language === 'english' ? english.login7 : arabic.login7}
            </Text>
          </Text>
        </>
      )}
    </View>
  );
};

export default PhoneNumber;
