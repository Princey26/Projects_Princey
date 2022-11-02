const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/UserController");
const {check} = require('express-validator');
const {auth} = require("./../middlewares/auth");
const user_validator = require("../middlewares/validation/userValidation");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}


let upload = multer({ storage, fileFilter });


// const Password = require("../Reset/password");
// const { route } = require("./product");
// @route POST api/signup
// send user data For signup
// @access public
router.post("/signup",user_validator.validateNewUser,user_controller.createNewUser);

// @route POST api/login    
// send user data for login
// @access Public  
router.post("/login",user_validator.loginUser,user_controller.login);
// @route GET api/user
// @desc get user data
// @access private
router.get("/user",auth,user_controller.fetchUser);
// @route GET api/Admin
// @desc get user data
// @access private
router.get("/Admin",auth,user_controller.fetchUser);
// @route POST api/update_user
// @access private
router.put("/update_user",
auth,
user_controller.userUpdate
)

router.patch("/update_image" , upload.single('photo') ,
auth,
user_controller.picUpdate
)

router.patch("/update" ,
auth , 
user_controller.HistoryUpdate
)

module.exports = router;
