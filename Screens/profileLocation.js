import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { insertUserLocationData,checkUserLocationData } from '../server/server';
import { decode } from 'base-64';
import { Country, State, City } from 'country-state-city';
import { checkUserProfileData, insertUserProfileData ,getUserData,getAllEvents} from '../server/server';
import { useProfile } from '../components/ProfileContext';

const ProfileLocation = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [cityCoordinates, setCityCoordinates] = useState(null); 
    const [selectedCountryName, setSelectedCountryName] = useState(''); 
    const [selectedStateName, setSelectedStateName] = useState('');
    const { profData, setProfData } = useProfile({});
    const [events, setEvents] = useState([]);
    const countries = Country.getAllCountries();
    const states = country ? State.getStatesOfCountry(country) : [];
    const cities = state ? City.getCitiesOfState(country, state) : [];

    useEffect(() => {
        const checkUserLocationDatafunc = async () => {
            try {
              const token = await AsyncStorage.getItem('token');
              if (token) {
                const tokenPayload = JSON.parse(decode(token.split('.')[1]));
                const userId = tokenPayload.id;
                const response = await checkUserLocationData(userId);
                console.log(response);
                if(response.status == "200")
                  { 
                    navigation.navigate('home');
                  }
                else
                {
                  setUsername(response.user.username);
                  Alert.alert('Info', 'Please fill below fields');
                }
              }
            } catch (error) {
              console.log(error);
            //   Alert.alert('Error', 'Failed to check user profile data.');
            }
          };
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
          fetchData();
          checkUserLocationDatafunc();
    }, []);

    const handleContinuePress = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                const tokenPayload = JSON.parse(decode(token.split('.')[1]));
                const userId = tokenPayload.id;

                const locationData = {
                    userId,
                    country,
                    state,
                    cityCoordinates, 
                    selectedCountryName, 
                    selectedStateName,
                };
                console.log(locationData);
                const response = await insertUserLocationData(locationData);
                if (response && response.status === 200) {
                    Alert.alert('Success', 'Location Updated successfully');
                    navigation.navigate('Sucess', { eventsData: events, profData });
                } else {
                    Alert.alert('Error', 'Failed to update location.');
                }
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Fill all fields');
        }
    };

        
    // Function to handle city selection and set coordinates
    const handleCityChange = (itemValue) => {
        const selectedCity = cities.find(city => city.name === itemValue);
        if (selectedCity) {
            setCity(selectedCity.name);
            setCityCoordinates(selectedCity); 
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.topContainer}>
                <Image source={require('../assets/images/logo-rounded.png')} style={styles.logo} />
                <Text style={styles.heading}>Select Your Location</Text>
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <Ionicons name="globe-outline" size={24} color="#666666" />
                        <Picker
                            style={styles.picker}
                            selectedValue={country}
                            onValueChange={(itemValue, itemIndex) => {
                                const selectedCountry = countries.find(c => c.isoCode === itemValue);
                                setCountry(itemValue);
                                setSelectedCountryName(selectedCountry ? selectedCountry.name : '');
                                setState('');
                                setCity('');
                            }}
                        >
                            <Picker.Item label="Select Country" value="" />
                            {countries.map((country) => (
                                <Picker.Item key={country.isoCode} label={country.name} value={country.isoCode} />
                            ))}
                        </Picker>
                    </View>
                    {country && (
                        <View style={styles.inputWrapper}>
                            <Ionicons name="location-outline" size={24} color="#666666" />
                            <Picker
                                style={styles.picker}
                                selectedValue={state}
                                onValueChange={(itemValue, itemIndex) => {
                                    const selectedState = states.find(s => s.isoCode === itemValue);
                                    setState(itemValue);
                                    setSelectedStateName(selectedState ? selectedState.name : '');
                                    setCity('');
                                }}
                            >
                                <Picker.Item label="Select State" value="" />
                                {states.map((state) => (
                                    <Picker.Item key={state.isoCode} label={state.name} value={state.isoCode} />
                                ))}
                            </Picker>
                        </View>
                    )}
                    {state && (
                        <View style={styles.inputWrapper}>
                            <Ionicons name="business-outline" size={24} color="#666666" />
                            <Picker
                                style={styles.picker}
                                selectedValue={city}
                                onValueChange={(itemValue, itemIndex) => handleCityChange(itemValue)}
                            >
                                <Picker.Item label="Select City" value="" />
                                {cities.map((city) => (
                                    <Picker.Item key={city.name} label={city.name} value={city.name} />
                                ))}
                            </Picker>
                        </View>
                    )}
                </View>
                <TouchableOpacity style={styles.signInButton} onPress={handleContinuePress}>
                    <Text style={styles.signInButtonText}>CONTINUE</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default ProfileLocation;

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
    picker: {
        flex: 1,
        marginLeft: 10,
    },
    mapButton: {
        marginBottom: 50,
        fontFamily: 'Poppins',
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
});
