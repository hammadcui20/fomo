import React, { useState,useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, value,Platform, Alert  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavBar from '../components/NavBar';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import {API_URL } from '../server/server';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode } from 'base-64';
import axios from 'axios';
import { useProfile } from '../components/ProfileContext';
const myProfile = ({ route }) => {
    const { eventsData } = route.params || { eventsData: [] };
    const { profData, setProfData } = useProfile();
    const navigation = useNavigation();
    // const [username, setUsername] = useState('');
    // const [phoneNo, setPhoneNo] = useState('');
    // const [gender, setGender] = useState('');
    // const [dateOfBirth, setDateOfBirth] = useState('');
    // const [profilePicture, setProfilePicture] = useState(null);
    const username = profData.username;
    const phoneNo = profData.phoneNumber;
    const gender = profData.gender;
    const dateOfBirth = profData.dob;
    const profilePicture = profData.imagePath;

    const [likedEvents, setLikedEvents] = useState(new Set());
    const [LikedEventsData, setLikedEventsData] = useState([]);
    // const [eventsData, setEventsData] = useState([]);

    // useEffect(() => {
    //     const fetchProfileData = async () => {
    //         try {
    //             const token = await AsyncStorage.getItem('token');
    //             console.log(token);
    //             if (token) {
    //                 const tokenPayload = JSON.parse(decode(token.split('.')[1]));
    //                 const userId = tokenPayload.id;
    //                 const response = await axios.get(`${API_URL}/user/data`, { params: { userId } });
    //                 const userData = response.data.user;
    //                 console.log("userData",userData);
    //                 setUsername(userData.username || '');
    //                 setPhoneNo(userData.phoneNumber || '');
    //                 setGender(userData.gender || '');
    //                 setDateOfBirth(new Date(userData.dob));
    //                 setProfilePicture(userData.imagePath);
    //             }
    //         } catch (error) {
    //             Alert.alert('Error fetching profile data:', error.message);
    //             console.error('Error fetching profile data:', error);
    //         }
    //     };

    //     fetchProfileData();
    // }, []);

    // useEffect(() => {
    //     const fetchAllEvents = async () => {
    //         try {
    //             const response = await axios.get(`${API_URL}/user/event/all`);
    //             setEventsData(response.data.events || []);
    //             console.log("eventsData",eventsData);
    //         } catch (error) {
    //             console.error('Error fetching events:', error);
    //         }
    //     };

    //     fetchAllEvents();
    // }, []);

    useEffect(() => {
        const fetchLikedEvents = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    const tokenPayload = JSON.parse(decode(token.split('.')[1]));
                    const userId = tokenPayload.id;
                    const response = await axios.get(`${API_URL}/user/event/liked?userId=${userId}`);
                    console.log("response2", response.data);
                    
                    const likedEvents = response.data.map(item => ({
                        ...item.event,
                        likedEventId: item.id,
                        userId: item.userId
                    }));  

                    setLikedEventsData(likedEvents);

                    const likedEventIds = likedEvents.map(event => event.id);
                    setLikedEvents(new Set(likedEventIds));
                }
            } catch (error) {
                console.error('Error fetching liked events:', error);
            }
        };

        fetchLikedEvents();
    }, []);
    console.log("LikedEventsData",LikedEventsData);
    const handleEventPress = (eventId) => {
        navigation.navigate('eventDetail', { eventId });
    };

    const handleLikePress = async (eventId) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                const tokenPayload = JSON.parse(decode(token.split('.')[1]));
                const userId = tokenPayload.id;
                await axios.post(`${API_URL}/user/event/like`, { userId, eventId });
                setLikedEvents(prev => new Set(prev).add(eventId));
            }
        } catch (error) {
            console.error('Error liking event:', error);
            Alert.alert('Error', 'Failed to like the event.');
        }
    };

    const handleJoin = (eventId) => {
        navigation.navigate('eventDetail', { eventId });
    };

    const handleNotifications = () => {
        navigation.navigate('NotificationScreen');
    };

    const handleSettings = () => {
        navigation.navigate('settings');
    };

    const handleBackPress = () => {
        navigation.navigate('home',{ eventsData, profData });
    };

    const handleQR = () => {
        navigation.navigate('scanTicket');
    };
    const handleEdit = () => {
        navigation.navigate('editProfile',{ eventsData, profData });
    };
    
    const renderItem = ({ item }) => (
        <TouchableOpacity style={{ marginBottom: 10, marginHorizontal: 10 }} onPress={() => handleEventPress(item.id)} >
            <View
                style={{
                    borderRadius: 15, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,
                }}
            >
                <View style={{ width: 250, height: 180 }}>
                    <Image source={{ uri: item.images[0] }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                </View>
                <TouchableOpacity style={{ position: 'absolute', top: 18, right: 16, backgroundColor: 'white', borderRadius: 20, padding: 6 }} >
                    <Ionicons name={likedEvents.has(item.id) ? "heart" : "heart-outline"} size={24} color="red" onPress={() => handleLikePress(item.id)} />
                </TouchableOpacity>
                <View style={{ backgroundColor: '#FFFFFF', borderBottomLeftRadius: 15, borderBottomRightRadius: 15, padding: 10 }}>
                    <Text style={{ fontFamily: 'Poppins', fontSize: 17, fontWeight: '500', lineHeight: 27, textAlign: 'center' }}>{item.title}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {/* <Ionicons name="location-outline" size={18} color="gray" style={{ marginRight: 2 }} /> */}
                            {/* <Text style={{ fontFamily: 'Poppins', fontSize: 14, color: 'gray' }}>{item.location.coordinates.map(coord => coord.toFixed(2)).join(', ')}</Text> */}
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
    const SettingIcon = `
      <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M18.8066 6.62337L18.1842 5.54328C17.6576 4.62936 16.4907 4.31408 15.5755 4.83847C15.1399 5.0951 14.6201 5.16791 14.1307 5.04084C13.6413 4.91378 13.2226 4.59727 12.9668 4.16113C12.8023 3.88391 12.7139 3.56815 12.7105 3.2458C12.7254 2.72898 12.5304 2.22816 12.17 1.85743C11.8096 1.48669 11.3145 1.27762 10.7975 1.27783H9.54348C9.03695 1.27783 8.5513 1.47967 8.19398 1.8387C7.83667 2.19773 7.63716 2.68435 7.63959 3.19088C7.62458 4.23668 6.77246 5.07657 5.72655 5.07646C5.4042 5.07311 5.08844 4.9847 4.81122 4.82017C3.89605 4.29577 2.7291 4.61105 2.20252 5.52497L1.53433 6.62337C1.00839 7.53615 1.31938 8.70236 2.22998 9.23207C2.82189 9.5738 3.18652 10.2053 3.18652 10.8888C3.18652 11.5723 2.82189 12.2038 2.22998 12.5456C1.32054 13.0717 1.00921 14.2351 1.53433 15.1451L2.16591 16.2344C2.41263 16.6795 2.82659 17.0081 3.31618 17.1472C3.80577 17.2863 4.33062 17.2247 4.77461 16.9758C5.21106 16.7211 5.73117 16.6513 6.21932 16.782C6.70748 16.9126 7.12322 17.2328 7.37415 17.6714C7.53868 17.9486 7.62709 18.2644 7.63044 18.5868C7.63044 19.6433 8.48694 20.4998 9.54348 20.4998H10.7975C11.8505 20.4998 12.7055 19.6489 12.7105 18.5959C12.7081 18.0878 12.9088 17.5998 13.2681 17.2405C13.6274 16.8812 14.1155 16.6804 14.6236 16.6829C14.9452 16.6915 15.2596 16.7795 15.5389 16.9392C16.4517 17.4651 17.6179 17.1541 18.1476 16.2435L18.8066 15.1451C19.0617 14.7073 19.1318 14.1858 19.0012 13.6961C18.8706 13.2065 18.5502 12.7891 18.111 12.5364C17.6717 12.2837 17.3514 11.8663 17.2208 11.3767C17.0902 10.8871 17.1602 10.3656 17.4153 9.92772C17.5812 9.63809 17.8214 9.39795 18.111 9.23207C19.0161 8.70265 19.3264 7.54325 18.8066 6.63252V6.62337Z" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10.1751 13.5248C11.631 13.5248 12.8112 12.3445 12.8112 10.8886C12.8112 9.43269 11.631 8.25244 10.1751 8.25244C8.71916 8.25244 7.53891 9.43269 7.53891 10.8886C7.53891 12.3445 8.71916 13.5248 10.1751 13.5248Z" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>      
      `;

    const QRIcon = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.1667 6C16.0746 6 16 6.07462 16 6.16667V7.83333C16 7.92538 16.0746 8 16.1667 8H17.8333C17.9254 8 18 7.92538 18 7.83333V6.16667C18 6.07462 17.9254 6 17.8333 6H16.1667ZM16 18V17.5C16 17.2239 16.2239 17 16.5 17C16.7761 17 17 17.2239 17 17.5V18H18V17.5C18 17.2239 18.2239 17 18.5 17C18.7761 17 19 17.2239 19 17.5V18.5C19 18.7761 18.7761 19 18.5 19H14.5C14.2239 19 14 18.7761 14 18.5V17.5C14 17.2239 14.2239 17 14.5 17C14.7761 17 15 17.2239 15 17.5V18H16ZM13 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H11.5C11.2239 12 11 11.7761 11 11.5C11 11.2239 11.2239 11 11.5 11H12V10H10.5C10.2239 10 10 9.77614 10 9.5C10 9.22386 10.2239 9 10.5 9H13.5C13.7761 9 14 9.22386 14 9.5C14 9.77614 13.7761 10 13.5 10H13V11ZM18 12H17.5C17.2239 12 17 11.7761 17 11.5C17 11.2239 17.2239 11 17.5 11H18V10.5C18 10.2239 18.2239 10 18.5 10C18.7761 10 19 10.2239 19 10.5V12.5C19 12.7761 18.7761 13 18.5 13C18.2239 13 18 12.7761 18 12.5V12ZM13 14H12.5C12.2239 14 12 13.7761 12 13.5C12 13.2239 12.2239 13 12.5 13H13.5C13.7761 13 14 13.2239 14 13.5V15.5C14 15.7761 13.7761 16 13.5 16H10.5C10.2239 16 10 15.7761 10 15.5C10 15.2239 10.2239 15 10.5 15H13V14ZM16.1667 5H17.8333C18.4777 5 19 5.52233 19 6.16667V7.83333C19 8.47767 18.4777 9 17.8333 9H16.1667C15.5223 9 15 8.47767 15 7.83333V6.16667C15 5.52233 15.5223 5 16.1667 5ZM6.16667 5H7.83333C8.47767 5 9 5.52233 9 6.16667V7.83333C9 8.47767 8.47767 9 7.83333 9H6.16667C5.52233 9 5 8.47767 5 7.83333V6.16667C5 5.52233 5.52233 5 6.16667 5ZM6.16667 6C6.07462 6 6 6.07462 6 6.16667V7.83333C6 7.92538 6.07462 8 6.16667 8H7.83333C7.92538 8 8 7.92538 8 7.83333V6.16667C8 6.07462 7.92538 6 7.83333 6H6.16667ZM6.16667 15H7.83333C8.47767 15 9 15.5223 9 16.1667V17.8333C9 18.4777 8.47767 19 7.83333 19H6.16667C5.52233 19 5 18.4777 5 17.8333V16.1667C5 15.5223 5.52233 15 6.16667 15ZM6.16667 16C6.07462 16 6 16.0746 6 16.1667V17.8333C6 17.9254 6.07462 18 6.16667 18H7.83333C7.92538 18 8 17.9254 8 17.8333V16.1667C8 16.0746 7.92538 16 7.83333 16H6.16667ZM13 6H10.5C10.2239 6 10 5.77614 10 5.5C10 5.22386 10.2239 5 10.5 5H13.5C13.7761 5 14 5.22386 14 5.5V7.5C14 7.77614 13.7761 8 13.5 8C13.2239 8 13 7.77614 13 7.5V6ZM10.5 8C10.2239 8 10 7.77614 10 7.5C10 7.22386 10.2239 7 10.5 7H11.5C11.7761 7 12 7.22386 12 7.5C12 7.77614 11.7761 8 11.5 8H10.5ZM5.5 14C5.22386 14 5 13.7761 5 13.5C5 13.2239 5.22386 13 5.5 13H7.5C7.77614 13 8 13.2239 8 13.5C8 13.7761 7.77614 14 7.5 14H5.5ZM9.5 14C9.22386 14 9 13.7761 9 13.5C9 13.2239 9.22386 13 9.5 13H10.5C10.7761 13 11 13.2239 11 13.5C11 13.7761 10.7761 14 10.5 14H9.5ZM11 18V18.5C11 18.7761 10.7761 19 10.5 19C10.2239 19 10 18.7761 10 18.5V17.5C10 17.2239 10.2239 17 10.5 17H12.5C12.7761 17 13 17.2239 13 17.5C13 17.7761 12.7761 18 12.5 18H11ZM9 11H9.5C9.77614 11 10 11.2239 10 11.5C10 11.7761 9.77614 12 9.5 12H8.5C8.22386 12 8 11.7761 8 11.5V11H7.5C7.22386 11 7 10.7761 7 10.5C7 10.2239 7.22386 10 7.5 10H8.5C8.77614 10 9 10.2239 9 10.5V11ZM5 10.5C5 10.2239 5.22386 10 5.5 10C5.77614 10 6 10.2239 6 10.5V11.5C6 11.7761 5.77614 12 5.5 12C5.22386 12 5 11.7761 5 11.5V10.5ZM15 10.5C15 10.2239 15.2239 10 15.5 10C15.7761 10 16 10.2239 16 10.5V12.5C16 12.7761 15.7761 13 15.5 13C15.2239 13 15 12.7761 15 12.5V10.5ZM17 15V14.5C17 14.2239 17.2239 14 17.5 14H18.5C18.7761 14 19 14.2239 19 14.5C19 14.7761 18.7761 15 18.5 15H18V15.5C18 15.7761 17.7761 16 17.5 16H15.5C15.2239 16 15 15.7761 15 15.5V14.5C15 14.2239 15.2239 14 15.5 14C15.7761 14 16 14.2239 16 14.5V15H17ZM3 6.5C3 6.77614 2.77614 7 2.5 7C2.22386 7 2 6.77614 2 6.5V4.5C2 3.11929 3.11929 2 4.5 2H6.5C6.77614 2 7 2.22386 7 2.5C7 2.77614 6.77614 3 6.5 3H4.5C3.67157 3 3 3.67157 3 4.5V6.5ZM17.5 3C17.2239 3 17 2.77614 17 2.5C17 2.22386 17.2239 2 17.5 2H19.5C20.8807 2 22 3.11929 22 4.5V6.5C22 6.77614 21.7761 7 21.5 7C21.2239 7 21 6.77614 21 6.5V4.5C21 3.67157 20.3284 3 19.5 3H17.5ZM6.5 21C6.77614 21 7 21.2239 7 21.5C7 21.7761 6.77614 22 6.5 22H4.5C3.11929 22 2 20.8807 2 19.5V17.5C2 17.2239 2.22386 17 2.5 17C2.77614 17 3 17.2239 3 17.5V19.5C3 20.3284 3.67157 21 4.5 21H6.5ZM21 17.5C21 17.2239 21.2239 17 21.5 17C21.7761 17 22 17.2239 22 17.5V19.5C22 20.8807 20.8807 22 19.5 22H17.5C17.2239 22 17 21.7761 17 21.5C17 21.2239 17.2239 21 17.5 21H19.5C20.3284 21 21 20.3284 21 19.5V17.5Z" fill="#333333"/>
      </svg>  
      `;

      return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, paddingHorizontal: 20 }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons onPress={handleBackPress} name="arrow-back-outline" size={25} color="#666666" />
                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 18, marginLeft: 10 }}>PROFILE</Text>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <SvgXml style={{ marginRight: 20 }} xml={SettingIcon} width={25} height={25} onPress={handleSettings} />
                    <SvgXml xml={QRIcon} width={25} height={25} onPress={handleQR} />
                </View>
            </View>
            <ScrollView style={{ flex: 1, height: 400, marginTop: 5, marginHorizontal: 15 }} showsVerticalScrollIndicator={false}>
                <View style={{ alignItems: 'center' }}>
                    <View style={{ width: 150, height: 150, borderRadius: 75, overflow: 'hidden' }}>
                        <Image style={{ width: '100%', height: '100%', resizeMode: 'cover' }} source={{uri: profilePicture}} />
                    </View>
                    <Text style={{ marginTop: 10, fontFamily: 'Poppins', fontSize: 20, fontWeight: '600', lineHeight: 30, letterSpacing: 0, textAlign: 'left' }}>{username}</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center' , marginVertical: 10}}>
                        <TouchableOpacity onPress={handleEdit} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="create-outline" size={24} color="#ffff" style={styles.cameraIcon} />
                            <Text style={styles.editProfileText}>Edit profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            

                <Text style={{ fontFamily: 'Poppins', fontSize: 22, fontWeight: '500', lineHeight: 33, letterSpacing: 0, marginTop: 20}}>Liked Events</Text>
                <View>
                    <TouchableOpacity onPress={handleEventPress}>
                        <FlatList
                            data={LikedEventsData}
                            renderItem={renderItem}
                            keyExtractor={item => item.id.toString()}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ marginTop: 20, paddingHorizontal: 20 }}
                        />
                    </TouchableOpacity>
                </View>
            


                <View>

                </View>
            
                
                    <Text style={{ fontFamily: 'Poppins', fontSize: 22, fontWeight: '500', lineHeight: 33, letterSpacing: 0, marginTop: 20, marginLeft: 20 }}>Feed</Text>
            <ScrollView style={{ flex: 1, height: 400, marginTop: 10, marginHorizontal: 20 }} showsVerticalScrollIndicator={false}>
                {eventsData.map(event => (
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
                                    {/* <Ionicons name="location-outline" size={18} color="gray" style={{ marginRight: 5 }} /> */}
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
        

            </ScrollView>
            <NavBar />
          

        </View>
    )
}

export default myProfile

const styles = StyleSheet.create({
    cameraIcon: {
        position: 'absolute',
        backgroundColor: '#FF4459',
        borderRadius: 25,
        padding: 5,
    },
    editProfileText: {
        fontFamily: 'Poppins',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
        letterSpacing: 0,
        textAlign: 'left',
        marginLeft: 45,
    },
});
