const express = require('express')
const azureStorage = require('azure-storage')

// Environment variables
require('dotenv').config()

// Azure setup
const blobService = azureStorage.createBlobService()
const container = 'test' // Create container in Azure Storage.


const router = express.Router()

router.get('/', async (req, res) => {

    // List segment containing a collection of blob items in the container.
    blobService.listBlobsSegmented(container, null, (err, data) => {
        if (!err) {
            console.log(data)
            res.render('index.html', { 
                account: process.env.AZURE_STORAGE_ACCOUNT,
                container,
                previews: data.entries.length ? data.entries : false
            })

        } else {
            res.render('error.html', {
                message: 'Error connecting to the blob container in Azure Storage.',
                error: err
            })
        }
    })
})

module.exports = router