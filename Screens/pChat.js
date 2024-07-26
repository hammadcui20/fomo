import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode } from 'base-64';
import { API_URL, getUserData } from '../server/server';
import * as ImagePicker from 'expo-image-picker';
import FormData from 'form-data';

const PChat = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { chatId, eventId } = route.params;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [senderIdM, setSenderIdM] = useState('');
  const [eventDetails, setEventDetails] = useState(null);
  const [currentUserImage, setcurrentUserImage] = useState(null);
  const [Error, setError] = useState(null);
  const [title,setTitle] = useState('');
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
        setSenderIdM(senderId);
        const responseUser = await getUserData(senderId);
        setcurrentUserImage(responseUser.user.imagePath);
      } catch (error) {
        console.error('Error fetching event or user details:', error);
        setError('Failed to load details.');
      }
    };
    setTitle(eventDetails?.title);
    fetchEventDetails();
  }, [eventId]);
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSendMessage = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('Token not found in AsyncStorage');
        return;
      }

      const tokenPayload = JSON.parse(decode(token.split('.')[1]));
      const senderId = tokenPayload.id;
      setSenderIdM(senderId);

      const formData = new FormData();
      formData.append('chatId', chatId);
      formData.append('senderId', senderId);

      if (selectedImage) {
        const localUri = selectedImage.assets[0].uri;
        const filename = selectedImage.assets[0].fileName;
        const type = selectedImage.assets[0].mimeType;
        formData.append('userChatImage', {
          uri: localUri,
          name: filename,
          type,
        });
      } else {
        formData.append('content', newMessage);
      }

      const response = await axios.post(`${API_URL}/user/message/send`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const newMessageObj = {
        id: response.data.id,
        content: response.data.content,
        sender: { id: senderId, imagePath: currentUserImage },
        imagePath: selectedImage ? selectedImage.assets[0].uri : null, // Store image path
      };

      setMessages([...messages, newMessageObj]);
      setNewMessage('');
      setSelectedImage(null);
    } catch (error) {
      console.error('Error sending message:', error.message);
      Alert.alert('Error', 'Failed to send message. Please try again.');
    }
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result);
    }
  };

  const renderMessages = () => {
    return messages.map((message) => (
      <View key={message.id} style={{ alignSelf: message.sender && message.sender.id === senderIdM ? 'flex-end' : 'flex-start', marginBottom: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: message.sender && message.sender.id === senderIdM ? 'flex-end' : 'flex-start' }}>
          {message.sender && message.sender.id !== senderIdM && (
            <View>
              <Image source={{ uri: message.sender.imagePath }} style={styles.profilePhoto} />
            </View>
          )}
          <View style={[styles.messageContainer, { backgroundColor: message.sender && message.sender.id === senderIdM ? '#FFFFFF' : '#FF4459' }]}>
            {message.imagePath ? (
              <Image source={{ uri: message.imagePath }} style={styles.messageImage} />
            ) : (
              <Text style={[styles.messageText, { color: message.sender && message.sender.id === senderIdM ? '#000000' : '#FFFFFF' }]}>
                {message.content.includes('https://res.cloudinary.com') ? (
                  <Image source={{ uri: message.content }} style={styles.messageImage} />
                ) : (
                  message.content
                )}
              </Text>
            )}
          </View>
          {message.sender && message.sender.id === senderIdM && (
            <View>
              <Image source={{ uri: message.sender.imagePath }} style={styles.profilePhoto} />
            </View>
          )}
        </View>
      </View>
    ));
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, paddingHorizontal: 20 }}>
        <Ionicons onPress={handleBackPress} name="arrow-back-outline" size={25} color="#666666" />
        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 18 }}>{title}</Text>
        <View style={{ width: 25 }}></View>
      </View>

      <ScrollView contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 10 }}>
        {loading ? (
          <Text>Loading messages...</Text>
        ) : (
          renderMessages()
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
          <TouchableOpacity style={styles.cameraButton} onPress={handlePickImage}>
            <Ionicons name="camera" size={20} color="#FF4459" />
          </TouchableOpacity>
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
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  bottomNavbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
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
