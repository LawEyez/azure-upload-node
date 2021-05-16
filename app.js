const express = reqiure('express')
const path = require('path')

const app = express()
const port = process.env.PORT || 5000

// Basic Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Views setup
app.engine('html', require('ejs').renderFile)
app.set('views', path.join(__dirname, 'views'))

// Static files setup
app.use(express.static('assets'))

// Start server
app.listen(port, () => console.log(`Server started at port ${port}`))

