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
    KeyboardAvoidingView,
    StatusBar
  } from 'react-native';
import * as constant from './Sizes';
import backIcon from '../Images/backIcon.png';

const HomeScreen=({navigation})=>{
    return (
        <SafeAreaView style={styles.container}>
          <StatusBar
         animated={true}
         backgroundColor="transparent"
         translucent={true}
         barStyle='dark-content'
         showHideTransition={'slide'}
         hidden={false} />
          <KeyboardAvoidingView>
            <ScrollView showsVerticalScrollIndicator={false}> 
           <View style={{marginTop: 20}}>
             <Text>
               HomeScreen
             </Text>
           </View>
     
          </ScrollView>
          </KeyboardAvoidingView>
      </SafeAreaView>
    );
}
export default HomeScreen;
const styles = StyleSheet.create({
   container:{
    flex: 1,
    //backgroundColor: '#fbe9fb',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
   },
   

})