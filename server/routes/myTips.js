const express = require('express');
const router = express.Router();
const auth = require('../midleware/check-auth');
const MyTips = require('../models/myTips');

router.post('/addTip', auth, (req, res) => {
    const addTip = new MyTips({
        date: req.body.date,
        yearMonth: req.body.yearMonth,
        amount: req.body.amount,
        shiftCategory: req.body.shiftCategory,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        name: req.body.userName,
        totalTime: req.body.totalHours,
        perHour: req.body.perHour
    })
    addTip.save()
        .then(tip => {
            res.status(201).json({ message: 'tip added' })
        })
        .catch(error => res.status(500).json({message:'something went wrong,please try again later'}))

})

router.get('/getMyTips',auth,(req, res) => {
    const date = new Date();
    const yearMonth = date.getFullYear()+'-'+date.getMonth();;
    MyTips.find({name:req.body.userName, yearMonth: yearMonth.toString()})
    .then(tips => {
        res.status(200).json({tips:tips});
    })
    .catch(error => res.status(500).json({message:'something went wrong,please try again later'}))
})


router.put('/editTip',(req,res)=>{
    console.log(req.body)
    MyTips.updateOne({_id: req.body.editedTip.id},req.body.editedTip)
    .then(tip => {
        console.log(tip);
        res.status(200).json({message:'tip updated'})
})
.catch(error => res.status(500).json({message:'something went wrong,please try again later'}))
})


router.delete('/deleteTip/:id',(req,res)=>{
    MyTips.deleteOne({_id: req.params.id})
    .then(query => {
        console.log(query);
        res.status(200).json({message:'tip deleted'})
    })
    .catch(error => res.status(500).json({message:'something went wrong,please try again later'}))
})
module.exports = router;