import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavBar from '../components/NavBar';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode } from 'base-64';
import { API_URL } from '../server/server';

const Chats = () => {
  const navigation = useNavigation();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventId, setEventId] = useState(null);
  const [eventUri, setEventUri] = useState(null);
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const tokenPayload = JSON.parse(decode(token.split('.')[1]));
        const userId = tokenPayload.id;
        const response = await axios.get(`${API_URL}/user/event/chats/${userId}`);
        // console.log(response.data);
        setChats(response.data.chats);
        if (response.data.joinedEvents && response.data.joinedEvents.length > 0) {
          setEventId(response.data.joinedEvents[0].eventId);
          setEventUri(response.data.joinedEvents[0].event.images[0]);
        } else {
          console.log("No joined events found.");
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching chats:', error);
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  const handleNotifications = () => {
    navigation.navigate('NotificationScreen');
  };

  const handleBackPress = () => {
    navigation.navigate('home');
  };

  const handleChatPress = (chatId) => {
    if (eventId) {
      navigation.navigate('pChat', { chatId, eventId });
    } else {
      console.log("No eventId available.");
    }
  };

  const notificationIcon = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 17.8476C17.6392 17.8476 20.2481 17.1242 20.5 14.2205C20.5 11.3188 18.6812 11.5054 18.6812 7.94511C18.6812 5.16414 16.0452 2 12 2C7.95477 2 5.31885 5.16414 5.31885 7.94511C5.31885 11.5054 3.5 11.3188 3.5 14.2205C3.75295 17.1352 6.36177 17.8476 12 17.8476Z" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14.3888 20.8572C13.0247 22.3719 10.8966 22.3899 9.51945 20.8572" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, paddingHorizontal: 20 }}>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons onPress={handleBackPress} name="arrow-back-outline" size={25} color="#666666" />
          <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 18, marginLeft: 10 }}>GROUP CHAT</Text>
        </View>
        <SvgXml xml={notificationIcon} width={25} height={25} onPress={handleNotifications} />
      </View>

      <View style={styles.notificationSection}>
        <FlatList
          data={chats}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <>
              <TouchableOpacity onPress={() => handleChatPress(item.id)}>
                <View style={styles.notification}>
                  <Image source={{ uri: eventUri }}  style={styles.eventImage} />
                  <View style={styles.messageContent}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={styles.messageHeader}>{item.eventTitle}</Text>
                      <Text style={{ marginRight: 50, fontSize: 12, color: "#666666" }}>Today</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={styles.messageSubtitle}>{item.latestMessage}</Text>
                      <Text style={{ marginRight: 50, fontSize: 12, color: "#666666" }}>12:36 AM</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={styles.line}></View>
            </>
          )}
        />
      </View>

      <NavBar />
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({
  notificationSection: {
    marginTop: 20,
    width: '100%',
  },
  notification: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    width: '100%',
    marginBottom: 6,
  },
  eventImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  messageContent: {
    marginLeft: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  
  messageHeader: {
    fontFamily: 'Poppins',
    fontSize: 14.5,
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: 0,
    color: 'black',
    marginRight: 5,
  },
  messageSubtitle: {
    fontFamily: 'Poppins',
    fontSize: 11.5,
    fontWeight: '400',
    lineHeight: 21,
    letterSpacing: 0,
    color: '#666666',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
