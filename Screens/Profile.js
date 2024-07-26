import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkUserProfileData, insertUserProfileData,API_URL } from '../server/server';
import { decode } from 'base-64';
import axios from 'axios';

const Profile = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const checkProfileData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const tokenPayload = JSON.parse(decode(token.split('.')[1]));
          const userId = tokenPayload.id;
          const response = await checkUserProfileData(userId);
          console.log(response);
          if(response.status === "200")
            { 
              navigation.navigate('profileLocation');
            }
          else
          {
            setUsername(response.user.username);
            Alert.alert('Info', 'Please fill below fields');
          }
        }
      } catch (error) {
        console.log(error);
        Alert.alert('Error', 'Failed to check user profile data.');
      }
    };

    checkProfileData();
  }, []);

  const handleContinuePress = async () => {
    if (!phoneNo || !gender || !profilePicture) {
      Alert.alert('Error', 'Please fill all the required fields.');
      return;
    }
    
    try {
      const token = await AsyncStorage.getItem('token');
      const tokenPayload = JSON.parse(decode(token.split('.')[1]));
      const userId = tokenPayload.id;
  
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('phoneNo', phoneNo);
      formData.append('gender', gender);
      formData.append('dob', dateOfBirth.toISOString());
      formData.append('profilePicture', {
        uri: profilePicture,
        name: 'profilePicture.png',
        type: 'image/png',
      });
      console.log(formData);
      const response = await axios.post(`${API_URL}/user/insert-profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.data.status === 200) {
        Alert.alert('Success', 'Profile Updated successfully');
        navigation.navigate('profileLocation');
      } else {
        Alert.alert('Error', 'Failed to update profile.');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Server Error.');
    }
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
      console.log(result);
      setProfilePicture(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.topContainer}>
        <Image source={require('../assets/images/logo-rounded.png')} style={styles.logo} />
        <Text style={styles.heading}>Setup Your Profile</Text>
        <TouchableOpacity style={styles.profilePictureContainer} onPress={handleSelectProfilePicture}>
          <View style={styles.profilePictureFrame}>
            {profilePicture ? (
              <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
            ) : (
              <Ionicons name="person-circle-outline" size={120} color="#C4C4C4" />
            )}
          </View>
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
              editable={false} // Make username non-editable
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
              required
            />
          </View>
          <View style={styles.inputWrapper}>
            <Ionicons name="transgender-outline" size={24} color="#666666" />
            <Picker
              selectedValue={gender}
              style={{ height: 30, width: '100%' }}
              onValueChange={(itemValue) => setGender(itemValue)}
              required
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
                maximumDate={new Date()}
                style={{ backgroundColor: 'white' }}
              />
            )}
          </View>
        </View>
        <TouchableOpacity style={styles.signInButton} onPress={handleContinuePress}>
          <Text style={styles.signInButtonText}>CONTINUE</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};


export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
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
