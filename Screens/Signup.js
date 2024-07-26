import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createUser, googleCreateUser, androidId, iosId } from '../server/server';
import { GoogleSignin,GoogleSigninButton,statusCodes } from '@react-native-google-signin/google-signin';
import axios from 'axios';
const Signup = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [userInfo,setUserInfo] = useState(null);
    const [error,setError] = useState(null);

    const handleSignInPress = () => {
        navigation.navigate('Signin');
    };

    const handleSignUpPress = async () => {
        if (!username || !email || !password) {
            Alert.alert('Error', 'Please fill all fields!');
            return;
        }

        try {
            const userData = {
                username,
                email,
                password,
                role_as: null,
                phoneNumber: null,
                gender: null,
                dob: null,
                imagePath: null,
                country: null,
                state: null,
                city: null,
                location: null
            };
            console.log("UserData", userData);
            const response = await createUser(userData);
            Alert.alert('Success', response.message);
            navigation.navigate('Signin');
        } catch (error) {
            Alert.alert('Error', error.response?.data?.message || 'Something went wrong!');
        }
    };

    const configureGoogleSignIn = () => {
        GoogleSignin.configure({
            androidClientId: androidId,
            iosClientId: iosId,
            scopes: ['profile', 'email', 'https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/user.birthday.read']
        });
    }
    useEffect(() => {
        configureGoogleSignIn();
    });
    const handleGoogleSignIn = async () => {
        console.log("Google Sign In");
        try
        {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            // const tokens = await GoogleSignin.getTokens();

            // const { data } = await axios.get('https://people.googleapis.com/v1/people/me', {
            //     params: {
            //         personFields: 'birthdays,genders,addresses,photos'
            //     }
            // });
            // console.log("Data",data);
            // console.log("User Info",userInfo);
            const userData = {
                username: userInfo.user.email,
                email: userInfo.user.email,
                password: userInfo.user.email
            };
            const response = await googleCreateUser(userData);
            setUserInfo(userInfo);
            Alert.alert('Success', response.message);
            console.log("User Info2",userInfo);
            setError();
        }catch(error){ 
            console.log("Error",error);
            switch (error.code) {
                case statusCodes.SIGN_IN_CANCELLED:
                    console.log("User cancelled the login flow");
                    break;
                case statusCodes.IN_PROGRESS:
                    console.log("Operation (e.g. sign in) is in progress already");
                    break;
                case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                    console.log("Play Services not available or outdated");
                    break;
                default:
                    console.log("Some other error happened");
                    setError(error);
                    console.log(error);
            }
        }
    }
    const handleAppleSignIn = () => { };
    const handleBackPress = () => {
        navigation.navigate('Signin');
    };

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
                <Text style={styles.heading}>Create New Account</Text>
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    <Ionicons name="person-outline" size={24} color="#666666" />
                    <TextInput
                        style={styles.input}
                        placeholder="User Name"
                        value={username}
                        onChangeText={setUsername}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Ionicons name="mail-outline" size={24} color="#666666" />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Ionicons name="lock-closed-outline" size={24} color="#666666" />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={24} color="#666666" />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.signInButton} onPress={handleSignUpPress}>
                <Text style={styles.signInButtonText}>SIGN UP</Text>
            </TouchableOpacity>
            <View style={styles.separator}>
                <View style={styles.line}></View>
                <Text style={styles.orText}>or</Text>
                <View style={styles.line}></View>
            </View>
            <View style={styles.socialButtonsContainer}>
                <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignIn}>
                    <Image source={require('../assets/images/google.png')} style={styles.socialIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton} onPress={handleAppleSignIn}>
                    <Image source={require('../assets/images/apple.png')} style={styles.socialIcon} />
                </TouchableOpacity>
            </View>
            <View style={styles.SignupContainer}>
                <Text style={styles.signUpText}>Don’t have an account? </Text>
                <TouchableOpacity onPress={handleSignInPress}>
                    <Text style={styles.loginLink}>Sign in</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Signup;


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
    },
    inputContainer: {
        width: '100%',
        marginTop: 65,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginBottom: 20,
        padding: 5,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'left',
        color: '#666666',
        fontFamily: 'Poppins',
    },
    forgotPassword: {
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'right',
        margin: 8,
        color: '#FF4459',
        textDecorationLine: 'underline',

    },
    signInButton: {
        backgroundColor: '#FF4459',
        borderRadius: 10,
        padding: 12,
        width: '100%',
    },
    signInButtonText: {
        fontFamily: 'Poppins',
        fontSize: 22,
        fontWeight: '500',
        textAlign: 'center',
        color: 'white',
    },
    separator: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#C7C7C7',
    },
    orText: {
        marginHorizontal: 10,
        color: '#C7C7C7',
        fontFamily: 'Poppins',
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    socialButton: {
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 15,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: '#FF4459',
    },
    socialIcon: {
        width: 24,
        height: 24,
    },
    SignupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 40,
    },
    signUpText: {
        fontFamily: 'Poppins',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
        textAlign: 'center',
    },
    loginLink: {
        fontFamily: 'Poppins',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 24,
        textAlign: 'center',
        color: '#FF4459',
    },
});