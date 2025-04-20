const jwt=require("jsonwebtoken")
const JWT_SECRET=process.env.JWT_SECRET

const authenticate=(req,res,next)=>{
    const token=req.headers['authorization']?.split(' ')[1]
    if(!token){
        return res.status(404).json({msg:"Token not provided/avaialble"})
    }
    try{
        const decode=jwt.verify(token,JWT_SECRET)
        req.user=decode;
        next()
    }
    catch(error){
        return res.status(404).json({msg:"ERROR IN VERIFYING TOKEN"})
    }
}

module.exports=authenticate