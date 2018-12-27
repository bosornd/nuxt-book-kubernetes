'use strict';

const PORT = 8080;

var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
//mongoose.connect('mongodb://localhost/nuxt-book', { promiseLibrary: require('bluebird'), useNewUrlParser: true })
mongoose.connect('mongodb://' + process.env.BOOK_DB_SERVICE_HOST + '/nuxt-book',
                 { promiseLibrary: require('bluebird'), useNewUrlParser: true })
  .then(() => console.log('connection succesful'))
  .catch((err) => console.error(err))

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

// JWT middleware
const jwt = require('express-jwt')
app.use('/', require('./api/book'));
//app.use('/', jwt({secret: 'nuxt-book'}), require('./api/book'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// restful api error handler
app.use(function(err, req, res, next) {
  console.log(err);

  if (req.app.get('env') !== 'development') {
      delete err.stack;
  }

    res.status(err.statusCode || 500).json(err);
});

app.listen(PORT);
