import React from 'react';
import { View, Text, TouchableOpacity,Alert  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const Settings = () => {
    const navigation = useNavigation();

    const handleTicketPress = () => {
        navigation.navigate('myTickets');
    };

    const handleWalletPress = () => {
        navigation.navigate('wallet');
    };

    const handleInfoPress = () => {
        navigation.navigate('dispute');
    };

    const handleLogoutPress = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          if (token) {
            const response = await axios.post('http://ec2-13-48-55-95.eu-north-1.compute.amazonaws.com:8000/api/user/logout', { token });
            if (response.status === 200) {
              console.log(response.status);
              await AsyncStorage.removeItem('token'); 
              navigation.navigate('Signin');
            } else {
              console.error('Logout failed with status:', response.status);
              console.log(error);
              Alert.alert('Error', error.error || 'Something went wrong!');
            }
          }
        } catch (error) {
          console.error('Error during logout', error);
          Alert.alert('Error', error.error || 'Something went wrong!');
        }
      };

    const handleBackPress = () => {
        navigation.navigate('Home');
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {/* Header */}
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, paddingHorizontal: 20 }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons onPress={handleBackPress} name="arrow-back-outline" size={25} color="#666666" />
                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 18, marginLeft: 10 }}>SETTINGS</Text>
                </View>
            </View>

            {/* Tickets */}
            <TouchableOpacity onPress={handleTicketPress}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: '#f0f0f0', marginTop: 30, marginHorizontal: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <Ionicons name="ticket-outline" size={25} color="#666666" />
                        <Text style={{ marginLeft: 20, fontFamily: 'Poppins', fontSize: 20, fontWeight: '400', lineHeight: 30, letterSpacing: 0, textAlign: 'center' }}>Tickets</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="chevron-forward-outline" size={25} color="#666666" />
                    </View>
                </View>
            </TouchableOpacity>

            {/* Wallets */}
            <TouchableOpacity onPress={handleWalletPress}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: '#f0f0f0', marginTop: 30, marginHorizontal: 10 }} >
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <Ionicons name="wallet-outline" size={25} color="#666666" />
                        <Text style={{ marginLeft: 20, fontFamily: 'Poppins', fontSize: 20, fontWeight: '400', lineHeight: 30, letterSpacing: 0, textAlign: 'center' }}>Wallets</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="chevron-forward-outline" size={25} color="#666666" />
                    </View>
                </View>
            </TouchableOpacity>

            {/* Info */}
            <TouchableOpacity onPress={handleInfoPress}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: '#f0f0f0', marginTop: 30, marginHorizontal: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <Ionicons name="information-circle-outline" size={25} color="#666666" />
                        <Text style={{ marginLeft: 20, fontFamily: 'Poppins', fontSize: 20, fontWeight: '400', lineHeight: 30, letterSpacing: 0, textAlign: 'center' }}>Dispute Center</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="chevron-forward-outline" size={25} color="#666666" />
                    </View>
                </View>
            </TouchableOpacity>

            {/* Logout */}
            <TouchableOpacity onPress={handleLogoutPress}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 8, marginTop: 30, marginHorizontal: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <Ionicons name="log-out-outline" size={25} color="#FF6666" />
                        <Text style={{ marginLeft: 20, fontFamily: 'Poppins', fontSize: 16, fontWeight: '400', lineHeight: 24, letterSpacing: 0, textAlign: 'left', color: '#ff6666' }}>Logout</Text>
                    </View>
                </View>
            </TouchableOpacity>
            
        </View>
    );
};

export default Settings;
