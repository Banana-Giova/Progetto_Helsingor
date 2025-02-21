import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import authAxios from '../utils/AuthAxios';
import ProtectedRoute from '../utils/ProtectedRoute';

const ViewPrenotazioni = () => {
  const [prenotazioni, setPrenotazioni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrenotazioni = async () => {
      try {
        const response = await authAxios.get('/prenotazioni/');
        const data = response.data;

        if (Array.isArray(data)) {
          setPrenotazioni(data);
        } else if (data && Array.isArray(data.prenotazioni)) {
          setPrenotazioni(data.prenotazioni);
        } else {
          setPrenotazioni([]);
        }
      } catch (err) {
        setError(err.response?.data || err.message);
        Alert.alert("Errore", "Impossibile caricare le prenotazioni.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrenotazioni();
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
      <View style={styles.container}>
        <Text style={styles.title}>Lista delle Prenotazioni</Text>

        {prenotazioni.length === 0 ? (
          <Text style={styles.noDataText}>Nessuna prenotazione trovata.</Text>
        ) : (
          <FlatList
            data={prenotazioni}
            keyExtractor={(item) => item.id.toString()} // 🔹 Usa l'ID come chiave unica
            contentContainerStyle={styles.listContainer} // 🔹 Centra le card nella lista
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.nominativo}>👤 {item.nominativo}</Text>
                <Text style={styles.info}><Text style={styles.label}>ID:</Text> {item.id}</Text>
                <Text style={styles.info}><Text style={styles.label}>Giorno scelto:</Text> {item.giorno_scelto}</Text>
                <Text style={styles.info}><Text style={styles.label}>Posti prenotati:</Text> {item.posti_pren}</Text>
                <Text style={styles.info}><Text style={styles.label}>Posti bambini:</Text> {item.posti_bimbi}</Text>
                <Text style={styles.info}><Text style={styles.label}>📞 Telefono:</Text> {item.telefono || "N/A"}</Text>
                <Text style={styles.info}><Text style={styles.label}>📧 Email:</Text> {item.email}</Text>
                <Text style={styles.info}><Text style={styles.label}>🎟️ E-ticket via mail:</Text> {item.via_mail ? "Sì" : "No"}</Text>
                <Text style={styles.info}><Text style={styles.label}>🕒 Istante:</Text> {item.istante}</Text>
              </View>
            )}
          />
        )}
      </View>
    </ProtectedRoute>
  );
};

export default ViewPrenotazioni;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Sfondo scuro
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
  listContainer: {
    alignItems: 'center', // 🔹 Centra le card nella lista
  },
  card: {
    backgroundColor: '#333',
    padding: 12,
    width: '100%', // 🔹 Più grande rispetto ai moderatori
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#444',
    alignSelf: 'center', // 🔹 Centra la singola card
  },
  nominativo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
  },
  info: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 2,
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
    color: '#fff',
  },
});
