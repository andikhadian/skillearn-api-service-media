require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { PORT } = process.env
var indexRouter = require('./routes/index');
var mediaRouter = require('./routes/media');

var app = express();

app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/media', mediaRouter);

app.listen(parseInt(PORT), () => console.log(`server media running on port ${PORT}!`))

module.exports = app;
