import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import authAxios from "../utils/AuthAxios";
import Backbutton from '../utils/Backbutton';
import ProtectedRoute from "../utils/ProtectedRoute";
import { useNavigation } from '@react-navigation/native';

const EliminaPrenotazione = () => {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigation = useNavigation();

  const handleDelete = async () => {
    if (!id.trim()) {
      Alert.alert("⚠️ Errore", "Inserisci un ID valido.");
      return;
    }
    
    try {
      setLoading(true);
      await authAxios.delete(`/prenotazioni/${id}`);
      setMessage(`✅ Prenotazione "${id}" eliminata con successo.`);
      setId("");
    } catch (error) {
      console.error("Errore durante l'eliminazione:", error);
      const errorMessage = error.response?.data?.message || "❌ Errore nell'eliminazione.";
      setMessage(errorMessage);
      Alert.alert("Errore", "Non è stato possibile eliminare la prenotazione.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <View style={styles.container}>
        <View style={styles.card}>
        <Backbutton navigation={navigation} />
          <Text style={styles.title}>Elimina Prenotazione</Text>
          <View style={{ height: 30 }} />
          
          <TextInput
            style={styles.input}
            placeholder="Valore ID"
            placeholderTextColor="#aaa"
            value={id}
            onChangeText={setId}
            autoCapitalize="none"
          />
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleDelete} 
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "⏳ Eliminazione..." : "🗑️ Elimina"}
            </Text>
          </TouchableOpacity>
          {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
      </View>
    </ProtectedRoute>
  );
};

export default EliminaPrenotazione;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#222",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    borderWidth: 1,
    borderColor: "#444",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#444",
  },
  button: {
    backgroundColor: "#d9534f",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  message: {
    marginTop: 10,
    color: "#d9534f",
    textAlign: "center",
    fontSize: 14,
  },
});