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

/*console.log('authenticate:', typeof authenticate);
console.log('authorizeadmin:', typeof authorizeadmin);
console.log('adminSignup:', typeof adminSignup);
console.log('adminSignin:', typeof adminSignin);
console.log('addproduct:', typeof addproduct);
console.log('deleteproduct:', typeof deleteproduct);*/

module.exports = router;


/**{
    "name":"aamj",
    "description":"csacb",
    "category":"Fruits",
    "price":"vasvvchaj",
    "imageURL":"http://example.com/image.jpg"
} */