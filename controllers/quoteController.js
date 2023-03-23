const Quote = require('../models/quote')
const User = require('../models/User')
//const Note = require('../models/Note')
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

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { id, username, roles, active, password } = req.body

    // Confirm data 
    if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All fields except password are required' })
    }

    // Does the user exist to update?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    // Check for duplicate 
    const duplicate = await User.findOne({ username }).lean().exec()

    // Allow updates to the original user 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    user.username = username
    user.roles = roles
    user.active = active

    if (password) {
        // Hash password 
        user.password = await bcrypt.hash(password, 10) // salt rounds 
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} updated` })
})

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    // // Does the user still have assigned quotes?
    // const note = await Note.findOne({ user: id }).lean().exec()
    // if (note) {
    //     return res.status(400).json({ message: 'User has assigned notes' })
    // }

    // Does the user exist to delete?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}