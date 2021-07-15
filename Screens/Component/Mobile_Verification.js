import React, { useState } from 'react'
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
    KeyboardAvoidingView,
    Alert
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
import Feather from 'react-native-vector-icons/Feather'
import * as constant from './Sizes';
import backIcon from '../Images/backIcon.png';
//import CallingCodePicker from 'rn-country-code-picker';
import CountryPicker from 'react-native-country-picker-modal'
const Mobile_Verification = ({ navigation, route }) => {
    //   const [countryCode, setCountryCode] = useState('SZ')
    //   const [country, setCountry] = useState()
    //   const [withCountryNameButton, setWithCountryNameButton] = useState(true)
    //   //const [withFlag, setWithFlag] = useState(true)
    //   //const [withEmoji, setWithEmoji] = useState(true)
    //   const [withFilter, setWithFilter] = useState(true)
    //   //const [withAlphaFilter, setWithAlphaFilter] = useState(false)
    //   const [withCallingCode, setWithCallingCode] = useState(true)
    //   const onSelect = (country) => {
    //     setCountryCode(country.cca2)
    //     setCountry(country)
    //   }
    //onSelect={(country) => setCountry(country)}
    //const [selectedCallingCode, setSelectedCallingCode] = useState('90'); // Give it a default value to show an initial flag and a code
    const { firstname, lastname, email, password } = route.params;
    // {console.log('first Name::', firstname,lastname,email,password)}
    const [data, setData] = useState({
        visible: true,
        mobileNo: '',
        isValidNumber: true,
        countryCode: 'SA',
        callingCode: '966',
    });
    const handleValidNumber = (val) => {
        let reg = /[0-9]/g;
        if (val.trim().length == 10 && reg.test(val) == true) {
            setData({
                ...data,
                mobileNo: val,
                isValidNumber: true
            });
        }
        else {
            setData({
                ...data,
                mobileNo: val,
                isValidNumber: false
            })

        }
    }
    const checkInput = () => {
        if (!data.mobileNo.trim()) {
            alert('Please Enter Email');
            return;
        }
    }
    const StoreData = async () => {
        if (data.mobileNo != '') {
            const params = {
                login_via: "manual",
                social_id: "",
                first_name: firstname,
                last_name: lastname,
                email: email,
                mobile: data.mobileNo,
                password: password,
                device_type: Platform.OS,
                device_id: DeviceInfo.getUniqueId(),
                device_token: "",

            };

            console.log('#. Storedata() params : ', params);
            // const formData = createFormData(state.address);
            // console.log("#. formData : ", formData);
            await axios
                .post(' http://13.235.176.85/blossom/api/user/register', params, { timeout: 3000 })
                .then(async response => {
                    console.log('#. Storedata() :: ', response.data);
                    if (response.data.statusCode === 200) {
                        Alert.alert('Account Created');
                        // userData: response.data.result;
                    } else {
                        setData(prev => ({ ...prev, visible: false }));
                        console.log('#. Storedata() else part : ', response.data);
                        Alert.alert(response.data.message);
                    }
                })
                .catch(error => {
                    setData(prev => ({ ...prev, visible: false }));
                    console.log('#. checkInput() error : ', error);
                    Alert.alert('FirstApp', ' ' + error.response.data.message);
                });
        }
        else {
            alert('Enter your mobile number');
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <TouchableOpacity style={styles.backIcon} onPress={() => navigation.navigate('SignUpScreen')}>
                        <Image source={backIcon} resizeMode="contain" />
                    </TouchableOpacity>

                    <View style={styles.container1}>
                        <Text style={styles.MobileText}>
                            Mobile Verification
                        </Text>
                        <View style={{ paddingBottom: constant.moderateScale(70) }}>
                            <Text style={{ textAlign: 'center', fontSize: constant.moderateScale(17), color: '#153745', fontFamily: 'ProductSans-Regular', marginHorizontal: constant.moderateScale(40) }}>
                                We will send you a sms with a code to the number
                            </Text>
                        </View>
                        <View style={{ marginBottom: constant.moderateScale(70) }}>
                            <View style={styles.inputTextview}>
                                {/* <TouchableOpacity>
              <Text style={{fontFamily: 'ProductSans-Bold', fontSize: constant.moderateScale(21,1),paddingLeft: constant.moderateScale(20)}}>+91</Text>
          </TouchableOpacity> */}
                                {/* <CallingCodePicker
                                selectedValue={selectedCallingCode}
                                onValueChange={value => setSelectedCallingCode(value)}
                            /> */}

                                <CountryPicker

                                    translation="eng"
                                    countryCode={data.countryCode}
                                    withCallingCodeButton="true"
                                    withFlagButton={false}
                                    withFilter
                                    //withCurrency
                                    withAlphaFilter
                                    withCallingCode
                                    withEmoji
                                    onSelect={country => {
                                        //const code = country.callingCode;
                                        console.log(
                                            '#. ',
                                            country.cca2,
                                            ' ',
                                            country.callingCode[0],
                                        );
                                        setData(prev => ({
                                            ...prev,
                                            countryCode: country.cca2,
                                            callingCode: country.callingCode[0],
                                        }));
                                    }}
                                    containerButtonStyle={{
                                        marginLeft: 15,

                                    }}

                                />
                                <Feather
                                    name="chevron-down"
                                    color="black"
                                    size={20}
                                />

                                <TextInput
                                    placeholderTextColor="#153745"
                                    maxLength={10}
                                    onChangeText={(val) => handleValidNumber(val)}
                                    //onEndEditing={(val)=> handleValidEmail(val)}
                                    style={styles.input1}
                                >
                                </TextInput>

                            </View>
                            {data.isValidNumber ? null :
                                <Animatable.View style={{ marginLeft: constant.moderateScale(20), paddingTop: constant.moderateScale(20) }} animation='fadeInLeft' duration={500}>
                                    <Text style={styles.errorMsg}>Enter 10 digit mobile number</Text>
                                </Animatable.View>
                            }
                        </View>
                        <View style={styles.sendBtnView}>
                            <TouchableOpacity style={styles.btnContainer} onPress={StoreData}>
                                <Text style={styles.SendText}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
export default Mobile_Verification;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fbe9fb',
        alignItems: 'center',
        //justifyContent: 'center',

    },
    container1: {
        //flex: 3/4
        marginTop: constant.moderateScale(50),
        //justifyContent: 'center'

    },
    backIcon: {
        //position: 'absolute',
        top: constant.moderateScale(10),
        left: constant.moderateScale(10)
    },
    MobileText: {
        fontSize: constant.moderateScale(38, 1),
        textAlign: 'center',
        lineHeight: constant.moderateScale(54),
        color: '#153745',
        fontFamily: 'TiemposHeadline-Bold',
        paddingBottom: constant.moderateScale(20)
    },
    errorMsg: {
        color: 'red',
        fontFamily: 'ProductSans-Regular',

    },
    input1: {
        backgroundColor: '#fff',
        paddingLeft: constant.moderateScale(30),
        //fontSize: constant.moderateScale(14, 1),
        //fontFamily: 'ProductSans-Regular',
        borderRadius: constant.moderateScale(12),
        width: constant.SCREEN_WIDTH / 1.06,
        //fontFamily: 'ProductSans-BoldItalic'
    },

    inputTextview: {
        borderRadius: constant.moderateScale(12),
        backgroundColor: '#fff',
        fontFamily: 'ProductSans-Bold',
        height: constant.moderateScale(55, 1),
        width: constant.SCREEN_WIDTH / 1.06,
        flexDirection: 'row',
        alignItems: 'center',

        //paddingBottom: constant.moderateScale(100),
        alignSelf: 'center'
    },
    SendText: {
        textAlign: 'center',
        color: 'white',
        fontSize: constant.moderateScale(17),
        fontFamily: 'ProductSans-Regular',
    },
    sendBtnView: {
        alignSelf: 'center'
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