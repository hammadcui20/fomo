import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';


const OnBoardingV1 = () => {
    const navigation = useNavigation();
    const [screenIndex, setScreenIndex] = useState(0);

    const screens = [
        {
            background: require('../assets/images/V1onboarding1.png'),
            title: 'Explore The Best Events Near You.',
            text: 'Lorem ipsum dolor sit amet consec etur Ligula nullam ipsum convallis a tellus Semper magna.'
        },
        {
            background: require('../assets/images/V1onboarding3.png'),
            title: 'Your Access Pass to Memorable Events.',
            text: 'Lorem ipsum dolor sit amet consec etur Ligula nullam ipsum convallis a tellus Semper magna.'
        },
        {
            background: require('../assets/images/V1onboarding2.png'),
            title: 'Navigate, Explore, Enjoy Interactive Maps.',
            text: 'Lorem ipsum dolor sit amet consec etur Ligula nullam ipsum convallis a tellus Semper magna.'
        },
    ];

    const nextScreen = () => {
        if (screenIndex < screens.length - 1) {
            setScreenIndex(prevIndex => prevIndex + 1);
        } else {
            navigation.navigate('Signin');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                <ImageBackground source={screens[screenIndex].background} style={styles.topImage}>
                   
                </ImageBackground>
            </View>
            <View style={styles.bottomSection}>
                <Text style={styles.title}>{screens[screenIndex].title}</Text>
                <Text style={styles.text}>{screens[screenIndex].text}</Text>
                <View style={styles.bottomBar}>
                    <View style={styles.lines}>
                        <View style={[styles.line, screenIndex === 0 && styles.redLine]} />
                        <View style={[styles.line, screenIndex === 1 && styles.redLine]} />
                        <View style={[styles.line, screenIndex === 2 && styles.redLine]} />
                    </View>
                    <TouchableOpacity onPress={nextScreen} style={styles.nextButton}>
                    {screenIndex === 0 && (
                    <TouchableOpacity onPress={nextScreen} style={styles.nextButton}>
                                <SvgXml xml={svgXmlCode} width={100} height={100} />
                            </TouchableOpacity>
                        )}
                        {screenIndex === 1 && (
                            // Render SVG button for second screen
                            <TouchableOpacity onPress={nextScreen} style={styles.nextButton}>
                                <SvgXml xml={svgXmlCode1} width={100} height={100} />
                            </TouchableOpacity>
                        )}
                        {screenIndex === 2 && (
                            // Render SVG button for third screen
                            <TouchableOpacity onPress={nextScreen} style={styles.nextButton}>
                                <SvgXml xml={svgXmlCode2} width={100} height={100} />
                            </TouchableOpacity>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default OnBoardingV1;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#202231',
        fontFamily: 'Poppins',
    },
    topSection: {
        flex: 1,
        justifyContent: 'flex-end',
        marginTop: 20,
    },
    bottomSection: {
        flex: 1,
        backgroundColor: '#202231',
        justifyContent: 'flex-end',
        paddingBottom: 20,
    },
    topImage: {
        marginTop: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'Poppins',
        fontSize: 32,
        fontWeight: '500',
        lineHeight: 35,
        color: 'white',
        textAlign: 'left',
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    text: {
        fontFamily: 'Poppins',
        fontSize: 22,
        fontWeight: '400',
        lineHeight: 31,
        color: '#C7C7C7',
        textAlign: 'left',
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        width: '100%',
    },
    lines: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    line: {
        height: 8,
        width: 25,
        backgroundColor: 'white',
        marginHorizontal: 5,
        borderRadius: 40,
    },
    redLine: {
        backgroundColor: '#FF4459',
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
    },

});

const svgXmlCode = `
<svg width="1967" height="1967" viewBox="0 0 1967 1967" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="983.5" cy="983.506" r="602.5" fill="#FF4459"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M908.806 1277.45C894.439 1291.81 871.143 1291.81 856.775 1277.45C842.408 1263.08 842.408 1239.78 856.775 1225.42L1073.06 1009.13C1087.43 994.762 1087.43 971.466 1073.06 957.098L856.775 740.811C842.408 726.444 842.408 703.148 856.775 688.781C871.143 674.414 894.439 674.414 908.806 688.781L1177.12 957.098C1191.49 971.466 1191.49 994.762 1177.12 1009.13L908.806 1277.45Z" fill="white"/>
    <circle cx="983.5" cy="983.506" r="686" stroke="white" stroke-width="35" stroke-miterlimit="1.41421"/>
    <mask id="path-4-inside-1_363_643" fill="white">
        <path d="M1550.52 567.085C1624.38 667.666 1670.17 786.085 1683.17 910.197C1696.17 1034.31 1675.93 1159.65 1624.51 1273.35C1573.1 1387.06 1492.36 1485.04 1390.59 1557.25C1288.81 1629.47 1169.66 1673.31 1045.35 1684.28L1042.37 1650.49C1160.68 1640.05 1274.09 1598.32 1370.96 1529.59C1467.83 1460.86 1544.67 1367.6 1593.61 1259.38C1642.55 1151.15 1661.82 1031.86 1649.44 913.731C1637.06 795.602 1593.49 682.892 1523.18 587.16L1550.52 567.085Z"/>
    </mask>
    <path d="M1550.52 567.085C1624.38 667.666 1670.17 786.085 1683.17 910.197C1696.17 1034.31 1675.93 1159.65 1624.51 1273.35C1573.1 1387.06 1492.36 1485.04 1390.59 1557.25C1288.81 1629.47 1169.66 1673.31 1045.35 1684.28L1042.37 1650.49C1160.68 1640.05 1274.09 1598.32 1370.96 1529.59C1467.83 1460.86 1544.67 1367.6 1593.61 1259.38C1642.55 1151.15 1661.82 1031.86 1649.44 913.731C1637.06 795.602 1593.49 682.892 1523.18 587.16L1550.52 567.085Z" stroke="#FF4459" stroke-width="70" stroke-miterlimit="1.41421" mask="url(#path-4-inside-1_363_643)"/>
</svg>
`;

const svgXmlCode1 = `
<svg width="1967" height="1967" viewBox="0 0 1967 1967" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="983.5" cy="983.506" r="602.5" fill="#FF4459"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M908.806 1277.45C894.439 1291.81 871.143 1291.81 856.775 1277.45C842.408 1263.08 842.408 1239.78 856.775 1225.42L1073.06 1009.13C1087.43 994.762 1087.43 971.466 1073.06 957.098L856.775 740.811C842.408 726.444 842.408 703.148 856.775 688.781C871.143 674.414 894.439 674.414 908.806 688.781L1177.12 957.098C1191.49 971.466 1191.49 994.762 1177.12 1009.13L908.806 1277.45Z" fill="white"/>
<circle cx="983.5" cy="983.506" r="686" stroke="white" stroke-width="35" stroke-miterlimit="1.41421"/>
<mask id="path-4-inside-1_363_643" fill="white">
<path d="M1550.52 567.085C1611.94 650.716 1654.1 746.899 1673.97 848.739C1693.85 950.579 1690.95 1055.56 1665.49 1156.14C1640.02 1256.73 1592.62 1350.44 1526.69 1430.56C1460.75 1510.68 1377.9 1575.21 1284.09 1619.55C1190.28 1663.88 1087.82 1686.92 984.056 1687C880.295 1687.08 777.799 1664.21 683.916 1620.02C590.033 1575.84 507.087 1511.43 441.022 1431.42C374.957 1351.41 327.409 1257.77 301.787 1157.22L334.652 1148.85C359.039 1244.55 404.295 1333.67 467.175 1409.82C530.055 1485.98 609.002 1547.28 698.359 1589.34C787.716 1631.39 885.27 1653.16 984.029 1653.09C1082.79 1653.01 1180.31 1631.08 1269.6 1588.89C1358.89 1546.69 1437.74 1485.26 1500.5 1409.01C1563.26 1332.75 1608.37 1243.56 1632.61 1147.82C1656.85 1052.08 1659.6 952.166 1640.68 855.236C1621.77 758.305 1581.64 666.76 1523.18 587.16L1550.52 567.085Z"/>
</mask>
<path d="M1550.52 567.085C1611.94 650.716 1654.1 746.899 1673.97 848.739C1693.85 950.579 1690.95 1055.56 1665.49 1156.14C1640.02 1256.73 1592.62 1350.44 1526.69 1430.56C1460.75 1510.68 1377.9 1575.21 1284.09 1619.55C1190.28 1663.88 1087.82 1686.92 984.056 1687C880.295 1687.08 777.799 1664.21 683.916 1620.02C590.033 1575.84 507.087 1511.43 441.022 1431.42C374.957 1351.41 327.409 1257.77 301.787 1157.22L334.652 1148.85C359.039 1244.55 404.295 1333.67 467.175 1409.82C530.055 1485.98 609.002 1547.28 698.359 1589.34C787.716 1631.39 885.27 1653.16 984.029 1653.09C1082.79 1653.01 1180.31 1631.08 1269.6 1588.89C1358.89 1546.69 1437.74 1485.26 1500.5 1409.01C1563.26 1332.75 1608.37 1243.56 1632.61 1147.82C1656.85 1052.08 1659.6 952.166 1640.68 855.236C1621.77 758.305 1581.64 666.76 1523.18 587.16L1550.52 567.085Z" stroke="#FF4459" stroke-width="70" stroke-miterlimit="1.41421" mask="url(#path-4-inside-1_363_643)"/>
</svg>
`;

const svgXmlCode2 = `
<svg width="1967" height="1967" viewBox="0 0 1967 1967" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="983.5" cy="983.506" r="602.5" fill="#FF4459"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M908.806 1277.45C894.439 1291.81 871.143 1291.81 856.775 1277.45C842.408 1263.08 842.408 1239.78 856.775 1225.42L1073.06 1009.13C1087.43 994.762 1087.43 971.466 1073.06 957.098L856.775 740.811C842.408 726.444 842.408 703.148 856.775 688.781C871.143 674.414 894.439 674.414 908.806 688.781L1177.12 957.098C1191.49 971.466 1191.49 994.762 1177.12 1009.13L908.806 1277.45Z" fill="white"/>
<circle cx="983.5" cy="983.506" r="686" stroke="white" stroke-width="35" stroke-miterlimit="1.41421"/>
<mask id="path-4-inside-1_363_643" fill="white">
<path d="M1550.52 567.085C1780.5 880.24 1713.07 1320.54 1399.92 1550.52C1086.76 1780.5 646.462 1713.07 416.482 1399.92C186.501 1086.76 253.928 646.463 567.084 416.482C880.24 186.502 1320.54 253.929 1550.52 567.085ZM443.817 1379.84C662.71 1677.9 1081.78 1742.08 1379.84 1523.18C1677.9 1304.29 1742.08 885.219 1523.18 587.16C1304.29 289.101 885.218 224.925 587.159 443.818C289.101 662.711 224.924 1081.78 443.817 1379.84Z"/>
</mask>
<path d="M1550.52 567.085C1780.5 880.24 1713.07 1320.54 1399.92 1550.52C1086.76 1780.5 646.462 1713.07 416.482 1399.92C186.501 1086.76 253.928 646.463 567.084 416.482C880.24 186.502 1320.54 253.929 1550.52 567.085ZM443.817 1379.84C662.71 1677.9 1081.78 1742.08 1379.84 1523.18C1677.9 1304.29 1742.08 885.219 1523.18 587.16C1304.29 289.101 885.218 224.925 587.159 443.818C289.101 662.711 224.924 1081.78 443.817 1379.84Z" stroke="#FF4459" stroke-width="70" stroke-miterlimit="1.41421" mask="url(#path-4-inside-1_363_643)"/>
</svg>
`;