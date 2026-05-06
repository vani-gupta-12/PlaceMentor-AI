const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route - just to confirm server is working
app.get('/', (req, res) => {
  res.json({ message: 'PlaceMentor AI Backend is running!' });
});

// Auth routes (we will add more soon)
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/score', require('./routes/scoreRoutes'));

// Connect to MongoDB then start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully');
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
  });