const express = require('express');
const router = express.Router();
const { getAllproducts,getProductbyId,addproduct,updateProduct,deleteproduct}=require("../controllers/productcontroller")
const authenticate = require('../middleware/authenticate');
const authorizeadmin = require('../middleware/authorizeadmin');



router.get("/",getAllproducts)
router.get("/:id",getProductbyId)
router.post("/",addproduct)
router.put("/:id",authenticate,authorizeadmin,updateProduct)
router.delete("/:id",authenticate,authorizeadmin,deleteproduct)


module.exports=router