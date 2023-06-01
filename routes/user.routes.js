
const {allUsers} = require('../controllers/user.controller')
const {isAuthenticated, isAdmin,isAdminOrEngineer} = require('../middleware/authmiddleware');
const {getUserByEmail,getUserById,updateUserType,updateUser} = require('../controllers/user.controller');


const routes = (app) =>{
    app.get("/crmapp/api/v1/getallusers", isAuthenticated, isAdmin, allUsers);
    app.get("/crmapp/api/v1/getUserByEmail/:email", isAuthenticated, isAdmin, getUserByEmail);
    app.get("/crmapp/api/v1/getUserById/:id", isAuthenticated, isAdmin, getUserById);
    app.patch("/crmapp/api/v1/user/updateUserType",isAuthenticated,isAdmin,updateUserType)
    app.patch("/crmapp/api/v1/user/updateUser",isAuthenticated,isAdmin,updateUser)
 
}
module.exports = routes;

