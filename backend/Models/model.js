const mongoose = require('mongoose')

const quotesSchema = new mongoose.Schema({
  quoteText: String 
})

const quoteModel = mongoose.model('quotesText', quotesSchema)

module.exports = quoteModel