const express = require('express');
const router = express.Router();
const{ customerSignin,customerSignup}=require("../controllers/usercontroller")

router.post('/signup', customerSignup);
router.post('/signin', customerSignin);

module.exports=router