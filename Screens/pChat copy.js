import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker from Expo
import { decode } from 'base-64';
import { API_URL, getUserData } from '../server/server';

const PChat = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { chatId } = route.params;
  const { eventId } = route.params;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [senderIdM, setSenderIdM] = useState('');
  const [eventDetails, setEventDetails] = useState(null);
  const [currentUserImage, setCurrentUserImage] = useState(null);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // State to store selected image

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/chats/${chatId}/messages`);
        setMessages(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setLoading(false);
      }
    };
    fetchMessages();
  }, [chatId]);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/event?eventId=${eventId}`);
        setEventDetails(response.data.event);
        const token = await AsyncStorage.getItem('token');
        const tokenPayload = JSON.parse(decode(token.split('.')[1]));
        const senderId = tokenPayload.id;
        const responseUser = await getUserData(senderId);
        setCurrentUserImage(responseUser.user.imagePath);
      } catch (error) {
        console.error('Error fetching event details:', error);
        setError('Failed to load event details.');
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSendMessage = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const tokenPayload = JSON.parse(decode(token.split('.')[1]));
      const senderId = tokenPayload.id;

      let messageData = {
        chatId,
        senderId,
        content: newMessage,
      };

      if (selectedImage) {
        messageData = {
          ...messageData,
          image: selectedImage.uri, 
        };
      }

      const newMessageObj = {
        id: Math.random().toString(),
        content: newMessage,
        sender: { id: senderId, imagePath: currentUserImage },
        image: selectedImage ? selectedImage.uri : null, 
      };

      setMessages([...messages, newMessageObj]);
      setNewMessage('');
      setSelectedImage(null);

      await axios.post(`${API_URL}/api/user/message/send`, messageData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message.');
    }
  };

  const handleImagePicker = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert('Permission to access media library is required.');
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!pickerResult.cancelled) {
        setSelectedImage(pickerResult); // Set selected image URI
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error picking image. Please try again.');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, paddingHorizontal: 20 }}>
        <Ionicons onPress={handleBackPress} name="arrow-back-outline" size={25} color="#666666" />
        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 18 }}>Chat Title</Text>
        <View style={{ width: 25 }}></View>
      </View>

      <ScrollView contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 10 }}>
        {loading ? (
          <Text>Loading messages...</Text>
        ) : (
          messages.map((message) => (
            <View key={message.id} style={{ alignSelf: message.sender && message.sender.id === "6656561173f0d459311f093d" ? 'flex-end' : 'flex-start', marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: message.sender && message.sender.id === "6656561173f0d459311f093d" ? 'flex-end' : 'flex-start' }}>
                {message.senderId && message.sender && message.sender.id !== "6656561173f0d459311f093d" && (
                  <View>
                    <Image source={{ uri: message.sender.imagePath }} style={styles.profilePhoto} />
                  </View>
                )}
                <View style={[styles.messageContainer, { backgroundColor: message.sender && message.sender.id === "6656561173f0d459311f093d" ? '#FFFFFF' : '#FF4459' }]}>
                  {message.image && (
                    <Image source={{ uri: message.image }} style={{ width: 200, height: 200, borderRadius: 10, marginBottom: 5 }} />
                  )}
                  <Text style={[styles.messageText, { color: message.sender && message.sender.id === "6656561173f0d459311f093d" ? '#000000' : '#FFFFFF' }]}>{message.content}</Text>
                </View>
                {message.sender && message.sender.id === "6656561173f0d459311f093d" && (
                  <View>
                    <Image source={{ uri: message.sender.imagePath }} style={styles.profilePhoto} />
                  </View>
                )}
              </View>
            </View>
          ))
        )}

      </ScrollView>

      {/* Input Bar */}
      <View style={styles.bottomNavbar}>
        <View style={{ position: 'relative', flex: 1 }}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={newMessage}
            onChangeText={setNewMessage}
          />
          <TouchableOpacity style={styles.cameraButton} onPress={handleImagePicker}>
            <Ionicons name="camera" size={20} color="#FF4459" />
          </TouchableOpacity>
          {selectedImage && (
            <Image source={{ uri: selectedImage.uri }} style={{ width: 200, height: 200, borderRadius: 10, marginTop: 10 }} />
          )}
        </View>
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage} disabled={!newMessage.trim() && !selectedImage}>
          <Ionicons name="send" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PChat;

const styles = StyleSheet.create({
  messageContainer: {
    maxWidth: '70%',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 22,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  profilePhoto: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  messageText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'left',
  },
  bottomNavbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#EDEDED',
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 13,
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  cameraButton: {
    position: 'absolute',
    top: '50%',
    right: 25,
    transform: [{ translateY: -10 }],
  },
  sendButton: {
    backgroundColor: '#FF4459',
    borderRadius: 20,
    padding: 10,
    marginRight: 5,
  },
});
