import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NotificationScreen = ({navigation}) => {
    const handleBackPress = () => {
        navigation.navigate('Home');
    };
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                    <Ionicons name="arrow-back-outline" size={30} color="#666666" />
                </TouchableOpacity>
                <Text style={styles.header}>NOTIFICATIONS</Text>
            </View>

            <View style={styles.notificationSection}>
                <Text style={styles.today}>Today:</Text>
                <View style={styles.notification}>
                    <View style={styles.bellIconContainer}>
                        <Ionicons name="notifications-outline" size={24} color="#FF4459" />
                    </View>

                    <View style={styles.messageContent}>
                        <Text style={styles.messageHeader}>Notification Heading</Text>
                        <Text style={styles.messageSubtitle}>Notification Subtitle</Text>
                    </View>
                </View>
                <View style={styles.notification}>
                    <View style={styles.bellIconContainer}>
                        <Ionicons name="notifications-outline" size={24} color="#FF4459" />
                    </View>

                    <View style={styles.messageContent}>
                        <Text style={styles.messageHeader}>Notification Heading</Text>
                        <Text style={styles.messageSubtitle}>Notification Subtitle</Text>
                    </View>
                </View>
            </View>

            <View style={styles.notificationSection}>
                <Text style={styles.yesterday}>Yesterday:</Text>
                <View style={styles.notification}>
                    <View style={styles.bellIconContainer}>
                        <Ionicons name="notifications-outline" size={24} color="#FF4459" />
                    </View>

                    <View style={styles.messageContent}>
                        <Text style={styles.messageHeader}>Notification Heading</Text>
                        <Text style={styles.messageSubtitle}>Notification Subtitle</Text>
                    </View>
                </View>
                <View style={styles.notification}>
                    <View style={styles.bellIconContainer}>
                        <Ionicons name="notifications-outline" size={24} color="#FF4459" />
                    </View>

                    <View style={styles.messageContent}>
                        <Text style={styles.messageHeader}>Notification Heading</Text>
                        <Text style={styles.messageSubtitle}>Notification Subtitle</Text>
                    </View>
                </View>
                <View style={styles.notification}>
                    <View style={styles.bellIconContainer}>
                        <Ionicons name="notifications-outline" size={24} color="#FF4459" />
                    </View>

                    <View style={styles.messageContent}>
                        <Text style={styles.messageHeader}>Notification Heading</Text>
                        <Text style={styles.messageSubtitle}>Notification Subtitle</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },

    notificationSection: {
        marginBottom: 20,
    },
    today: {
        fontFamily: 'Poppins',
        fontSize: 17,
        fontWeight: '600',
        lineHeight: 27,
        letterSpacing: 0,
        marginBottom: 10,
        color: '#666666',
    },
    bellIconContainer: {
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 10,
    },
    yesterday: {
        fontFamily: 'Poppins',
        fontSize: 17,
        fontWeight: '600',
        lineHeight: 27,
        letterSpacing: 0,
        marginBottom: 10,
        color: '#666666',

    },
    notification: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FF445933',
        borderRadius: 10,
        padding: 10,
        margin: 5,
    },
    messageContent: {
        marginLeft: 10,
    },
    messageHeader: {
        fontFamily: 'Poppins',
        fontSize: 15,
        fontWeight: '600',
        lineHeight: 24,
        letterSpacing: 0,
        color: 'black',
    },
    messageSubtitle: {
        fontFamily: 'Poppins',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 21,
        letterSpacing: 0,
        color: 'black',
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
        marginTop: 15,
        fontFamily: 'Poppins',
        fontSize: 22,
        fontWeight: '600',
        lineHeight: 36,
        textAlign: 'left',
        marginLeft: 10,
        color:'#121212',
    },
});

export default NotificationScreen;
