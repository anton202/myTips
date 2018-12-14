const mongoose = require('mongoose');

const myTipsSchema = mongoose.Schema({
    date: { type: String, required: true },
    yearMonth: {type: String},
    amount: { type: Number, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    shiftCategory: { type: String, required: true },
    name: { type: String },
    totalTime: { type: Number },
    perHour: { type: Number },
    waitrsBook: {type:  Boolean}
})

module.exports = mongoose.model('myTip',myTipsSchema)