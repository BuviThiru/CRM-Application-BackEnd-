const mongoose = require("mongoose") ;
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");

const userSchema= new Schema({
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minLength:8,
        maxLength:200,
        match:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,50}$/,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowerCase:true,
        match:/\S+@\S+\.\S+/

    },
    createdAt:{
        type:Date,
        default:Date.now, //no need of calling..as default will call the function mapped to it
        immutable:true,
    },
    updatedAt:{
        type:Date,
        default:Date.now,
    },
    userType:{
        type:String,
        required:true,
        default: "Customer",
        enum: ["Customer","Engineer","Admin"] 
    },
    userStatus:{
        type:String,
        required:true,
        default: "approved"
    },
    ticketsCreated:{
        type :[mongoose.Types.ObjectId],
        ref: "Ticket"
    },
    ticketsAssigned:{
        type :[mongoose.Types.ObjectId],
        ref: "Ticket"
    },

}) ;

userSchema.pre('save',function(next){
    let hashedPassword = bcrypt.hashSync(this.password,5);
    this.password = hashedPassword;
    next();
})
const userModel = mongoose.model("User",userSchema)
module.exports = userModel;