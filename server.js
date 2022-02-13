//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
require('dotenv').config()
const Book = require ('./models/books.js')
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Routes
//___________________
//localhost:3000
app.get('/' , (req, res) => {
  res.send('Hello World!');
});

//___________________
// Show Route
//___________________
app.get('/books/:id', (req,res) => {
  Book.findById(req.params.id, (err,foundBook) => {
    res.render('show.ejs', {
      book: foundBook
    })
  })
})

//___________________
// New Route
//___________________
app.get('/books/new', (req,res) => {
  res.render('new.ejs')
})

//___________________
// Create Route
//___________________
app.post('/books/',(req,res) => {
  if ( req.body.finished === 'on'){
    req.body.finished = true
  } else {
    req.body.finished = false
  }
  Book.create(req.body,(err,createdBook) => {
    res.redirect('/books')
  })
})

//___________________
// Index Route
//___________________
app.get('/books',(req,res) => {
  Book.find({}, (err,allBooks) => {
    res.render('index.ejs', {
      books: allBooks
    })
  })
})

//___________________
// Delete Route
//___________________
app.delete('/fruits/:id',(req,res) => {
  Book.findByIdAndRemove(req.params.id, (err,data) => {
    res.redirect('/books')
  })
})

//___________________
// Edit Route
//___________________
app.get('/book/:id/edit', (req,res) => {
  Book.findById(req.params.id, (err,foundBook) => {
    res.render('edit.ejs', {
      book: foundBook
    })
  })
})

//___________________
// Put Route
//___________________
app.put('/book/:id',(req,res) => {
  if (req.body.finished === 'on'){
    req.body.finished === true
  } else {
    req.body.finished === false
  }
  Book.findByIdAndUpdate (req.params.id, req.body, {new:true}, (err,updateModel) => {
    res.redirect('/books')
  })
})

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
