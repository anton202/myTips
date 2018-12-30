const express = require('express');
const router = express.Router();
const auth = require('../midleware/check-auth');
const waitrData = require('../models/myTips');

router.post('/addTip', auth, (req, res) => {
    const date = new Date(req.body.date).toLocaleDateString().split('/'); 
    const tip = new waitrData({
        date: date[1] + '/' + date[0] + '/' + date[2],
        yearMonth: req.body.yearMonth,
        totalTip: req.body.totalTip,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        name: req.body.userName,
        totalTime: req.body.totalTime,
        perHour: req.body.perHour,
    })
    tip.save()
        .then(tip => {
            res.status(201).json({ message: 'tip added' })
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({message:'something went wrong,please try again later'})
        })

})

router.get('/getMyTips',auth,(req, res) => {
    const date = new Date();
    const yearMonth = date.getFullYear()+'-'+date.getMonth();;
    waitrData.find({name:req.body.userName, yearMonth: yearMonth.toString()})
    .then(tips => {
        res.status(200).json(tips);
    })
    .catch(error => res.status(500).json({message:'something went wrong,please try again later'}))
})


router.put('/editTip',(req,res)=>{
    console.log(req.body)
    waitrData.updateOne({_id: req.body.editedTip.id},req.body.editedTip)
    .then(tip => {
        console.log(tip);
        res.status(200).json({message:'tip updated'})
})
.catch(error => {res.status(500).json({message:'something went wrong,please try again later'})
console.log(error)})
})


router.delete('/deleteTip/:id',(req,res)=>{
    waitrData.deleteOne({_id: req.params.id})
    .then(query => {
        console.log(query);
        res.status(200).json({message:'tip deleted'})
    })
    .catch(error => res.status(500).json({message:'something went wrong,please try again later'}))
})
module.exports = router;