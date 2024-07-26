import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TextInput, ScrollView, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';


const history = () => {
    const navigation = useNavigation();
    const handleBackPress = () => {
        navigation.navigate('wallet');
    };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, paddingHorizontal: 20 , marginBottom: 15}}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons onPress={handleBackPress} name="arrow-back-outline" size={25} color="#666666" />
                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 18, marginLeft: 10 }}>TRANSACTION HISTORY</Text>
                </View>
            </View>
            <View style={styles.Option}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Text style={styles.Text}>Mega Halloween party</Text>
                        <Text style={{ fontFamily: 'Poppins', fontSize: 12, fontWeight: '500', lineHeight: 33, letterSpacing: 0, marginLeft: 10 }}>539 Park Ave, Hoboken, NJ 0703.</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                        <Text style={{ fontFamily: 'Poppins', fontSize: 15, fontWeight: 'bold', lineHeight: 33, letterSpacing: 0, marginRight: 10, color:'#FF4459'}}>$10</Text>
                        <Text style={{ fontFamily: 'Poppins', fontSize: 12, fontWeight: '500', lineHeight: 33, letterSpacing: 0,  marginRight: 10 }}>8 feb, 2AM</Text>
                    </View>
                </View>
            </View>
            <View style={styles.Option}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Text style={styles.Text}>Mega Halloween party</Text>
                        <Text style={{ fontFamily: 'Poppins', fontSize: 12, fontWeight: '500', lineHeight: 33, letterSpacing: 0,  marginLeft: 10 }}>539 Park Ave, Hoboken, NJ 0703.</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                        <Text style={{ fontFamily: 'Poppins', fontSize: 15, fontWeight: 'bold', lineHeight: 33, letterSpacing: 0, marginRight: 10, color:'#FF4459'}}>$10</Text>
                        <Text style={{ fontFamily: 'Poppins', fontSize: 12, fontWeight: '500', lineHeight: 33, letterSpacing: 0,marginRight: 10 }}>8 feb, 2AM</Text>
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
                        <Text style={{ fontFamily: 'Poppins', fontSize: 15, fontWeight: 'bold', lineHeight: 33, letterSpacing: 0, marginRight: 10, color:'#FF4459'}}>$10</Text>
                        <Text style={{ fontFamily: 'Poppins', fontSize: 12, fontWeight: '500', lineHeight: 33, letterSpacing: 0,  marginRight: 10 }}>8 feb, 2AM</Text>
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
                        <Text style={{ fontFamily: 'Poppins', fontSize: 15, fontWeight: 'bold', lineHeight: 33, letterSpacing: 0, marginRight: 10, color:'#FF4459'}}>$10</Text>
                        <Text style={{ fontFamily: 'Poppins', fontSize: 12, fontWeight: '500', lineHeight: 33, letterSpacing: 0,  marginRight: 10 }}>8 feb, 2AM</Text>
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
                        <Text style={{ fontFamily: 'Poppins', fontSize: 15, fontWeight: 'bold', lineHeight: 33, letterSpacing: 0, marginRight: 10, color:'#FF4459'}}>$10</Text>
                        <Text style={{ fontFamily: 'Poppins', fontSize: 12, fontWeight: '500', lineHeight: 33, letterSpacing: 0,  marginRight: 10 }}>8 feb, 2AM</Text>
                    </View>
                </View>
            </View>


        </View>
  )
}

export default history
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
        color: '#333333',
        marginHorizontal: 10,
        fontWeight: '600',
    },
});