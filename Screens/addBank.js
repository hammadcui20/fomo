import React, { useState } from 'react';
import { Platform,View, Text, Button, FlatList, KeyboardAvoidingView, StyleSheet, TextInput, ScrollView, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';


const addBank = () => {
    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.navigate('withdrawl');
    };
    const handleContinuePress = () => {
        navigation.navigate('addBank');
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, paddingHorizontal: 20, marginBottom: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons onPress={handleBackPress} name="arrow-back-outline" size={25} color="#666666" />
                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 18, marginLeft: 10 }}>ADD BANK</Text>
                </View>
            </View>



            <KeyboardAvoidingView style={{ flex: 1, paddingHorizontal: 20 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <TextInput placeholder="Bank Name" style={styles.input} />
                        </View>

                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <TextInput placeholder="Account Holder Name" style={styles.input} />
                        </View>

                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <TextInput placeholder="IBAN" style={styles.input} />
                        </View>

                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <TextInput placeholder="Zip code" style={styles.input} />
                        </View>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>


            <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 20 }}>

                <TouchableOpacity style={[styles.signInButton, { marginTop: 10 }]} onPress={handleContinuePress}>
                    <Text style={styles.signInButtonText}>ADD BANK</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default addBank

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
        borderColor: '#ff4459',
        borderRadius: 10,
        borderWidth: 1,
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
    inputContainer: {
        width: '100%',
        padding: 5,
        marginTop: 10,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#C7C7C7',
        padding: 5,
        marginBottom: 25,
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
})