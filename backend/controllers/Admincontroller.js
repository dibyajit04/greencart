const User=require("../models/User")
const Order=require("../models/Order") 

const {hashpassword,checkpassword,generatetoken,findUserbyemail}=require("../Userservice")
const {adminSignupschema,adminSigninschema} =require("../zod-validations/Userschema")
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
    console.log(details.password,existing.password)
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


// Get all orders (admin only)
exports.getAllOrders = async (req, res) => {
    try {
        // Fetch all orders with customer and product details
        const orders = await Order.find()
            .populate('user', 'name email')
            .populate('items.product');
            
        const totalAmount = orders.reduce((sum, order) => sum + order.total, 0);
        
        res.status(200).json({
            success: true,
            totalAmount,
            count: orders.length,
            orders
        });
    } catch (err) {
        res.status(500).json({ 
            msg: "Error fetching orders", 
            error: err.message 
        });
    }
};


module.exports={
    adminSignin,
    adminSignup,
    getAllOrders
    
}
