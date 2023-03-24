const mongoose = require("mongoose");

const mongoDBURL = ' mongodb://127.0.0.1:27017/CRM-APP-DB';
mongoose.connect(mongoDBURL).then(
    ()=>{console.log("Connected to Mongo DB Successfully")},
    err => {console.log("Error Occured:", RangeError)}
)