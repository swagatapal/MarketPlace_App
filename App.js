import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import LoginScreen from './Apps/Screens/LoginScreen';
import { ClerkProvider,SignedIn, SignedOut } from "@clerk/clerk-expo";
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './Apps/Navigations/TabNavigation';

export default function App() {
  return (
    <ClerkProvider publishableKey='pk_test_Zml0dGluZy1pZ3VhbmEtMzkuY2xlcmsuYWNjb3VudHMuZGV2JA'>
      <SafeAreaView style={styles.container}>

      <SignedIn>
          <NavigationContainer>
            <TabNavigation/>
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
        <LoginScreen/>  

        </SignedOut>

    

      </SafeAreaView>

    </ClerkProvider>
    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
});
