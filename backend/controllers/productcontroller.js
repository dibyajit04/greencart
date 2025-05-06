const Product =require("../models/Product")
const  {addProductschema} =require("../zod-validations/Userschema")

const getAllproducts = async (req, res) => {
    try {
        // Pagination parameters from query string, with defaults
        const page = parseInt(req.query.page) || 1;      // Current page number
        const limit = parseInt(req.query.limit) || 10;   // Products per page
        const skip = (page - 1) * limit;                 // How many to skip if in 3 page we need to skip first 2 pages

        // Your existing search/filter/sort logic
        const { name, category, minPrice, maxPrice, sort } = req.query;
        const query = {};

        if (name) {
            query.name = { $regex: name, $options: 'i' };
        }
        if (category) {
            query.category = category;
        }
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        let sortOption = {};
        if (sort === 'price_asc') sortOption.price = 1;
        if (sort === 'price_desc') sortOption.price = -1;
        if (sort === 'name_asc') sortOption.name = 1; 
        if (sort === 'name_desc') sortOption.name = -1;

        // Get paginated products
        const products = await Product.find(query)        //PASS LIK THIS http://localhost:8000/api/products?name=apple&sort=price_desc&page=1&limit=10

            .sort(sortOption)
            .skip(skip)
            .limit(limit);

        // Get total count for pagination info
        const total = await Product.countDocuments(query);

        return res.status(200).json({
            products,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (err) {
        return res.status(500).json({ msg: "ERROR IN GETTING ALL PRODUCT", error: err.message });
    }
};

/**
 
const { name, category, minPrice, maxPrice } = req.query;
Get search/filter values from the URL (like /api/products?name=apple&minPrice=10).

const query = {};
Start with an empty query object to build your search filters.

if (name) { query.name = { $regex: name, $options: 'i' }; }
If a name is given, add a case-insensitive partial match for product names.

if (category) { query.category = category; }
If a category is given, filter products in that category.

if (minPrice || maxPrice) { ... }
If a price range is given, add price filters:

if (minPrice) query.price.$gte = Number(minPrice);
Set minimum price (greater than or equal).

if (maxPrice) query.price.$lte = Number(maxPrice);
Set maximum price (less than or equal).

const products = await Product.find(query);
Search the database for products matching all the above filters.

return res.status(200).json(products);
Send the found products as a JSON response.

catch (err) { ... }
If anything goes wrong, return a 500 error and the error message.


*/


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