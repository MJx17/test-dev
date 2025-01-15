import axios from 'axios';

// Fetch the API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
  baseURL: API_URL, // Use the API_URL from environment variables
  headers: {
    'Content-Type': 'application/json', // Set content type to JSON
  },
  withCredentials: true, // Include credentials in requests (like cookies)
});
