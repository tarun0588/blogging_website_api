const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
       type:String,
       required:true,
    },
    comments: {
      type: [
        {
          userId: {
            type: mongoose.Types.ObjectId,
            required:true,

          },
          comment: {
            type: String,
          },
        },
      ],
      default: [],
    },
})

const postModel = mongoose.model("post",postSchema)
module.exports = postModel;