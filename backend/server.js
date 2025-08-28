require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// CORS configuration for PizzaHub
const allowedOrigins = [
    'http://localhost:3000',  // Frontend development
    'http://localhost:3001',  // Admin development
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    'https://pizzahub-frontend.onrender.com',  // Production frontend
    'https://pizzahub-admin.onrender.com',     // Production admin
    'https://pizzahub-55l6-git-master-himanshuyadav6764s-projects.vercel.app'  // Vercel frontend
];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        } else {
            console.log('CORS blocked origin:', origin);
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
    credentials: true,
};

app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB connected successfully');
        console.log('📊 Database:', process.env.MONGO_URI.split('/').pop().split('?')[0]);
    })
    .catch(err => {
        console.error('❌ MongoDB connection failed:', err.message);
        process.exit(1);
    });

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/bases', require('./routes/baseRoutes'));
app.use('/api/sauces', require('./routes/sauceRoutes'));
app.use('/api/cheeses', require('./routes/cheeseRoutes'));
app.use('/api/veggies', require('./routes/veggiesRoutes'));
app.use('/api/meats', require('./routes/meatRoutes'));
app.use('/api/pizzas', require('./routes/pizzaRoutes'));

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        message: '🍕 PizzaHub API is running!',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        endpoints: {
            users: '/api/users',
            payment: '/api/payment',
            bases: '/api/bases',
            sauces: '/api/sauces',
            cheeses: '/api/cheeses',
            veggies: '/api/veggies',
            meats: '/api/meats',
            pizzas: '/api/pizzas'
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('❌ Server Error:', err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'production' ? 'Server Error' : err.message
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Route not found',
        availableRoutes: ['/api/users', '/api/payment', '/api/bases', '/api/sauces', '/api/cheeses', '/api/veggies', '/api/meats', '/api/pizzas']
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
