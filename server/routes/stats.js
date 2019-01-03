const express = require('express');
const router = express.Router();
const auth = require('../midleware/check-auth');
const MyTips = require('../models/myTips');


router.get('/myStats/:id',auth,(req,res)=>{
    const userName = req.params.id;
    console.log(req.params.id)
    const date = new Date();
    const yearMonth = date.getFullYear()+'-'+date.getMonth();
    let myTotalIncome = 0;
    let myTotalPerHourAvrg = 0;
   
    MyTips.find({name: userName, yearMonth: yearMonth})
    .then(tips =>{
        console.log(tips)
        tips.forEach(tip =>{
            myTotalIncome += tip.totalTip;
            myTotalPerHourAvrg += tip.perHour?tip.perHour:0;
        })
        res.status(200).json({
            myTotalIncome,
            myTotalPerHourAvrg:myTotalPerHourAvrg > 0?(myTotalPerHourAvrg/tips.length).toFixed(2):0
    })
    } )
})

router.get('/waitrsBookStats',auth,(req,res)=>{
    const date = new Date();
    const yearMonth = date.getFullYear()+'-'+date.getMonth();
    let totalTips = 0;
    let perHourAvrg = 0;
    MyTips.find({yearMonth:yearMonth,waitrsBook:true})
    .then(tips =>{
        tips.forEach(tip =>{
            totalTips += tip.totalTip;
            perHourAvrg += tip.perHour?tip.perHour:0;
        })
        console.log(tips , perHourAvrg)
        res.status(200).json({
            totalTips,
            perHourAvrg:perHourAvrg > 0?(perHourAvrg/tips.length).toFixed(2):0
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
    let totalTips = 0;
    let perHourAvrg = 0;
    console.log(userName, yearMonth,state);
   
    MyTips.find(state === 'myTips'? myTipsLogQuery : waitrsBookLogQuery)
    .then(tips =>{
        tips.forEach(tip =>{
            totalTips += tip.amount;
            perHourAvrg += tip.perHour?tip.perHour:0;
        })
        console.log(tips);
        res.status(200).json({
            tips:tips,
            perHourAvrg:Math.round(perHourAvrg/tips.length),
            totalTips
        });
    })
    .catch(error =>{
        console.log(error)
        res.status(400).json({message:'server error'});
    })

})


module.exports = router;