import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Successo = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Operazione eseguita con successo!</Text>
      <View style={styles.hr} />
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Torna alla homepage</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Successo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#000', // sfondo scuro, ad esempio
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  hr: {
    width: '80%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 16,
  },
  button: {
    backgroundColor: '#dc3545', // simile a btn-danger
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
