import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';
import { useNavigation, useRoute } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import { getUserData } from '../server/server';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode } from 'base-64';
import { useStripe } from '@stripe/stripe-react-native';
import { joinEvent } from '../server/server';
import {API_URL} from '../server/server';
import { useProfile } from '../components/ProfileContext';
const EventDetail = ({ route }) => {
  const navigation = useNavigation();
  const { eventsData, profData } = route.params || { eventsData: [], profData: {} };
  console.log('Events Data:', eventsData);
  // const route = useRoute();
  const { eventId } = route.params;
  const [eventDetails, setEventDetails] = useState(null);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/event?eventId=${eventId}`);
        setEventDetails(response.data.event);
      } catch (error) {
        console.error('Error fetching event details:', error);
        setError('Failed to load event details.');
      }
    };
    fetchEventDetails();
  }, [eventId]);
  
  useEffect(() => {
    const getProfileData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const tokenPayload = JSON.parse(decode(token.split('.')[1]));
          const userId = tokenPayload.id;
          setUserId(userId);
          const response = await getUserData(userId);
          if (response.user) {
            setUsername(response.user.username || '');
          } else {
            console.log('Failed to get user profile data.');
          }
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    getProfileData();
  }, []);

  const handleBackPress = () => {
    console.log('Events Data2:', eventsData);
    navigation.navigate('events',{ eventsData, profData });
  };

  const handleChatPress = () => {
    navigation.navigate('Chat');
  };

  const fetchPaymentSheetParams = async () => {
    const response = await axios.post('http://ec2-13-48-55-95.eu-north-1.compute.amazonaws.com:8000/api/user/payment-sheet', {
      userId,
      eventId,
    });
    const { paymentIntent, ephemeralKey, customer } = response.data;
    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const handleBuyTicketPress = async () => {
    const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();
    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: paymentIntent,
      customerEphemeralKeySecret: ephemeralKey,
      customerId: customer,
      googlePay: true,
      applePay: true,
      merchantDisplayName: 'FOMO Events',
      
    });
    if (!error) {
      openPaymentSheet();
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      // await joinEvent();
      const eventData={userId,eventId}
      console.log(eventData);
      Alert.alert('Success', 'Event Joined Successfully!');
      const response = await joinEvent(eventData);
      navigation.navigate('events');
    }
  };

  // const joinEvent = async () => {
  //   try {
  //     console.log("userId",userId);
  //     console.log("EventId",eventId);
  //     const response = await axios.post('http://192.168.100.108:8000/api/user/event/join', {
  //       userId,
  //       eventId,
  //     });
  //     console.log('Join Event Response:', response.data);
  //   } catch (error) {
  //     console.error('Error joining event:', error);
  //     Alert.alert('Error', 'Failed to join event');
  //   }
  // };

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!eventDetails) {
    return <Text>Loading...</Text>;
  }

  const shareSvg = `
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_298_3906)">
      <path d="M14.1328 13.4531C13.1758 13.4531 12.3125 13.8672 11.7109 14.5234L6.32031 11.1836C6.46485 10.8164 6.54297 10.4141 6.54297 9.99609C6.54297 9.57813 6.46485 9.17578 6.32031 8.80859L11.7109 5.46875C12.3086 6.12891 13.1719 6.53906 14.1328 6.53906C15.9375 6.53906 17.4063 5.07031 17.4063 3.26563C17.4063 1.46094 15.9375 0 14.1328 0C12.3281 0 10.8594 1.46875 10.8594 3.27344C10.8594 3.69141 10.9375 4.09375 11.082 4.46094L5.69141 7.80078C5.09375 7.14063 4.23047 6.73047 3.26953 6.73047C1.46875 6.72656 0 8.19531 0 10C0 11.8047 1.46875 13.2734 3.27344 13.2734C4.23047 13.2734 5.09375 12.8594 5.69531 12.2031L11.0859 15.543C10.9414 15.9102 10.8633 16.3125 10.8633 16.7305C10.8633 18.5352 12.332 20.0039 14.1367 20.0039C15.9414 20.0039 17.4102 18.5352 17.4102 16.7305C17.4063 14.9219 15.9375 13.4531 14.1328 13.4531ZM12.0547 3.27344C12.0547 2.125 12.9883 1.19531 14.1328 1.19531C15.2773 1.19531 16.2109 2.12891 16.2109 3.27344C16.2109 4.41797 15.2773 5.35156 14.1328 5.35156C12.9883 5.35156 12.0547 4.42188 12.0547 3.27344ZM3.27344 12.0781C2.125 12.0781 1.19141 11.1445 1.19141 10C1.19141 8.85547 2.125 7.92188 3.27344 7.92188C4.42188 7.92188 5.35156 8.85547 5.35156 10C5.35156 11.1445 4.42188 12.0781 3.27344 12.0781ZM12.0547 16.7266C12.0547 15.5781 12.9883 14.6484 14.1328 14.6484C15.2773 14.6484 16.2109 15.582 16.2109 16.7266C16.2109 17.8711 15.2773 18.8047 14.1328 18.8047C12.9883 18.8047 12.0547 17.875 12.0547 16.7266Z" fill="#FF4459"/>
      </g>
      <defs>
      <clipPath id="clip0_298_3906">
      <rect width="17.4063" height="20" fill="white"/>
      </clipPath>
      </defs>
    </svg>
  `;

  const heartSvg = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.21064 8.6573C0.295009 5.79864 1.36509 2.53122 4.36626 1.5644C5.94493 1.05496 7.68744 1.35533 8.99986 2.34264C10.2415 1.38264 12.048 1.05837 13.6249 1.5644C16.6261 2.53122 17.703 5.79864 16.7882 8.6573C15.3632 13.1885 8.99986 16.6786 8.99986 16.6786C8.99986 16.6786 2.68349 13.2414 1.21064 8.6573Z" stroke="#FF4459" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12.4133 4.47729C13.3264 4.77255 13.9715 5.58748 14.0492 6.54407" stroke="#FF4459" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;

  const timeSvg = `
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M16.7082 9.00033C16.7082 13.2578 13.2573 16.7087 8.99984 16.7087C4.74234 16.7087 1.2915 13.2578 1.2915 9.00033C1.2915 4.74283 4.74234 1.29199 8.99984 1.29199C13.2573 1.29199 16.7082 4.74283 16.7082 9.00033Z" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M11.8596 11.4524L8.7179 9.57823V5.53906" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  const locationSvg = `
    <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.08329 7.7505C9.08329 6.59944 8.1506 5.66675 7.00038 5.66675C5.84932 5.66675 4.91663 6.59944 4.91663 7.7505C4.91663 8.90072 5.84932 9.83341 7.00038 9.83341C8.1506 9.83341 9.08329 8.90072 9.08329 7.7505Z" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M6.99959 16.5C6.00086 16.5 0.75 12.2486 0.75 7.80274C0.75 4.3222 3.54758 1.5 6.99959 1.5C10.4516 1.5 13.25 4.3222 13.25 7.80274C13.25 12.2486 7.99832 16.5 6.99959 16.5Z" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  const coordinates = eventDetails.location && eventDetails.location.coordinates;
  const latitude = coordinates ? coordinates[0] : 0;
  const longitude = coordinates ? coordinates[1] : 0;

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF4F5' }}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Ionicons onPress={handleBackPress} name="arrow-back-outline" size={25} color="#666666" />
          <Text style={styles.headerText}>EVENT DETAIL</Text>
        </View>
      </View>
      <Image source={{ uri: eventDetails.images[0] }} style={styles.image} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{eventDetails.title}</Text>
        <View style={styles.icons}>
          <View style={styles.iconContainer}>
            <SvgXml xml={shareSvg} width={20} height={20} />
          </View>
          <View style={styles.iconContainer}>
            <SvgXml xml={heartSvg} width={20} height={20} />
          </View>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.detail}>
          <SvgXml xml={locationSvg} width={12} height={12} />
          <Text style={styles.detailText}>{latitude}, {longitude}</Text>
        </View>
        <View style={styles.detail}>
          <SvgXml xml={timeSvg} width={12} height={12} />
          <Text style={styles.detailText}>{eventDetails.date}</Text>
        </View>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.title}>{eventDetails.title}</Text>
        <Text style={styles.priceText}>Ticket Price: <Text style={styles.boldText}>${eventDetails.price}</Text></Text>
      </View>
      <Text style={styles.additionalInfoTitle}>Additional Information</Text>
      <Text style={styles.additionalInfoText}>{eventDetails.description}</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {coordinates && (
          <Marker
            coordinate={{ latitude: latitude, longitude: longitude }}
            title="Event Location"
            description={`${latitude}, ${longitude}`}
          />
        )}
      </MapView>

      <View style={styles.bottomBar}>
        <Ionicons onPress={handleChatPress} name="chatbubble-ellipses-outline" size={30} color="#FF4459" />
        <TouchableOpacity style={styles.signInButton} onPress={handleBuyTicketPress}>
          <Text style={styles.signInButtonText}>Buy Ticket</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    marginLeft: 10,
  },
  image: {
    width: '100%',
    height: 300,
    marginTop: -80,
    zIndex: -1000,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 12,
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 22,
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: 'white',
    borderRadius: 9999,
    width: 33,
    height: 33,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 12,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  detailText: {
    fontFamily: 'Poppins',
    fontSize: 13,
    color: 'gray',
    marginLeft: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  priceText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: 'gray',
  },
  boldText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
  },
  additionalInfoTitle: {
    fontFamily: 'Poppins',
    fontSize: 18,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  additionalInfoText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: 'gray',
    paddingHorizontal: 20,
    marginTop: 6,
  },
  map: {
    flex: 1,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  signInButton: {
    backgroundColor: '#FF4459',
    borderRadius: 10,
    padding: 12,
    width: '75%',
  },
  signInButtonText: {
    fontFamily: 'Poppins',
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
    color: 'white',
  },
});

export default EventDetail;
