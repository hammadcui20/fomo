import React, { useState, useRef } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, value } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';


const eventDetail2 = ({ route }) => {
    const mapRef = useRef(null);
    const {eventId,location,image,date,title,time,des,price,count } = route.params;

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

    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.navigate('soldTickets');
    };


    return (
        <View style={{ flex: 1, backgroundColor: '#FFF4F5' }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, paddingHorizontal: 20 }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons onPress={handleBackPress} name="arrow-back-outline" size={25} color="#ffffff" />
                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 18, marginLeft: 10, color: 'white' }}>EVENT DETAIL</Text>
                </View>
            </View>
            <Image source={{uri:image}} style={{ width: '100%', height: 300, marginTop: -80, zIndex: -1000 }} />
            {/* <ScrollView style={{ flex: 1 }}> */}
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 12 }}>
                <Text style={{ fontFamily: 'Poppins', fontSize: 22 }}>{title}</Text>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ backgroundColor: 'white', borderRadius: 9999, width: 33, height: 33, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}>
                        <SvgXml xml={shareSvg} width={20} height={20} />
                    </View>
                    <View style={{ backgroundColor: 'white', borderRadius: 9999, width: 33, height: 33, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}>
                        <SvgXml xml={heartSvg} width={20} height={20} />
                    </View>
                </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginVertical: 12 }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <SvgXml xml={locationSvg} width={12} height={12} />
                    <Text style={{ fontFamily: 'Poppins', fontSize: 13, color: 'gray', marginLeft: 5 }}>{location.map(coord => coord.toFixed(2)).join(', ')}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginHorizontal: 12 }}>
                    <SvgXml xml={timeSvg} width={12} height={12} />
                    <Text style={{ fontFamily: 'Poppins', fontSize: 13, color: 'gray', marginLeft: 5 }} >{date}</Text>
                </View>
                {/* </View> */}
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                    <Ionicons name="person-circle-outline" size={24} color="gray" style={{ marginRight: -9 }} />
                    <Ionicons name="person-circle-outline" size={24} color="gray" style={{ marginRight: -9 }} />
                    <Ionicons name="person-circle-outline" size={24} color="gray" style={{ marginRight: -9 }} />
                </View>
                <Text style={{ fontFamily: 'Poppins', fontSize: 14, color: 'gray' }}>Ticket Price: <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 14 }}>${price}</Text></Text>
            </View>


            <Text style={{ fontFamily: 'Poppins', fontSize: 18, paddingHorizontal: 20, marginTop: 10 }}>Additional Information</Text>
            <Text style={{ fontFamily: 'Poppins', fontSize: 16, color: 'gray', paddingHorizontal: 20, marginTop: 6 }}>
                {des}
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center' , margin: 10, paddingLeft:10}}>
                <Text style={{ fontFamily: 'Poppins', fontSize: 18, fontWeight: '500', lineHeight: 27, letterSpacing: 0, textAlign: 'left', color: '#666666' }}>Total Soled Tickets: {count}</Text>
                
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                
                <Text style={{ fontFamily: 'Poppins', fontSize: 18, fontWeight: '500', lineHeight: 27, letterSpacing: 0, textAlign: 'left', color: '#666666', marginLeft: 20 }}>Total Earning: ${count * price}</Text>
            </View>
        </View>
    );
};

export default eventDetail2
const styles = StyleSheet.create({
  
});

