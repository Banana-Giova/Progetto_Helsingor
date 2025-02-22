import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const About = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chi siamo?</Text>
      <View style={styles.hr} />
      <Text style={styles.subtitle}>
        La Compagnia Stabile di Helsingor è stata fondata da
        Francesco Gentile nel lontano 2010. Amleto è il suo
        spettacolo preferito e tutt'oggi cerca di dar vita
        a storie emozionanti. In arrivo i contatti telefonici
        per eventuali collaborazioni!
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
    width: '80%',
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
