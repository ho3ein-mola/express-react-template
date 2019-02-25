// Imports
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

// Local varibale
const app = express()
const isDev = process.env.NODE_DEV || 'dev'
const port = process.env.PORT || 3001

// Enable cross-orgin request
app.use(cors())
app.options('*', cors()) // enable pre-flight

// Add put - patch - delete method
app.use(require('method-override')())

// Express-session config
app.use(
    session({
        secret: 'conduit',
        cookie: { maxAge: 60000 },
        resave: false,
        saveUninitialized: false,
    })
)

// Parsing rules for express
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Static file declaration
if (isDev === 'dev') {
    console.log('inside is Dev')
    app.use(express.static(path.join(__dirname, 'client/public')))
} else if (isDev === 'prod') {
    console.log('inside is prod')
    app.use(express.static(path.join(__dirname, 'client/build')))
}

// Mongoose connection
if (isDev === 'dev') {
    mongoose
        .connect('mongodb://localhost/')
        .then(() => {
            console.log('connect to:', 'localhost')
        })
        .catch(err => {
            console.log(err)
        })
} else {
    mongoose.connect(process.env.MONGODB_URL)
}
// Routes
app.get('/test', (req, res) => {
    res.json({ a: 'express server data' })
})

// Finally, let's start our server...
app.listen(port, () => {
    console.log(`Express Server Started on port: ${port}`)
})
