import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode } from 'base-64';
import axios from 'axios';
import { API_URL,getUserData } from '../server/server';
import { useProfile } from '../components/ProfileContext';
const MyTickets = () => {
    const navigation = useNavigation();
    const [eventsData, setEventsData] = useState([]);
    const [orgId, setOrgId] = useState(null);
    const { profData, setProfData } = useProfile();
    const userId=profData.id; 
    console.log("Prof Data",userId);
    useEffect(() => {
        const fetchJoinedEvents = async () => {
            try {
                if (profData.id) {
                    const response = await axios.get(`${API_URL}/user/event/joined?userId=${profData.id}`);
                    // console.log("response",response.data)
                    const joinedEvents = response.data.joinedEvents;
                    console.log("joinedEvents",joinedEvents)
                    const eventsWithOrganizer = await Promise.all(joinedEvents.map(async event => {
                        const userData = await getUserData(event.event.userId);
                        return {
                            id: event.id,
                            name: event.event.title,
                            location: event.event.location,
                            dateTime: new Date(event.event.date).toLocaleDateString(),
                            time:event.event.time,
                            image: event.event.images[0],
                            organizer: userData.user.username,
                            orgPhone: userData.user.phoneNumber
                        };
                    }));

                    setEventsData(eventsWithOrganizer);
                }
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchJoinedEvents();
    }, [profData.id]);
    const handleBackPress = () => {
        navigation.navigate('dispute');
    };

    const handleMyTicketsPress = () => {
        navigation.navigate('myTickets');
    };

    const handleSoldTicketsPress = () => {
        navigation.navigate('soldTickets');
    };

    const handleEventPress = (eventId,title,location,date) => {
        const time=eventsData.find(event => event.id === eventId).time;
        navigation.navigate('showTicket',{eventId,title,location,date,time});
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons onPress={handleBackPress} name="arrow-back-outline" size={25} color="#666666" />
                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 18, marginLeft: 10 }}>TICKETS</Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, marginHorizontal: 50 }}>
                <TouchableOpacity style={styles.signInButton} onPress={handleMyTicketsPress}>
                    <Text style={styles.signInButtonText}>My Tickets</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleSoldTicketsPress}>
                    <Text style={styles.buttonText}>Sold Tickets</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={{ flex: 1, height: 400, marginTop: 10, marginHorizontal: 20 }} showsVerticalScrollIndicator={false}>
                {eventsData.map(event => (
                    <TouchableOpacity key={event.id} style={styles.eventContainer}  onPress={() => handleEventPress(event.id,event.name,event.location.coordinates,event.dateTime)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 100, height: 100, borderRadius: 10, overflow: 'hidden', marginRight: 10 }}>
                                <Image source={{ uri: event.image }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <View style={{ flexDirection: 'row', marginVertical: 8 }}>
                                    <Text style={{ fontFamily: 'Poppins', fontSize: 16.5, fontWeight: '500' }}>{event.name}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, justifyContent: 'space-between' }}>
                                    <Ionicons name="location-outline" size={18} color="gray" style={{ marginRight: 2 }} />
                                    <Text style={{ fontFamily: 'Poppins', fontSize: 14, color: 'gray', marginRight: 10 }}>{event.location.coordinates.map(coord => coord.toFixed(2)).join(', ')}</Text>
                                    <Ionicons name="time-outline" size={18} color="gray" style={{ marginRight: 2 }} />
                                    <Text style={{ fontFamily: 'Poppins', fontSize: 14, color: 'gray' }}>{event.dateTime}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                                    <Text style={{ fontFamily: 'Poppins', fontSize: 14, color: 'gray' }}>{event.organizer}</Text>
                                    <Text style={{ fontFamily: 'Poppins', fontSize: 14, color: 'gray' }}>{event.orgPhone}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default MyTickets;

const styles = StyleSheet.create({
    button: {
        border: '#FF4459',
        borderColor:'#ff4459',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        borderWidth:1,
        width:'50%',
    },
    buttonText: {
        color: 'black',
        fontFamily: 'Poppins',
        fontSize: 17.5,
        fontWeight: '500',
        textAlign: 'center',
    },
    signInButton: {
        backgroundColor: '#FF4459',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        marginRight:10,
        width: '50%',
    },
    signInButtonText: {
        fontFamily: 'Poppins',
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        color:'white',
    }      
});
