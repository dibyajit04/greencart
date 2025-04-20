const mongoose=require ("mongoose")

const Userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true

    },
    role:{
        type:String,
        enum:["admin","customer"],
        default:"customer"
    }

})

const Usertable=mongoose.model("User",Userschema)

module.exports=Usertable;