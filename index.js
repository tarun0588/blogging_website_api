const express = require("express")
const mogoose = require("mongoose")
const dotenv = require("dotenv")

const userRoutes = require("./routes/userroutes")
const postRoutes = require("./routes/postroutes")
const commentRoutes = require("./routes/commentroute")

const app = express();


//dotenv configuration
dotenv.config();

app.use(express.json())

//DB Connection
mogoose.connect(process.env.DATABASE_URI)
.then(() => console.log("Database connected successfully"))
.catch((err) => console.log(err))

//Api routes
app.use("/auth", userRoutes)
app.use("/posts", postRoutes)
app.use("/comments", commentRoutes)


app.listen("6000",()=>{
    console.log("server is running on port 6000")
})