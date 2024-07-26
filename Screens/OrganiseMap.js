import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode } from 'base-64';
import { getUserData } from '../server/server';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { API_KEY } from '../server/server';

const OrganiseMap = ({ navigation }) => {
  const mapRef = useRef(null);
  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);
  const [markerLatitude, setMarkerLatitude] = useState(null);
  const [markerLongitude, setMarkerLongitude] = useState(null);
  const [initialRegion, setInitialRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const tokenPayload = JSON.parse(decode(token.split('.')[1]));
          const userId = tokenPayload.id;
          const response = await getUserData(userId);
          console.log("Axios", response.data);
          if (response.user) {
            const userLat = response.user.location.coordinates[0] || 0;
            const userLon = response.user.location.coordinates[1] || 0;
            setUserLatitude(userLat);
            setUserLongitude(userLon);
            setInitialRegion({
              latitude: userLat,
              longitude: userLon,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
          } else {
            Alert.alert('Error', 'Failed to get user profile data.');
          }
        }
      } catch (error) {
        console.log(error);
        Alert.alert('Error', 'Failed to get user profile data.');
      }
    };

    getProfileData();
  }, []);

  const handleShowLocation = async () => {
    if (mapRef.current) {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      console.log('Current location:', latitude, longitude);

      setUserLatitude(latitude);
      setUserLongitude(longitude);

      mapRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  };

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarkerLatitude(latitude);
    setMarkerLongitude(longitude);
    console.log('Selected location:', latitude, longitude);
  };

  const handleContinuePress = () => {
    navigation.navigate('Organise', { markerLatitude, markerLongitude });
  };

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search..."
        fetchDetails={true}
        onPress={(data, details = null) => {
          const { lat, lng } = details.geometry.location;
          setMarkerLatitude(lat);
          setMarkerLongitude(lng);
          console.log('Selected location:', lat, lng);
          mapRef.current.animateToRegion({
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          });
        }}
        query={{
          key:API_KEY,
          language: 'en',
        }}
        styles={{
          container: styles.searchBarContainer,
          textInput: styles.input,
          listView: styles.listView,
        }}
      />
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        ref={mapRef}
        onPress={handleMapPress}
      >
        {userLatitude && userLongitude && (
          <Marker
            coordinate={{ latitude: userLatitude, longitude: userLongitude }}
            title="Your Location"
            description="This is your current location"
          />
        )}
        {markerLatitude && markerLongitude && (
          <Marker
            coordinate={{ latitude: markerLatitude, longitude: markerLongitude }}
            title="Selected Location"
            description="This is the selected location"
          />
        )}
      </MapView>
      <TouchableOpacity style={styles.locationButton} onPress={handleShowLocation}>
        <Ionicons name="locate-outline" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.signInButton} onPress={handleContinuePress}>
        <Text style={styles.signInButtonText}>CONTINUE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0', 
  },
  searchBarContainer: {
    position: 'absolute',
    width: '100%',
    zIndex: 1, 
    paddingHorizontal: 20,
    paddingTop: 70,
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#F0F0F0',
  },
  listView: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
  },
  map: {
    flex: 1,
  },
  locationButton: {
    position: 'absolute',
    bottom: 115, 
    right: 20,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
    elevation: 5,
  },
  signInButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#FF4459',
    borderRadius: 10,
    padding: 12,
    marginVertical: 10,
    width: '90%', 
    alignSelf: 'center', 
  },
  signInButtonText: {
    fontFamily: 'Poppins',
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
    color: 'white',
  },
});

export default OrganiseMap;
