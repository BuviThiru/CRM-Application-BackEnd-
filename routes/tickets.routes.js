const {createTicket,getTicketById,getAllTickets,getTicketsbyStatus,getTicketsAssignedToUser,getTicketsCreatedByUser, updateTicketById,updateTicket} = require('../controllers/tickets.controller');
const {isAuthenticated, isAdmin,isAdminOrEngineer} = require('../middleware/authmiddleware');


const routes = (app)=>{
  app.post("/crmapp/api/v1/tickets/createticket", isAuthenticated , createTicket);
  app.get("/crmapp/api/v1/tickets/getticket/:id", isAuthenticated , getTicketById);
  app.get("/crmapp/api/v1/tickets/gettickets", isAuthenticated ,isAdminOrEngineer, getAllTickets)
  app.get("/crmapp/api/v1/tickets/getticketsByStatus/:status", isAuthenticated ,isAdminOrEngineer, getTicketsbyStatus);
  app.get("/crmapp/api/v1/tickets/getticketsAssigned", isAuthenticated, getTicketsAssignedToUser)
  app.get("/crmapp/api/v1/tickets/getticketsCreated", isAuthenticated, getTicketsCreatedByUser);
  app.patch("/crmapp/api/v1/tickets/updateTicketById/:id", isAuthenticated, updateTicketById);
  app.patch("/crmapp/api/v1/tickets/updateTicket/:id", isAuthenticated,isAdminOrEngineer, updateTicket);
}
 
module.exports = routes;