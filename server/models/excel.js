const xl = require('excel4node');
const wb = new xl.Workbook();
const ws = wb.addWorksheet('sheet1');
const style = wb.createStyle({
  font: {
    //color: '#FF0800',
    size: 12,
  },
  numberFormat: '#,##0.00; ($#,##0.00); -',

});

ws.cell(1, 1).string('סה"כ הפרשה למעסיק')
ws.cell(1, 2).string('סה"כ מזומן')
ws.cell(1, 3).string('סה"כ לשעה')
ws.cell(1, 4).string('סה"כ שעות')
ws.cell(1, 5).string('עד שעה')
ws.cell(1, 6).string('משעה')
ws.cell(1, 7).string('תאריך')

const insertData = function (tips, res) {
  for (let i = 0, c = 2, n = 1; i < tips.length; i++){
    ws.cell(c, n = 1).number(tips[i].moneyToGoverment)
    ws.cell(c, n += 1).number(tips[i].totalTip)
    ws.cell(c, n += 1).number(tips[i].perHour)
    ws.cell(c, n += 1).number(tips[i].totalTime)
    ws.cell(c, n += 1).string(tips[i].endTime)
    ws.cell(c, n += 1).string(tips[i].startTime)
    ws.cell(c, n += 1).string(tips[i].date)
    console.log(c, n)
    n = 1;
    c += 1;
  }
  wb.write('Excel.xlsx', res);
}


module.exports = { insertData }