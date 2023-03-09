const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
require('dotenv').config()

const connectDb = () => {
  mongoose.connect(process.env.MONGO_URI, () => console.log(`mongoDb connection secured`))
}

module.exports = connectDb

