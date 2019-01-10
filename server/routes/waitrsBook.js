const express = require('express');
const router = express.Router();
const auth = require('../midleware/check-auth');
const waitrData = require('../models/myTips');


router.post('/saveWaitrsTips', (req, res) => {
    const waitrsStack = req.body;
    const date = new Date();
    const setDate = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '/' + (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth())
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

router.get('/getTodaysTips', auth, (req, res) => {
    const date = new Date();
    const setDate = (date.getDate() < 10 ?'0'+ date.getDate():date.getDate()) + '/' + (date.getMonth() < 10 ?'0'+ (date.getMonth()+1):date.getMonth())
    + '/' + date.getFullYear()
    
    waitrData.find({ date: setDate, waitrsBook: true })
        .then(tips => {
            res.status(200).json(tips);
        })
        .catch(error => {
            res.status(500).json({ message: 'something went wrong,please try again later' })

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