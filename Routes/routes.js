const express = require('express')
const quoteModel = require('../Models/model')
const route = express.Router()


route.get('/quotes', async (req, res) => {
  try {
    const quote = await quoteModel.aggregate([{ $sample: { size: 1 } }])
    res.status(200).send({res: quote[0].quoteText})
  }catch(e) {
    
  }
})




module.exports = route