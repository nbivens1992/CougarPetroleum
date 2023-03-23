const  Quote = require('../models/Quote')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

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

    const quotesWithUser = await Promise.all(quotes.map(async (note) => {
        const user = await User.findById(quote.user).lean().exec()
        return { ...quote, username: user.username }
    }))

    res.json(quotesWithUser)
})

// @desc Create new quote
// @route POST /quote
// @access Private
const createNewQuote = asyncHandler(async (req, res) => {
    const { galReq, dDate} = req.body

    // Confirm data
    if (!galReq|| !dDate ) {
        return res.status(400).json({ message: 'Not all required fields filled' })
    }

    const quote = await Quote.create({galReq, dDate })

    if (quote) { //created 
        res.status(201).json({ message: `New quote created` })
    } else {
        res.status(400).json({ message: 'Quote creation failed' })
    }
})