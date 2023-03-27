const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const PORT = require("./config/server.config")
const mongoDBURL = require('./config/db.config')
app.use(bodyParser.json());

const authRoutes = require('./routes/auth.routes')
authRoutes(app);


app.listen(PORT, ()=>{
    console.log("Server Listening To The Port : ",PORT);
    // console.log(mongoDBURL)
    mongoose.connect(mongoDBURL).then(
        ()=>{console.log("Connected to Mongo DB Successfully")},
        err => {console.log("Error Occured:", RangeError)}
    )
})





