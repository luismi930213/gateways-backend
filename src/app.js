var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var router = require('./routes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Only for dev mode. In production run migrations
var database = require('./models');
var testData = require('./test.data');
database.sequelize
    .sync()
    .then(() => {
        console.log('database created')
        return testData.init()
    })
    .then(data => console.log('test data created'))
    .catch(err => console.log(err))

router.init(app)

module.exports = app;
