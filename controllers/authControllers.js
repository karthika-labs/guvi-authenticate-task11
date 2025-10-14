const express = require('express')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Authenticate = require('../models/Authenticate')

//register
const registerUser = async (req, res) => {
  try {
    const existingUser = await Authenticate.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json({ message: "This email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = await Authenticate.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });

    res.status(201).json({ success: true, message: "User registered successfully" });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}


//login
const login = async (req, res) => {
    try {
      

        const user = await Authenticate.findOne({ email: req.body.email })

        if (!user) {
            return res.status(400).json("wrong email or password")
        }

        const isMatch=await bcrypt.compare(req.body.password,user.password)

        if (!isMatch) {
            return res.status(400).json("wrong email or password")
        }

        const token=jwt.sign({_id:user._id},process.env.jwt_secret,{expiresIn:'1d'})
       
        res.json(token)
    }
    catch (err) {
        res.json({ success: false, message: err.message })
    }
}

//get user data
const getData=async(req,res)=>{
    try{
       
const user=await Authenticate.findOne({_id:req.user._id},{password:0})
res.json(user)
    }
    catch(err){
        res.json({ success: false, message: err.message })
    }
}
module.exports = { registerUser, login, getData };