const { createTicket, getTicketByGivenId,updateTicketById, getAllTicketsSer, getTicketsbyStatusSer,getTicketsAssignedToUserSer,getAllMyCreatedTicketSer,getTicketsCreatedByUserSer,updateTicket,getAllMyAssignedTicketSer} = require('../services/tickets.services');


exports.createTicket = async (req, res) => {//req.body has ticket's data, req.user
    try {
        const response = await createTicket(req.body, req.user)
        if (response.error) {
            res.status(401).send({
                message: response.error
            })
        } else {
            res.status(200).send({
                message: response
            })
        }

    } catch (err) {
        console.log(error)
        res.status(401).send({
            message: err.message,
        })
    }
}

exports.getTicketById = async (req, res) => {
    try {
        let sentId = req.params
        console.log(">>>>>>>>>>>>>>>>>>>>>REq.params", req.params)
        const response = await getTicketByGivenId(sentId)
        if (response.error) {
            res.status(401).send({
                Error: response.error
            })
        } else return res.status(200).send({
            Message: response
        })
    } catch (err) {
        console.log(err);
        return err.message
    }

}

exports.getAllTickets = async (req, res) => {
    try {
        const tickets = await getAllTicketsSer();
       
        if (!tickets) {
            return res.status(401).send({
                Error: "Tickets not found"
            })
        } else {
            return res.status(200).send({
                Tickets: tickets.tickets,
            })
        }


    } catch (err) {
        console.log(err)
        return err.message
    }
}

exports.getTicketsbyStatus = async (req, res) => {
    try {
      
        const tickets = await getTicketsbyStatusSer(req.params)
       
        if (!tickets || tickets.error) {
            return res.status(401).send({
                error: tickets.error
            })
        }
        return res.status(200).send({
            Tickets : tickets,
        })
    } catch (err) {
        console.log(err);
        return res.status(401).send({
            Error : err.Message,
        })
    }
}

exports.getTicketsAssignedToUser = async(req,res)=>{
    try{
      const tickets = await getTicketsAssignedToUserSer(req.user)
    
      if(tickets.error){
        return res.status(500).send({
            Result: tickets.error
        })
      }else{

        return res.status(200).send({
            Result : tickets,
        })  } 

    }
    catch(err){
        console.log(err);
        return res.status(500).send({
            Result: err.message
        })
    }
}


exports.getTicketsCreatedByUser = async(req,res)=>{
    try{
      const tickets = await getTicketsCreatedByUserSer(req.user)
      if(tickets.error){
        return res.status(500).send({
            Result: tickets.error
        })
      }else{
        return res.status(200).send({
            Result : tickets,
        })  } 

    }
    catch(err){
        console.log(err);
        return res.status(500).send({
            Result: err.message
        })
    }
}


exports.updateTicketById = async(req,res)=>{
    try{
        const updatedTicket = await updateTicketById(req.params,req.body,req.user)
        if(!updatedTicket || updatedTicket.error){
            return res.status(401).send({
                result : updatedTicket.error
            })
        }
        return res.status(200).send({
            result: updatedTicket
        })

    }catch(err){
        console.log(err);
        return res.status(500).send({
            Result : err.message
        })
    }
}

exports.updateTicket = async(req,res)=>{
    try{
        const updatedTicket = await updateTicket(req.params,req.body,req.user)
        if(!updatedTicket || updatedTicket.error){
            return res.status(401).send({
                result : updatedTicket.error
            })
        }
        return res.status(200).send({
            result: updatedTicket
        })

    }catch(err){
        console.log(err);
        return res.status(500).send({
            Result : err.message
        })
    }
}

exports.getAllMyAssignedTickets=async(req,res)=>{
    try {
        const myTickets = await getAllMyAssignedTicketSer(req.user)
        if(!myTickets || myTickets.error){
            return res.status(401).send({
                result : "Unable to fech the assigned Tickects",
                error : myTickets.error
            })
        }
        return res.status(200).send({
            result : myTickets
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            Result : err.message
        })
    }
}

exports.getAllMyCreatedTickets = async(req,res)=> {
    try {
        const myTickets = await getAllMyCreatedTicketSer(req.user)
       
        if(!myTickets || myTickets.error){
            return res.status(401).send({
                result : "Unable to fech the assigned Tickects",
                error : myTickets.error
            })
        }
        return res.status(200).send({
            result : myTickets
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            Result : err.message
        })
    }
}