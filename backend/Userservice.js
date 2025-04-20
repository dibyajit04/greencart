const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const Usertable=require("./models/User")
const dotenv = require('dotenv')
dotenv.config();
const JWT_SECRET=process.env.JWT_SECRET

//const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
throw new Error("JWT_SECRET is not defined in the environment variables");
}



console.log("hii")
//hash password and save in db
const hashpassword=async(password)=>{
 return await bcrypt.hash(password,10)
}


//check the password when you signin
const checkpassword=async(password,hashedpassword)=>{
    return await bcrypt.compare(password,hashedpassword)

}


//generate token for request that needs authentication
const generatetoken=(userid,role)=>{
    return  jwt.sign({id:userid,role:role},JWT_SECRET,{expiresIn:"7d"})   //jwt.sign({Payload always an object - The data you want to encode in the token},Secret key - A string used to sign the token (to verify its authenticity), Options - Specifies the token's expiration time (in this case, 7 days) )
}


//search for users
const findUserbyemail=async(email)=>{
    return await Usertable.findOne({email})
}

module.exports={
    hashpassword,
    checkpassword,
    generatetoken,
    findUserbyemail
}

