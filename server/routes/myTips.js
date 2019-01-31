const express = require('express');
const router = express.Router();
const waitrData = require('../models/myTips');

router.delete('/deleteTip/:id',(req,res)=>{
    waitrData.deleteOne({_id: req.params.id})
    .then(query => {
        console.log(query);
        res.status(200).json({message:'tip deleted'})
    })
    .catch(error => res.status(500).json({message:'something went wrong,please try again later'}))
})
module.exports = router;