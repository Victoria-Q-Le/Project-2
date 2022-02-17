const mongoose = require ('mongoose')

const bookSchema = new mongoose.Schema ({
  name: {type:String, require: true},
  author: {type: String, require: true},
  notes: String,
  img: String,
  finished: Boolean,
  bookmark: Number,
  lat:String,
  lng:String
})

const bookCollection = mongoose.model('Book', bookSchema)

module.exports = bookCollection
