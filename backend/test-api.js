const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function testBackendAPI() {
    console.log('🧪 Testing PizzaHub Backend API...\n');

    try {
        // Test 1: Health check
        console.log('1️⃣ Testing health check...');
        const healthResponse = await axios.get('http://localhost:5000');
        console.log('✅ Health check passed:', healthResponse.data.message);
        
        // Test 2: Test user registration
        console.log('\n2️⃣ Testing user registration...');
        const testUser = {
            name: 'Test User',
            email: `test${Date.now()}@pizzahub.com`,
            password: 'password123',
            isAdmin: false
        };
        
        const registerResponse = await axios.post(`${API_BASE}/users`, testUser);
        console.log('✅ Registration successful:', registerResponse.data.name);
        
        // Test 3: Test user login
        console.log('\n3️⃣ Testing user login...');
        const loginResponse = await axios.post(`${API_BASE}/users/login`, {
            email: testUser.email,
            password: testUser.password
        });
        console.log('✅ Login successful:', loginResponse.data.name);
        console.log('🔑 Token received:', loginResponse.data.token ? 'Yes' : 'No');
        
        // Test 4: Test payment mock endpoint
        console.log('\n4️⃣ Testing mock payment...');
        const paymentResponse = await axios.post(`${API_BASE}/payment/order-mock`, {
            amount: 500,
            currency: 'INR'
        });
        console.log('✅ Mock payment successful:', paymentResponse.data.id);
        
        // Test 5: Test pizza ingredients
        console.log('\n5️⃣ Testing pizza ingredients...');
        const basesResponse = await axios.get(`${API_BASE}/bases`);
        console.log('✅ Bases fetched:', basesResponse.data.length, 'items');
        
        console.log('\n🎉 All tests passed! Backend API is working correctly.');
        
    } catch (error) {
        console.error('\n❌ Test failed:', error.response?.data?.message || error.message);
        console.error('📍 Error details:', {
            status: error.response?.status,
            url: error.config?.url,
            method: error.config?.method
        });
    }
}

// Run tests
testBackendAPI();
