const express = require('express');
const router = express.Router();
const { adminSignup, adminSignin, getAllOrders } = require('../controllers/Admincontroller');
const authenticate = require('../middleware/authenticate');
const authorizeadmin = require('../middleware/authorizeadmin');

// Auth
router.post('/signup', adminSignup);
router.post('/signin', adminSignin);

// Protected routes
router.get('/order', authenticate, authorizeadmin, getAllOrders);



module.exports = router;


/**{
    "name":"aamj",
    "description":"csacb",
    "category":"Fruits",
    "price":"vasvvchaj",
    "imageURL":"http://example.com/image.jpg"
} */