const authorizeuser=(req,res,next)=>{
    if(req.user.role!=="customer"){                          //THE PREVIOUS MIDDLEWARE STORES THE ROLE IN REQ.USER={ID:12232,ROEL:"admin/user"}
        return res.status(404).json({msg:"ACCESS FORBIDDEN:CUSTOMER ONLY"})
    }
    next()
}

module.exports=authorizeuser;