import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Animatable from 'react-native-animatable';
import backIcon from '../Images/backIcon.png';
import Feather from 'react-native-vector-icons/Feather'
import CheckBox from 'react-native-check-box'
import checkboximage from '../Images/checkbox_selected.png'
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';

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
    Alert,
    Platform
} from 'react-native';
import * as constant from './Sizes';
import Login from './Login';
import { useState } from 'react/cjs/react.production.min';
const { width, height } = Dimensions.get('window');
const SignUpScreen = () => {
    const navigation = useNavigation();
    const [toggleCheckBox, setToggleCheckBox] = React.useState(false);
    const [data, setData] = React.useState({
        Firstname: '',
        Lastname: '',
        email: '',
        password: '',
        isValidName: true,
        isValidLastName: true,
        isValidEmail: true,
        isValidPassword: true,
        secureTextEntry: true
    });
    //const Tab = createBottomTabNavigator();
    const handleValidName = (val) => {
        let reg = /[A-Za-z]/g;
        if (reg.test(val) == true) {
            setData({
                ...data,
                Firstname: val,
                isValidName: true
            });
        }
        else {
            setData({
                ...data,
                isValidName: false
            })
        }
    }
    const handleValidLastName = (val) => {
        let reg = /[A-Za-z]/g;
        if (reg.test(val) == true) {
            setData({
                ...data,
                Lastname: val,
                isValidLastName: true
            });
        }
        else {
            setData({
                ...data,
                isValidLastName: false
            })
        }
    }
    const handleValidEmail = (val) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(val) === true) {
            setData({
                ...data,
                email: val,
                isValidEmail: true
            });
        }
        else {
            setData({
                ...data,
                isValidEmail: false
            })
        }
    }
    const handleValidPassword = (val) => {
        if (val.trim().length >= 9) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            })
        }
        else {
            setData({
                ...data,
                isValidPassword: false
            })
        }
    }
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }
    const checkInput = async () => {
        // if (data.email != '' && data.password != '' && data.Firstname != '' && data.Lastname != '' && toggleCheckBox!=false) {
        //     const params = {
        //         login_via: "manual",
        //         social_id: "",
        //         first_name: data.Firstname,
        //         last_name: data.Lastname,
        //         email: data.email,
        //         mobile: "1234567899",
        //         password: data.password,
        //         device_type: Platform.OS,
        //         device_id: DeviceInfo.getUniqueId(),
        //         device_token: "",

        //     };

        //     console.log('#. checkInput() params : ', params);
        //     // const formData = createFormData(state.address);
        //     // console.log("#. formData : ", formData);
        //     await axios
        //         .post(' http://13.235.176.85/blossom/api/user/register', params, { timeout: 3000 })
        //         .then(async response => {
        //             console.log('#. checkInput() :: ', response.data);
        //             if (response.data.statusCode === 200) {
        //                 Alert.alert('Account Created');
        //             } else {
        //                 setData(prev => ({ ...prev, visible: false }));
        //                 console.log('#. checkInput() else part : ', response.data);
        //                 Alert.alert(response.data.message);
        //             }
        //         })
        //         .catch(error => {
        //             setData(prev => ({ ...prev, visible: false }));
        //             console.log('#. checkInput() error : ', error);
        //             Alert.alert('FirstApp', ' ' + error.response.data.message);
        //         });
        // }
        if (data.email != '' && data.password != '' && data.Firstname != '' && data.Lastname != '' && toggleCheckBox!=false)
        {
            navigation.navigate('Mobile_Verification',
                         {firstname: data.Firstname,
                         lastname: data.Lastname,
                         email: data.email,
                         password: data.password})
        }
        else {
            if (!data.Firstname.trim()) {
                alert('Please Enter First Name');
                return;
            }
            if (!data.Lastname.trim()) {
                alert('Please Enter Last Name');
                return;
            }
            if (!data.email.trim()) {
                alert('Please Enter Email');
                return;
            }
            if (!data.password.trim()) {
                alert('Please Enter Password');
                return;
            }
            if (toggleCheckBox === false) {
                alert('Please select terms and conditions')
            }
        }

        // if(!data.Firstname.trim())
        // {
        //     alert('Please Enter First Name');
        //     return;
        // }
        // if(!data.Lastname.trim())
        // {
        //     alert('Please Enter Last Name');
        //     return;
        // }
        // if(!data.email.trim())
        // {
        //     alert('Please Enter Email');
        //     return;
        // }
        // if(!data.password.trim())
        // {
        //     alert('Please Enter Password');
        //     return;
        // }
        // if(toggleCheckBox == false)
        // {
        //     alert('Please select terms and conditions')
        // }
    };
    
    return (
        //  <View style={styles.container}>


        <KeyboardAvoidingView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* <KeyboardAwareScrollView> */}
                <View style={{ widht: width, marginBottom: constant.moderateScale(0) }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Image style={styles.backIcon} source={backIcon} resizeMode="contain" />
                    </TouchableOpacity>
                    <View style={styles.createView}>
                        <Text style={styles.createAccText}>
                            Create an {'\n'} account
                        </Text>
                    </View>
                    <View style={styles.inputTextview}>
                        <TextInput
                            placeholder="First name"
                            placeholderTextColor="#153745"
                            style={styles.input}
                            maxLength={15}
                            dataValue={data.Firstname}
                            onChangeText={(val) => handleValidName(val)}
                            //onEndEditing={(e) => handleValidName(e.nativeEvent.text)}
                        />
                        {data.isValidName ? null :
                            <Animatable.View style={{ marginLeft: constant.moderateScale(20), paddingTop: constant.moderateScale(10) }} animation='fadeInLeft' duration={500}>
                                <Text style={styles.errorMsg}>Enter correct name</Text>
                            </Animatable.View>
                        }
                    </View>
                    <View style={styles.inputTextview}>
                        <TextInput
                            placeholder="Last name"
                            placeholderTextColor="#153745"
                            style={styles.input}
                            maxLength={15}
                            dataValue={data.Lastname}
                            //onChangeText={(val) => handleValidLastName(val)}
                            onEndEditing={(e) => handleValidLastName(e.nativeEvent.text)}
                        />
                        {data.isValidLastName ? null :
                            <Animatable.View style={{ marginLeft: constant.moderateScale(20), paddingTop: constant.moderateScale(10) }} animation='fadeInLeft' duration={500}>
                                <Text style={styles.errorMsg}>Enter correct Lastname</Text>
                            </Animatable.View>
                        }
                    </View>

                    <View style={styles.inputTextview}>
                        <TextInput
                            placeholder="Email Address (e.g:-rahul@gmail.com)"
                            placeholderTextColor="#153745"
                            style={styles.input}
                            dataValue={data.email}
                            //onChangeText={(val) => handleValidEmail(val)}
                            onEndEditing={(e) => handleValidEmail(e.nativeEvent.text)}
                        />
                        {data.isValidEmail ? null :
                            <Animatable.View style={{ marginLeft: constant.moderateScale(20), paddingTop: constant.moderateScale(10) }} animation='fadeInLeft' duration={500}>
                                <Text style={styles.errorMsg}>Email format is not valid</Text>
                            </Animatable.View>
                        }
                    </View>

                    <View style={styles.inputTextview}>
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                placeholder="Create Password"
                                placeholderTextColor="#153745"
                                style={styles.input}
                                dataValue={data.password}
                                secureTextEntry={data.secureTextEntry ? true : false}
                                autoCapitalize="none"
                                onEndEditing={(e) => handleValidPassword(e.nativeEvent.text)}
                            />
                            <TouchableOpacity style={{ position: 'absolute', right: 20, alignSelf: 'center' }} onPress={updateSecureTextEntry}>
                                {data.secureTextEntry ?
                                    <Feather
                                        name="eye-off"
                                        color="grey"
                                        size={20}
                                    /> :
                                    <Feather
                                        name="eye"
                                        color="grey"
                                        size={20}
                                    />
                                }
                            </TouchableOpacity>
                        </View>
                        {data.isValidPassword ? null :
                            <Animatable.View style={{ marginLeft: constant.moderateScale(20), paddingTop: constant.moderateScale(10) }} animation='fadeInLeft' duration={500}>
                                <Text style={styles.errorMsg}>Password must be 9 chracters long</Text>
                            </Animatable.View>
                        }
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: constant.moderateScale(30) }}>
                        <CheckBox
                            //value={toggleCheckBox}
                            isChecked={toggleCheckBox}
                            onClick={() => setToggleCheckBox(!toggleCheckBox)}
                            //disabled={true}
                            checkBoxColor="#cc3399"
                            // style={styles.checkbox}
                            //tintColors={{ true: 'blue', false: 'red' }}
                            uncheckedCheckBoxColor='black'
                        //checkedCheckBoxColor='black'
                        //checkedIcon={<Image source={checkboximage} />}   
                        />
                        {/* {console.log((newValue)=> setToggleCheckBox(newValue))} */}
                        <Text style={{ color: '#153745', fontFamily: 'ProductSans-Regular', fontSize: constant.moderateScale(13, 1) }}>
                            I agree all the Terms and Conditions.
                        </Text>
                    </View>
                    <View style={styles.sendBtnView}>
                        <TouchableOpacity style={styles.btnContainer} onPress={checkInput}>
                            <Text style={styles.loginText}>Create</Text>
                        </TouchableOpacity>
                    </View>

                </View>


            </ScrollView>

            <View style={styles.signupview}>
                <Text style={styles.didnottext}>Already have an account?</Text>
                <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                    <Text style={styles.signupText}>  SignIn</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
        // </View> 
    )
}
export default SignUpScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fbe9fb',
        alignItems: 'center',
        justifyContent: 'center',
        //marginBottom: constant.moderateScale(90)
    },
    backIcon: {
        //position: 'absolute',

        top: constant.moderateScale(0),
        left: constant.moderateScale(0)
    },
    createView: {
        // marginBottom: constant.moderateScale(10)
    },
    createAccText: {
        fontSize: constant.moderateScale(38, 1),
        textAlign: 'center',
        lineHeight: constant.moderateScale(54),
        color: '#153745',
        fontFamily: 'TiemposHeadline-Bold',
        //paddingBottom: constant.moderateScale(20)
    },
    inputTextview: {
        //flexDirection: 'row',
        marginBottom: constant.moderateScale(25),
        alignSelf: 'center'
        //bottom: key
    },
    errorMsg: {
        color: 'red',
        fontFamily: 'ProductSans-Regular',

    },
    input: {
        backgroundColor: '#fff',
        paddingLeft: constant.moderateScale(20),
        fontSize: constant.moderateScale(17, 1),
        fontFamily: 'ProductSans-Regular',
        borderRadius: constant.moderateScale(12),
        height: constant.moderateScale(55, 1),
        width: constant.SCREEN_WIDTH / 1.06,
        //fontFamily: 'ProductSans-BoldItalic'

    },
    checkbox: {
        // width: constant.moderateScale(0),
        // height: constant.moderateScale(50)
    },
    loginText: {
        textAlign: 'center',
        color: 'white',
        fontSize: constant.moderateScale(17),
        fontFamily: 'ProductSans-Regular',
    },
    sendBtnView: {
        //marginBottom: constant.moderateScale(40),
        //paddingTop: constant.moderateScale(80)
        marginBottom: constant.moderateScale(50)
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
        //marginBottom: constant.moderateScale(50),
    },
    signupview: {
        backgroundColor: '#fbe9fb',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        paddingBottom: constant.moderateScale(10),
        paddingTop: constant.moderateScale(10),
        marginTop: constant.moderateScale(10),
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center'
        //left: constant.moderateScale(20)
    },
    didnottext: {
        fontSize: constant.moderateScale(17, 1),
        fontFamily: 'ProductSans-Regular',
        color: '#000000',
    },
    signupText: {
        fontSize: constant.moderateScale(18, 1),

        color: '#cc3399',
        fontFamily: 'ProductSans-Bold'
    },
})