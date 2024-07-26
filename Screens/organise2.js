import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { decode } from 'base-64';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { checkUserProfileData } from '../server/server';



const Organise2 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [userId, setUserId] = useState('');
  const [images, setImages] = useState([]);
  const [eventData, setEventData] = useState({
    userId: userId,
    title: route.params.title,
    date: route.params.date,
    time: route.params.time,
    latitude: route.params.latitude,
    longitude: route.params.longitude,
    description: route.params.description,
    price: route.params.price,
  });
  
  useEffect(() => {
    const checkProfileData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const tokenPayload = JSON.parse(decode(token.split('.')[1]));
          const userId = tokenPayload.id;
          setUserId(userId);
          setEventData({
            userId: userId,
            title: route.params.title,
            date: route.params.date,
            time: route.params.time,
            latitude: parseFloat(route.params.latitude), 
            longitude: parseFloat(route.params.longitude), 
            description: route.params.description,
            price: route.params.price,  
          });
          const response = await checkUserProfileData(userId); 
          if (response.user) {
            setUserId(response.user.id || '');
          } else {
            Alert.alert('Error', 'Failed to get user profile data.');
          }
        }
      } catch (error) {
        console.log(error);
        Alert.alert('Error', 'Failed to check user profile data.');
      }
    };

    checkProfileData();
  }, []);
  console.log("Event Data", eventData);
  const handleLaunchEvent = async () => {
    try {
      // Check if images array is empty
      if (images.length === 0) {
        Alert.alert('Error', 'Please upload at least one image.');
        return;
      }
  
      const formData = new FormData();
      formData.append('userId', eventData.userId);
      formData.append('title', eventData.title);
      formData.append('date', eventData.date);
      formData.append('time', eventData.time);
      formData.append('location', JSON.stringify({ type: "Point", coordinates: [eventData.longitude, eventData.latitude] }));
      formData.append('description', eventData.description);
      formData.append('price', eventData.price);
  
      images.forEach((image, index) => {
        formData.append('images', {
          uri: image.uri,
          name: `image_${index}.jpg`,
          type: 'image/jpeg'
        });
      });
  
      console.log("Form Data", formData);
      const response = await axios.post('http://ec2-13-48-55-95.eu-north-1.compute.amazonaws.com:8000/api/user/add/event', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      Alert.alert('Success', 'Event created successfully');
      navigation.navigate('home');
    } catch (error) {
      console.log("Error", error);
      Alert.alert('Error', 'Failed to create event');
    }
  };
  
  const handleBackPress = () => {
    navigation.navigate('Organise');
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0]]);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'space-between', paddingHorizontal: 10 }}>
      <View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, paddingHorizontal: 20 }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons onPress={handleBackPress} name="arrow-back-outline" size={25} color="#666666" />
            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 18, marginLeft: 10 }}>IMAGES</Text>
          </View>
        </View>

        <View style={styles.paymentOption}>
          <TouchableOpacity onPress={pickImage} style={{ flex: 1 }}>
            <View style={{ borderStyle: 'dotted', borderWidth: 1, borderRadius: 5, borderColor: '#FF4459', padding: 20, alignItems: 'center' }}>
              <Ionicons name="cloud-upload-outline" size={48} color="#FF4459" />
              <Text style={{ marginTop: 10, fontFamily: 'Poppins', fontSize: 14, fontWeight: '600', lineHeight: 24, textAlign: 'center', color: '#FF4459', textDecorationLine: 'underline' }}>Upload Event Images</Text>
            </View>
          </TouchableOpacity>
        </View>

        <FlatList
          data={images}
          horizontal
          renderItem={({ item }) => (
            <Image source={{ uri: item.uri }} style={styles.image} />
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ marginTop: 20 }}
        />
      </View>

      <TouchableOpacity style={styles.signInButton} onPress={handleLaunchEvent}>
        <Text style={styles.signInButtonText}>LAUNCH EVENT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Organise2;

const styles = StyleSheet.create({
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

  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 15,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 3,
    marginTop: 30,
    marginHorizontal: 15,
  },

  image: {
    width: 110,
    height: 110,
    borderRadius: 5,
    marginHorizontal: 7,
  },
});
