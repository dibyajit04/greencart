const Product =require("../models/Product")
const  {addProductschema} =require("../zod-validations/Userschema")

const getAllproducts=async(req,res)=>{
    try{
        const products= await Product.find()
        return res.status(200).json(products)
    }
    catch(err){
        return res.status(500).json({msg:"ERROR IN GETTING ALL PRODUCT",error:err.message})
    }
}

const getProductbyId=async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({msg:"PRODUCT NOT FOUND"})
        }
        return res.status(200).json(product)
    }
    catch(err){
    return res.status(500).json({msg:"ERROR IN GETTING PRODUCT BYID",error:err.message})
    }
}


const addproduct=async(req,res)=>{
    const details=req.body;
    const check=addProductschema.safeParse(details)
    if(!check.success){
      return res.status(400).json({msg:"INVALID PRODUCT CREDENTIALS"}) //400=bad request
    }
    try{
        const product=await Product.create(details)
    return res.status(200).json({msg:"PRODUCT ADDED SUCCESFULLY",
        product:{
        _id:product._id,
        name:product.name,
        description:product.description,
        price:product.price,
        category:product.category,
        imageURL:product.imageURL,
        stock:product.stock}
    })
    }
    catch(error){
        return res.status(500).json({msg:"ERROR IN ADDING PRODUCT",error:error.message}) //500=internal server error

    }
   
}

const updateProduct=async(req,res)=>{
    try{
       const product=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
       if(!product){
        return res.status(404).json({msg:"PRODUCT NOT FOUND"})
       }
    }
    catch(err){
        return res.status(500).json({msg:"ERROR IN UPDATE PRODUCT",error:err.message})

    }
}


const deleteproduct=async(req,res)=>{
    try{
        const remove=await Product.findByIdAndDelete(req.params.id) //router.get(`/products/:id`)
        if(!remove){
            return res.status(404).json({msg:"PRODUCT DOESNT EXIST"})
        }
        return res.status(200).json({msg:"PRODUCT DELETED SUCCESFULLY",deletedproduct:remove})
    }
    catch(error){
        return res.status(500).json({msg:"ERROR IN DELETING PRODUCT",error:error.message})//500=internal server error
    }
}


module.exports={
    getAllproducts,
    getProductbyId,
    addproduct,
    updateProduct,
    deleteproduct
}