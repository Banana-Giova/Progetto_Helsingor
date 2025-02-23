import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import ProtectedRoute from '../utils/ProtectedRoute';
import Homebutton from '../utils/Homebutton';

const screenWidth = Dimensions.get('window').width;

const AreaModeratori = ({ navigation }) => {
  
  return (
    <ProtectedRoute >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Homebutton navigation={navigation} />
          <Text style={styles.title}>Benvenuto nell'Area Moderatori!</Text>
          <View style={styles.divider} />

          <MenuButton text="Visualizza le prenotazioni" onPress={() => navigation.navigate('ViewPrenotazioni')} />
          <MenuButton text="Modifica una prenotazione" onPress={() => navigation.navigate('ModificaPrenotazione')} />
          <MenuButton text="Elimina una prenotazione" onPress={() => navigation.navigate('EliminaPrenotazione')} />

          <View style={styles.divider} />

          <MenuButton text="Registra un nuovo moderatore" onPress={() => navigation.navigate('RegistraModeratore')} />
          <MenuButton text="Visualizza tutti i moderatori" onPress={() => navigation.navigate('ViewModeratori')} />
          <MenuButton text="Cambia la password di un moderatore" onPress={() => navigation.navigate('ModificaModeratore')} />
          <MenuButton text="Elimina un moderatore" onPress={() => navigation.navigate('EliminaModeratore')} />
        
          {screenWidth < 600 ? (            
            <MenuButton text="Logout" onPress={() => navigation.navigate('Logout')} />
          ):(
            <></>
          )}
        </View>
      </ScrollView>
    </ProtectedRoute>
  );
};

const MenuButton = ({ text, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#1e1e1e',
  },
  title: {
    fontSize: screenWidth < 600 ? 18 : 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  divider: {
    height: 2,
    width: screenWidth < 600 ? '60%' : '70%',
    backgroundColor: '#444',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#d9534f',
    paddingVertical: 12,
    paddingHorizontal: screenWidth * 0.1,
    borderRadius: 8,
    marginBottom: 10,
    width: screenWidth < 600 ? '60%' : '70%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AreaModeratori;
