import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser, getUserData, getAllEvents, checkUserProfileData, checkUserLocationData, androidId, iosId, googleLoginUser } from '../server/server';
import { decode } from 'base-64';
import { useProfile } from '../components/ProfileContext';
import { GoogleSignin,GoogleSigninButton,statusCodes } from '@react-native-google-signin/google-signin';

const Signin = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { profData, setProfData } = useProfile({});
  const [events, setEvents] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo,setUserInfo] = useState(null);
  const [error,setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const tokenPayload = JSON.parse(decode(token.split('.')[1]));
          const userId = tokenPayload.id;

          const Profresponse = await checkUserProfileData(userId);
          const Locfresponse = await checkUserLocationData(userId);

          if (Profresponse.status === 200) {    
            const userResponse = await getUserData(userId);
            if (userResponse.user) {
              setProfData(userResponse.user);
            } else {
              console.log('Failed to get user profile data.');
            }

            const eventsResponse = await getAllEvents();
            setEvents(eventsResponse.events || []);
            navigation.navigate('home', { eventsData: events, profData });
            setIsAuthenticated(true);   
          } else {
            navigation.navigate('Profile');
          }
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, navigation]);

  const handleSignIn = async () => {
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setIsLoading(true);
    try {
      const userData = { username, password };
      const response = await loginUser(userData);
      if (response.status === 200) {
        await AsyncStorage.setItem('token', response.token);
        Alert.alert('Success', 'Logged in successfully');
        setIsAuthenticated(true);
      } else {
        Alert.alert('Failed', 'Incorrect Username or Password');
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', error.message || 'Something went wrong!');
      setIsLoading(false);
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
        const userData = {
            username: userInfo.user.email
        };
        const response = await googleLoginUser(userData);
        if (response.status === 200) {
          await AsyncStorage.setItem('token', response.token);
          Alert.alert('Success', 'Logged in successfully');
            const eventsResponse = await getAllEvents();
            setEvents(eventsResponse.events || []);
            setUserInfo(userInfo);
            navigation.navigate('home', { eventsData: events, profData });
          setIsAuthenticated(true);
        } else {
          Alert.alert('Failed', 'Incorrect Username or Password');
          setIsLoading(false);
        }
        setUserInfo(userInfo);
        Alert.alert('Success', response.message);
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
  useEffect(() => {
    if (isAuthenticated && profData && events.length > 0) {
      console.log(isAuthenticated);
      navigation.navigate('home', { eventsData: events, profData });
    }
  }, [isAuthenticated, profData, events, navigation]);

  const handleSignUpPress = () => {
    navigation.navigate('Signup');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPass');
  };

  
  const handleAppleSignIn = () => {
    Alert.alert('Apple Sign In', 'Coming soon!');
  };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.topContainer}>
                <Image source={require('../assets/images/logo-rounded.png')} style={styles.logo} />
                <Text style={styles.heading}>Sign In To Your Account</Text>
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    <Ionicons name="mail-outline" size={24} color="#666666" />
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
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
                <TouchableOpacity onPress={handleForgotPassword}>
                    <Text style={styles.forgotPassword}>Forgot password?</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
                <Text style={styles.signInButtonText}>SIGN IN</Text>
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
                <TouchableOpacity onPress={handleSignUpPress}>
                    <Text style={styles.loginLink}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};
export default Signin;

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
        fontFamily: 'Poppins',
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
