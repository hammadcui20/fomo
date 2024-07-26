import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation,useRoute } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from '../server/server';
const VerifyOtp = () => {
    const navigation = useNavigation();
    const [otp, setOtp] = useState('');
    const route = useRoute();
    const { email } = route.params;
    const handleContinuePress = async () => {
        try {
            console.log(email);
            // navigation.navigate('confirmPass');
            const response = await axios.post(`${API_URL}/user/auth/reset-password`, { email, otp });
            if (response.status === 200) {
                navigation.navigate('confirmPass',{ email });
            } else {
                Alert.alert('Error', 'Invalid OTP, please try again.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Invalid OTP, please try again.');
        }
    };

    const handleBackPress = () => {
        navigation.navigate('ForgotPass');
    };

    const handleOtpChange = (text, index) => {
        let newOtp = otp;
        newOtp = newOtp.substr(0, index) + text + newOtp.substr(index + 1);
        setOtp(newOtp);

        if (text !== '' && index < 3) {
            refs[index + 1].focus();
        }
    };

    const refs = Array(4)
        .fill()
        .map((_, i) => React.createRef());

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableOpacity onPress={handleBackPress} style={{ position: 'absolute', top: 40, left: 10, padding: 10 }}>
                <Ionicons name="arrow-back-outline" size={30} color="#666666" />
            </TouchableOpacity>
            <View style={styles.topContainer}>
                <Image source={require('../assets/images/logo-rounded.png')} style={styles.logo} />
                <Text style={styles.heading}>Verify OTP</Text>
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.TextInput}>Enter your 4 digit OTP code sent to your email</Text>

                    <View style={styles.SignupContainer}>
                        <Text style={styles.signUpText}>Don’t receive a code </Text>
                        <TouchableOpacity onPress={() => console.log('Resend OTP')}>
                            <Text style={styles.loginLink}>Send again</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.otpContainer}>
                        {[...Array(4)].map((_, i) => (
                            <TextInput
                                key={i}
                                ref={(ref) => (refs[i] = ref)}
                                style={styles.otpInput}
                                placeholder="-"
                                maxLength={1}
                                value={otp[i] || ''}
                                onChangeText={(text) => handleOtpChange(text, i)}
                                keyboardType="numeric"
                            />
                        ))}
                    </View>
                </View>

                <TouchableOpacity style={styles.signInButton} onPress={handleContinuePress}>
                    <Text style={styles.signInButtonText}>CONTINUE</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};
export default VerifyOtp


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    topContainer: {
        alignItems: 'center',
    },
    bottomContainer: {
        width: '100%',
    },
    logo: {
        width: 90,
        height: 90,
        marginTop: 50,
    },
    heading: {
        fontFamily: 'Poppins',
        fontSize: 24,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: 20,
        fontFamily: 'Poppins',
    },
    inputContainer: {
        marginHorizontal: 25,
        marginBottom: 15,
        padding: 20,
        textAlign: 'center',
        alignItems: 'center',
    },

    TextInput:{
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 15,
        fontFamily: 'Poppins',
    },
    signInButton: {
        backgroundColor: '#FF4459',
        borderRadius: 10,
        padding: 12,
        width: '100%',
        marginBottom: 30,
    },
    signInButtonText: {
        fontFamily: 'Poppins',
        fontSize: 22,
        fontWeight: '500',
        textAlign: 'center',
        color: 'white',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    otpInput: {
        borderWidth: 1,
        borderColor: '#FF4459',
        width: 50,
        height: 50,
        textAlign: 'center',
        fontSize: 20,
        borderRadius: 10,
        marginHorizontal: 10,
    },

    SignupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 15,
    },
    signUpText: {
        fontFamily: 'Poppins',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 24,
        textAlign: 'center',
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
});



