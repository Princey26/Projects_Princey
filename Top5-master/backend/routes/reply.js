const express = require("express");
const { model } = require("mongoose");
const router = express.Router();
const reply_control = require("../controllers/ReplyController");

router.get("/reply" , reply_control.fetchReply);

router.get('/reply/:id',reply_control.fechuserReply);
router.get('/reply_comment/:id' , reply_control.fechReplyBook)
router.post("/reply" ,reply_control.newReply);


router.delete('/reply/:id' , reply_control.deleteReply)

// router.post('/product/by/search' , product_control.productFilter)

// router.post('/product/by/searchCard' , product_control.productSearch)

// router.post('/product/by/RelatedSearch/:id' , product_control.RelatedSearch)
module.exports = router;