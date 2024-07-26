import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useProfile } from '../components/ProfileContext';
const ProfileSuccessRegistered = ({ route,navigation }) => {
  const { eventsData,profData } = route.params || { eventsData: [],profData:{}};
  const handleContinuePress = () => {
    navigation.navigate('home', { eventsData,profData });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../assets/images/Sucessfull.png')}
          style={styles.image}
        />
        <Text style={styles.title}>Successfully Registered</Text>
        <Text style={styles.subtitle}>
          Congratulations you have successfully registered on the Fomo (Event) application.
        </Text>
      </View>
      <TouchableOpacity style={styles.signInButton} onPress={handleContinuePress}>
        <Text style={styles.signInButtonText}>CONTINUE</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ProfileSuccessRegistered;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    marginBottom: 30, // Add margin at the bottom of the content
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 17,
    textAlign: 'center',
    margin: 10,
    paddingTop: 30,
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '300',
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: 'center',
    marginHorizontal: 30,
    marginBottom: 20,
  },
  signInButton: {
    backgroundColor: '#FF4459',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'center', 
    width: 320,
  },
  signInButtonText: {
    fontFamily: 'Poppins',
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
    color: 'white',
  },
});
