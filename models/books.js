const mongoose = require ('mongoose')

const bookSchema = new mongoose.Schema ({
  name: {type:String, require: yes},
  author: {type: String, require: yes},
  notes: String,
  finished: Boolean,
  bookmark: Number
})

const bookCollection = mongoose.model('Book', bookSchema)

module.exports = bookCollection
