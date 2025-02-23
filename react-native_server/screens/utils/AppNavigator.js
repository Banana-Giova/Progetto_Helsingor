import React from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './AuthContext';

import Navbar from "../Navbar";

import HomePage from '../Home';
import Spettacoli from '../Spettacoli';
import Successo from '../Successo';
import About from '../About';

import PrenotazioniForm from '../Prens/PrenotazioniForm';
import ViewPrenotazioni from '../Prens/ViewPrenotazioni';
import ModificaPrenotazione from '../Prens/ModificaPrenotazione';
import EliminaPrenotazione from '../Prens/EliminaPrenotazione';

import LoginModeratore from '../Mods/Login_Moderatore';
import AreaModeratori from '../Mods/AreaModeratori';
import RegistraModeratore from '../Mods/Registra_Moderatore';
import ViewModeratori from '../Mods/ViewModeratori';
import ModificaModeratore from '../Mods/ModificaModeratore';
import EliminaModeratore from '../Mods/EliminaModeratore';
import SuccessoMod from '../Mods/SuccessoMod';
import Logout from '../Mods/Logout';

const Stack = createNativeStackNavigator();

const screenWidth = Dimensions.get('window').width;

const AppNavigator = () => {
    return (
      <AuthProvider>
        <NavigationContainer>
          <SafeAreaView style={styles.safeContainer}>
              <>
                {screenWidth > 600 ? (<Navbar />):(<></>)}
                <View style={styles.container}>
                  <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {/* Route Pubbliche */}
                    <Stack.Screen name="Home" component={HomePage} />
                    <Stack.Screen name="PrenotazioniForm" component={PrenotazioniForm} />
                    <Stack.Screen name="Login" component={LoginModeratore} />
                    <Stack.Screen name="Spettacoli" component={Spettacoli} />
                    <Stack.Screen name="Successo" component={Successo} />
                    <Stack.Screen name="About" component={About} />
  
                    {/* Route Protette */}
                    <Stack.Screen name="SuccessoMod" component={SuccessoMod} />
                    <Stack.Screen name="AreaModeratori" component={AreaModeratori} />
                    <Stack.Screen name="Logout" component={Logout} />
                    <Stack.Screen name="ViewModeratori" component={ViewModeratori} />
                    <Stack.Screen name="ModificaModeratore" component={ModificaModeratore} />
                    <Stack.Screen name="RegistraModeratore" component={RegistraModeratore} />
                    <Stack.Screen name="EliminaModeratore" component={EliminaModeratore} />
  
                    <Stack.Screen name="ViewPrenotazioni" component={ViewPrenotazioni} />
                    <Stack.Screen name="ModificaPrenotazione" component={ModificaPrenotazione} />
                    <Stack.Screen name="EliminaPrenotazione" component={EliminaPrenotazione} />
                  </Stack.Navigator>
                </View>
              </>
          </SafeAreaView>
        </NavigationContainer>
      </AuthProvider>
    );
  };

export default AppNavigator;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#121212',
  },
  container: {
    flex: 1,
  },
  drawerItem: {
    padding: 15,
  },
  drawerItemText: {
    color: 'white',
    fontSize: 18,
  },
});