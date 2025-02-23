import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from "react-native";
import authAxios from "../utils/AuthAxios";
import Backbutton from "../utils/Backbutton";
import ProtectedRoute from "../utils/ProtectedRoute";
import { useNavigation } from '@react-navigation/native';

const RegistraModeratore = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!username.trim()) {
      Alert.alert("⚠️ Errore", "Inserisci un nome utente valido.");
      return;
    }

    if (!email.match(/^\S+@\S+\.\S+$/)) {
      Alert.alert("⚠️ Errore", "Inserisci un'email valida.");
      return;
    }

    if (password.length < 8) {
      Alert.alert("⚠️ Errore", "La password deve avere almeno 8 caratteri.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("⚠️ Errore", "Le password non coincidono.");
      return;
    }

    try {
      setLoading(true);
      const response = await authAxios.post("/auth/moderatori/registrazione", {
        username,
        email,
        password,
      });

      setMessage("✅ Moderatore registrato con successo!");
      Alert.alert("Successo", "Moderatore registrato!");
    } catch (error) {
      const errorMsg = error.response?.data?.message || "❌ Errore durante la registrazione.";
      setMessage(errorMsg);
      Alert.alert("Errore", errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Backbutton navigation={navigation} />
          <Text style={styles.title}>🆕 Registra un Moderatore</Text>
          <View style={{ height: 30 }} />

          <TextInput
            style={styles.input}
            placeholder="Nome Utente"
            placeholderTextColor="#aaa"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Conferma Password"
            placeholderTextColor="#aaa"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
            <Text style={styles.buttonText}>
              {loading ? "⏳ Registrazione..." : "📝 Registra"}
            </Text>
          </TouchableOpacity>

          {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
      </ScrollView>
    </ProtectedRoute>
  );
};

export default RegistraModeratore;

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
