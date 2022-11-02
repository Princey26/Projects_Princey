const mongoose = require("mongoose");

const OTP = new mongoose.Schema({
    email: String,
    code : String,
    expireIn:Number
}, {timestamps: true })


const Otp = mongoose.model("otp",OTP);
module.exports = Otp;