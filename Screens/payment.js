import React, { useState } from 'react';
import { View, Text, Button, FlatList, KeyboardAvoidingView, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

const Payment = () => {
    const navigation = useNavigation();
    const [selectedOption, setSelectedOption] = useState(null);

    const handleBackPress = () => {
        navigation.navigate('eventDetail');
    };

    const handleContinuePress = () => {
        navigation.navigate('reviewSummary');
    };
    const handleAddCardPress = () => {
        navigation.navigate('addCard');
    };
    const handleOptionPress = (option) => {
        setSelectedOption(option);
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
                   <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, paddingHorizontal: 20 }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons onPress={handleBackPress} name="arrow-back-outline" size={25} color="#666666" />
                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 18, marginLeft: 10 }}>PAYMENT METHOD</Text>
                </View>
            </View>

            <View style={{ flex: 1, justifyContent: 'flex-start', marginHorizontal: 20, marginTop: 30 }}>
                <TouchableOpacity style={[styles.paymentOption, selectedOption === 'paypal' && styles.selectedOption]} onPress={() => handleOptionPress('paypal')}>
                    <Image source={require('../assets/images/paypal.png')} style={styles.logo} />
                    <Text style={styles.optionText}>Pay Pal</Text>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>{selectedOption === 'paypal' && <View style={styles.filledCircle} />}</View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.paymentOption, selectedOption === 'googleplay' && styles.selectedOption]} onPress={() => handleOptionPress('googleplay')}>
                    <Image source={require('../assets/images/google.png')} style={styles.logo} />
                    <Text style={styles.optionText}>Google Pay</Text>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>{selectedOption === 'googleplay' && <View style={styles.filledCircle} />}</View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.paymentOption, selectedOption === 'creditcard' && styles.selectedOption]} onPress={() => handleOptionPress('creditcard')}>
                    <Image source={require('../assets/images/Mastercard.png')} style={styles.logo} />
                    <Text style={styles.optionText}>.... .... .... .... 4679</Text>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>{selectedOption === 'creditcard' && <View style={styles.filledCircle} />}</View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.mapButton} onPress={handleAddCardPress}>
                <Text style={styles.loginLink}>ADD NEW CARD</Text>
            </TouchableOpacity>
            </View>
            


            <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 30 }}>
                <TouchableOpacity style={styles.signInButton} onPress={handleContinuePress}>
                    <Text style={styles.signInButtonText}>CONTINUE</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Payment;

const styles = StyleSheet.create({
    signInButton: {
        backgroundColor: '#FF4459',
        borderRadius: 10,
        padding: 12,
        width: '90%',
        marginLeft: 'auto', 
        marginRight: 'auto', 
    },

    signInButtonText: {
        fontFamily: 'Poppins',
        fontSize: 22,
        fontWeight: '500',
        textAlign: 'center',
        color: 'white',
    },

    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 15,
        marginBottom: 28,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 3,
    },


    mapButton: {
        marginBottom: 0,
        fontFamily: 'Poppins',
    },
    loginLink: {
        fontFamily: 'Poppins',
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 24,
        textAlign: 'center',
        color: '#FF4459',
        textDecorationLine: 'underline',
    },
    filledCircle: {
        width: 12,
        height: 12,
        borderRadius: 10,
        backgroundColor: '#FF4459',
    },

    optionText: {
        fontFamily: 'Poppins',
        fontSize: 15.5,
        color: '#333333',
        marginLeft: 10,
    },

    logo: {
        width: 30,
        height: 30,
    },
});
