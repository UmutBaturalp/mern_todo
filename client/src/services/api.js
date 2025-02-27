import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api'; // iOS Simulator için port 4000 olarak güncellendi

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = token => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const authAPI = {
  login: async (email, password) => {
    const response = await api.post('/user/login', {email, password});
    return response.data;
  },
  register: async (name, email, password) => {
    const response = await api.post('/user/signup', {name, email, password});
    return response.data;
  },
};

export const notesAPI = {
  getAllNotes: async () => {
    const response = await api.get('/notes');
    return response.data;
  },
  createNote: async (title, description) => {
    const response = await api.post('/notes', {title, description});
    return response.data;
  },
  updateNote: async (id, title, description) => {
    const response = await api.patch(`/notes/${id}`, {title, description});
    return response.data;
  },
  deleteNote: async id => {
    const response = await api.delete(`/notes/${id}`);
    return response.data;
  },
};

export default api; 