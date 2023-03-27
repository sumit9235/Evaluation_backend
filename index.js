const express=require("express")
require("dotenv").config()
const{connection}=require("./db")
const {authenticate}=require("./middlewares/authenticate")
const {userRouter}=require("./routes/user.rotes")
const {noteRouter}=require("./routes/note.route")
const app=express()
const cors=require("cors")
app.use(express.json())
app.use(cors())
app.use("/users",userRouter)
app.use(authenticate)
app.use("/posts",noteRouter)

app.get("/",(req,res)=>{
    res.send("HOME PAGE")
})
app.listen(process.env.PORT,async()=>{
    try{
        await connection
        console.log("Connected to db")
    }catch(err){
        console.log(err.message)
    }
    console.log("Server is running on port 4500")
})