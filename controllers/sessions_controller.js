const bcrypt = require ('bcrypt')
const express = require('express')
const bodyParser = require('body-parser')
const sessions = express.Router()
const User = require('../models/users.js')
const app = express()
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({extended:false})


sessions.get('/new', (req,res) => {
  res.render('login.ejs')
})

sessions.post('/login',urlencodedParser, (req,res) => {
  User.findOne({email: req.body.email}, (err, foundUser) => {
    if (err) {
      console.log(err)
      res.send('oops the db had a problem');
    } else if (!foundUser) {
      res.send('<a href ="/"> Sorry, no user found </a>')
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)){
        req.session.currentUser = foundUser
        res.redirect('/books')
      } else {
        res.send('<a href="/"> password does not match </a>')
      }
    }
  })
})

sessions.get('/logout', (req,res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})

module.exports = sessions
