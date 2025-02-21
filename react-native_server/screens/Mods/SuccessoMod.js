import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ProtectedRoute from '../utils/ProtectedRoute';

const SuccessoMod = ({ navigation }) => {
  return (
    <ProtectedRoute navigation={navigation}>
        <View style={styles.container}>
        <Text style={styles.title}>Operazione eseguita con successo!</Text>
        <View style={styles.hr} />

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AreaModeratori')}>
            <Text style={styles.buttonText}>Accedi all'area moderatori!</Text>
        </TouchableOpacity>
        </View>
    </ProtectedRoute>
  );
};

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
});

export default SuccessoMod;
