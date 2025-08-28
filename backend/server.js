require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const allowedOrigins = [
    'https://oasis-infobyte-frontend.onrender.com', 
    'https://oasis-infobyte-admin.onrender.com',
    'http://localhost:3000',  // Frontend development
    'http://localhost:3001',  // Admin development
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001'
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/bases', require('./routes/baseRoutes'));
app.use('/api/sauces', require('./routes/sauceRoutes'));
app.use('/api/cheeses', require('./routes/cheeseRoutes'));
app.use('/api/veggies', require('./routes/veggiesRoutes')); // Fixed: added 's'
app.use('/api/meats', require('./routes/meatRoutes'));
app.use('/api/pizzas', require('./routes/pizzaRoutes'));

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
