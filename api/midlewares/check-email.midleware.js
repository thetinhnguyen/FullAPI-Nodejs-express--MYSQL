const User=require('../models/user.model')

module.exports=(req,res,next)=>{
    User.checkEmail(req.body.email).then(result=>{
        if(result.length>0){

           return res.status(409).json({
                message: 'Email exists',
                err: 'email'
            })
        }
        next()
    }).catch(error=>{
         res.status(500).json(error)
    })
}