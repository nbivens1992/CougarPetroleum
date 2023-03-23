const express = require('express')
const router = express.Router()
const quoteController = require('../controllers/quoteController')

router.route('/')
    .get(quoteController.getAllQuotes)
    .post(quoteController.createNewQuote)
    .patch(quoteController.updateQuote)
    // .delete(quoteController.deleteQuote)

module.exports = router