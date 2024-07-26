
import { View, Text, Button, FlatList, KeyboardAvoidingView, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

const reviewSummary = () => {
    const navigation = useNavigation();
    const handleBackPress = () => {
        navigation.navigate('addCard');
    };

    const handleContinuePress = () => {
        navigation.navigate('ticket');
    };

    const changeCardPress = () => {
        navigation.navigate('payment');
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, paddingHorizontal: 20 }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons onPress={handleBackPress} name="arrow-back-outline" size={25} color="#666666" />
                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 18, marginLeft: 10 }}>REVIEW SUMMARY</Text>
                </View>
            </View>

            <View style={{ flex: 1, justifyContent: 'flex-start', marginHorizontal: 20, marginTop: 30 }}>
                <View style={styles.paymentOption}>
                    <View style={styles.row}>
                        <Text style={styles.optionText}>Event Title</Text>
                        <Text style={styles.optionText}>Mega Halloween Party</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.optionText}>Address</Text>
                        <Text style={styles.optionText}>Miami, USA 232323</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.optionText}>Date</Text>
                        <Text style={styles.optionText}>18 Jun 2024</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.optionText}>Time</Text>
                        <Text style={styles.optionText}>4 PM</Text>
                    </View>
                </View>

                <View style={styles.paymentOption}>
                    <View style={styles.row}>
                        <Text style={styles.optionText}>Amout</Text>
                        <Text style={styles.optionText}>$0,00</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.optionText}>Txt</Text>
                        <Text style={styles.optionText}>$0,00</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.optionText}>Total</Text>
                        <Text style={styles.optionText}>$0,00</Text>
                    </View>
                </View>


                <TouchableOpacity style={styles.paymentOption} >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('../assets/images/Mastercard.png')} style={styles.logo} />
                        <Text style={styles.optionText}>.... .... .... .... 4679</Text>
                    </View>
                    <TouchableOpacity style={styles.changeCardButton} onPress={changeCardPress}>
                        <Text style={styles.loginLink}>Change</Text>
                    </TouchableOpacity>
                </TouchableOpacity>



            </View>





            <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 30 }}>
                <TouchableOpacity style={styles.signInButton} onPress={handleContinuePress}>
                    <Text style={styles.signInButtonText}>CONFIRM PAYMENT</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default reviewSummary

const styles = StyleSheet.create({
    signInButton: {
        backgroundColor: '#FF4459',
        borderRadius: 10,
        padding: 12,
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },

    signInButtonText: {
        fontFamily: 'Poppins',
        fontSize: 22,
        fontWeight: '500',
        textAlign: 'center',
        color: 'white',
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    paymentOption: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 15,
        marginBottom: 28,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 3,
    },
    optionText: {
        fontFamily: 'Poppins',
        fontSize: 14,
        color: '#333333',
        marginLeft: 10,
    },
    logo: {
        width: 30,
        height: 30,
    },
    loginLink: {
        fontFamily: 'Poppins',
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 24,
        color: '#FF4459',
        textDecorationLine: 'underline',
    },
    changeCardButton: {
        position: 'absolute',
        right: 15,
        marginTop: 15,
    },
    
});