// src/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:1425/Student', // Replace with your backend server's base URL
});

export default instance;
