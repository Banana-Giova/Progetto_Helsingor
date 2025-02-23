import React, { useState } from "react";
import { View, Text, TextInput, Switch, TouchableOpacity, Alert, StyleSheet, ScrollView } from "react-native";
import authAxios from "../utils/AuthAxios";
import Backbutton from '../utils/Backbutton';
import ProtectedRoute from "../utils/ProtectedRoute";
import { useNavigation } from '@react-navigation/native';

const ModificaPrenotazione = () => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [giornoScelto, setGiornoScelto] = useState("");
  const [telefono, setTelefono] = useState("");
  const [postiPren, setPostiPren] = useState("");
  const [postiBimbi, setPostiBimbi] = useState("");
  const [viaMail, setViaMail] = useState(false);
  const [donazioni, setDonazioni] = useState("");
  const [referente, setReferente] = useState("");
  const [mailFuture, setMailFuture] = useState(false);
  const [message, setMessage] = useState("");
  const navigation = useNavigation();

  const handleUpdate = async () => {
    if (!id.trim()) {
      Alert.alert("⚠️ Errore", "Inserisci un ID prenotazione valido.");
      return;
    }

    try {
      await authAxios.put(`/prenotazioni/${id}`, {
        email,
        giorno_scelto: giornoScelto,
        telefono,
        posti_pren: postiPren,
        posti_bimbi: postiBimbi,
        via_mail: viaMail,
        donazioni,
        referente,
        mail_future: mailFuture,
      });

      setMessage("✅ Prenotazione aggiornata con successo!");
      Alert.alert("Successo", "Prenotazione modificata!");
    } catch (error) {
      const errorMsg = error.response?.data?.message || "❌ Errore durante la modifica.";
      setMessage(errorMsg);
      Alert.alert("Errore", errorMsg);
    }
  };

  return (
    <ProtectedRoute>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
        <Backbutton navigation={navigation} />
          <Text style={styles.title}>✏️ Modifica Prenotazione</Text>
          <View style={{ height: 30 }} />

          <TextInput style={styles.input} placeholder="ID Prenotazione" placeholderTextColor="#aaa" value={id} onChangeText={setId} keyboardType="text" />
          <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#aaa" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <TextInput style={styles.input} placeholder="Giorno Scelto (es. 2024-05-12)" placeholderTextColor="#aaa" value={giornoScelto} onChangeText={setGiornoScelto} />
          <TextInput style={styles.input} placeholder="Telefono" placeholderTextColor="#aaa" value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" />

          <View style={styles.row}>
            <TextInput style={[styles.input, styles.halfInput]} placeholder="Posti Prenotati" placeholderTextColor="#aaa" value={postiPren} onChangeText={setPostiPren} keyboardType="numeric" />
            <TextInput style={[styles.input, styles.halfInput]} placeholder="Di cui Bambini" placeholderTextColor="#aaa" value={postiBimbi} onChangeText={setPostiBimbi} keyboardType="numeric" />
          </View>

          <TextInput style={styles.input} placeholder="Donazioni" placeholderTextColor="#aaa" value={donazioni} onChangeText={setDonazioni} />
          <TextInput style={styles.input} placeholder="Referente" placeholderTextColor="#aaa" value={referente} onChangeText={setReferente} />

          <View style={styles.switchContainer}>
            <Text style={styles.label}>Ricevi aggiornamenti via mail</Text>
            <Switch value={viaMail} onValueChange={setViaMail} trackColor={{ false: "#444", true: "#d9534f" }} />
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.label}>Ricevere mail future</Text>
            <Switch value={mailFuture} onValueChange={setMailFuture} trackColor={{ false: "#444", true: "#d9534f" }} />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>💾 Salva Modifiche</Text>
          </TouchableOpacity>

          {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
      </ScrollView>
    </ProtectedRoute>
  );
};

export default ModificaPrenotazione;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  card: {
    backgroundColor: "#222",
    padding: 20,
    borderRadius: 10,
    width: "85%",
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    width: "48%",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#444",
  },
  label: {
    color: "#fff",
    fontSize: 14,
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
