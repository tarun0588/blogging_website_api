const express = require("express");

const commentController = require("../controller/commentcontroller")

const authmiddleware = require("../middlewares/authmiddleware")

const router = express.Router()

router.post("/create",authmiddleware,commentController.createComment)

router.post("/update",authmiddleware,commentController.updateComment)

router.post("/delete",authmiddleware,commentController.deleteComment)

module.export = router