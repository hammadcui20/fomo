import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavBar from '../components/NavBar';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import axios from 'axios';
import { getUserData,getAllEvents } from '../server/server';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode } from 'base-64';
import { useProfile } from '../components/ProfileContext';
export default function Events({ route }) {
    const { profData } = route.params || { profData: {} };
    // console.log("Event",eventsData);
    const [username, setUsername] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [profilePicture, setProfilePicture] = useState(null);
    const [modalState, setModalState] = useState(false);
    const [searchText, setSearchText] = useState('');
    const navigation = useNavigation();

    const [distance, setDistance] = useState(5);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [eventsData, setEventsData] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [likedEvents, setLikedEvents] = useState(new Set());

    useEffect(() => {
        getAllEventsFromServer();
        getLikedEvents();
    }, []);

    useEffect(() => {
        filterEvents();
    }, [searchText, eventsData]);

    const getAllEventsFromServer = async () => {
        try {
            const response = await axios.get(`http://ec2-13-48-55-95.eu-north-1.compute.amazonaws.com:8000/api/user/event/all`);
            setEventsData(response.data.events);
        } catch (error) {
            console.log(error);
            console.error("Error fetching events:", error);
        }
    };

    const getLikedEvents = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                const tokenPayload = JSON.parse(decode(token.split('.')[1]));
                const userId = tokenPayload.id;
                console.log(userId);
                const response = await axios.get(`http://ec2-13-48-55-95.eu-north-1.compute.amazonaws.com:8000/api/user/event/liked?userId=${userId}`);
                const likedEventIds = response.data.map(event => event.eventId);
                setLikedEvents(new Set(likedEventIds));
                // console.log(likedEventIds);
            }
        } catch (error) {
            console.error("Error fetching liked events:", error);
        }
    };
    
    const likeEvent = async (eventId) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                const tokenPayload = JSON.parse(decode(token.split('.')[1]));
                const userId = tokenPayload.id;
                await axios.post('http://ec2-13-48-55-95.eu-north-1.compute.amazonaws.com:8000/api/user/event/like', { userId, eventId });
                setLikedEvents(prev => new Set(prev).add(eventId));
            }
        } catch (error) {
            console.error("Error liking event:", error);
            Alert.alert('Error', 'Failed to like the event.');
        }
    };

    const handleLikePress = (eventId) => {
        likeEvent(eventId);
    };

    const handleJoin = (eventId) => { 
        navigation.navigate('eventDetail', { eventId, eventsData, profData });
    };

    const handleNotifications = () => {
        navigation.navigate('NotificationScreen');
    };

    const handleEventPress = (eventId) => {
        navigation.navigate('eventDetail', { eventId, eventsData, profData });
    };

    const handleBackPress = () => {
        navigation.navigate('home',{ eventsData, profData });
    };

    const handleFilterModal = () => {
        setModalState(true);
    };

    const applyFilters = () => {
        setModalState(false);
    };

    const filterEvents = () => {
        const filtered = eventsData.filter(event => event.title.toLowerCase().includes(searchText.toLowerCase()));
        setFilteredEvents(filtered);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={{ marginBottom: 10, marginHorizontal: 10 }} onPress={() => handleEventPress(item.id)}>
            <View
                style={{
                    borderRadius: 15, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,
                }}
            >
                <View style={{ width: 250, height: 180 }}>
                    <Image source={{ uri: item.images[0] }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                </View>
                <TouchableOpacity style={{ position: 'absolute', top: 18, right: 16, backgroundColor: 'white', borderRadius: 20, padding: 6 }} onPress={() => handleLikePress(item.id)}>
                    <Ionicons name={likedEvents.has(item.id) ? "heart" : "heart-outline"} size={24} color="red" />
                </TouchableOpacity>
                <View style={{ backgroundColor: '#FFFFFF', borderBottomLeftRadius: 15, borderBottomRightRadius: 15, padding: 10 }}>
                    <Text style={{ fontFamily: 'Poppins', fontSize: 17, fontWeight: '500', lineHeight: 27, textAlign: 'center' }}>{item.title}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="location-outline" size={18} color="gray" style={{ marginRight: 2 }} />
                            <Text style={{ fontFamily: 'Poppins', fontSize: 14, color: 'gray' }}>{item.location.coordinates.map(coord => coord.toFixed(2)).join(', ')}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="time-outline" size={18} color="gray" style={{ marginRight: 2 }} />
                            <Text style={{ fontFamily: 'Poppins', fontSize: 14, color: 'gray' }}>{item.time}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    const notificationIcon = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 17.8476C17.6392 17.8476 20.2481 17.1242 20.5 14.2205C20.5 11.3188 18.6812 11.5054 18.6812 7.94511C18.6812 5.16414 16.0452 2 12 2C7.95477 2 5.31885 5.16414 5.31885 7.94511C5.31885 11.5054 3.5 11.3188 3.5 14.2205C3.75295 17.1352 6.36177 17.8476 12 17.8476Z" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14.3888 20.8572C13.0247 22.3719 10.8966 22.3899 9.51945 20.8572" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, paddingHorizontal: 20 }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons onPress={handleBackPress} name="arrow-back-outline" size={25} color="#666666" />
                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 18, marginLeft: 10 }}>EVENTS</Text>
                </View>
                <SvgXml xml={notificationIcon} width={25} height={25} onPress={handleNotifications} />
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 20, paddingHorizontal: 20 }}>
                <View style={{ flex: 1, backgroundColor: '#F0F0F0', flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="search" size={24} color="gray" style={{ paddingHorizontal: 10 }} />
                    <TextInput
                        style={{ height: 40, paddingHorizontal: 10, fontFamily: 'Poppins', fontSize: 16, fontWeight: '400', lineHeight: 24, letterSpacing: 0, flex: 1 }}
                        placeholder="Search"
                        onChangeText={text => setSearchText(text)}
                        value={searchText}
                    />
                    <Ionicons name="filter" size={24} color="gray" style={{ marginHorizontal: 10 }} onPress={handleFilterModal} />
                    <Modal isVisible={modalState} onBackdropPress={() => setModalState(false)}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalHeader}>Filter</Text>
                            <View style={styles.sliderContainer}>
                                <Text style={styles.sliderLabel}>Distance: {distance} km</Text>
                            </View>
                            <View style={styles.categoryContainer}>
                                <Text style={styles.categoryLabel}>Categories:</Text>
                                <TouchableOpacity
                                    style={[styles.categoryButton, selectedCategories.includes('Music') && styles.selectedCategoryButton]}
                                    onPress={() =>
                                        setSelectedCategories(prev => (prev.includes('Music') ? prev.filter(cat => cat !== 'Music') : [...prev, 'Music']))
                                    }>
                                    <Text style={styles.categoryButtonText}>Music</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
                                <Text style={styles.applyButtonText}>Apply</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </View>
            </View>

            <Text style={{ fontFamily: 'Poppins', fontSize: 22, fontWeight: '500', lineHeight: 33, letterSpacing: 0, marginTop: 20, marginLeft: 20 }}>Trending</Text>
            <View>
                <FlatList
                    data={filteredEvents}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ marginTop: 20, paddingHorizontal: 20 }}
                />
            </View>

            <Text style={{ fontFamily: 'Poppins', fontSize: 22, fontWeight: '500', lineHeight: 33, letterSpacing: 0, marginTop: 20, marginLeft: 20 }}>Feed</Text>
            <ScrollView style={{ flex: 1, height: 400, marginTop: 10, marginHorizontal: 20 }} showsVerticalScrollIndicator={false}>
                {filteredEvents.map(event => (
                    <TouchableOpacity key={event.id} style={styles.eventContainer} onPress={() => handleEventPress(event.id)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 100, height: 100, borderRadius: 10, overflow: 'hidden', marginRight: 10 }}>
                                <Image source={{ uri: event.images[0] }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <View style={{ flexDirection: 'row', marginVertical: 8 }}>
                                    <Text style={{ fontFamily: 'Poppins', fontSize: 16.5, fontWeight: '500' }}>{event.title}</Text>
                                    <TouchableOpacity onPress={() => handleLikePress(event.id)}>
                                        <Ionicons name={likedEvents.has(event.id) ? "heart" : "heart-outline"} size={22} color="red" style={{ marginLeft: 'auto' }} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                                    <Ionicons name="location-outline" size={18} color="gray" style={{ marginRight: 5 }} />
                                    <Ionicons name="time-outline" size={18} color="gray" style={{ marginRight: 5 }} />
                                    <Text style={{ fontFamily: 'Poppins', fontSize: 14, color: 'gray' }}>{event.time}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                                        <Ionicons name="person-circle-outline" size={24} color="gray" style={{ marginRight: -9 }} />
                                        <Ionicons name="person-circle-outline" size={24} color="gray" style={{ marginRight: -9 }} />
                                        <Ionicons name="person-circle-outline" size={24} color="gray" style={{ marginRight: -9 }} />
                                    </View>
                                    <TouchableOpacity style={{ backgroundColor: '#FF6347', paddingVertical: 5, width: 100, height: 33, paddingHorizontal: 10, borderRadius: 5 }} onPress={() => handleJoin(event.id)}>
                                        <Text style={{ fontFamily: 'Poppins', textAlign: 'center', fontSize: 14, color: 'white' }}>JOIN US</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <NavBar />
        </View>
    );
}

const styles = StyleSheet.create({
    eventContainer: {
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 2 },
        marginBottom: 10,
        borderRadius: 15,
        backgroundColor: '#fff',
        shadowOpacity: 0.5,
        elevation: 5,
        padding: 15,
    },
    eventDetails: {
        flex: 1,
        padding: 10,
    },
    eventTitle: {
        fontFamily: 'Poppins-Medium',
        marginBottom: 12,
    },
    eventInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    eventText: {
        fontFamily: 'Poppins',
        fontSize: 16,
        marginLeft: 5,
    },
    eventAttendees: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    eventImage: {
        width: 120,
        height: 120,
    },
    joinButton: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    joinButtonText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
    },
    icon: {
        marginRight: 5,
    },

    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    modalHeader: {
        fontFamily: 'Poppins-Bold',
        fontSize: 20,
        marginBottom: 10,
    },
    sliderContainer: {
        marginBottom: 20,
    },
    sliderLabel: {
        fontFamily: 'Poppins',
        fontSize: 16,
        marginBottom: 5,
    },
    categoryContainer: {
        marginBottom: 20,
    },
    categoryLabel: {
        fontFamily: 'Poppins',
        fontSize: 16,
        marginBottom: 5,
    },
    categoryButton: {
        backgroundColor: '#E5E5E5',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginRight: 10,
    },
    selectedCategoryButton: {
        backgroundColor: '#FF6347',
    },
    categoryButtonText: {
        fontFamily: 'Poppins',
        fontSize: 14,
        color: 'black',
    },
    applyButton: {
        backgroundColor: '#FF6347',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignSelf: 'center',
    },
    applyButtonText: {
        fontFamily: 'Poppins',
        fontSize: 16,
        color: 'white',
    },
});
