import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadToken = async () => {
            try {
                const token = await AsyncStorage.getItem('accessToken');
                setUserToken(token);
            } catch (error) {
                console.error('Errore nel recupero del token:', error);
            }
            setLoading(false);
        };
        loadToken();
    }, []);

    const login = async (token) => {
        setUserToken(token);
        await AsyncStorage.setItem('accessToken', token);
    };

    const logout = async () => {
        setUserToken(null);
        await AsyncStorage.removeItem('accessToken');
    };

    return (
        <AuthContext.Provider value={{ userToken, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
