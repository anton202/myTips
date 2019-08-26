const express = require('express');
const router = express.Router();
const auth = require('../midleware/check-auth');
const MyTips = require('../models/myTips');
const xl = require('../models/excel');

router.get('/myStats/:id', auth, (req, res) => {
    const userName = req.params.id;
    const date = new Date();
    const yearMonth = date.getFullYear() + '-' + date.getMonth();
    let myTotalIncome = 0;
    let myTotalPerHourAvrg = 0;

    MyTips.find({
            name: userName,
            yearMonth: yearMonth
        })
        .then(tips => {  
            tips.forEach(tip => {
                myTotalIncome += tip.totalTip;
                myTotalPerHourAvrg += tip.tipPerHour ? tip.tipPerHour : 0;
            })
            res.status(200).json({
                myTotalIncome: Math.round(myTotalIncome),
                myTotalPerHourAvrg: myTotalPerHourAvrg > 0 ? (myTotalPerHourAvrg / tips.length).toFixed(2) : 0
            })
        })
        .catch(error => res.status(400).json({
            message: 'server error'
        }))
})

router.get('/thisMonthTips/:id', (req, res) => {
    const userName = req.params.id;
    const date = new Date();
    const yearMonth = date.getFullYear() + '-' + date.getMonth();

    MyTips.find({
            name: userName,
            yearMonth: yearMonth
        })
        .then(tips => {
            res.status(200).json(tips)
        })
        .catch(error => res.status(400).json({
            message: 'server error'
        }))
})

router.get('/allWaitersTips/:month/:year', auth, (req, res) => {
    let totalTips = 0;
    let perHourAvrg = 0;
    let yearMonth = '';
    const date = new Date();

    if (req.params.month === 'undefined' || req.params.year === 'undefined' ) {
        yearMonth = date.getFullYear() + '-' + date.getMonth();
    } else if (req.params.month && req.params.year) {
        yearMonth = req.params.year + '-' + req.params.month;
        console.log(yearMonth)
    }

    MyTips.find({
            yearMonth: yearMonth
        })
        .then(tips => {
            tips.forEach(tip => {
                totalTips += tip.totalTip;
                perHourAvrg += tip.tipPerHour ? tip.tipPerHour : 0;
            })

            res.status(200).json({
                tips: tips,
                totalTips: Math.round(totalTips),
                perHourAvrg: perHourAvrg > 0 ? (perHourAvrg / tips.length).toFixed(2) : 0
            })
        })
        .catch(error => res.status(400).json({
            message: 'server error'
        }))
})


router.get('/getExcel/:state/:yearMonth/:userName', (req, res) => {
    const yearMonth = req.params.yearMonth;
    const userName = req.params.userName;
    const state = req.params.state;
    const waitrsBookLogQuery = {
        waitrsBook: true,
        yearMonth: yearMonth
    }
    const myTipsLogQuery = {
        name: userName,
        yearMonth: yearMonth
    }

    MyTips.find(state === 'myTips' ? myTipsLogQuery : waitrsBookLogQuery)
        .then(tips => {
            xl.insertData(tips, res)
        })
})


router.get('/myLog/:yearMonth', auth, (req, res) => {
    const yearMonth = req.params.yearMonth;
    const userName = req.body.userName;
    let totalTips = 0;
    let perHourAvrg = 0;

    MyTips.find({
            name: userName,
            yearMonth: yearMonth
        })
        .then(tips => {
            tips.forEach(tip => {
                totalTips += tip.totalTip;
                perHourAvrg += tip.tipPerHour ? tip.tipPerHour : 0;
            })

            res.status(200).json({
                tips: tips,
                perHourAvrg: !perHourAvrg ? perHourAvrg : (perHourAvrg / tips.length).toFixed(2),
                totalTips
            });
        })
        .catch(error => {
            res.status(400).json({
                message: 'server error'
            });
        })

})



module.exports = router;