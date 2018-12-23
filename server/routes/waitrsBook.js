const express = require('express');
const router = express.Router();
const auth = require('../midleware/check-auth');
const waitrData = require('../models/myTips');
const User = require('../models/user');
const date = new Date().toLocaleDateString();

router.post('/addTip',auth,(req,res)=>{
    const tip = new waitrData({
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

router.post('/saveWaitrsTips',(req,res)=>{
   const waitrsStack = req.body;
   
   // add on each waitr object, date property
   for(let i = 0; i < waitrsStack.length; i += 1){
    waitrsStack[i].date = date;
   }

   waitrData.insertMany(waitrsStack)
   .then(docs => {
       console.log(docs);
       res.status(201).json({message:'data succesfuly saved'})
   })
   .catch(error => {
       console.log(error);
       res.status(500).json({message:'something went wrong while saving your data'})
   })
   
})

// router.get('/getTodaysTips',auth,(req,res)=>{
//     const todaysDate = new Date().toLocaleDateString()
//     MyTips.find({date: todaysDate, waitrsBook: true})
//     .then(tips => {
//         res.status(200).json({tips:tips});
//     })
//     .catch(error => {
//         res.status(500).json({message:'something went wrong,please try again later'})
        
//     })
// })


router.delete('/deleteTip/:waitrData',(req,res)=>{
//     MyTips.deleteOne({_id: req.params.id})
//     .then(query => {
//         res.status(200).json({message:'tip deleted'});
//     })
//     .catch(error => {
//         res.status(500).json({message:'something went wrong,please try again later'})
// })
console.log(req.params.waitrData);
res.status(200).json({message:'tip deleted'});
})


module.exports = router;