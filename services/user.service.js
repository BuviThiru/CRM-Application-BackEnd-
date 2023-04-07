const User = require('../models/user.model')
const userType = require('../constants/userType')


const getUserByEmail = async(emailData) =>{
   try{
    let user = await User.findOne({email:emailData});
    return user
   }catch(err){
      return err;
   }
}

const getAllUser = async()=>{
    const users = await User.find()
    
    return users;
}

 const getUserById = async(idSent)=>{
    try{
        let user = await User.findOne({_id:idSent})
    return user
    }catch(err){
        console.log(err);
        return err
    }
 }

 const updateUserType = async(data)=>{
            try{     
                let res  
        let useTypeArray = Object.values(userType.userTypes)
        if(useTypeArray.indexOf(data.userType)==-1){
         res = "userType is not valid"
        }else {
            
        await User.findOneAndUpdate({email:data.email},{userType:data.userType})
        const user = await User.findOne({email:data.email})     
        res = user;

        }
       
       return res
       
    }catch(err){
        console.log(err);
         return err;
    }    
 }

module.exports = {getUserByEmail,getAllUser,getUserById,updateUserType}