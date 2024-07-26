import React, { useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

const MapScreen = ({ navigation }) => {
  const mapRef = useRef(null);

  const handleContinuePress = () => {
    navigation.navigate('Preference');
  };

  const handleShowLocation = () => {
    if (mapRef.current) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          mapRef.current.animateToRegion({
            latitude,
            longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          });
        },
        error => console.error(error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        ref={mapRef}
      >
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          title="Marker"
          description="This is a marker"
        />
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
    fontFamily: 'Poppins',
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

export default MapScreen;
