import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://your-api-domain.com/api', // 👈 Đổi URL này thành địa chỉ API thực tế
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
