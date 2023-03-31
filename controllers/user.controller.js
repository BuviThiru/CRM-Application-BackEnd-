const {getAllUser} = require('../services/user.service')

exports.allUsers = async(req,res)=>{
    let response = await getAllUser()
    res.status(200).send({
        Users : response,
    })
}