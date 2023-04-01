const {getAllUser,getUserByEmail,getUserById,updateUserType} = require('../services/user.service')

exports.allUsers = async(req,res)=>{
    let response = await getAllUser()
    res.status(200).send({
        Users : response,
    })
}

exports.getUserByEmail = async(req,res) =>{
    let sentEmail = req.params.email;
    let response = await getUserByEmail(sentEmail)
    res.status(201).send({
        Message : response
    })
}

exports.getUserById = async(req,res)=>{
    let sentId = req.params.id;
    let response = await getUserById(sentId);
    res.status(201).send({
         Message : response
    })
}


exports.updateUserType = async(req,res)=>{
    console.log(req.body)
    const updatedUser = await updateUserType(req.body)
    res.status(201).send({
        message : updatedUser
    })
} 