const express = require('express')
const cors = require('cors')
const home = require('./Routes/routes')
const connectDb = require('./utils/db')
require('dotenv').config()

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/v1', home)


app.listen(process.env.PORT || 4000, () => {
  connectDb();
  console.log(`server is listening at ${process.env.PORT}`)})