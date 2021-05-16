const express = require('express')
const azureStorage = require('azure-storage')
const multer = require('multer')
const intoStream = require('into-stream')

// Environment variables
require('dotenv').config()

// Multer setup
const storage = multer.memoryStorage()
const upload = multer({ storage }).single('image')

// Azure setup
const blobService = azureStorage.createBlobService()
const container = 'test'

const router = express.Router()

router.post('/', upload, (req, res) => {
    const blob = Date.now().toString() + '_' + req.file.originalname
    const stream = intoStream(req.file.buffer)
    const streamLength = req.file.buffer.length

    blobService.createBlockBlobFromStream(container, blob, stream, streamLength, (err => {
        if (err) {
            return res.render('error.html', { message: 'An error occurred during upload!', error: err })
        }

        res.render('success.html', { message: 'File uploaded to Azure Storage. Go back to Homepage to see preview.' })
    }))
})

module.exports = router