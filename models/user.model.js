const mongoose = require("mongoose") ;
const { Schema } = mongoose;

const userShema = new Schema({
    name:{
        type:String,
        required:true,

    },
    password:{
        type:String,
        required:true,
        minLength:8,
        maxLength:200,
        match:"^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,50}$",

    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowerCase:true,
        match:" /\S+@\S+\.\S+/"

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

    },
    userStatus:{

    }
}) 