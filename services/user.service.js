const User = require('../models/user.model')
const userType = require('../constants/userType')
const Ticket = require('../models/ticket.model')


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
    console.log("EmailSent",emailSent)
    try{
        const user = await User.findOne({email:emailSent});
      
        if(user) return true
        else false
    }catch(err){
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
const updateUser = async(data)=>{
    
    try{     
    
        let newUser = {
            name: data.name,
            email:data.email,
            userType :data.userType,
            userStatus : data.userStatus
        }            
        await User.findOneAndUpdate({_id:data.id},{...newUser})
     
        
        const user = await User.findOne({email:data.email}) 
        console.log(user,data.id)
        return  user; 

       
       
    }catch(err){
        console.log(err);
         return err;
    }   

}
 
module.exports = {updateUser,getUserByEmail,getAllUser,getUserById,updateUserType,isValidUser, updatedTicketCreatedArray,updateAssignedToArray}