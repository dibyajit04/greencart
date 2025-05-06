const express = require('express');
const router = express.Router();
const { adminSignup, adminSignin, addproduct, deleteproduct } = require('../controllers/Admincontroller');
const authenticate = require('../middleware/authenticate');
const authorizeadmin = require('../middleware/authorizeadmin');

// Auth
router.post('/signup', adminSignup);
router.post('/signin', adminSignin);

// Protected routes
router.post('/add-product', authenticate, authorizeadmin, addproduct);
router.delete('/delete-product/:productID', authenticate, authorizeadmin, deleteproduct);



module.exports = router;


/**{
    "name":"aamj",
    "description":"csacb",
    "category":"Fruits",
    "price":"vasvvchaj",
    "imageURL":"http://example.com/image.jpg"
} */