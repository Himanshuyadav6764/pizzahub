import axios from 'axios';

// API configuration - use environment variable or fallback
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const API_URL = `${API_BASE_URL}/users`;

// Create axios instance with default configuration
const authAPI = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000, // 10 seconds timeout
    withCredentials: false // Disable credentials for now to avoid CORS issues
});

// Add request interceptor to include auth token
authAPI.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('🔗 API Request:', config.method?.toUpperCase(), config.url);
        return config;
    },
    (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor for error handling
authAPI.interceptors.response.use(
    (response) => {
        console.log('✅ API Response:', response.status, response.config.url);
        return response;
    },
    (error) => {
        console.error('❌ API Error:', error.response?.status, error.response?.data?.message || error.message);
        
        if (error.response?.status === 401) {
            console.log('🔑 Token expired or invalid, redirecting to login...');
            localStorage.removeItem('token');
            // Don't redirect here to avoid infinite loops
        }
        return Promise.reject(error);
    }
);

export const register = async (userData) => {
    try {
        console.log('📝 Registering user:', userData.email);
        const response = await authAPI.post('/', userData);
        
        if (response.data.token) {
            console.log('✅ Registration successful, token received');
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (error) {
        console.error('❌ Registration failed:', error.response?.data?.message || error.message);
        throw error;
    }
};

export const login = async (userData) => {
    try {
        console.log('🔐 Logging in user:', userData.email);
        const response = await authAPI.post('/login', userData);
        
        if (response.data.token) {
            console.log('✅ Login successful, token received');
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (error) {
        console.error('❌ Login failed:', error.response?.data?.message || error.message);
        throw error;
    }
};

export const getUserProfile = async () => {
    try {
        const response = await authAPI.get('/profile');
        return response.data;
    } catch (error) {
        console.error('❌ Error fetching user profile:', error.response?.data?.message || error.message);
        throw error;
    }
};

export const getAuthStatus = async () => {
    try {
        const response = await authAPI.get('/status');
        return response.data;
    } catch (error) {
        console.error('❌ Error checking auth status:', error.response?.data?.message || error.message);
        throw error;
    }
};

export const forgotPassword = async (email) => {
    try {
        const frontendUrl = window.location.origin; // Get current frontend URL
        const response = await authAPI.post(`/forgot-password?frontendUrl=${frontendUrl}`, { email });
        return response.data;
    } catch (error) {
        console.error('❌ Error sending forgot password email:', error.response?.data?.message || error.message);
        throw error;
    }
};

export const resetPassword = async (token, password) => {
    try {
        const response = await authAPI.put(`/reset-password/${token}`, { password });
        return response.data;
    } catch (error) {
        console.error('❌ Error resetting password:', error.response?.data?.message || error.message);
        throw error;
    }
};