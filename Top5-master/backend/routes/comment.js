const express = require("express");
const { model } = require("mongoose");
const router = express.Router();
const comment_control = require("../controllers/CommentController");


router.get("/comment" , comment_control.fetchComment);

router.get('/comment/:id',comment_control.fechuserComment);
router.get('/comment_book/:id' , comment_control.fechCommentBook)
router.post("/comment" ,comment_control.newComment);

router.put('/comment/:id' , comment_control.updateComment)

router.delete('/comment/:id' , comment_control.deleteComment)

// router.post('/product/by/search' , product_control.productFilter)

// router.post('/product/by/searchCard' , product_control.productSearch)

// router.post('/product/by/RelatedSearch/:id' , product_control.RelatedSearch)
module.exports = router;