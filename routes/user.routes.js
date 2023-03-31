
const {allUsers} = require('../controllers/user.controller')
const {isAuthenticated} = require('../middleware/authmiddleware')

const routes = (app) =>{
    app.get("/crmapp/api/v1/getallusers", isAuthenticated, allUsers)
}
module.exports = routes;

