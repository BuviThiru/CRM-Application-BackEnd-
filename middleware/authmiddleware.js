const jwt = require('jsonwebtoken')
const {getUserByEmail} = require('../services/user.service')
const {verifytoken} = require('../services/auth.service')


exports.isAuthenticated = async(req,res,next)=>{
    const tokenSent = req.headers['x-access-token']
     if (!tokenSent) return res.status(401).send({Error:"Token not found"})
    let verifiedToken = verifytoken(tokenSent)

    if(!verifiedToken || verifiedToken === "invalid signature") return res.status(401).send({
        message : "Token invalid"
    })
   const user = await getUserByEmail(verifiedToken.email)
   if(!user){
    return res.status(401).send({
        message: "email is invalid"
    })
}
req.user = user;
next();  
}
 