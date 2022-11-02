const reply = require("../models/Reply.js");

exports.newReply = (req, res) => {
    // console.log(req.body.UserId)
    // console.log(req.body.Review)
    const Reply = new reply({
        CommentId: req.body.CommentId,
        UserId: req.body.userId,
        Review: req.body.Review
    })

    Reply.save().then((new_user, err) => {
        // console.log(new_user)
        if (err) {
            return res.status(500).json({ error: "Server Error" })
        }

        res.status(200).json({ message: "Comment save successfully" })
    })
        .catch(err => {
            res.status(400).json({ message: "save Error, Please Try Again", err })
        })
}

exports.fetchReply = (req, res) => {
    reply.find()
        .then(fetchedComment => res.json(fetchedComment))
        .catch(err => console.log(err))
}
exports.fetchSingleReply = (req, res) => {
    reply.findById({ _id: req.params.id })
        .then(fetchedProduct => res.json(fetchedProduct))
        .catch(err => console.log(err))
}


exports.fechuserReply = (req , res ) =>{
    let id = req.params.id;
    // console.log(id);
    reply.find({UserId : id})
    .then(fetcharr  =>{
        // console.log(fetcharr);
        res.json(fetcharr)
    } )
    .catch(err =>{
        console.log(err);
        res.status(400).json({ message: "no massage error ", err })
    })
}

exports.fechReplyBook = (req , res ) =>{
    let id = req.params.id;
    // console.log(id);
    reply.find({CommentId : id})
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


exports.deleteReply = (req, res) => {
    reply.findById(req.params.id, (err, foundProduct) => {
        if (err)
            return res.json({ message: "Error in Fecching Categary, please try again." });
        if (!foundProduct)
            return res.json({ message: "Product Doesn't exist, please register." });
        // updatedDelete = {
        //     Categay : req.body.Categary
        // }
        reply.findByIdAndDelete(req.params.id
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