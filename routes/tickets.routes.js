const {createTicket,getTicketById,getAllTickets,getTicketsbyStatus,getTicketsAssignedToUser,getTicketsCreatedByUser} = require('../controllers/tickets.controller');
const {isAuthenticated, isAdmin} = require('../middleware/authmiddleware')

const routes = (app)=>{
  app.post("/crmapp/api/v1/tickets/createticket", isAuthenticated , createTicket);
  app.get("/crmapp/api/v1/tickets/getticket/:id", isAuthenticated , getTicketById);
  app.get("/crmapp/api/v1/tickets/gettickets", isAuthenticated ,isAdmin, getAllTickets)
  app.get("/crmapp/api/v1/tickets/getticketsByStatus/:status", isAuthenticated ,isAdmin, getTicketsbyStatus);
  app.get("/crmapp/api/v1/tickets/getticketsAssigned", isAuthenticated, getTicketsAssignedToUser)
  app.get("/crmapp/api/v1/tickets/getticketsCreated", isAuthenticated, getTicketsCreatedByUser)
}
 
module.exports = routes;