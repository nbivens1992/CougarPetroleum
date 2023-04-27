const  Quote = require('../models/quote')
const User = require('../models/user')
const asyncHandler = require('express-async-handler')

// @desc Get all quote
// @route GET /quote
// @access Private
const getAllQuotes = asyncHandler(async (req, res) => {
    // Get all users from MongoDB
    const quotes = await Quote.find().lean()

    // If no users 
    if (!quotes?.length) {
        return res.status(400).json({ message: 'No quotes found' })
    }

    const quotesWithUser = await Promise.all(quotes.map(async (quote) => {
        const user = await User.findById(quote.user).lean().exec()
        return { ...quote, username: user.username }
    }))

    res.json(quotesWithUser)
})

// @desc Create new quote
// @route POST /quote
// @access Private
const createNewQuote = asyncHandler(async (req, res) => {
    const {user, galReq, address, dDate, sPrice, amountDue} = req.body


    // Confirm data
    if (!user || !galReq|| !dDate || !address) {
        return res.status(400).json({ message: 'Not all required fields are filled' })
    }

        
    const quoteObject = {user, galReq, address, dDate, sPrice, amountDue}

    const quote = await Quote.create(quoteObject)

    if (quote) { //created 
        res.status(201).json({ message: `New quote created` })
    } else {
        res.status(400).json({ message: 'Quote creation failed' })
    }
})

// @desc Update a quote
// @route PATCH /quotes
// @access Private
const updateQuote = asyncHandler(async (req, res) => {
    const { id, galReq, address, dDate, sPrice, amountDue} = req.body

    // Confirm data
    if (!id || !galReq || !dDate || !address) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm quote exists to update
    const quote = await Quote.findById(id).exec()

    if (!quote) {
        return res.status(400).json({ message: 'Quote not found' })
    }

 
    quote.galReq = galReq
    quote.dDate = dDate
    quote.address = address
    quote.sPrice = sPrice
    quote.amountDue = amountDue


    const updatedQuote = await quote.save()

    res.json(`Quote updated`)
})
//delete Quote 

const deleteQuote = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Quote ID Required' })
    }

    // Does the user exist to delete?
    const quote = await Quote.findById(id).exec()

    if (!quote) {
        return res.status(400).json({ message: 'Quote not found' })
    }

    const result = await Quote.deleteOne()

    const reply = `Quote ${result.quote} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllQuotes,
    createNewQuote,
    updateQuote,
    deleteQuote
}