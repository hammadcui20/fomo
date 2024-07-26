import React, { useState, useEffect } from 'react';
import { Platform, View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView,Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

const Organise = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [dateText, setDateText] = useState('');
  const [timeText, setTimeText] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.markerLatitude && route.params?.markerLongitude) {
        setLocation(`${route.params.markerLatitude}, ${route.params.markerLongitude}`);
      }
    }, [route.params])
  );

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
    setDateText(currentDate.toLocaleDateString());
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === 'ios');
    setTime(currentTime);
    setTimeText(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  const handleSelectOnMapPress = () => {
    navigation.navigate('OrganiseMap');
  };

  const handleContinuePress = () => {
    if (!title || !dateText || !timeText || !location || !description || !price) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
    const locationArray = location.split(',');
    const latitude = locationArray[0].trim(); // Extract latitude
    const longitude = locationArray[1].trim(); // Extract longitude
    console.log("Title", title);
    console.log("Date", date);
    console.log("Time", timeText);
    console.log("Location", location);
    console.log("Description", description);
    console.log("Price", price);
    
    navigation.navigate('organise2', {
      title,
      date: date.toISOString(),
      time: timeText,
      latitude,
      longitude,
      description,
      price
    });
  };

  const handleBackPress = () => {
    navigation.navigate('home');
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, paddingHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons onPress={handleBackPress} name="arrow-back-outline" size={25} color="#666666" />
          <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 18, marginLeft: 10 }}>ORGANIZE EVENTS</Text>
        </View>
      </View>

      <KeyboardAvoidingView style={{ flex: 1, paddingHorizontal: 20 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput placeholder="Event Title" style={styles.input} value={title} onChangeText={setTitle} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity style={[styles.inputWrapper, { flex: 1 }]} onPress={showDatepicker}>
                <TextInput 
                  placeholder="Date"
                  style={styles.input}
                  value={dateText}
                  editable={false}
                />
                <Ionicons name="calendar-outline" size={20} color="#FF4459" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.inputWrapper, { flex: 1, marginLeft: 10 }]} onPress={showTimepicker}>
                <TextInput 
                  placeholder="Time"
                  style={styles.input}
                  value={timeText}
                  editable={false}
                />
                <Ionicons name="time-outline" size={20} color="#FF4459" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputWrapper}>
              <Ionicons name="location-outline" size={20} color="#666666" />
              <TextInput placeholder="Location" style={styles.input} value={location} onChangeText={setLocation} />
            </View>
            <TouchableOpacity style={styles.mapButton} onPress={handleSelectOnMapPress}>
              <Text style={styles.loginLink}>Select on Map</Text>
            </TouchableOpacity>
            <View style={[styles.inputWrapper, { borderColor: '#C7C7C7', borderWidth: 1, paddingVertical: 10, borderRadius: 5, marginTop: 10 }]}>
              <TextInput placeholder="Description" style={[styles.input, { height: 110 }]} multiline value={description} onChangeText={setDescription} />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <Text style={{ fontFamily: 'Poppins', fontSize: 16 }}>Ticket Price</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="toggle" size={24} color="#FF4459" style={{ marginRight: 5 }} />
              </View>
            </View>

            <View style={styles.inputWrapper}>
              <Ionicons name="cash-outline" size={20} color="#666666" />
              <TextInput placeholder="Price" style={styles.input} value={price} onChangeText={setPrice} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <TouchableOpacity style={styles.signInButton} onPress={handleContinuePress}>
        <Text style={styles.signInButtonText}>CONTINUE</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    padding: 5,
    marginTop: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#C7C7C7',
    padding: 5,
    marginBottom: 25,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 17,
    fontWeight: '400',
    textAlign: 'left',
    color: '#666666',
    fontFamily: 'Poppins',
  },
  signInButton: {
    backgroundColor: '#FF4459',
    borderRadius: 10,
    padding: 12,
    width: '90%',
    marginLeft: 'auto', 
    marginRight: 'auto', 
    marginBottom: 30,
  },
  signInButtonText: {
    fontFamily: 'Poppins',
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
    color: 'white',
  },
  mapButton: {
    marginBottom: 0,
    fontFamily: 'Poppins',
  },
  loginLink: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 24,
    textAlign: 'center',
    color: '#FF4459',
    textDecorationLine: 'underline',
  },
});

export default Organise;
