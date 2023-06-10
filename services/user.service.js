const User = require('../models/user.model')
const userType = require('../constants/userType')
const Ticket = require('../models/ticket.model')
const jwt = require('jsonwebtoken')
require('dotenv').config();


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

const isValidUser = async(emailSent)=>{
  
    try{
        const user = await User.findOne({email:emailSent});
        console.log(user,emailSent)      
        if(user) return true
        else  return false
    }catch(err){
        console.log(err)
        return err;
    }
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

 const isValidTicketId = async(ticketId)=>{
    try {
        const response = await Ticket.findOne({_id:ticketId})
        if(response) return response;
        else{
            return {
                error : "Invalid Ticket ID"
            }
        }
    } catch (error) {
        console.log(error);
        return error.message
    }
 }
 const updatedTicketCreatedArray = async(userEmail,ticketId)=>{
   try{
    const validTicketId = await isValidTicketId(ticketId);
    if(!validTicketId || validTicketId.error){
        return {
            error : validTicketId.error
        }
    }
    const response = await User.updateOne(
        {email:userEmail},
        {$push :{ticketsCreated:ticketId}})
        return response;
   }catch(err){
    console.log(err);
    return err.message;
   }
 }

 const updateAssignedToArray = async(userEmail,ticketId) =>{
    try{
        const validTicketId = await isValidTicketId(ticketId);
        if(!validTicketId || validTicketId.error){
            return {
                error : validTicketId.error
            }
        }
        const response = await User.updateOne(
            {email:userEmail},
            {$push :{ticketsAssigned:ticketId}})
            return response;
       }catch(err){
        console.log(err);
        return err.message;
       }
 }
const updateUser = async(data,self)=>{
    let response ={}
  
    try{     
    
        let newUser = {
            name: data.name,
            email:data.email,
            userType :data.userType,
            userStatus : data.userStatus,
            clientName: data.clientName,
            updatedAt : Date.now()
        }            
        await User.findOneAndUpdate({_id:data.id},{...newUser}) 
        if(self) { const token = jwt.sign({email:data.email},process.env.JWT_SECTRETKEY); response.token = token }           
        const user = await User.findOne({_id:data.id}) 
        console.log(user,data.id)
        response.user =  user; 
       
        return response;   
       
        
    }catch(err){
        console.log(err);
         return err;
    }   

}
const deleteUserSer = async(idSent)=>{
   try{
    const user = await User.findByIdAndDelete({_id:idSent})
    return user
    // console.log(user)
   }catch(error){
    console.log(error)
   }
}
 
module.exports = {updateUser,getUserByEmail,getAllUser,getUserById,updateUserType,isValidUser, updatedTicketCreatedArray,updateAssignedToArray,deleteUserSer}