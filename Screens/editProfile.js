import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { getUserData } from '../server/server';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode } from 'base-64';
import axios from 'axios';
import { useProfile } from '../components/ProfileContext';

const editProfile = ({ route }) => {
    const navigation = useNavigation();
    const { eventsData } = route.params || { eventsData: [] };
    const { profData, setProfData } = useProfile();
    const [edited, setEdited] = useState(false);
    const [username, setUsername] = useState(profData.username || '');
    const [phoneNo, setPhoneNo] = useState(profData.phoneNumber || '');
    const [gender, setGender] = useState(profData.gender || '');
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(profData.dob ? false : true);
    const [profilePicture, setProfilePicture] = useState(profData.imagePath || null);
    console.log("Edited",edited);
    useEffect(() => {
        const getProfileData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    const tokenPayload = JSON.parse(decode(token.split('.')[1]));
                    const userId = tokenPayload.id;
                    const response = await getUserData(userId);
                    if (response.user) {
                        setUsername(response.user.username || '');
                        setPhoneNo(response.user.phoneNumber || '');
                        setGender(response.user.gender || '');
                        setDateOfBirth(new Date(response.user.dob));
                        setProfilePicture(response.user.imagePath || null);
                        setProfData(response.user);
                    } else {
                        console.log('Failed to get user profile data.');
                    }
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };
        if(edited === true)
        {
            getProfileData();
        }
    }, []);

    const handleContinuePress = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const userId = JSON.parse(decode(token.split('.')[1])).id;
            const formData = new FormData();
            formData.append('userId', userId);
            formData.append('username', username);
            formData.append('phoneNo', phoneNo);
            formData.append('gender', gender);
            formData.append('dateOfBirth', dateOfBirth.toISOString());

            if (profilePicture) {
                formData.append('profilePicture', {
                    uri: profilePicture,
                    name: 'profilePicture.png',
                    type: 'image/png',
                });
            }

            const response = await axios.post('http://ec2-13-48-55-95.eu-north-1.compute.amazonaws.com:8000/api/user/update/profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setProfData(prevProfData => ({
                ...prevProfData,
                username: username,
                phoneNumber: phoneNo,
                gender: gender,
                dob: dateOfBirth.toISOString(),
                imagePath: profilePicture,
            }));
            setEdited(true);
            navigation.navigate('myProfile', { eventsData });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleBackPress = () => {
        navigation.navigate('myProfile', { eventsData });
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || dateOfBirth;
        setShowDatePicker(Platform.OS === 'ios');
        setDateOfBirth(currentDate);
    };

    const handleSelectProfilePicture = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.canceled) {
            setProfilePicture(result.assets[0].uri);
        }
    };


    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' ,marginLeft:5, marginTop:10}}>
                <Ionicons onPress={handleBackPress} name="arrow-back-outline" size={25} color="#666666" />
            </View>

            <View style={styles.topContainer}>
                <Image source={require('../assets/images/logo-rounded.png')} style={styles.logo} />
                <Text style={styles.heading}>Edit Your Profile</Text>
                {/* Profile Picture */}
                <TouchableOpacity style={styles.profilePictureContainer} onPress={handleSelectProfilePicture}>
                    <View style={styles.profilePictureFrame}>
                    {profilePicture ? (
                        <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
                        ) : (
                        <Ionicons name="person-circle-outline" size={120} color="#C4C4C4" />
                        )}
                    </View>
                    {/* Camera Icon */}
                    <View style={styles.cameraIcon}>
                        <Ionicons name="camera-outline" size={24} color="#FFF" />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.bottomContainer}>
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
                        <Ionicons name="call-outline" size={24} color="#666666" />
                        <TextInput
                            style={styles.input}
                            placeholder="Phone Number"
                            value={phoneNo}
                            onChangeText={setPhoneNo}
                            keyboardType="phone-pad"
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <Ionicons name="transgender-outline" size={24} color="#666666" />
                        <Picker
                            selectedValue={gender}
                            style={{ height: 30, width: '100%' }}
                            onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                        >
                            <Picker.Item label="Gender" value="" style={styles.input} />
                            <Picker.Item label="Male" value="male" style={styles.input} />
                            <Picker.Item label="Female" value="female" style={styles.input} />
                            <Picker.Item label="Other" value="other" style={styles.input} />
                        </Picker>
                    </View>
                    <View style={styles.inputWrapper}>
                        <Ionicons name="calendar-outline" size={24} color="#666666" />
                        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                            <Text style={styles.input} placeholder="Date of Birth">
                                {dateOfBirth.toLocaleDateString()}
                            </Text>
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={dateOfBirth}
                                mode="date"
                                is24Hour={true}
                                display="spinner"
                                onChange={handleDateChange}
                                style={{ backgroundColor: 'white' }}
                            />
                        )}
                    </View>
                </View>


                <TouchableOpacity style={styles.signInButton} onPress={handleContinuePress}>
                    <Text style={styles.signInButtonText}>SAVE CHANGES</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default editProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        // alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
        fontFamily: 'Poppins',
    },
    topContainer: {
        alignItems: 'center',
    },
    bottomContainer: {
        width: '100%',
        justifyContent: 'space-between',
    },
    logo: {
        width: 90,
        height: 90,
        
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
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        padding: 5,
        marginBottom: 20,
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
    profilePictureContainer: {
        marginTop: 20,
        width: 130,
        height: 130,
        borderRadius: 60,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    profilePictureFrame: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    profilePicture: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    cameraIcon: {
        position: 'absolute',
        backgroundColor: '#FF4459',
        borderRadius: 20,
        padding: 3,
        bottom: 19,
        right: 20,
    }

});



