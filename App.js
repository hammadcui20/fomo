import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import Signin from './Screens/Signin';
import Signup from './Screens/Signup';
import ForgotPass from './Screens/ForgotPass';
import OnBoardingV1 from './Screens/OnBoardingV1';
import VerifyOtp from './Screens/VerifyOtp';
import ConfirmPass from './Screens/confirmPass';
import Profile from './Screens/Profile';
import HomeScreen from './Screens/HomeScreen';
import myProfile from './Screens/myProfile';
import settings from './Screens/settings';
import profileLocation from './Screens/profileLocation';
import MapScreen from './Screens/MapScreen';
import home from './Screens/HomeScreen';
import Sucess from './Screens/profileSucessRegistered';
import NotificationScreen from './Screens/NotificationScreen';
import events from './Screens/events';
import Chat from './Screens/Chats';;
import eventDetail from './Screens/eventDetail';
import pChat from './Screens/pChat';
import Organise from './Screens/Organise';
import organise2 from './Screens/organise2';

import showTicket from './Screens/showTicket';
import payment from './Screens/payment';
import addCard from './Screens/addCard';
import reviewSummary from './Screens/reviewSummary';
import OrganiseMap from './Screens/OrganiseMap';
import ticket from './Screens/ticket';
import dispute from './Screens/dispute';
import paymentSuccess from './Screens/paymentSuccess';
import editProfile from './Screens/editProfile';
import support from './Screens/support';
import scanTicket from './Screens/scanTicket';
import myTickets from './Screens/myTickets';
import { StripeProvider } from '@stripe/stripe-react-native';

import Preference from './Screens/preference';
import soldTickets from './Screens/soldTickets';
import eventDetail2 from './Screens/eventDetail2';
import wallet from './Screens/wallet';
import history from './Screens/history';
import withdrawl from './Screens/withdrawl';
import addBank from './Screens/addBank';
import stripePayment from './Screens/stripePayment';
import { ProfileProvider } from './components/ProfileContext';
const Stack = createStackNavigator();

const App = () => {
  const [loaded] = useFonts({
    'Poppins': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
  });
 
  if (!loaded) {
    return null;
  }

  return (
    <StripeProvider publishableKey="pk_test_51PPhmkLKze7NlucB5Pw3DlLbFYkw2vWOuNaSIenOwiZCoTBpCf3eZVFZsrbzfhaYJZ895Cja24BFFGuVi6mu3EDf00kgzSjaVn">
      <ProfileProvider>
          <NavigationContainer>

          <Stack.Navigator initialRouteName="OnBoardingV1" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} /> 
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="ForgotPass" component={ForgotPass} />
            <Stack.Screen name="OnBoardingV1" component={OnBoardingV1} />
            <Stack.Screen name="Signin" component={Signin} />
            <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
            <Stack.Screen name="confirmPass" component={ConfirmPass} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="myProfile" component={myProfile} />
            <Stack.Screen name="settings" component={settings} />
            <Stack.Screen name="profileLocation" component={profileLocation} />
            <Stack.Screen name="MapScreen" component={MapScreen} />
            <Stack.Screen name="home" component={home} />
            <Stack.Screen name="Sucess" component={Sucess} />

            <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
            <Stack.Screen name="events" component={events} />
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="eventDetail" component={eventDetail} />
            <Stack.Screen name="pChat" component={pChat} />
            <Stack.Screen name="Organise" component={Organise} />
            <Stack.Screen name="organise2" component={organise2} />
            
            <Stack.Screen name="payment" component={payment} />
            <Stack.Screen name="addCard" component={addCard} />
            <Stack.Screen name="reviewSummary" component={reviewSummary} />
            <Stack.Screen name="OrganiseMap" component={OrganiseMap} />
            <Stack.Screen name="paymentSuccess" component={paymentSuccess} />
            <Stack.Screen name="ticket" component={ticket} />
            <Stack.Screen name="editProfile" component={editProfile} />
            <Stack.Screen name="dispute" component={dispute} />
            <Stack.Screen name="support" component={support} />
            <Stack.Screen name="scanTicket" component={scanTicket} />
            <Stack.Screen name="myTickets" component={myTickets} />
            <Stack.Screen name="showTicket" component={showTicket} />

            <Stack.Screen name="soldTickets" component={soldTickets} />
            <Stack.Screen name="wallet" component={wallet} />
            <Stack.Screen name="eventDetail2" component={eventDetail2} />
            <Stack.Screen name="history" component={history} />
            <Stack.Screen name="withdrawl" component={withdrawl} />
            <Stack.Screen name="addBank" component={addBank} />
            <Stack.Screen name="PaymentScreen" component={stripePayment} />
            <Stack.Screen name="Preference" component={Preference} />
          </Stack.Navigator>
      </NavigationContainer>
      </ProfileProvider>
    </StripeProvider>
  );
}

export default App;


