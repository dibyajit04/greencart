const mongoose=require("mongoose")

const Product=new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    description:{
        type:String,
        default:""
    },

    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        enum:["Fruits","Vegetables"],
        required:true
    },
    imageURL:String,
    stock:{
        type:Number,
        required:true,
        min:0,
    }
})
const Producttable=mongoose.model("Product",Product)

module.exports=Producttable;