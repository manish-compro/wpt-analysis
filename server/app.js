
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const config = require('./config.json');
var cors = require('cors');

var createSheet = require('./routes/createSheet');


var port = process.env.PORT || 3000;
var app = express();



const whitelist = config.default.allowedCORSDomains
const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }
  } else {
    corsOptions = { origin: false }
  }
  callback(null, corsOptions)
}

// view engine setup
app.use(express.static(path.join(__dirname,'../Client/dist')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptionsDelegate));
app.use(express.static(path.join(__dirname, 'public')));


app.get('*',(req, res)=>{
  res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})

app.use('/createSheet', createSheet);


app.listen(port , () => console.log(`Listening on port ${port}.... `));

module.exports = app;
