const User = require('../models/user.model')
const Ticket = require('../models/ticket.model')
const { updatedTicketCreatedArray, updateAssignedToArray, isValidUser } = require('../services/user.service')
const {sendNotificationMail} = require('../utils/notificationService.connect')
exports.createTicket = async (data, user) => {
    try {

        const validateAssignedTo = data.assignedTo ? await isValidUser(data.assignedTo) : true;

        if (validateAssignedTo.error) {
            return { error: "Assigned To is not a valid user" }
        }
        const newTicket = {
            title: data.title,
            description: data.description,
            status: data.status,
            ticketPriority: data.ticketPriority,
            assignee: user.email,
            assignedTo: data.assignedTo,
            clientName: data.clientName,
            createdBy: user.email,
        }

        const ticket = await Ticket.create(newTicket);

        if (ticket) {
            //store the tickets created in user model
            const createdTicket = await updatedTicketCreatedArray(user.email, ticket._id);
            if (createdTicket.error) {
                return {
                    error: createdTicket.error
                }
            }
            //tickets assinged to a particular user
            if (data.assignedTo) {
                const assignedToInUser = await updateAssignedToArray(data.assignedTo, ticket._id);
                if (assignedToInUser.error) {
                    return {
                        error: assignedToInUser.error
                    }
                }
            }         
            const sendMail = {
                subject: "New Ticket Created : " + ticket.title,
                content: "This is the description of the ticket created : " + ticket.description,
                recipientEmails:[ticket.createdBy,ticket.assignedTo] ,
                requestor: ticket.createdBy,
                ticketId:ticket._id
            } 
           
            sendNotificationMail(sendMail.subject,sendMail.content,sendMail.recipientEmails,sendMail.requestor,sendMail.ticketId)
            return ticket;
        } else {
            return {
                error: "Server error occured"
            }
        }
    }
    catch (err) {
        console.log(err);
        return err.message;
    }

}

exports.getTicketByGivenId = async (idSent) => {
    try {
        const ticket = await Ticket.findOne({ _id: idSent.id });
      
        if (!ticket) {
            return {
                Error: "Ticket not found"
            }
        } else {
            return ticket
        }
    } catch (err) {
        console.log(err);
        return err
    }
}

exports.getAllTicketsSer = async (req, res) => {
    let response ={}
    try {
        let tickets = await Ticket.find();
        if (!tickets || tickets.error) {
          response.error = tickets.error
        } else response.tickets = tickets
        return response
    } catch (err) {
        console.log(err);
        response.error = err
        return response
    }
}

exports.getTicketsbyStatusSer = async (statusSent) => {
    try {
        const tickets = await Ticket.find({ status: statusSent.status })
            return tickets;
    } catch (err) {
        console.log(err);
        return err.message;
    }
}


exports.getTicketsAssignedToUserSer = async (userInfo) => {
    try {
        const tickets = [];
        for (const id of userInfo.ticketsAssigned) {
            let ticket = await Ticket.findOne({ _id: id });
            tickets.push(ticket)
        } return tickets
    } catch (err) {
        return err.message
    }
}


exports.getTicketsCreatedByUserSer = async (userInfo) => {
    try {
        const tickets = [];
        for (const id of userInfo.ticketsCreated) {
            let ticket = await Ticket.findOne({ _id: id });
            tickets.push(ticket)
        } return tickets
    } catch (err) {
        return err.message
    }
}

exports.updateTicketById = async (sentId, updateInfo, userInfo) => {
    try {
        const validateTicket = await this.getTicketByGivenId(sentId)//first check the ticket id is valid
        if (!validateTicket || validateTicket.error) {
            return {
                error: "Ticket Id is invalid",
            }
        }
        if (updateInfo.assignee && updateInfo.assignee != userInfo.email) {
          
            return {
                error: "Invalid assignee"
            }
        }
        if (updateInfo.assignedTo && await isValidUser(updateInfo.assignedTo)) { //make user as asingnee
            updateInfo.assignee = userInfo.email
        } else {
            return {
                error: "Invalid assigned to email"
            }
        }

        //remove the id from previous assigned to

        await User.findOneAndUpdate({ email: validateTicket.assignedTo },
            {
                $pull: {
                    ticketsAssigned: validateTicket._id, //here the id will be exact match sa we stored
                }
            })

            await User.findOneAndUpdate({ email: updateInfo.assignedTo }, { //update user for assigned to
                $push: {
                    ticketsAssigned: validateTicket._id
                }
            })
        const response = await Ticket.findOneAndUpdate({
            _id: sentId.id
        }, updateInfo, { new: true } //new true returns updated doc
        )
        const sendMail = {
            subject: "New Ticket Created : " + response.title,
            content: "This is the description of the ticket created : " + response.description,
            recipientEmails:[response.createdBy,response.assignedTo] ,
            requestor: response.createdBy,
            ticketId:response._id
        } 
      
        sendNotificationMail(sendMail.subject,sendMail.content,sendMail.recipientEmails,sendMail.requestor,sendMail.ticketId)
        return response
    }
    catch (err) {
        return err.message
    }
}

exports.updateTicket= async (sentId, updateInfo, userInfo) => {
    try {
        const validateTicket = await this.getTicketByGivenId(sentId)//first check the ticket id is valid
        if (!validateTicket || validateTicket.error) {
            return {
                error: "Ticket Id is invalid",
            }
        }
        if (updateInfo.assignee && updateInfo.assignee != userInfo.email) {
          
            return {
                error: "Invalid assignee"
            }
        }
        if (updateInfo.assignedTo && updateInfo.assignedTo != validateTicket.assignedTo  ) {
            if(await isValidUser(updateInfo.assignedTo)){
                updateInfo.assignee = userInfo.email
            } //make user as asingnee
            else {
                return {
                    error: "Assigned to invalid email"
                }
           
        } 
        }

        //remove the id from previous assigned to

        await User.findOneAndUpdate({ email: validateTicket.assignedTo },
            {
                $pull: {
                    ticketsAssigned: validateTicket._id, //here the id will be exact match sa we stored
                }
            })

            await User.findOneAndUpdate({ email: updateInfo.assignedTo }, { //update user for assigned to
                $push: {
                    ticketsAssigned: validateTicket._id
                }
            })
        const response = await Ticket.findOneAndUpdate({
            _id: sentId.id
        }, updateInfo, { new: true } //new true returns updated doc
        )
        const sendMail = {
            subject: "New Ticket Created : " + response.title,
            content: "This is the description of the ticket created : " + response.description,
            recipientEmails:[response.createdBy,response.assignedTo] ,
            requestor: response.createdBy,
            ticketId:response._id
        } 
      
        sendNotificationMail(sendMail.subject,sendMail.content,sendMail.recipientEmails,sendMail.requestor,sendMail.ticketId)
        return response
    }
    catch (err) {
        return err.message
    }
}

exports.getAllMyAssignedTicketSer = async (data)=>{  
try {
    const user = await User.find({_id:data.id})
    if(!user) return {error : "Invalid User"}
    else {
        let myTickets = []
        for(const id of data.ticketsAssigned){
            let ticket = await Ticket.find({_id:id})
            myTickets.push(ticket[0])
        }
        return myTickets
    }
} catch (error) {
    console.log(error)
    return {error : error}
}}

exports.getAllMyCreatedTicketSer = async (data)=>{  
    try {
        const user = await User.find({_id:data.id})
        if(!user) return {error : "Invalid User"}
        else {
            let myTickets = []
            for(const id of data.ticketsCreated){
                let ticket = await Ticket.find({_id:id})
                myTickets.push(ticket[0])
            }
            return myTickets
        }
    } catch (error) {
        console.log(error)
        return {error : error}
    }}
