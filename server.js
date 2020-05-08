const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
require('dotenv').config()
app.use(cors())
app.use(express.json())
const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("DB Connected") })
    .catch(err => console.log("Error: " + err))
const notes = require('./routes/notes')
app.use('/notes', notes)
app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
})