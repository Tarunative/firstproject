import React from 'react'
import { Text,View, StyleSheet,Button } from 'react-native'
 import RazorpayCheckout from 'react-native-razorpay'
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
      <View>
          <Text>
              PaymentGateway
          </Text>
          <Button onPress={HandlePayment}  title="Pay"/>
      </View>
    )
}
const style=StyleSheet.create({

})
export default PaymentGateway;