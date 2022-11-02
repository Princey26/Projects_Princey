const mongoose = require("mongoose");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        trim:true,
        required:true,
        unique:true,
     },  
     password:{
        type:String,
        required:true,
        trim:true
      },
     firstName:{
         type:String,
         trim:true
     },
     lastName:{
         type: String,
         trim:true
     },
     email:{
         type:String,
         required:true,
         unique:true,
         trim:true
     } ,
     image:{
        type : String,
        default : "",
     },
     AboutMe: {
         type : String,
         default : "Please tell people about yourself"
     },
     category : {
        type : Array,
        required: true
     },
     gender:{type:String},
     isAdmin:{type:Boolean},
     isCustomer:{type:Boolean},
     isRestricted:{type:Boolean},
     resetToken:{type:String,default:""},
     expireToken:"",
     history:{
         type:Array,
         default:[]
     }
});


const user = mongoose.model("user",UserSchema);
module.exports = user;