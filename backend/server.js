const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const cors=require("cors")
const adminRoutes =require("./routes/adminroutes.js")
const productRoutes=require("./routes/productroutes.js")
const cartRoutes=require("./routes/cartroutes.js")
const customerRoutes=require("./routes/userroutes.js")
const orderRoutes = require('./routes/orderroutes');


dotenv.config(); // Load environment variables


const app = express();      // Initialize app


app.use(express.json());      // Middleware for JSON parsing
app.use(cors())

connectDb();        // Connect to database


app.get('/', (req, res) => {
  res.send('BAAP HEIN HUM...');                 
});                                            
                                                           // Default route for health check



// Routes
app.use('/api/admin',adminRoutes);
app.use('/api/products',productRoutes)
app.use('/api/cart',cartRoutes)
app.use('/api/customer',customerRoutes)
app.use('/api/orders', orderRoutes);



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
  console.log('http://localhost:8000')
});

