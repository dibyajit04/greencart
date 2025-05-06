const express = require('express');
const router = express.Router();
const{ customerSignin,customerSignup,  updateUserProfile,getUserProfile}=require("../controllers/usercontroller")
const authenticate=require("../middleware/authenticate")
const authorizeuser=require("../middleware/authorizeuser")

router.post('/signup', customerSignup);
router.post('/signin', customerSignin);
router.get('/getuser',authenticate,authorizeuser,getUserProfile),
router.put('/update',authenticate,authorizeuser,updateUserProfile)


module.exports=router