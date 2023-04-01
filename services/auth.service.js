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
        name : data.name,
        userType : data.userType,
        userStatus:data.userStatus,
    }
    console.log(newUser)
    const createUser = await User.create(newUser);
    console.log(createUser)
    response.user = createUser; 
    return response;
 
} catch (err) {
    response.error = err.message;
    return response;    
}
}

const signIn = async(data)=>{
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
} 

const verifytoken = (tokenSent)=>{
    try{
        const isverified = jwt.verify(tokenSent,process.env.JWT_SECTRETKEY)
        return isverified;

    }catch(err){
        console.log(err)
        return ;
    }
}


module.exports = {signUp,signIn,verifytoken}

