 const {signUp,signIn} = require("../controllers/auth.controller")

const routes = (app)=>{
    app.post('/crmapp/api/v1/auth/signup',signUp)
    app.post('/crmapp/api/v1/auth/signin',signIn)
}

module.exports = routes;