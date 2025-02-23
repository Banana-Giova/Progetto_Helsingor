import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authAxios = axios.create({
  baseURL: 'http://localhost:3101',
});

authAxios.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

authAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = await AsyncStorage.getItem('refreshToken');

      if (refreshToken) {
        try {
          const response = await axios.post('http://localhost:3101/auth/refresh', {}, {
            headers: { Authorization: `Bearer ${refreshToken}` },
          });

          await AsyncStorage.setItem('accessToken', response.data.access_token);
          originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
          
          return authAxios(originalRequest);
        } catch (refreshError) {
          await AsyncStorage.removeItem('accessToken');
          await AsyncStorage.removeItem('refreshToken');
         
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default authAxios;
