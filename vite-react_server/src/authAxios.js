import axios from 'axios';

const authAxios = axios.create({
  baseURL: 'http://localhost:3101'
});

authAxios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
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
      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        try {
          // 🔹 Invia il refresh token come Bearer token nell'header, non nel body!
          const response = await axios.post('http://localhost:3101/auth/refresh', {}, {
            headers: { Authorization: `Bearer ${refreshToken}` },
          });

          localStorage.setItem('accessToken', response.data.access_token);
          originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
          
          return authAxios(originalRequest);
        } catch (refreshError) {
          // Se il refresh token è scaduto o invalido, rimuoviamo i token e forziamo il logout
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = "/login"; // Redirige l'utente al login
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);


export default authAxios;
