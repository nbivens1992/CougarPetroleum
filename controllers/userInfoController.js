const User = require('../models/User')
const UserInfo = require('../models/userInfo')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc Get all users
// @route GET /users
// @access Private
const getAllUserInfo = asyncHandler(async (req, res) => {
    // Get all users from MongoDB
    const users = await UserInfo.find().lean()

    // If no users 
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users)
})

// @desc Create new user
// @route POST /users
// @access Private
const createNewUserInfo = asyncHandler(async (req, res) => {
    const {user, fullName, address1, address2, city,state,zip } = req.body

    // Confirm data
    if (!user|| !fullName || !address1 || !city || !state || !zip ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // create user object
    const userObject = {user,fullName, address1, address2, city, state, zip}

    // Create and store new userInfo
    const userInfo = await User.create(userObject)

    if (userInfo) { //created 
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
})

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUserInfo = asyncHandler(async (req, res) => {
    const { id, username, password, fullName, address1, city,state,zip } = req.body

    // Confirm data 
    if (!id || !username || !fullName || !address1 || !city || !state || !zip) {
        return res.status(400).json({ message: 'All fields are required' })
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
    user.fullName = fullName
    user.address1 = address1
    user.city = city
    user.state = state
    user.zip = zip


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
const deleteUserInfo = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Quote ID Required' })
    }

    // Does the user exist to delete?
    const userInfo = await UserInfo.findById(id).exec()

    if (!userInfo) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await userInfo.deleteOne()

    const reply = `User Info ${result.fullName} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllUserInfo,
    createNewUserInfo,
    updateUserInfo,
    deleteUserInfo
}

