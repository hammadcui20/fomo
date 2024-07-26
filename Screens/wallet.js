import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TextInput, ScrollView, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';


const wallet = () => {
    const navigation = useNavigation();
    const handleBackPress = () => {
        navigation.navigate('settings');
    };
    const handleWithdrawalPress = () => {
        navigation.navigate('withdrawl');
    };
    const handleViewAllPress = () => {
        navigation.navigate('history');
    };
    const backgroundImage = require('../assets/images/wallet.png');


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons onPress={handleBackPress} name="arrow-back-outline" size={25} color="#666666" />
                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 18, marginLeft: 10 }}>WALLET</Text>
                </View>
            </View>


            <View style={{ marginTop: 20 }}>
                <ImageBackground source={require('../assets/images/wallet.png')} style={styles.paymentOption}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Text style={styles.optionText}>MY WALLET</Text>
                        <Text style={styles.optionText}>Balance</Text>
                        <Text style={[styles.optionText, { fontWeight: 'bold', fontSize: 30 }]}>$12,500</Text>
                        <TouchableOpacity style={styles.signInButton} onPress={handleWithdrawalPress}>
                            <Text style={styles.signInButtonText}>WITHDRAWAL</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>

            <View>
                <Text style={{ fontFamily: 'Poppins', fontSize: 18, fontWeight: '500', lineHeight: 33, letterSpacing: 0, marginTop: 20, marginLeft: 20 }}>Earning Tracking</Text>
                <Image
                    style={styles.image}
                    source={require('../assets/images/graph.png')}
                />

            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 20 }}>
                <Text style={{ fontFamily: 'Poppins', fontSize: 18, fontWeight: '500', lineHeight: 33, letterSpacing: 0, marginTop: 20, marginLeft: 20 }}>Transaction history</Text>
                <TouchableOpacity onPress={handleViewAllPress}>
                    <Text style={{ color: '#666666', textDecorationLine: 'underline', fontFamily: 'Poppins', fontSize: 16, fontWeight: '500', lineHeight: 33, letterSpacing: 0, marginTop: 20, marginLeft: 20 }}>View all</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.Option}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Text style={styles.Text}>Mega Halloween party</Text>
                        <Text style={{ fontFamily: 'Poppins', fontSize: 12, fontWeight: '500', lineHeight: 33, letterSpacing: 0, marginLeft: 10 }}>539 Park Ave, Hoboken, NJ 0703.</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                        <Text style={{ fontFamily: 'Poppins', fontSize: 15, fontWeight: 'bold', lineHeight: 33, letterSpacing: 0, marginRight: 10, color: '#FF4459' }}>$10</Text>
                        <Text style={{ fontFamily: 'Poppins', fontSize: 12, fontWeight: '500', lineHeight: 33, letterSpacing: 0, marginRight: 10 }}>8 feb, 2AM</Text>
                    </View>
                </View>
            </View>
            <View style={styles.Option}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Text style={styles.Text}>Mega Halloween party</Text>
                        <Text style={{ fontFamily: 'Poppins', fontSize: 12, fontWeight: '500', lineHeight: 33, letterSpacing: 0, marginLeft: 10 }}>539 Park Ave, Hoboken, NJ 0703.</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                        <Text style={{ fontFamily: 'Poppins', fontSize: 15, fontWeight: 'bold', lineHeight: 33, letterSpacing: 0, marginRight: 10, color: '#FF4459' }}>$10</Text>
                        <Text style={{ fontFamily: 'Poppins', fontSize: 12, fontWeight: '500', lineHeight: 33, letterSpacing: 0, marginRight: 10 }}>8 feb, 2AM</Text>
                    </View>
                </View>
            </View>
            <View style={styles.Option}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Text style={styles.Text}>Mega Halloween party</Text>
                        <Text style={{ fontFamily: 'Poppins', fontSize: 12, fontWeight: '500', lineHeight: 33, letterSpacing: 0, marginLeft: 10 }}>539 Park Ave, Hoboken, NJ 0703.</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                        <Text style={{ fontFamily: 'Poppins', fontSize: 15, fontWeight: 'bold', lineHeight: 33, letterSpacing: 0, marginRight: 10, color: '#FF4459' }}>$10</Text>
                        <Text style={{ fontFamily: 'Poppins', fontSize: 12, fontWeight: '500', lineHeight: 33, letterSpacing: 0, marginRight: 10 }}>8 feb, 2AM</Text>
                    </View>
                </View>
            </View>



        </View>
    )
}

export default wallet

const styles = StyleSheet.create({
    Option: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 3,
        width: '90%',
        marginHorizontal: 20,
        marginTop: 10,

    },
    image: {
        width: 'auto',
        height: 200,
        
    },
    signInButton: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 8,
        paddingHorizontal: 15,
        width: 'auto',
        marginLeft: 8,
        marginTop: 10,
    },
    signInButtonText: {
        fontFamily: 'Poppins',
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
        color: 'black',
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        padding: 20,
        marginBottom: 10,
        width: 'auto',
        marginHorizontal: 20,
        marginTop: 10,
        overflow: 'hidden', // Ensures border radius is applied to the image
    },
    optionText: {
        fontFamily: 'Poppins',
        fontSize: 18,
        color: 'white',
        marginHorizontal: 10,
        fontWeight: '500',
    },
    Text: {
        fontFamily: 'Poppins',
        fontSize: 18,
        color: '#333333',
        marginHorizontal: 10,
        fontWeight: '600',
    },
});