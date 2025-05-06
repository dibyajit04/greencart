const express = require('express');
const router = express.Router();
const orderController = require('../controllers/Ordercontroller');
const authenticate = require('../middleware/authenticate');
const authorizeuser = require('../middleware/authorizeuser');

// Place order
router.post('/place', authenticate, authorizeuser, orderController.placeOrder);

// Get order history
router.get('/', authenticate, authorizeuser, orderController.getOrders);

module.exports = router;
