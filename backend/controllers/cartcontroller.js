const Cart = require('../models/Cart');
const Product = require('../models/Product');

const addtocart=async(req,res)=>{
    
    try{
        

        //MIDDLEWARE HAS THE ID ASTOKEN IS SIGNED USING USER._ID AND ROLE REQ{USER:{ID:???,ROLE:????}} SO TO GET ID REQ.USER.ID
        const userId=req.user.id;
        const{productId,quantity}=req.body;
    
        //CHECK IF PRODUCT EXIST IN PRODUCT DATABASE
        const product=await Product.findById(productId)
        if(!product){
            return res.status(404).json({msg:"PRODUCT NOT FOUND"})
        }

        //CHECK IF STOCK IS PRESENT
        if(product.stock<quantity){
            return res.status(400).json({msg:"NOT ENOUGH STOCK AVAILABLE"})
        }
        


        //FIND OR CREATE A CART
        let cart=await Cart.findOne({user:userId})
       if(!cart){
           cart= new Cart({user:userId,items:[]})//CHECK SCHEMA OF CART ON HOW TO ADD USERID
    }

       //REFER TO THE SCHEMA OF THE CART DATABSE TO UNDERSTAND THE STRUCTURE 


       //CHECK IF PRODUCT ALREADY EXIST IN THE CART ARRAY (INDEX IS CART.ITEMS[0],CART.ITEMS[1]....)
       const itemIndex=cart.items.findIndex(item=>item.product.equals(productId))
     
       if(itemIndex > -1){

        //UPATE IF ITEM EXIST IN THE CART.ITEMS[0],CART.ITEMS[1] ARRAY 
        cart.items[itemIndex].quantity+=quantity;
       }    
       else{
        //PRODUCT NOT FOUND IN THE CART.ITEMS[0/1] THEN IT MEANS PRODUCT IS NOT IN THE ARRAY SO INDEX IS NOT 0 LESS THAN 0 SO WE ADD TH EPRODUCT IN THE CART
        cart.items.push({product:productId,quantity})
       }
    
       await cart.save();
       res.status(200).json({message:"PRODUCT ADDED TO CART",cart})
    }
    catch(err){
      res.status(500).json({msg:err.message})
    }

    }


    const  getCart=async(req,res)=>{
        try{


        //MIDDLEWARE HAS THE ID ASTOKEN IS SIGNED USING USER._ID AND ROLE REQ{USER:{ID:???,ROLE:????}} SO TO GET ID REQ.USER.ID
          const userId=req.user.id

          //SEARCH FOR CART OF A SPECIFIC USER AND THEN SHOW ALL THE PRODCUT IN HIS CART
          const cart=await Cart.findOne({user:userId}).populate(`items.product`);
          if(!cart){
            return res.status(404).json({msg:"CART NOT FOUND"})
          }
          return res.status(200).json({cart})
        }
        catch(err){
          res.status(500).json({message:err.message})
        }
    }


const removefromCart=async(req,res)=>{
    try{
     const userId=req.user.id;
     const{productId}=req.body;
     

     let cart=await Cart.findOne({user:userId})
     if(!cart){
        return res.status(404).json({message:`CART NOT FOUND`})
     }
     
     //APART FROM THIS PRODUCT SAVE ALL THE PRODUCT IN THE CART OR FILTER THIS PRODUCT FROM ALL THE PRODUCT 

    //FILTER ALL THE PRODUCT WHOSE ID IS NOT SAME AS THE PROVIDED PRODUCT ID
     cart.items=cart.items.filter(item=>!item.product.equals(productId))
     await cart.save()

     /**(1)cart.items is an array of all the products currently in the cart.
         (2).filter(...) creates a new array that includes only the items for which the function returns true.
        (3)The function item => !item.product.equals(productId) checks each item:
        (4)item.product.equals(productId) returns true if the current item's product matches the productId you want to remove.
        (5)The ! (not) operator reverses this:
            If it matches, the result is false (so the item is excluded).
            If it does not match, the result is true (so the item is kept).
        The end result: All items except the one with the specified productId remain in the cart. */


        return res.status(200).json({msg:`PRODUCT REMOVED FROM CART`,cart})
    }
    catch(err){
        res.status(500).json({message:err.message})

    }
}

const updateCart=async(req,res)=>{
    try{
   const userId=req.user.id;
   const{productId,quantity}=req.body;

   let cart = await Cart.findOne({ user: userId });
   if (!cart) return res.status(404).json({ message: 'Cart not found' });

   const itemIndex = cart.items.findIndex(item => item.product.equals(productId));
   if (itemIndex === -1) {
    return res.status(404).json({ message: 'Product not in cart' });
    }
  
    cart.items[itemIndex].quantity = quantity;
    await cart.save()
    res.status(200).json({ message: 'Cart item updated', cart });
}

catch(err){
    res.status(500).json({ message: err.message });
}
}


module.exports={
    addtocart,
    getCart,
    removefromCart,
    updateCart
}

/**Function	                What it does
addToCart             	Adds/increases a product in the user's cart
getCart	               Retrieves all items in the user's cart
removeFromCart	       Removes a product from the user's cart
updateCartItem	       Changes the quantity of a product in the cart */