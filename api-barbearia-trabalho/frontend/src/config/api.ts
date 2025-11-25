import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Erro da API
      return Promise.reject({
        message: error.response.data?.message || 'Erro ao processar requisição',
        status: error.response.status,
      });
    } else if (error.request) {
      // Erro de rede
      return Promise.reject({
        message: 'Erro de conexão. Verifique se a API está rodando.',
        status: 0,
      });
    } else {
      // Outro erro
      return Promise.reject({
        message: error.message || 'Erro desconhecido',
        status: 0,
      });
    }
  }
);

export default api;

