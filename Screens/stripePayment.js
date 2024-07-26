import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import axios from 'axios';

const PaymentScreen = ({ navigation, route }) => {
  const { userId, eventId } = route.params;
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const fetchPaymentSheetParams = async () => {
    console.log('userId', userId);
    console.log('eventId', eventId);
    const response = await axios.post('192.168.100.108:8000/api/user/payment-sheet', {
      userId,
      eventId,
    });
    console.log('response', response.data);
    const { paymentIntent, ephemeralKey, customer } = response.data;
    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    try {
      const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();
      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: paymentIntent,
        customerEphemeralKeySecret: ephemeralKey,
        customerId: customer,
        googlePay: true,
        applePay: true,
        merchantDisplayName: 'FOMO Events',
      });

      if (!error) {
        openPaymentSheet();
      } else {
        console.log('Error initializing payment sheet:', error);
        Alert.alert('Error', 'Failed to initialize payment sheet.');
      }
    } catch (error) {
      console.error('Error initializing payment sheet:', error);
      Alert.alert('Error', 'An error occurred while initializing payment sheet.');
    }
  };

  const openPaymentSheet = async () => {
    try {
      const { error } = await presentPaymentSheet();

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Success', 'Your order is confirmed!');
        navigation.navigate('events');
      }
    } catch (error) {
      console.error('Error presenting payment sheet:', error);
      Alert.alert('Error', 'An error occurred while presenting payment sheet.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment</Text>
      <TouchableOpacity style={styles.button} onPress={initializePaymentSheet}>
        <Text style={styles.buttonText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF4459',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PaymentScreen;
