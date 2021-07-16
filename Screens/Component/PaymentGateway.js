import React from 'react'
import { Text,View, StyleSheet,Button, TouchableOpacity } from 'react-native'
 import RazorpayCheckout from 'react-native-razorpay'
 import * as constant from './Sizes';

const PaymentGateway =({route,navigation})=>{
   const {paymentDetails} =route.params;
   console.log(paymentDetails)
    const HandlePayment = async ()=>{
        var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: 'rzp_test_py2Yq5YVQhgbsw', // Your api key
            amount: '100',
            name: (paymentDetails.first_name).concat( paymentDetails.last_name),
            prefill: {
              email: paymentDetails.email,
              contact: paymentDetails.mobile,
              name: 'Razorpay Software'
            },
            theme: {color: '#F37254'}
          }
          RazorpayCheckout.open(options).then((data) => {
            // handle success
            alert(`Success: ${data.razorpay_payment_id}`);
          }).catch((error) => {
            // handle failure
            alert(`Error: ${error.code} | ${error.description}`);
          });
    }
    return(
      <View style={styles.container}>
          <View style={{flex: 2}}>
          <Text style={{color:'black'}}>
              PaymentGateway
          </Text>
          </View>
          <View style={{flex: 2}}>
          <TouchableOpacity style={styles.button}>
              <Text style={styles.payText}>
                  Pay
              </Text>
          </TouchableOpacity>
          </View>
          {/* <Button onPress={HandlePayment}  title="Pay" /> */}
      </View>
    )
}
const styles=StyleSheet.create({
container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
},
button:{

    width: constant.SCREEN_WIDTH / 1.06,
    height: constant.moderateScale(55, 1),
    // margin: constant.moderateScale(10),
    // marginTop: constant.moderateScale(20),
    borderRadius: constant.moderateScale(12),
    justifyContent: 'center',
    backgroundColor: '#cc3399',
},
payText: {
    textAlign: 'center',
    color: 'white',
    fontSize: constant.moderateScale(17),
    fontFamily: 'ProductSans-Regular'
  },
})
export default PaymentGateway;