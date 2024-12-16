import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password
    });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  localStorage.setItem('token', response.data.token);
  return response.data;
};

export async function getUsers() {
  const token = localStorage.getItem('token');
  return axios
    .get(`${API_URL}/auth/users`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => response.data);
}

export const getProducts = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/products`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.data;
  } catch (err) {
    console.error('Error fetching products:', err);
    return [];
  }
};

export const createProduct = async (productData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/products`, productData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
