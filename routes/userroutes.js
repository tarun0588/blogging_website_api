const express = require("express");
const router = express.Router();

const userController = require("../controller/usercontroller")
const authMiddleware = require("../middlewares/authmiddleware")

router.post("/signup",userController.signUp)

router.post("/login",userController.logIn)

router.post("/logout",authMiddleware,userController.logout)

module.exports = router