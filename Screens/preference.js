import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const Preference = () => {
  const [recallsChecked, setRecallsChecked] = useState(true);
  const [updatesChecked, setUpdatesChecked] = useState(false);
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.navigate('Signin');
  };

  const handleContinuePress = () => {
    navigation.navigate('Sucess');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back-outline" size={30} color="#666666" />
        </TouchableOpacity>
        <Text style={styles.header}>Preference</Text>
      </View>

      <View>
        <CheckBox
          title="Notify me about updates"
          checked={updatesChecked}
          onPress={() => setUpdatesChecked(!updatesChecked)}
          checkedIcon={<Ionicons name="checkbox-outline" size={24} color="#FF4459" />}
          containerStyle={styles.checkboxContainer}
          textStyle={styles.checkboxLabel}
        />
        <Text style={styles.header}>Content Preferences:</Text>
        <CheckBox
          title="Event Preference"
          checked={recallsChecked}
          onPress={() => setRecallsChecked(!recallsChecked)}
          checkedIcon={<Ionicons name="checkbox-outline" size={24} color="#FF4459" />}
          containerStyle={styles.checkboxContainer}
          textStyle={styles.checkboxLabel}
        />
        <CheckBox
          title="Troubleshooting"
          checked={recallsChecked}
          onPress={() => setRecallsChecked(!recallsChecked)}
          checkedIcon={<Ionicons name="checkbox-outline" size={24} color="#FF4459" />}
          containerStyle={styles.checkboxContainer}
          textStyle={styles.checkboxLabel}
        />
        <CheckBox
          title="App New Features"
          checked={recallsChecked}
          onPress={() => setRecallsChecked(!recallsChecked)}
          checkedIcon={<Ionicons name="checkbox-outline" size={24} color="#FF4459" />}
          containerStyle={styles.checkboxContainer}
          textStyle={styles.checkboxLabel}
        />
      </View>

      <View>
        <Text style={styles.header}>Media Preferences:</Text>
        <CheckBox
          title="How-to guides"
          checked={recallsChecked}
          onPress={() => setRecallsChecked(!recallsChecked)}
          checkedIcon={<Ionicons name="checkbox-outline" size={24} color="#FF4459" />}
          containerStyle={styles.checkboxContainer}
          textStyle={styles.checkboxLabel}
        />
        <CheckBox
          title="Expert Guidance"
          checked={recallsChecked}
          onPress={() => setRecallsChecked(!recallsChecked)}
          checkedIcon={<Ionicons name="checkbox-outline" size={24} color="#FF4459" />}
          containerStyle={styles.checkboxContainer}
          textStyle={styles.checkboxLabel}
        />
        <CheckBox
          title="Technology And Features"
          checked={recallsChecked}
          onPress={() => setRecallsChecked(!recallsChecked)}
          checkedIcon={<Ionicons name="checkbox-outline" size={24} color="#FF4459" />}
          containerStyle={styles.checkboxContainer}
          textStyle={styles.checkboxLabel}
        />
      </View>

      <TouchableOpacity style={styles.signInButton} onPress={handleContinuePress}>
        <Text style={styles.signInButtonText}>CONTINUE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Poppins',
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginTop: 8,
    padding: 12,
  },
  header: {
    marginTop:10,
    fontFamily: 'Poppins',
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 36,
    textAlign: 'left',
    marginLeft: 10,
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  checkboxLabel: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.2,
    textAlign: 'left',
  },
  signInButton: {
    backgroundColor: '#FF4459',
    borderRadius: 10,
    padding: 12,
    width: '100%',
    marginTop: 20,
  },
  signInButtonText: {
    fontFamily: 'Poppins',
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
    color: 'white',
  },
});

export default Preference;
