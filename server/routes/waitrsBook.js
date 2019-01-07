const express = require('express');
const router = express.Router();
const auth = require('../midleware/check-auth');
const waitrData = require('../models/myTips');
const date = new Date();


// router.post('/addTip', auth, (req, res) => {
//     const setDate = date.getDate() + '/' + date.getMonth + 1 + '/' + date.getFullYear();
//     const tip = new waitrData({
//         date: setDate,
//         yearMonth: req.body.yearMonth,
//         amount: req.body.amount,
//         startTime: req.body.startTime,
//         endTime: req.body.endTime,
//         name: req.body.name,
//         totalTime: req.body.totalTime,
//         perHour: req.body.perHour,
//         waitrsBook: req.body.waitrsBook
//     })
//     tip.save()
//         .then(tip => {
//             console.log(tip)
//             res.status(201).json({ tip })
//         })
//         .catch(error => { res.status(500).json({ message: 'something went wrong,please try again later' }) })
// })

router.post('/saveWaitrsTips', (req, res) => {
    const waitrsStack = req.body;
    const setDate = (date.getDate() < 10 ?'0'+ date.getDate():date.getDate()) + '/' + (date.getMonth() < 10 ?'0'+ (date.getMonth()+1):date.getMonth())
    + '/' + date.getFullYear()


    // add on each waitr object, date property
    for (let i = 0; i < waitrsStack.length; i += 1) {
        waitrsStack[i].date = setDate;
    }

    waitrData.insertMany(waitrsStack)
        .then(docs => {
            console.log(docs);
            res.status(201).json({ message: 'data succesfuly saved' })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'something went wrong while saving your data' })
        })

})

router.get('/getTodaysTips',auth,(req,res)=>{
    const todaysDate = new Date().toLocaleDateString()
    waitrData.find({date: todaysDate, waitrsBook: true})
    .then(tips => {
        res.status(200).json(tips);
    })
    .catch(error => {
        res.status(500).json({message:'something went wrong,please try again later'})

    })
})


router.delete('/deleteTip/:waitrData', (req, res) => {
    waitrObj = JSON.parse(req.params.waitrData);
    waitrData.deleteOne(waitrObj)
        .then(deletedObj => {
            console.log(deletedObj);
            res.status(201).json({ message: 'data succesfuly deleted' })
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ message: 'something went wrong' })
        })

})


module.exports = router;