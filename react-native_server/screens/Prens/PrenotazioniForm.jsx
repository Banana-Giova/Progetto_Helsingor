import React, { useState } from "react";
import { View, Text, TextInput, Switch, TouchableOpacity, Alert, StyleSheet, ScrollView } from "react-native";
import axios from "axios";
import Backbutton from '../utils/Backbutton';
import { useNavigation } from "@react-navigation/native";

const PrenotazioniForm = () => {
  const [nominativo, setNominativo] = useState("");
  const [email, setEmail] = useState("");
  const [giornoScelto, setGiornoScelto] = useState("");
  const [telefono, setTelefono] = useState("");
  const [postiPren, setPostiPren] = useState("");
  const [postiBimbi, setPostiBimbi] = useState("");
  const [viaMail, setViaMail] = useState(false);
  const [donazioni, setDonazioni] = useState("");
  const [referente, setReferente] = useState("");
  const [mailFuture, setMailFuture] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (!nominativo.trim() || !email.trim() || !giornoScelto.trim() || !postiPren.trim()) {
      Alert.alert("⚠️ Errore", "Compila tutti i campi obbligatori.");
      return;
    }

    try {
      await axios.post("http://localhost:3101/prenotazioni/", {
        nominativo,
        email,
        giorno_scelto: giornoScelto,
        telefono,
        posti_pren: Number(postiPren),
        posti_bimbi: Number(postiBimbi),
        via_mail: viaMail,
        donazioni,
        referente,
        mail_future: mailFuture,
      });
      Alert.alert("Successo", "Prenotazione registrata!");
      navigation.navigate("Successo");
    } catch (error) {
      Alert.alert("Errore", "Si è verificato un problema. Riprova.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Backbutton navigation={navigation} />
        <Text style={styles.title}>📅 Prenota il tuo spettacolo</Text>
        <View style={{ height: 30 }} />
        
        <TextInput style={styles.input} placeholder="Nominativo" value={nominativo} onChangeText={setNominativo} placeholderTextColor="#aaa" />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" placeholderTextColor="#aaa" />
        <TextInput style={styles.input} placeholder="Giorno Scelto (es. 2024-05-12)" value={giornoScelto} onChangeText={setGiornoScelto} placeholderTextColor="#aaa" />
        <TextInput style={styles.input} placeholder="Telefono (opzionale)" value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" placeholderTextColor="#aaa" />

        <View style={styles.row}>
          <TextInput style={[styles.input, styles.halfInput]} placeholder="Posti Prenotati" value={postiPren} onChangeText={setPostiPren} keyboardType="numeric" placeholderTextColor="#aaa" />
          <TextInput style={[styles.input, styles.halfInput]} placeholder="Di cui bambini" value={postiBimbi} onChangeText={setPostiBimbi} keyboardType="numeric" placeholderTextColor="#aaa" />
        </View>

        <TextInput style={styles.input} placeholder="Donazioni (opzionale)" value={donazioni} onChangeText={setDonazioni} placeholderTextColor="#aaa" />
        <TextInput style={styles.input} placeholder="Referente (opzionale)" value={referente} onChangeText={setReferente} placeholderTextColor="#aaa" />

        <View style={styles.switchContainer}>
          <Text style={styles.label}>Ricevi biglietto via mail</Text>
          <Switch value={viaMail} onValueChange={setViaMail} trackColor={{ false: "#444", true: "#d9534f" }} />
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.label}>Ricevere aggiornamenti futuri</Text>
          <Switch value={mailFuture} onValueChange={setMailFuture} trackColor={{ false: "#444", true: "#d9534f" }} />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>📩 Conferma Prenotazione</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PrenotazioniForm;

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
});