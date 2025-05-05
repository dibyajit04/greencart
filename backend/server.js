const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const cors=require("cors")
const router =require("./routes/adminroutes.js")

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware for JSON parsing
app.use(express.json());
app.use(cors())
// Connect to database
connectDb();


// Default route for health check
app.get('/', (req, res) => {
  res.send('BAAP HEIN HUM...');
});



// Routes
app.use('/api/admin',router);



// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error: ', err.message); // Log error message
  res.status(500).json({ msg: 'Internal Server Error' }); // Return a generic 500 response for errors
});
console.log("hell0000jhvyvvhvh0")
// Server initialization
const PORT = process.env.PORT || 5000 ;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

