import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TextInput, ScrollView, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

const Withdrawl = () => {
    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.navigate('wallet');
    };

    const handleContinuePress = () => {
        navigation.navigate('addBank');
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, paddingHorizontal: 20, marginBottom: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons onPress={handleBackPress} name="arrow-back-outline" size={25} color="#666666" />
                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 18, marginLeft: 10 }}>WALLET</Text>
                </View>
            </View>
            <View style={styles.Option}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Text style={styles.Text}>James William</Text>
                        <Text style={{ fontFamily: 'Poppins', fontSize: 12, fontWeight: '500', lineHeight: 33, letterSpacing: 0, marginLeft: 10 }}>Western union</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                        <Text style={{ fontFamily: 'Poppins', fontSize: 12, fontWeight: '500', lineHeight: 33, letterSpacing: 0, marginRight: 10 }}>******** 123</Text>
                    </View>
                </View>
            </View>

            <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 20 }}>
                <TouchableOpacity style={styles.Button} onPress={handleContinuePress}>
                    <Text style={styles.ButtonText}>REMOVE BANK</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.signInButton, { marginTop: 10 }]} onPress={handleContinuePress}>
                    <Text style={styles.signInButtonText}>ADD NEW</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Withdrawl;

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
    Text: {
        fontFamily: 'Poppins',
        fontSize: 18,
        color: '#FF4459',
        marginHorizontal: 10,
        fontWeight: '600',
    },
    signInButton: {
        backgroundColor: '#FF4459',
        borderRadius: 10,
        padding: 12,
        width: '90%',
        marginLeft: 24,
    },
    signInButtonText: {
        fontFamily: 'Poppins',
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        color: 'white',
    },
    Button: {
        border: '#FF4459',
        borderColor:'#ff4459',
        borderRadius: 10,
        borderWidth:1,
        padding: 12,
        width: '90%',
        marginLeft: 24,
    },
    ButtonText: {
        fontFamily: 'Poppins',
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        color: '#ff4459',
    },
});
