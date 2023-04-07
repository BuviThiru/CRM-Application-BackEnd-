const {createTicket} = require('../services/tickets.services');


exports.createTicket = async(req,res)=>{//req.body has ticket's data, req.user
    try{
        const  response = await createTicket(req.body,req.user)
        if(response.error){
            res.status(401).send({
                message : response.error
            })
        }else{
            res.status(200).send({
                message : response
            })
        }

    }catch(err){
        console.log(error)
        res.status(401).send({
            message : err.message,
        })
    }
}