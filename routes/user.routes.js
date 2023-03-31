
const {allUsers} = require('../controllers/user.controller')
const {isAuthenticated, isAdmin} = require('../middleware/authmiddleware');
const {getUserByEmail,getUserById} = require('../controllers/user.controller');


const routes = (app) =>{
    app.get("/crmapp/api/v1/getallusers", isAuthenticated, isAdmin, allUsers);
    app.get("/crmapp/api/v1/getUserByEmail/:email", isAuthenticated, isAdmin, getUserByEmail);
    app.get("/crmapp/api/v1/getUserById/:id", isAuthenticated, isAdmin, getUserById);

}
module.exports = routes;

