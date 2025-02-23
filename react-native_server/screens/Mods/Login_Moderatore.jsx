import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import authAxios from '../utils/AuthAxios';
import Backbutton from '../utils/Backbutton';

const LoginModeratore = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const navigation = useNavigation();

    const loginForm = async (data) => {
        try {
            const requestData = {
                username: data.username,
                password: data.password
            };

            const response = await authAxios.post('/auth/moderatori/accesso', requestData);

            console.log("Login avvenuto con successo:", response.data);
            await AsyncStorage.setItem('accessToken', response.data.access_token);
            await AsyncStorage.setItem('refreshToken', response.data.refresh_token);

            navigation.navigate('SuccessoMod');
        } catch (error) {
            console.error("Errore nel login:", error.response?.data || error.message);
            Alert.alert("Errore", "Login fallito! Verifica le credenziali e riprova.");
        }
    };

    return (
        <View style={styles.container}>
            <Backbutton navigation={navigation} />
            <Text style={styles.title}>Sei un Moderatore? Accedi qui!</Text>

            <Controller
                control={control}
                name="username"
                rules={{
                    required: "Il campo Username è obbligatorio",
                    maxLength: { value: 32, message: "Massimo 32 caratteri" }
                }}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        placeholderTextColor="#aaa"
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            {errors.username && <Text style={styles.error}>{errors.username.message}</Text>}

            <Controller
                control={control}
                name="password"
                rules={{
                    required: "La password è obbligatoria",
                    minLength: { value: 8, message: "Minimo 8 caratteri" },
                    maxLength: { value: 32, message: "Massimo 32 caratteri" }
                }}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#aaa"
                        secureTextEntry
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleSubmit(loginForm)}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginModeratore;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    input: {
        width: '40%',
        backgroundColor: '#333',
        color: '#fff',
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
    },
    error: {
        color: 'red',
        fontSize: 14,
        marginBottom: 5,
    },
    button: {
        backgroundColor: '#d9534f',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: '20%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
