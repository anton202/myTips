const mongoose = require('mongoose');

const myTipsSchema = mongoose.Schema({
    date: { type: String, required: true },
    yearMonth: {type: String},
    totalTip: { type: Number, required: true },
    shiftStartTime: { type: String, required: true },
    shiftEndTime: { type: String, required: true },
    name: { type: String },
    totalTime: { type: Number },
    tipPerHour: { type: Number },
    moneyToEmployer: {type:Number},
})

module.exports = mongoose.model('myTip',myTipsSchema)

//deleted shiftCategory
//renamed amount to totalTip