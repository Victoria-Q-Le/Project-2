const bcrypt = require ('bcrypt')
const express = require ('express')
const bodyParser = require('body-parser')
const users = express.Router()
const User = require ('../models/users.js')
const app = express()
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({extended:false})



users.get('/new',(req,res) => {
  res.render('users/sign_up.ejs', {
    currentUser: req.session.currentUser
  })
})

users.post('/createUser',urlencodedParser,(req,res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (err,createdUser) => {
    res.redirect('/')
  })
  console.log(req.body);
})

module.exports = users
