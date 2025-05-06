const express = require('express');
const router = express.Router();
const {addtocart,
    getCart,
    removefromCart,
    updateCart} = require('../controllers/cartcontroller');

    
const authenticate=require('../middleware/authenticate')
const authorizeuser=require('../middleware/authorizeuser')


router.use(authenticate, authorizeuser);
router.get('/', getCart);
router.post('/add', addtocart);
router.post('/update', updateCart);
router.post('/remove', removefromCart);
//router.delete('/empty', cartController.emptyCart);


module.exports = router;