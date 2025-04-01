import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
const api = axios.create({
  baseURL: `${process.env.API_BASE_URL}/api`,
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Xử lý khi token hết hạn
      SecureStore.deleteItemAsync('authToken');
      // Có thể redirect đến màn hình login ở đây
    }
    return Promise.reject(error);
  }
);

export default api;