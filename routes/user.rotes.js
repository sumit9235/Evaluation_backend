const express=require("express")
const userRouter=express.Router()
const {UserModel}=require("../model/user.model")
const cors=require("cors")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

userRouter.post("/register",async(req,res)=>{
    const{name,email,gender,password,age,city,is_married}=req.body
    try{
        bcrypt.hash(password,4,async(err,hash)=>{
            if(err){
                res.send({"msg":err.message})
            }else{
                const user=new UserModel({name,email,gender,password:hash,age,city,is_married})
                await user.save()
                res.status(200).send({"msg":"New user has been registered"})
            }
        })
    }catch(err){
        res.status(400).send({"msg":"Something went wrong","error":err.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=(req.body)
    try{
        const user=await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                    let token=jwt.sign({userID:user[0]._id},"masai")
                    res.status(200).send({"msg":"Login Sucessfull","token":token})
                }else{
                    res.status(400).send({"msg":"Wrong Credentials"})
                }
            })
        }else{
            res.status(400).send({"msg":"Wrong Credentials"})
        }
    }catch(err){
        res.status(400).send({"msg":"SOmething went wrong","error":err.message})
    }
})

module.exports={userRouter}