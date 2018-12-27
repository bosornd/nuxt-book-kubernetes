var mongoose = require('mongoose');
var User = require("../models/User");

var express = require('express')
var router = express.Router()

// JWT middleware
const jwt = require('express-jwt')
var jsonwebtoken = require('jsonwebtoken')

// [POST] /login
router.post('/login', (req, res, next) => {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // secret('nuxt-book') should be same with express-jwt (index.js)
          const accessToken = jsonwebtoken.sign({ user },'nuxt-book')
          res.json({ token: { accessToken } })
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      })
    }
  })
})

// [GET] /user
router.get('/user', jwt({secret: 'nuxt-book'}), (req, res, next) => {
  res.json({ user: req.user })
})

// [POST] /logout
router.post('/logout', (req, res, next) => {
  res.json({ status: 'OK' })
})

// [POST] /register
router.post('/register', function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please pass username and password.'});
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
})

module.exports = router
