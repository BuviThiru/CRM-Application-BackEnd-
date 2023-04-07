const {createTicket} = require('../controllers/tickets.controller');
const {isAuthenticated} = require('../middleware/authmiddleware')

const routes = (app)=>{
  app.post("/crmapp/api/v1/tickets/createticket", isAuthenticated , createTicket)
}
 
module.exports = routes;