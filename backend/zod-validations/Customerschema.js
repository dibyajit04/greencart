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

module.exports={
    customerSigninschema,
    customerSignupschema
}