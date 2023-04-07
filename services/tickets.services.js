 const User = require('../models/user.model')
 const Ticket = require('../models/ticket.model')

exports.createTicket = async(data,user)=>{
    const validateAssignedTo = data.assignedTo ? await isValidUser(data.email):true;
    if(validateAssignedTo.error){
        return {error : "Assigned To is not a valid user"}
    }
    const newTicket = {
            title: data.title,
            description: data.description,
            status: data.status,
            ticketPriority: data.ticketPriority,
            assignee:userData.email,
            assignedTo:data.assignedTo,
            clientName:data.clientName,
            createdBy: userData.email, 
    }

    const ticket = await Ticket.create(newTicket);
    

}