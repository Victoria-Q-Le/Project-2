const mongoose = require ('mongoose')

const bookSchema = new mongoose.Schema ({
  name: {type:String, require: true},
  author: {type: String, require: true},
  notes: String,
  finished: Boolean,
  bookmark: Number
})

const bookCollection = mongoose.model('Book', bookSchema)

module.exports = bookCollection
