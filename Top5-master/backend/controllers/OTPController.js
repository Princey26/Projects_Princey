require("dotenv").config();
const Otp = require("../models/otp.js");
const nodemailer = require('nodemailer');
const user = require("../models/user");
const bcrypt = require('bcrypt')

exports.SendPassword = async (req, res ) =>{
    
    let data = await user.findOne({email : req.body.email});
    const responseType = {};
    if(data){
        let otpcode = Math.floor((Math.random() * 10000) + 1)
        let otpData = new Otp({
            email:req.body.email,
            code:otpcode,
            expireIn: new Date().getTime() + 300*1000
        })
        let otpResponse = await otpData.save();
        res.status(200).json({ message: "Please See you Email" })
        Mailer(req.body.email , otpcode);
    }else{
        return res.status(500).json({ error: "Email Id not Found" })
    }
    // console.log(responseType)
}

exports.ChangePassword = async (req , res) =>{ 
    let data = await  Otp.find({email:req.body.email , code:req.body.otpCode})
    const response = {};
    if(data){
        let currenTime = new Date().getTime();
        let diff = data.expireIn - currenTime;
        if(diff < 0){
            return res.status(500).json({ error: "Token Expire" })
        }
        else{
            let User = await user.findOne({email:req.body.email})
            if(User){
                User.password = req.body.password;
                bcrypt.genSalt(12, (err, salt) => {
                    if (err) throw err;
            
                    bcrypt.hash(User.password, salt, (err, hashedPassword) => {
                        if (err) throw err;
            
                        User.password = hashedPassword;
                        User.save().then((new_user, err) => {
                            // console.log(err);
                            if (err) {
                                return res.status(500).json({ error: "Server Error" })
                            }
                            res.status(200).json({ message: "Password Changed Successfully" })
                        })
                            .catch(err => {
                                console.log(err);
                                res.status(400).json({ message: "Updatetion Error, Please Try Again", err })
                            })
                    })
                })
            }else{
                return res.status(500).json({ error: "Internal Error" })
            }
            
        }
    }else{
        return res.status(500).json({ error: "Server Error" })
    }
    
}

const Mailer = (email, otp)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure : false,
        auth : {
            'user' : process.env.USER,
            'pass' : process.env.PASSWORD
        }
    })
    const mailOptions = {
        from : 'nannu9269@gmail.com',
        to : email,
        subject: 'Please Check the otp',
        text : `<p>You are given with is otp ${otp}</p> you have 5 minutes to submit it.`
    }

    transporter.sendMail(mailOptions , (error ,info)=>{
        if(error){
            console.log("something is wrong");
        }else{
            console.log('Email sent:' + info.response)
        }
    })
}