const mongoose=require("mongoose")
const noteSchema=mongoose.Schema({
    title:String,
    body:String,
    device:String,
    no_of_comments:Number,
    user:String
},{
    versionKey:false
})
const NoteModel=mongoose.model("post",noteSchema)

module.exports={NoteModel}