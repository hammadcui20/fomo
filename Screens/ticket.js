import React, { useState } from 'react';
import { View, Text, Button, FlatList, KeyboardAvoidingView, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

const ticket = () => {
    const navigation = useNavigation();
    const handleBackPress = () => {
        navigation.navigate('reviewSummary');
    };

    const handleContinuePress = () => {
        navigation.navigate('paymentSuccess');
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, paddingHorizontal: 20 }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons onPress={handleBackPress} name="arrow-back-outline" size={25} color="#666666" />
                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 18, marginLeft: 10 }}>TICKET</Text>
                </View>
            </View>

            <View style={{ flex: 1, justifyContent: 'flex-start', marginHorizontal: 20, marginTop: 30 }}>
                <View style={styles.paymentOption}>
                    <View style={{ padding: 20 }}>

                        <Text style={{ fontSize: 20, fontFamily: 'poppins', fontWeight: 'bold', textAlign: 'center' }}>Mega Halloween Party</Text>

                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={{ marginVertical: 20 }} source={require('../assets/images/QR.png')} />
                        </View>
                        <View style={{ borderBottomWidth: 2, borderBottomColor: '#c7c7c7', borderStyle: 'dotted' }} />
                        <View style={{ marginTop: 20 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: '400', lineHeight: 24, letterSpacing: 0, textAlign: 'left' }}
                                >Name</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: 'bold', lineHeight: 24, letterSpacing: 0, textAlign: 'left' }}>Maya Rodriguez</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                            <View>
                                <Text style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: '400', lineHeight: 24, letterSpacing: 0, textAlign: 'left' }}>Date</Text>
                                <Text style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: 'bold', lineHeight: 24, letterSpacing: 0, textAlign: 'left' }}>16 Feb 2024</Text>
                            </View>
                            <View>
                                <Text style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: '400', lineHeight: 24, letterSpacing: 0, textAlign: 'left' }}>Time</Text>
                                <Text style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: 'bold', lineHeight: 24, letterSpacing: 0, textAlign: 'left' }}>4 PM</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                            <View>
                                <Text style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: '400', lineHeight: 24, letterSpacing: 0, textAlign: 'left' }}>Location</Text>
                                <Text style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: 'bold', lineHeight: 24, letterSpacing: 0, textAlign: 'left' }}>Miami, USA 2323</Text>
                            </View>
                            <View>
                                <Text style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: '400', lineHeight: 24, letterSpacing: 0, textAlign: 'right' }}>Phone</Text>
                                <Text style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: 'bold', lineHeight: 24, letterSpacing: 0, textAlign: 'right' }}>+1 111 436 4374</Text>
                            </View>
                        </View>


                        {/* Add an image here if desired */}
                    </View>

                </View>



            </View>

            <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 30 }}>
                <TouchableOpacity style={styles.signInButton} onPress={handleContinuePress}>
                    <Text style={styles.signInButtonText}>DONE</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ticket

const styles = StyleSheet.create({
    signInButton: {
        backgroundColor: '#FF4459',
        borderRadius: 10,
        padding: 12,
        width: '90%',
        marginLeft: 'auto', // Center horizontally
        marginRight: 'auto', // Center horizontally
    },

    signInButtonText: {
        fontFamily: 'Poppins',
        fontSize: 22,
        fontWeight: '500',
        textAlign: 'center',
        color: 'white',
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    paymentOption: {
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
    optionText: {
        fontFamily: 'Poppins',
        fontSize: 14,
        color: '#333333',
        marginLeft: 10,
    },

});