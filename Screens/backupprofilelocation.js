import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const ProfileLocation = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [country, setCountry] = useState('United States');
    const [state, setState] = useState('California');
    const [city, setCity] = useState('Los Angeles');

    const handleContinuePress = () => {
        navigation.navigate('Sucess');
    };

    // const handleSelectOnMapPress = () => {
    //     navigation.navigate('MapScreen');
    // };

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
                            onValueChange={(itemValue, itemIndex) => setCountry(itemValue)}
                            
                        >
                            <Picker.Item label="Country" value=""  style={styles.input}/>
                            <Picker.Item label="United States" value="United States"  style={styles.input}/>
                            <Picker.Item label="Canada" value="Canada"  style={styles.input}/>
                        </Picker>
                    </View>

                    <View style={styles.inputWrapper}>
                        <Ionicons name="location-outline" size={24} color="#666666" />
                        <Picker
                            style={styles.picker}
                            selectedValue={state}
                            onValueChange={(itemValue, itemIndex) => setState(itemValue)}
                        >
                            <Picker.Item label="State" value=""  style={styles.input}/>
                            <Picker.Item label="California" value="California"  style={styles.input}/>
                            <Picker.Item label="New York" value="New York"  style={styles.input}/>
                        </Picker>
                    </View>

                    <View style={styles.inputWrapper}>
                        <Ionicons name="business-outline" size={24} color="#666666" />
                        <Picker
                            style={styles.picker}
                            selectedValue={city}
                            onValueChange={(itemValue, itemIndex) => setCity(itemValue)}
                        >
                            <Picker.Item label="City" value=""  style={styles.input}/>
                            <Picker.Item label="Los Angeles" value="Los Angeles"  style={styles.input}/>
                            <Picker.Item label="New York City" value="New York City"  style={styles.input}/>
                        </Picker>
                    </View>
                </View>
                {/* <TouchableOpacity style={styles.mapButton} onPress={handleSelectOnMapPress}>
                    <Text style={styles.loginLink}>Select on Map</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={styles.signInButton} onPress={handleContinuePress}>
                    <Text style={styles.signInButtonText}>CONTINUE</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};
