const z = require ("zod")

const adminSignupschema=z.object({
    name:z.string().min(4,"USERNAME SHOULD BE MORE THAN 4 LETTERS"),
    email:z.string().email(),
    password:z.string().min(4)
})

const adminSigninschema=z.object({
    email:z.string().email(),
    password:z.string().min(4)
})

const addProductschema = z.object({
    name: z.string().min(4),
    description: z.string().optional(),
    price: z.string().min(3),
    category: z.enum(['Fruits', 'Vegetables']),
    imageURL: z.string().url()
  });
  
  module.exports={
    adminSigninschema,
    adminSignupschema,
    addProductschema
  }