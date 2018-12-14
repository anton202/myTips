const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Mytips = require('../models/myTips');
const jwt = require('jsonwebtoken');
const auth = require('../midleware/check-auth');

router.post("/signUp",(req,res)=>{
    bcrypt.hash(req.body.password,10)
    .then(hash => {
       const user = new User({
            userName: req.body.userName,
            password: hash
        });
        user.save()
        .then(()=>{
            res.status(201).json({message:'account created'});
            console.log(user);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
    })
})


router.post('/login',(req,res)=>{
    User.findOne({userName:req.body.userName},(err,user)=>{
        if(err){
            console.log(err);
            return res.status(401).json({message:'somthing went wrong, try again'});
        }
        if(!user){
          return res.status(401).json({message:'user dose not exist'});
        }

        bcrypt.compare(req.body.password,user.password)
        .then(result =>{
            if(!result){
                return res.status(401).json({message:'password dont match'});
            }
            const token = jwt.sign({userName:req.body.userName,id:user._id},'thisisaverystrongsecrete');
            res.status(200).json({token:token})
        })
        .catch(error => res.status(401).json({message:'somthing went wrong, try again'}));
    })
})

router.get('/isTokenValid',auth,(req,res)=>{
    User.find({userName:req.body.userName})
    .then(user =>{
        console.log(user)
        if(user.length === 0){
        return res.status(400).json({message:'user dose not exist'})
        }
        res.status(200).json({message:'token is valid'});
    })
    .catch(error => {
        res.status(400).json({message:'user dose not exist'})
    })
    
})


router.get('/getNames',auth,(req,res)=>{
    User.find({})
    .then(users =>{
        let userNames = users.map(user=>{
            return user.userName
        })
        res.status(200).json(userNames);
    })
    .catch(error => res.status(500).json({message:'somthing went wrong'}))
})

router.delete('/deleteUser/:id',auth,(req,res)=>{
    console.log(req.params.id)
    Mytips.deleteMany({name:req.params.id})
    .then(()=>{})
    User.deleteOne({userName:req.params.id})
    .then(query =>{
        console.log(query);
        res.status(200).json({message:'worker deleted'})
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({message:'somthing went wrong'})
    })
})

module.exports = router;