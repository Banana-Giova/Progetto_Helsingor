import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../assets/hels_moon.png')} // Percorso dell'immagine
        style={styles.background}
        resizeMode="cover"
      >
        {/* Overlay per migliorare la leggibilità */}
        <View style={styles.overlay}>
          <Text style={styles.title}>
            Benvenuto al Teatro Stabile di Helsingor!
          </Text>
          <Text style={styles.subtitle}>
            Essere o non essere? Già sentito questo dilemma...
          </Text>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('PrenotazioniForm')}
          >
            <Text style={styles.buttonText}>Prenota ora!</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Sfondo nero se l'immagine non copre tutto
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)', // Overlay semi-trasparente per migliorare leggibilità
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#d9534f',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
