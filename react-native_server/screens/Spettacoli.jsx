import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const About = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spettacoli Programmati</Text>
      <View style={styles.hr} />
      <Text style={styles.subtitle}>

        {'\n'}Sabato 15 febbraio 2025{'\n'}
        Domenica 16 febbraio 2025{'\n'}{'\n'}

        Prossime date in arrivo...{'\n'}
        </Text>
      <View style={styles.divider} />
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Torna alla homepage</Text>
      </TouchableOpacity>
    </View>
  );
};

export default About;

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
    textAlign: 'center',
    marginBottom: 20,
  },
  divider: {
    height: 2,
    width: '50%',
    backgroundColor: '#ddd',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#d9534f',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
  },
});
