require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const createTestUser = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Check if test user already exists
        const existingUser = await User.findOne({ email: 'test@pizzahub.com' });
        
        if (existingUser) {
            console.log('Test user already exists!');
            return;
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);

        // Create test user
        const testUser = await User.create({
            name: 'Test User',
            email: 'test@pizzahub.com',
            password: hashedPassword,
            isAdmin: false
        });

        console.log('Test user created successfully!');
        console.log('Email: test@pizzahub.com');
        console.log('Password: password123');
        
    } catch (error) {
        console.error('Error creating test user:', error);
    } finally {
        mongoose.connection.close();
        process.exit(0);
    }
};

createTestUser();
