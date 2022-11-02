const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const crypto = require("crypto");

const ReplySchema = new mongoose.Schema({
    CommentId:{
        type: ObjectId, 
        ref: "comment",
        required : true
     },  
     UserId:{
        type: ObjectId, 
        ref: "user",
        required : true
      },
     Review:{
         type: String,
         trim:true,
         required:true
     },
     like:{
         type: Number,
         default : 0
     },
}, {timestamps: true })


const reply = mongoose.model("reply",ReplySchema);
module.exports = reply;