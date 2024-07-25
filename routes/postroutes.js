const express = require("express")

const router = express.Router()
const postController = require("../controller/postcontroller")
const authMiddleware = require("../middlewares/authmiddleware")

router.get("/",authMiddleware,postController.listPost)

router.post("/create",authMiddleware,postController.createPost)

router.get("/getpost/:postId",authMiddleware,postController.singlePost)

router.put("/edit/:postId",authMiddleware,postController.editPost)

router.delete("/delete/:postId",authMiddleware,postController.deletePost)

module.exports = router