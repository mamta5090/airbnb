const express=require('express');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User=require('../models/User')

const router=express.Router();

router.post('/register',async(req,res)=>{
    const {name,email,password,isHost}=req.body;
    try{
        let user=await User.findOne({email});
        if(user){
            return res.status(400).json({message:'user is already registered'})
        }
        const hashedPassword=await bcrypt.hash(password,10);
        user=new User({
            name,
            email,
            password:hashedPassword,
            isHost
        })
        await user.save();
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET || 'your_jwt_secret',id);
        res.json({
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                isHost:user.isHost
            }
        })
    }catch(err){
        res.status(500).json({message:'Server error'})
    }
})

//login route

router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:'Invalid credentials'})
        }
        const isMatch=awaitbcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:'Invalid credentials'})
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET || your_jwt_secret, {expiresIn: '1d'});
        res.json({
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                isHost:user.isHost
            }
        })
    }catch(err){
        res.status(500).json({message:'Server error'})
    }
})