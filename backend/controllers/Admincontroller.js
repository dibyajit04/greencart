const User=require("../models/User")
const Product=require("../models/Product") //can use just product

const {hashpassword,checkpassword,generatetoken,findUserbyemail}=require("../Userservice")
const {adminSignupschema,adminSigninschema,addProductschema} =require("../zod-validations/Userschema")
const z=require("zod")

console.log("NOT")
//SINGUP
const adminSignup=async(req,res)=>{
    console.log("NO")
    const details=req.body;
    const check=adminSignupschema.safeParse(details)
    console.log("NO")
    if(!check.success){
        return res.status(400).json({msg:"INVALID CREDETIALS"}) //400=badrequest
    }
    try{
        console.log("k")
        const existing=await findUserbyemail(details.email)
        if(existing){
            return res.status(409).json({msg:"USER ALREADY EXISTS"}) //409=conflict
        }
        const hashed=await hashpassword(details.password)
        const admin=await User.create({
            name:details.name,
            email:details.email,
            password:hashed,
             role:"admin"})

       return res.status(200).json({msg:"Admin created successfully",
        user:{
            _id:admin._id,
            name:admin.name,
            email:admin.email,
            password:admin.password,
            role:admin.role,
            token:generatetoken(admin._id,admin.role)
        }
       })
       }
    catch(error){
        return res.status(500).json({msg:"ERROR IN CREATING ADMIN",error:error.message}) //500=internal server error

    }
}

//SINGIN

const adminSignin=async(req,res)=>{
   const details=req.body;
   const check=adminSigninschema.safeParse(details)
   if(!check.success){
    return res.status(400).json({msg:"INVALID CREDENTIALS"}) //400=bad request
   }
   try{
    const existing=await findUserbyemail(details.email) //THE USER OBJECT IS STORED IN THIS EXISTING
    if(!existing || existing.role!=="admin"){
        return res.status(401).json({msg:"UNAUTHORIZED NOT AN ADMIN"})//401=unauthorized
    }
    const ismatch=await checkpassword(details.password,existing.password)
    if(!ismatch){
        return res.status(404).json({msg:"INCORRECT PASSWORD"})
    }
    const token=generatetoken(existing._id,existing.role);
    return res.status(200).json({
        msg:"ADMIN SIGNIN SUCCESSFUL",
        token,
        name:existing.name,
        email:existing.email,
        role:existing.role
    })
   }
   catch(error){
    return res.status(500).json({msg:"ERROR IN SIGNIN",error:error.message}) //500=internal server error

   }
}

//ADDPRODUCT

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
        imageURL:product.imageURL}
    })
    }
    catch(error){
        return res.status(500).json({msg:"ERROR IN ADDING PRODUCT",error:error.message}) //500=internal server error

    }
   
}

//DELETEPRODUCT


const deleteproduct=async(req,res)=>{
    const {productID}=req.params;
    try{
        const remove=await Product.findByIdAndDelete(productID)
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
    adminSignin,
    adminSignup,
    addproduct,
    deleteproduct
}
