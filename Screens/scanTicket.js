import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

const scanTicket = () => {
    const navigation = useNavigation();
    const handleBackPress = () => {
        navigation.navigate('Home');
    };


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, paddingHorizontal: 20 }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons onPress={handleBackPress} name="arrow-back-outline" size={25} color="#666666" />
                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 18, marginLeft: 10 }}>SCAN TICKET</Text>
                </View>
            </View>
            <View style={styles.container}>
    <Text style={styles.header}>Scan QR Code</Text>
    <Text style={styles.subText}>Place QR code inside the frame to scan. Please avoid shaking to get results quickly.</Text>
    <Image source={require('../assets/images/scan.png')} style={styles.logo} />
    <Text style={styles.scanningText}>Scanning code</Text>
</View>


        </View>

    )
}

export default scanTicket

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 36,
        marginTop:20,
        
    },
    header: {
        fontFamily: 'Poppins',
        fontSize: 22,
        fontWeight: '500',
        lineHeight: 33,
        letterSpacing: 0,
        color: '#333333', // Set text color accordingly
        textAlign: 'center', // Center align text
    },
    subText: {
        fontFamily: 'Poppins',
        fontSize: 16, // Adjust font size as needed
        color: '#333333', // Set text color accordingly
        textAlign: 'center', // Center align text
        marginVertical: 10, // Add margin if needed
    },
    logo: {
        width: 220, // Set width as needed
        height: 220, // Set height as needed
        resizeMode: 'contain', // Adjust resizeMode as needed
        marginVertical: 20, // Add margin if needed
    },
    scanningText: {
        fontFamily: 'Poppins',
        fontSize: 16, // Adjust font size as needed
        fontWeight: '500',
        color: '#333333', // Set text color accordingly
        textAlign: 'center', // Center align text
    },
});
