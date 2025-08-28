// Test script to verify addPizza functionality
const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function testAddPizza() {
    console.log('🧪 Testing Add Pizza Functionality...\n');

    try {
        // Step 1: Login to get token
        console.log('1️⃣ Logging in...');
        const loginResponse = await axios.post(`${API_BASE}/users/login`, {
            email: 'test@pizzahub.com',
            password: 'password123'
        });
        
        const token = loginResponse.data.token;
        console.log('✅ Login successful, token received');

        // Step 2: Test addPizza with valid data
        console.log('\n2️⃣ Testing add pizza...');
        const pizzaData = {
            base: 'Thin Crust',
            sauce: 'Tomato',
            cheese: 'Mozzarella',
            meat: 'Pepperoni',
            veggies: ['Mushrooms'],
            price: 12.99
        };

        const addPizzaResponse = await axios.post(`${API_BASE}/pizzas/add`, pizzaData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        console.log('✅ Pizza added successfully:', addPizzaResponse.data);

        // Step 3: Test get user pizzas
        console.log('\n3️⃣ Testing get user pizzas...');
        const userPizzasResponse = await axios.get(`${API_BASE}/pizzas/getPizzasByUserId`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log('✅ User pizzas fetched:', userPizzasResponse.data.length, 'pizzas found');

        console.log('\n🎉 All tests passed! Add pizza functionality is working.');

    } catch (error) {
        console.error('\n❌ Test failed:', error.response?.data || error.message);
        console.error('📍 Error details:', {
            status: error.response?.status,
            url: error.config?.url,
            method: error.config?.method,
            data: error.config?.data
        });
    }
}

// Run the test
testAddPizza();
