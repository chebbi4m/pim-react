import axios from 'axios';

const API_URL = 'http://localhost:9090/partenaire'; // Base URL for your backend API

export const registerPartenaire = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong during registration.');
  }
};