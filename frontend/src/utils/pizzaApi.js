import axios from 'axios';

// API configuration - use environment variable or fallback
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance for pizza API
const pizzaAPI = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000,
    withCredentials: false
});

// Add request interceptor to include auth token
pizzaAPI.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('🍕 Pizza API Request:', config.method?.toUpperCase(), config.url);
        return config;
    },
    (error) => {
        console.error('❌ Pizza API Request Error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor for error handling
pizzaAPI.interceptors.response.use(
    (response) => {
        console.log('✅ Pizza API Response:', response.status, response.config.url);
        return response;
    },
    (error) => {
        console.error('❌ Pizza API Error:', error.response?.status, error.response?.data?.message || error.message);
        return Promise.reject(error);
    }
);

export const getBases = async () => {
    try {
        const response = await pizzaAPI.get('/bases');
        return response.data;
    } catch (error) {
        console.error('❌ Error fetching bases:', error.response?.data?.message || error.message);
        throw error;
    }
};

export const getSauces = async () => {
    try {
        const response = await pizzaAPI.get('/sauces');
        return response.data;
    } catch (error) {
        console.error('❌ Error fetching sauces:', error.response?.data?.message || error.message);
        throw error;
    }
};

export const getCheeses = async () => {
    try {
        const response = await pizzaAPI.get('/cheeses');
        return response.data;
    } catch (error) {
        console.error('❌ Error fetching cheeses:', error.response?.data?.message || error.message);
        throw error;
    }
};

export const getVeggies = async () => {
    try {
        const response = await pizzaAPI.get('/veggies');
        return response.data;
    } catch (error) {
        console.error('❌ Error fetching veggies:', error.response?.data?.message || error.message);
        throw error;
    }
};

export const getMeats = async () => {
    try {
        const response = await pizzaAPI.get('/meats');
        return response.data;
    } catch (error) {
        console.error('❌ Error fetching meats:', error.response?.data?.message || error.message);
        throw error;
    }
};

export const addPizza = async (newOrder) => {
    try {
        console.log('🍕 Adding pizza with data:', newOrder);
        
        // Validate required fields
        const requiredFields = ['base', 'sauce', 'cheese', 'meat', 'price'];
        const missingFields = requiredFields.filter(field => !newOrder[field]);
        
        if (missingFields.length > 0) {
            throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
        }

        // Ensure veggies is an array (even if empty)
        const orderData = {
            ...newOrder,
            veggies: newOrder.veggies || []
        };

        console.log('📤 Sending order data:', orderData);
        
        const response = await pizzaAPI.post('/pizzas/add', orderData);
        
        console.log('✅ Pizza added successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error adding pizza:', error.response?.data?.error || error.message);
        
        // Handle specific error cases
        if (error.response?.status === 401) {
            throw new Error('Please login to add pizza to cart');
        } else if (error.response?.status === 400) {
            throw new Error(error.response.data.error || 'Invalid pizza data');
        } else if (error.response?.status === 500) {
            throw new Error('Server error. Please try again later.');
        }
        
        throw error;
    }
};

export const getPizzaByUserId = async () => {
    try {
        const response = await pizzaAPI.get('/pizzas/getPizzasByUserId');
        return response.data;
    } catch (error) {
        if (error.response?.status === 404) {
            // Handle the case where no pizzas are found
            return [];
        }
        console.error('❌ Error fetching user pizzas:', error.response?.data?.message || error.message);
        throw error;
    }
};

export const getAllPizza = async () => {
    try {
        const response = await pizzaAPI.get('/pizzas/getAllPizza');
        console.log('✅ Fetched pizzas data:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error fetching all pizzas:', error.response?.data?.message || error.message);
        throw error;
    }
};
