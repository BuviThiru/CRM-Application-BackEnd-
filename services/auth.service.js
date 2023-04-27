const { response } = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserByEmail } = require('./user.service');
require('dotenv').config();



const signUp = async(data)=>{

try {
   let response = {}
   
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
}
}

const signIn = async(data)=>{
try{
    let response ={};
    let userFromDb = await User.findOne({email : {$eq: data.email}}) 
    if(!userFromDb) {response.error = "Invalid Email Id"}
    else{
        let hashPsw = bcrypt.compareSync(data.password,userFromDb.password)
    if(!hashPsw){response.error = {Error: "Password Doesn't Match"} }
    else {
        const token = jwt.sign({email:data.email},process.env.JWT_SECTRETKEY)
     response.data = {
        Result : "User authenticated",
        token: token
     }}
    }  
 return response;
}catch(err){
    console.log(err)
    
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

