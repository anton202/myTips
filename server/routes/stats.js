const express = require('express');
const router = express.Router();
const auth = require('../midleware/check-auth');
const MyTips = require('../models/myTips');


router.get('/myStats/:id',auth,(req,res)=>{
    const userName = req.params.id;
    const date = new Date();
    const yearMonth = date.getFullYear()+'-'+date.getMonth();
    let totalTipsThisMonth = 0;
    let monthlyPerHourAvg = 0;
   
    MyTips.find({name: userName, yearMonth: yearMonth})
    .then(tips =>{
        
        tips.forEach(tip =>{
            totalTipsThisMonth += tip.amount;
            monthlyPerHourAvg += tip.perHour?tip.perHour:0;
        })
        res.status(200).json({
            totalTipsThisMonth,
            monthlyPerHourAvg:Math.round(monthlyPerHourAvg/tips.length)
    })
    } )
})

router.get('/waitrsBookStats',auth,(req,res)=>{
    const date = new Date();
    const yearMonth = date.getFullYear()+'-'+date.getMonth();
    let totalTipsThisMonth = 0;
    let monthlyPerHourAvg = 0;
    MyTips.find({yearMonth:yearMonth,waitrsBook:true})
    .then(tips =>{
        tips.forEach(tip =>{
            totalTipsThisMonth += tip.amount;
            monthlyPerHourAvg += tip.perHour?tip.perHour:0;
        })
        res.status(200).json({
            totalTipsThisMonth,
            monthlyPerHourAvg:Math.round(monthlyPerHourAvg/tips.length)
    })
    })
    .catch(error => res.status(400).json({message:'server error'}))
})

router.get('/myLog/:state/:yearMonth',auth,(req,res)=>{
    const yearMonth = req.params.yearMonth;
    const userName = req.body.userName;
    const state = req.params.state;
    const waitrsBookLogQuery = {waitrsBook:true,yearMonth:yearMonth}
    const myTipsLogQuery = {name:userName,yearMonth:yearMonth}
    let totalTipsThisMonth = 0;
    let monthlyPerHourAvg = 0;
    console.log(userName, yearMonth,state);
   
    MyTips.find(state === 'myTips'? myTipsLogQuery : waitrsBookLogQuery)
    .then(tips =>{
        tips.forEach(tip =>{
            totalTipsThisMonth += tip.amount;
            monthlyPerHourAvg += tip.perHour?tip.perHour:0;
        })
        console.log(tips);
        res.status(200).json({
            tips:tips,
            monthlyPerHourAvg:Math.round(monthlyPerHourAvg/tips.length),
            totalTipsThisMonth
        });
    })
    .catch(error =>{
        console.log(error)
        res.status(400).json({message:'server error'});
    })

})


module.exports = router;