const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();
const Port = process.env.PORT

// Connect Database
connectDB();

// Middleware
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
  res.send("Server is running...");
});

// Routes
app.use('/', authRoutes);

// Start Server
app.listen(Port, () => console.log(`Server running on port ${Port}`));
