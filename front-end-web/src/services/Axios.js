import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
    // Add other headers as needed
  },
});

export default instance;