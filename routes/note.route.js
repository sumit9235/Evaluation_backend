const express=require("express")
const noteRouter=express.Router()
const {NoteModel}=require("../model/note.model")
//get routes
noteRouter.get("",async(req,res)=>{
    const data=await NoteModel.find()
    res.status(200).send(data)
})

//add
noteRouter.post("/add",async(req,res)=>{
    const payload=(req.body)
    try{
        const note=new NoteModel(payload)
        await note.save()
        res.status(200).send({"msg":"Sucessfully added post"})
    }catch(err){
        res.status(400).send({"msg":"Bad request","err":err.message})
    }
})

//delete a post

noteRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    try{
        await NoteModel.findByIdAndDelete({_id:id})
        res.status(200).send({"msg":`Post with id:${id} has been deleated`})
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})
//updating
noteRouter.patch("/update/:id",async(req,res)=>{
    const id=req.params.id
    const data=req.body
    try{
        await NoteModel.findByIdAndUpdate({_id:id},data)
        res.status(200).send({"msg":`Post with id:${id} has been Updated`})
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})
//top post
noteRouter.get("/top",async(req,res)=>{
    try{
       const data=await NoteModel.aggregate([{$sort:{no_of_comments:1}}])
       res.send(data)
        // res.status(200).send({"msg":`Post with id:${id} has been Updated`})
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

module.exports={noteRouter}
