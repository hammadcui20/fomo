import React, { useState,useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode } from 'base-64';
import axios from 'axios';
import { API_URL,getUserData } from '../server/server';
import { useProfile } from '../components/ProfileContext';



const soldTickets = () => {
    const navigation = useNavigation();
    const [eventsData, setEventsData] = useState([]);
    const [orgId, setOrgId] = useState(null);
    const { profData, setProfData } = useProfile();
    const [count,setCount]=useState(0);
    const username = profData.username;
    const phoneNo = profData.phoneNumber;
    const userId=profData.id;
    useEffect(() => {
        const fetchJoinedEvents = async () => { 
            try { 
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    const tokenPayload = JSON.parse(decode(token.split('.')[1]));
                    const userId = tokenPayload.id;   
                    const response = await axios.get(`${API_URL}/user/event/sold?userId=${userId}`); 
                    const joinedEvents = response.data.createdEvents.map(event => ({

                        id: event.id,
                        name: event.title,
                        location: event.location,
                        dateTime: new Date(event.date).toLocaleDateString(),
                        image: event.images[0],
                        time:event.time,
                        description:event.description,
                        price:event.price
                    }));
                    setEventsData(joinedEvents);
                }
            } catch (error) {
                console.error('Error fetching liked events:', error);
            }
        };

        fetchJoinedEvents();
    }, []);
    
    const handleBackPress = () => {
        navigation.navigate('dispute');
    };

    const handleMyTicketsPress = () => {
        
        navigation.navigate('myTickets');
    };

    const handleSoldTicketsPress = () => {
        
        navigation.navigate('soldTickets');
    };
    const soldTickets = async (eventId) => { 
        try { 
            console.log("eventid",eventId);
            const response = await axios.get(`${API_URL}/user/event/sold/details?eventId=${eventId}`); 
            console.log("newapi",response.data);
            setCount(response.data.count);
        } catch (error) {
            console.error('Error fetching liked events:', error);
        }
    };
    const handleEventPress = (eventId,location,image,date,title) => {
        const resp=soldTickets(eventId);
        const time=eventsData.find(event => event.id === eventId).time;
        const des=eventsData.find(event => event.id === eventId).description;
        const price=eventsData.find(event => event.id === eventId).price;
        navigation.navigate('eventDetail2',{eventId,location,image,date,title,time,des,price,count});
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
                <TouchableOpacity style={styles.button} onPress={handleMyTicketsPress}>
                    <Text style={styles.buttonText}>My Tickets</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signInButton} onPress={handleSoldTicketsPress}>
                    <Text style={styles.signInButtonText}>Sold Tickets</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={{ flex: 1, height: 400, marginTop: 10, marginHorizontal: 20 }} showsVerticalScrollIndicator={false}>
                {eventsData.map(event => (
                    <TouchableOpacity key={event.id} style={styles.eventContainer}  onPress={() => handleEventPress(event.id,event.location.coordinates,event.image,event.dateTime,event.name)} >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 100, height: 100, borderRadius: 10, overflow: 'hidden', marginRight: 10 }}>
                                <Image source={{ uri: event.image }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <View style={{ flexDirection: 'row', marginVertical: 8 }}>
                                    <Text style={{ fontFamily: 'Poppins', fontSize: 16.5, fontWeight: '500' }}>{event.name}</Text>
                                    
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 ,justifyContent: 'space-between'}}>
                                    <Ionicons name="location-outline" size={18} color="gray" style={{ marginRight: 2 }} />
                                    <Text style={{ fontFamily: 'Poppins', fontSize: 14, color: 'gray', marginRight: 10 }}>{event.location.coordinates.map(coord => coord.toFixed(2)).join(', ')}</Text>
                                    <Ionicons name="time-outline" size={18} color="gray" style={{ marginRight: 2 }} />
                                    <Text style={{ fontFamily: 'Poppins', fontSize: 14, color: 'gray' }}>{event.dateTime}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                                    <Text style={{ fontFamily: 'Poppins', fontSize: 14, color: 'gray' }}>{username}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                                    <Text style={{ fontFamily: 'Poppins', fontSize: 14, color: 'gray' }}>{phoneNo}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

        </View>
    );
}


export default soldTickets

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
        width:'50%',
        marginLeft: 15,
    },
    signInButtonText: {
        fontFamily: 'Poppins',
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        color:'white',
    }      
});