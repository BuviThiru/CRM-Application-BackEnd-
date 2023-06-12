const {createTicket,getTicketById,getAllTickets,getTicketsbyStatus,getTicketsAssignedToUser,getTicketsCreatedByUser,getAllMyCreatedTickets, updateTicketById,updateTicket,getAllMyAssignedTickets} = require('../controllers/tickets.controller');
const {isAuthenticated, isAdmin,isAdminOrEngineer} = require('../middleware/authmiddleware');


const routes = (app)=>{
  app.post("/crmapp/api/v1/tickets/createticket", isAuthenticated , createTicket);
  app.get("/crmapp/api/v1/tickets/getticket/:id", isAuthenticated , getTicketById);
  app.get("/crmapp/api/v1/tickets/gettickets", isAuthenticated , getAllTickets)
  app.get("/crmapp/api/v1/tickets/getticketsByStatus/:status", isAuthenticated ,isAdminOrEngineer, getTicketsbyStatus);
  app.get("/crmapp/api/v1/tickets/getticketsAssigned", isAuthenticated, getTicketsAssignedToUser)
  app.get("/crmapp/api/v1/tickets/getticketsCreated", isAuthenticated, getTicketsCreatedByUser);
  app.patch("/crmapp/api/v1/tickets/updateTicketById/:id", isAuthenticated, updateTicketById);
  app.patch("/crmapp/api/v1/tickets/updateTicket/:id", isAuthenticated,isAdminOrEngineer, updateTicket);
  app.get("/crmapp/api/v1/tickets/getMyAssignedtickets",isAuthenticated,getAllMyAssignedTickets); 
  app.get("/crmapp/api/v1/tickets/getMyCreatedtickets",isAuthenticated,getAllMyCreatedTickets); 


}
 
module.exports = routes;