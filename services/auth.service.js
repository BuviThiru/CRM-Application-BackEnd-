const { response } = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserByEmail } = require('./user.service');
require('dotenv').config();



const signUp = async(data)=>{
    let response = {}
try {
   
    const newUser = {
        name : data.name,
        email : data.email,
        password : data.password,
        userType : data.userType,
        userStatus:data.userStatus,
    }
    const createUser = await User.create(newUser);
    response.user = createUser; 
   
    return response;
 
} catch (err) {
 console.log(err);  
 response.error = err.message;
 return response;  
}
}

const signIn = async(data)=>{
    let response ={};
try{
      let userFromDb = await User.findOne({email : {$eq: data.email}}) 
    if(!userFromDb) {response.error = "Invalid Email Id"}
    else{
        let hashPsw = bcrypt.compareSync(data.password,userFromDb.password)
    if(!hashPsw){response.error = "Password Doesn't Match"}
    else {
        const token = jwt.sign({email:data.email},process.env.JWT_SECTRETKEY)
     response.data = {
        Result : "User authenticated",
        token: token,
        user : {name:userFromDb.name,email:userFromDb.email,userType:userFromDb.userType}
     }}
    }  
 return response;
}catch(err){
    console.log(err);  
    response.error = err.message;
    return response; 
}
} 

const verifytoken = (tokenSent)=>{
    try{
        const isverified = jwt.verify(tokenSent,process.env.JWT_SECTRETKEY)
        return isverified;

    }catch(err){
        console.log(err)
   
    }
}
module.exports = {signUp,signIn,verifytoken}

