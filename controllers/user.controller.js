const {getAllUser,getUserByEmail,getUserById,updateUserType,updateUser,deleteUserSer} = require('../services/user.service')

exports.allUsers = async(req,res)=>{
    try{
        let response = await getAllUser()
    res.status(200).send({
        Users : response,
    })
    }catch(err){
        console.log(err)
     }
}

exports.getUserByEmail = async(req,res) =>{
   try{
    let sentEmail = req.params.email;
    let response = await getUserByEmail(sentEmail)
    res.status(201).send({
        Message : response
    })
   }catch(err){
    console.log(err)
 }
}

exports.getUserById = async(req,res)=>{
    try{
        let sentId = req.params.id;
    let response = await getUserById(sentId);
    res.status(201).send({
         Message : response
    })
    }catch(err){
        console.log(err)
     }
}


exports.updateUserType = async(req,res)=>{
   try{
    const updatedUser = await updateUserType(req.body)
    res.status(201).send({
        message : updatedUser
    })
   }catch(err){
    console.log(err)
 }
} 

exports.updateUser= async(req,res)=>{    
    try{
        const user = await updateUser(req.body,req.self)     
        res.status(201).send({
            message : user.user,
            token : user.token
        })
       }catch(err){
        console.log(err)
     }
}

exports .deleteUser = async(req,res)=>{
    try{
        const userToDelete = await deleteUserSer(req.params.id)      
        if(!userToDelete){
            res.status(401).send({
                message : "USer deletion unsuccessful"
            })         
        }
        else{
            res.status(204).send({
                message : "User Successfully deleted"
            })
        }
    }catch(err){
        console.log(err)
    }
}