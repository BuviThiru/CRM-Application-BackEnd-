const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const PORT = require("./config/server.config");
const mongoDBURL = require('./config/db.config');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-access-token');
  next();
});



const authRoutes = require('./routes/auth.routes');
authRoutes(app);
const userRoutes = require('./routes/user.routes');
userRoutes(app);
const ticketRoutes = require('./routes/tickets.routes');
ticketRoutes(app)


app.listen(PORT, ()=>{
    console.log("Server Listening To The Port : ",PORT);
    console.log(mongoDBURL.mongoDBURL)
    // console.log(mongoDBURL)
    mongoose.connect(mongoDBURL.mongoDBURL)
})





