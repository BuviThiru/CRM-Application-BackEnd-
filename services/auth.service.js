const { response } = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs')




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
 
    const createUser = await User.create(newUser);
    response.user = createUser; 
    return response;
 
} catch (err) {
    response.error = err.message;
    return response;    
}
}

const signIn = async(data)=>{
    let response = {};
    let userFromDb = await User.findOne({email : {$eq: data.email}}) 
    if(!userFromDb) {response.error = "Invalid Email Id"}
    else{
        let hashPsw = bcrypt.compareSync(data.password,userFromDb.password)
    if(!hashPsw){response.error = "Password Doesn't Match"}
    else {
        response.data = "User authenticated"  }
    }  
   
 return response;
} 

module.exports = {signUp,signIn}

