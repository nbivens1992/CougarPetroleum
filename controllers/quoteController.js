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

// @desc Update a note
// @route PATCH /notes
// @access Private
const updateQuote = asyncHandler(async (req, res) => {
    const { id, galReq, dAddress, dDate, completed} = req.body

    // Confirm data
    if (!id || !galReq|| !dAddress || !dDate || typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm note exists to update
    const quote = await Quote.findById(id).exec()

    if (!quote) {
        return res.status(400).json({ message: 'Quote not found' })
    }

    // Check for duplicate title
    const duplicate = await Quote.findOne({id}).lean().exec()


    quote.dAddress = dAddress
    quote.galReq = galReq
    quote.dDate = dDate
    quote.completed = completed

    const updatedQuote = await quote.save()

    res.json(`Quote updated`)
})
//delete Quote 

const deleteQuote = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    // // Does the user still have assigned quotes?
    const quote = await Quote.findOne({ user: id }).lean().exec()
     if (quote) {
         return res.status(400).json({ message: 'User has assigned notes' })
     }

    // Does the user exist to delete?
    const Quote = await Quote.findById(id).exec()

    if (!Quote) {
        return res.status(400).json({ message: 'User not found' })
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