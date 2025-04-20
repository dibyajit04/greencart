const authorizeadmin=(req,res,next)=>{
    if(req.user.role!=="admin"){                //THE PREVIOUS MIDDLEWARE STORES THE ROLE IN REQ.USER={ID:12232,ROEL:"admin/user"}
        return res.status(404).json({msg:"ACCESS FORBIDDEN:ADMINS ONLY"})
    }
    next()
}

module.exports=authorizeadmin;