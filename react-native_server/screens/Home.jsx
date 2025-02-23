import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {screenWidth < 600 ? (
        // Layout per dispositivi mobili
        <ImageBackground 
          source={require('../assets/mob_hels_moon.png')}
          style={styles.backgroundMobile} 
          resizeMode="cover"
        >
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
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => navigation.navigate('Spettacoli')}
            >
              <Text style={styles.buttonText}>Spettacoli</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => navigation.navigate('AreaModeratori')}
            >
              <Text style={styles.buttonText}>Area Moderatori</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => navigation.navigate('About')}
            >
              <Text style={styles.buttonText}>Chi siamo</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      ) : (
        // Layout per desktop
        <ImageBackground 
          source={require('../assets/hels_moon.png')}
          style={styles.backgroundDesktop} 
          resizeMode="cover"
        >
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
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => navigation.navigate('About')}
            >
              <Text style={styles.buttonText}>Chi siamo</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    flexDirection: 'column',
    justifyContent: 'center',

  },

  backgroundMobile: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  
  backgroundDesktop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)', 
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
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
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
