const { Router } = require("express");
const express = require("express");
const { model } = require("mongoose");
const router = express.Router() ;
const reply_control = require("../controllers/OTPController");


router.post('/email-send' , reply_control.SendPassword);

router.post('/change-password' , reply_control.ChangePassword);

module.exports = router;
