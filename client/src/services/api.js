import axios from 'axios';

const api = axios.create({
  baseURL: 'https://project-api-production-fcc9.up.railway.app',
  headers: {
    'Cache-Control': 'no-cache',
  },
});

export default api;