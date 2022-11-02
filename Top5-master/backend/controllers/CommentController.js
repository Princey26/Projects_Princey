const comment = require("../models/Comment.js");

exports.newComment = (req, res) => {

    const Comment = new comment({
        BookId: req.body.BookId,
        UserId: req.body.UserId,
        Rating: req.body.Rating,
        Review: req.body.Review,
        Category : req.body.Category
    })

    Comment.save().then((new_user, err) => {
        
        if (err) {
            return res.status(500).json({ error: "Server Error" })
        }

        res.status(200).json({ message: "Comment save successfully" })
    })
        .catch(err => {
            res.status(400).json({ message: "save Error, Please Try Again", err })
        })
}

exports.fetchComment = (req, res) => {
    comment.find()
        .then(fetchedComment => res.json(fetchedComment))
        .catch(err => console.log(err))
}
exports.fetchSingleComment = (req, res) => {
    comment.findById({ _id: req.params.id })
        .then(fetchedProduct => res.json(fetchedProduct))
        .catch(err => console.log(err))
}


exports.fechuserComment = (req , res ) =>{
    let id = req.params.id;
    // console.log(id);
    comment.find({UserId : id})
    .then(fetcharr  =>{
        // console.log(fetcharr);
        res.json(fetcharr)
    } )
    .catch(err =>{
        console.log(err);
        res.status(400).json({ message: "no massage error ", err })
    })
}

exports.fechCommentBook = (req , res ) =>{
    let id = req.params.id;
    // console.log(id);
    comment.find({BookId : id})
    .populate('UserId' , 'username image')
    .then(fetcharr  =>{
        // console.log(fetcharr);
        res.json(fetcharr)
    } )
    .catch(err =>{
        console.log(err);
        res.status(400).json({ message: "no massage error ", err })
    })
}

exports.updateComment = (req, res) => {
    comment.findById(req.params.id, (err, foundComment) => {
        if (err)
            return res.json({ message: "Error in Fecching Categary, please try again." });
        if (!foundComment)
            return res.json({ message: "Categary Doesn't exist, please register." });
        updatedCo = {
            BookId: req.body.BookId,
            UserId: req.body.UserId,
            Rating: req.body.Rating,
            Review: req.body.Review
        }
        // console.log(req.body)
        // console.log(req.body.BookId)
        comment.findByIdAndUpdate(req.params.id, updatedCo, {
            new: true,
            useFindAndModify: false
        }).then((new_user, err) => {
            // console.log(new_user)
            if (err) {
                return res.status(500).json({ error: "Server Error" })
            }

            res.status(200).json({ message: "SuccesFully Updated" })
        })
            .catch(err => {
                res.status(400).json({ message: "Updation Error, Please Try Again", err })
            })
    })
}

exports.deleteComment = (req, res) => {
    comment.findById(req.params.id, (err, foundProduct) => {
        if (err)
            return res.json({ message: "Error in Fecching Categary, please try again." });
        if (!foundProduct)
            return res.json({ message: "Product Doesn't exist, please register." });
        // updatedDelete = {
        //     Categay : req.body.Categary
        // }
        comment.findByIdAndDelete(req.params.id
            // new : true, 
            // useFindAndModify : false 
        ).then((new_user, err) => {
            if (err) {
                return res.status(500).json({ error: "Server Error" })
            }

            res.status(200).json({ message: "SuccesFully Deleted" })
        })
            .catch(err => {
                res.status(400).json({ message: "Deletion Error, Please Try Again", err })
            })
    })
}

// exports.productFilter = (req,res) => {
//     let {category,price} = req.body.filters;
//     let Args = {};
//     if(category.length !== 0){
//         Args["categary"] = category;
//     }
//     for(let key in price){
//         Args["Prize"] = {$gte:price[key][0],$lte:price[key][1]}
//     }
//     if((!("categary" in Args)) && (!("Prize" in Args))){
//         product.find({})
//         .exec((err,data)=>{
//             if(err){
//                 return res.status(400).json({error:"Products not Found"});
//             }
//             return res.json(data);
//         });
//     }else{
//         product.find(Args)
//             .exec((err,data)=>{
//                 if(err){
//                     return res.status(400).json({error:"Products not Found"});
//                 }
//                 return res.json(data);
//                 });
//     }
// }

// exports.productSearch = (req,res) => {
//     // console.log(req.body)
//     let Id = req.body.Id;
//     let Args = [];
//     if(Id.length !== 0){
//         Id = Id.replace("_" , " ");
//         console.log(Id)
//         Args.push({"categary" : Id})
//         Args.push({"ProductName" : {$regex: Id , $options: "$i"}});
//     }

//     if(Args.length === 0){
//         return res.status(400).json({error:"Products not Found"});
//         product.find({})
//         .exec((err,data)=>{
//             if(err){
//                 return res.status(400).json({error:"Products not Found"});
//             }
//             return res.json(data);
//         });
//     }else{
//         product.find({$or : Args})
//             .exec((err,data)=>{
//                 if(err){
//                     return res.status(400).json({error:"Products not Found"});
//                 }
//                 return res.json(data);
//                 });
//     }
// }


// exports.RelatedSearch = (req,res) => {
//     // console.log(req.body)
//     let identity = req.params.id;
//     let {Id , ID} = req.body;
//     let Args = {};
//     // console.log(Id)
//     // console.log(ID)
//     if(Id.length !== 0){
//         Args["categary"] = Id;
//     }
//     Args["_id"] = {$ne:ID} ;
//     if((!("categary" in Args))){
//         return res.status(400).json({error:"Products not Found"});
//         product.find({})
//         .exec((err,data)=>{
//             if(err){
//                 return res.status(400).json({error:"Products not Found"});
//             }
//             return res.json(data);
//         });
//     }else{
//         product.find(Args)
//         // product.find(Args)
//             .exec((err,data)=>{
//                 if(err){
//                     return res.status(400).json({error:"Products not Found"});
//                 }
//                 return res.json(data);
//                 });
//     }
// }