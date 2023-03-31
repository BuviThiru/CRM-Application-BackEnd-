const User = require('../models/user.model')


const getUserByEmail = async(emailData) =>{
   try{
    let user = await User.findOne({email:emailData});
    console.log(user)
    return user
   }catch(err){
        console.log(err);
        return err;
   }
}

const getAllUser = async()=>{
    const users = await User.find()
    
    return users;
}
module.exports = {getUserByEmail,getAllUser}