const bcrypt = require ('bcrypt')
const express = require ('express')
const bodyParser = require('body-parser')
const users = express.Router()
const User = require ('../models/users.js')
const app = express()
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({extended:false})



users.get('/new',(req,res) => {
  res.render('users/sign_up.ejs')
})

users.post('/createUser',urlencodedParser,(req,res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  console.log(req.body);
  User.create(req.body, (err,createdUser) => {
    console.log(createdUser);
    res.redirect('/')
  })
})

module.exports = users
