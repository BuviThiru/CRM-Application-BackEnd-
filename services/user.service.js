const User = require('../models/user.model')
const userType = require('../constants/userType')
const Ticket = require('../models/ticket.model')


const getUserByEmail = async(emailData) =>{
   try{
    let user = await User.findOne({email:emailData});
    console.log(">>>>>>>>>>>>>USER",user)
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
        console.log("______________________",user)
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

 
module.exports = {getUserByEmail,getAllUser,getUserById,updateUserType,isValidUser, updatedTicketCreatedArray,updateAssignedToArray}