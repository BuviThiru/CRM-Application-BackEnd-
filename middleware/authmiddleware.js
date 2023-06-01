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
//    console.log(user)
   if(!user){
    return res.status(401).send({
        message: "email is invalid"
    })
}
req.user = user;
next();  
}

exports.isAdmin = async(req,res,next) =>{
    if(!req.user) {
        return res.status(401).send({Message:"User not found"})
    }
    if(req.user.userType !== "Admin"){
        return res.status(401).send({Message:"User doesn't have required permission"})
    }
    next();
}

exports.isAdminOrEngineer = async(req,res,next) =>{
    if(!req.user) {
        return res.status(401).send({Message:"User not found"})
    }
    if(req.user.userType !== "Admin" || req.user.userType !== "Engineer"){
        return res.status(401).send({Message:"User doesn't have required permission"})
    }
    next();
}
 