const express = require("express");
const {handleUserSignUp , handleUserSignIn} = require("./../controllers/user.controller")
const router = express.Router();

router.post("/register"  , handleUserSignUp);
router.post("/login" , handleUserSignIn )
module.exports =  router;