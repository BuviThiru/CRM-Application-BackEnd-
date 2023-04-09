const User = require('../models/user.model')
const Ticket = require('../models/ticket.model')
const { updatedTicketCreatedArray, updateAssignedToArray, isValidUser } = require('../services/user.service')

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
        console.log(">>>>>>>>>>>>>>>>>>>>TICKET", ticket)
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
    try {
        let tickets = await Ticket.find();
        if (!tickets || tickets.error) {
            return {
                Error: tickets.error,
            }
        } else return tickets
    } catch (err) {
        console.log(err);
        return err
    }
}

exports.getTicketsbyStatusSer = async (statusSent) => {
    try {
        const tickets = await Ticket.find({ status: statusSent.status })
        // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Ser tickets",tickets)
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