import axios from 'axios';

// Create an Axios instance
const httpService = axios.create({
    baseURL: 'http://localhost:3001', // Backend URL
    withCredentials: true, // Enable sending cookies for cross-origin requests
});

export default httpService;
