// api.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const api = axios.create({
<<<<<<< HEAD
  baseURL:  "http://172.16.7.121:3001",
  headers: {
    'Content-Type': 'application/json',
  },
=======
  baseURL:  "http://192.168.100.87:3001",
  // headers: {
  //   'Content-Type': 'application/json',
  // },
>>>>>>> 8ee3aeb98ee260f031619bf430517c726ed9a1f6
});

// Interceptor cho request
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor cho response
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi 401 (Unauthorized) và chưa thử refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Lấy refresh token từ AsyncStorage
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Gọi API refresh token
        const response = await axios.post(
          `${api.defaults.baseURL}/auth/refresh`,
          { refreshToken }
        );

        const { accessToken } = response.data;
        console.log("REFRESH TOKEN HET HAN NE      ");
        // Lưu access token mới vào AsyncStorage
        await AsyncStorage.setItem('accessToken', accessToken);

        // Cập nhật header của request gốc với token mới
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // Thử lại request gốc với token mới
        return axios(originalRequest);
      } catch (refreshError) {
        // Nếu refresh token cũng hết hạn, xóa tokens và throw error
        await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Hàm xử lý logout
export const logout = async () => {
  try {
    // Gọi API logout để blacklist token
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout API error:', error);
  } finally {
    // Xóa tokens khỏi AsyncStorage
    await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
  }
};

export default api;