const express = require('express');
const router = express.Router();
const auth = require('../midleware/check-auth');
const MyTips = require('../models/myTips');
const User = require('../models/user');

router.post('/addTip',auth,(req,res)=>{
    const date = new Date().toLocaleDateString();
    const tip = new MyTips({
        date: date,
        yearMonth: req.body.yearMonth,
        amount: req.body.amount,
        shiftCategory: req.body.shiftCategory,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        name: req.body.name,
        totalTime: req.body.totalTime,
        perHour: req.body.perHour,
        waitrsBook: req.body.waitrsBook
    })
    tip.save()
        .then(tip => {
            res.status(201).json({tip})
        })
        .catch(error => {res.status(500).json({message:'something went wrong,please try again later'})})
})

router.get('/getTodaysTips',auth,(req,res)=>{
    const todaysDate = new Date().toLocaleDateString()
    MyTips.find({date: todaysDate, waitrsBook: true})
    .then(tips => {
        res.status(200).json({tips:tips});
    })
    .catch(error => {
        res.status(500).json({message:'something went wrong,please try again later'})
        
    })
})


router.delete('/deleteTip/:id',(req,res)=>{
    MyTips.deleteOne({_id: req.params.id})
    .then(query => {
        res.status(200).json({message:'tip deleted'});
    })
    .catch(error => {
        res.status(500).json({message:'something went wrong,please try again later'})
})
})


module.exports = router;