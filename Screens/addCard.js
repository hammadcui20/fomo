import React, { useState } from 'react';
import { Platform,View, Text, Button, FlatList, KeyboardAvoidingView, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const addCard = () => {
    const handleContinuePress = () => {
        navigation.navigate('reviewSummary');
    };
    const navigation = useNavigation();
    const handleBackPress = () => {
        navigation.navigate('payment');
    };


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, paddingHorizontal: 20 }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons onPress={handleBackPress} name="arrow-back-outline" size={25} color="#666666" />
                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 18, marginLeft: 10 }}>CARD DETAILS</Text>
                </View>
            </View>

            <KeyboardAvoidingView style={{ flex: 1, paddingHorizontal: 20 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <TextInput placeholder="Card Holder Name" style={styles.input} />
                        </View>
                        <View style={styles.inputWrapper}>
                            <TextInput placeholder="Card Number" style={styles.input} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={[styles.inputWrapper, { flex: 1 }]}>
                                <TextInput placeholder="Expiry Date" style={styles.input} />
                                <Ionicons name="calendar-outline" size={20} color="#FF4459" />
                            </View>
                            <View style={[styles.inputWrapper, { flex: 1, marginLeft: 10 }]}>
                                <TextInput placeholder="CSV" style={styles.input} />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <TouchableOpacity style={styles.signInButton} onPress={handleContinuePress}>
                <Text style={styles.signInButtonText}>ADD CARD</Text>
            </TouchableOpacity>
        </View>
  )
}

export default addCard

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        padding: 5,
        marginTop: 20,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#C7C7C7',
        padding: 5,
        marginBottom: 28,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 17,
        fontWeight: '400',
        textAlign: 'left',
        color: '#666666',
        fontFamily: 'Poppins',
    },
    signInButton: {
        backgroundColor: '#FF4459',
        borderRadius: 10,
        padding: 12,
        width: '90%',
        marginLeft: 'auto', 
        marginRight: 'auto', 
        marginBottom: 30,
    },
    
    signInButtonText: {
        fontFamily: 'Poppins',
        fontSize: 22,
        fontWeight: '500',
        textAlign: 'center',
        color: 'white',
    },
 
});