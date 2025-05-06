const Customer=require("../models/User")

const {hashpassword,checkpassword,generatetoken,findUserbyemail}=require("../Userservice")
const {customerSigninschema,customerSignupschema,updateUserProfile}=require("../zod-validations/Customerschema")

const z=require("zod")

const customerSignup=async(req,res)=>{
    const details=req.body;
    const check=customerSignupschema.safeParse(details)
    if(!check.success){
        return res.status(400).json({msg:"INVALID CREDETIALS"}) //400=badrequest
    }
    try{
        const existing=await findUserbyemail(details.email)
        if(existing){
            return res.status(409).json({msg:"USER ALREADY EXISTS"}) //409=conflict
        }
        const hashed=await hashpassword(details.password)
        const customer=await Customer.create({
            name:details.name,
            email:details.email,
            password:hashed
        })

       return res.status(200).json({msg:"Customer created successfully",
        user:{
            _id:customer._id,
            name:customer.name,
            email:customer.email,
            password:customer.password,
            role:customer.role,
            token:generatetoken(customer._id,customer.role)
        }
       })
       }
    catch(error){
        return res.status(500).json({msg:"ERROR IN CREATING CUTSOMER",error:error.message}) //500=internal server error

    }
}




const customerSignin=async(req,res)=>{
    const details=req.body;
    const check=customerSigninschema.safeParse(details)
    if(!check.success){
     return res.status(400).json({msg:"INVALID CREDENTIALS"}) //400=bad request
    }
    try{
     const existing=await findUserbyemail(details.email) //THE USER OBJECT IS STORED IN THIS EXISTING
     if(!existing || existing.role!=="customer"){
         return res.status(401).json({msg:"UNAUTHORIZED NOT AN CUSTOMER"})//401=unauthorized
     }
     const ismatch=await checkpassword(details.password,existing.password)
     console.log(details.password,existing.password)
     if(!ismatch){
         return res.status(404).json({msg:"INCORRECT PASSWORD"})
     }
     const token=generatetoken(existing._id,existing.role);
     return res.status(200).json({
         msg:"CUSTOMER SIGNIN SUCCESSFUL",
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

 const updateUserProfile = async (req, res) => {
    try {
        const details = req.body;
        
        // Validate with Zod
        const check = userUpdateSchema.safeParse(details);
        if (!check.success) {
            return res.status(400).json({ 
                msg: "INVALID UPDATE DATA", 
                errors: check.error.errors 
            });
        }
        
        // Proceed with update
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: details },
            { new: true }
        ).select('-password');
        
        res.status(200).json({
            msg: "Profile updated successfully",
            user
        });
    } catch (err) {
        res.status(500).json({ msg: "Error updating profile", error: err.message });
    }
};

const getUserProfile = async (req, res) => {
    try {
        // req.user.id comes from your authenticate middleware
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ msg: "Error fetching profile", error: err.message });
    }
};


 module.exports={
    customerSignin,
    customerSignup,
    updateUserProfile,
    getUserProfile
 }