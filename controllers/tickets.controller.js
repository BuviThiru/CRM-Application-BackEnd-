const { createTicket, getTicketByGivenId, getAllTicketsSer, getTicketsbyStatusSer } = require('../services/tickets.services');


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
                Message: tickets,
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