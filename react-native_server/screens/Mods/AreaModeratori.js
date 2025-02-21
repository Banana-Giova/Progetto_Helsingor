import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ProtectedRoute from '../utils/ProtectedRoute';

const AreaModeratori = ({ navigation }) => {
  return (
    <ProtectedRoute >
      <View style={styles.container}>
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
      </View>
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
    backgroundColor: '#1e1e1e',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  divider: {
    height: 2,
    width: '80%',
    backgroundColor: '#444',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#d9534f',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AreaModeratori;
