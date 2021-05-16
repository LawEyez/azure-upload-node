const express = require('express')
const path = require('path')

const indexRouter = require('./routes/index.router')
const uploadRouter = require('./routes/upload.router')

const app = express()
const port = process.env.PORT || 5000

// Basic Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Views setup
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)
app.set('views', path.join(__dirname, 'views'))

// Static files setup
app.use(express.static('assets'))

// Routes setup
app.use('/', indexRouter)
app.use('/upload', uploadRouter)

// Start server
app.listen(port, () => console.log(`Server started at port ${port}...`))

