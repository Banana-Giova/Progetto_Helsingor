import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Alert, ScrollView } from 'react-native';
import authAxios from '../utils/AuthAxios';
import Backbutton from '../utils/Backbutton';
import ProtectedRoute from '../utils/ProtectedRoute';
import { useNavigation } from '@react-navigation/native';

const ViewModeratori = () => {
  const [moderatori, setModeratori] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchModeratori = async () => {
      try {
        const response = await authAxios.get('auth/moderatori');
        const data = response.data;

        if (Array.isArray(data)) {
          setModeratori(data);
        } else if (data && Array.isArray(data.moderatori)) {
          setModeratori(data.moderatori);
        } else {
          setModeratori([]);
        }
      } catch (err) {
        setError(err.response?.data || err.message);
        Alert.alert("Errore", "Impossibile caricare i moderatori.");
      } finally {
        setLoading(false);
      }
    };

    fetchModeratori();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#d9534f" />
        <Text style={styles.loadingText}>Caricamento in corso...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Errore: {typeof error === "object" ? JSON.stringify(error) : error}
        </Text>
      </View>
    );
  }

  return (
    <ProtectedRoute>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>
        <Backbutton navigation={navigation} />
          <Text style={styles.title}>Lista dei Moderatori</Text>

          {moderatori.length === 0 ? (
            <Text style={styles.noDataText}>Nessun moderatore trovato.</Text>
          ) : (
            <FlatList
              data={moderatori}
              keyExtractor={(item) => item.username}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Text style={styles.username}>👤 {item.username}</Text>
                  <Text style={styles.email}>📧 {item.email || "Email non disponibile"}</Text>
                </View>
              )}
            />
          )}
        </View>
      </ScrollView>
    </ProtectedRoute>
  );
};

export default ViewModeratori;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#121212',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 16,
    textAlign: 'center',
  },
  noDataText: {
    color: '#ccc',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
  },
  card: {
    backgroundColor: '#333',
    padding: 15,
    width: '40%',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    alignSelf:'center',
    borderColor: '#444',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  email: {
    fontSize: 16,
    color: '#aaa',
    marginTop: 5,
  },
});
