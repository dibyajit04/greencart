const z = require ("zod")

const customerSignupschema=z.object({
    name:z.string().min(4,"USERNAME SHOULD BE MORE THAN 4 LETTERS"),
    email:z.string().email(),
    password:z.string().min(4)
})

const customerSigninschema=z.object({
    email:z.string().email(),
    password:z.string().min(4)
})

// Create a schema for profile updates
const userUpdateSchema = z.object({
    name: z.string().min(4, "USERNAME SHOULD BE MORE THAN 4 LETTERS"),
    email: z.string().email("INVALID EMAIL FORMAT")
    // No password here since users typically don't update password in profile
}).partial();


module.exports={
    customerSigninschema,
    customerSignupschema,
    userUpdateSchema
}