const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors')
const user = require('./routes/user');
const myTips = require('./routes/myTips');
const waitrsBook = require('./routes/waitrsBook')
const stats = require('./routes/stats');

app.use(express.static(path.join('/root/myTips/dist')));
app.use(bodyParser.json());

  mongoose.connect('mongodb://localhost/myTips',{useNewUrlParser:true});

app.options('*', cors())

app.use('/api/user',user);
app.use('/api/myTips',myTips);
app.use('/api/waitrsBook',waitrsBook);
app.use('/api/stats',stats);

app.get('*', (req, res) => {
    return res.sendFile(path.join('/root/myTips/dist','/index.html'));
  });

app.listen(8083,console.log('server listning on port 8000'))
