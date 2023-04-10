const User = require('../models/user')
const UserInfo = require('../models/userInfo')
const asyncHandler = require('express-async-handler')

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
    const userObject = {user, fullName, address1, address2, city, state, zip}

    // Create and store new userInfo
    const userInfo = await UserInfo.create(userObject)

    if (userInfo) { //created 
        res.status(201).json({ message: `New user ${fullName} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
})

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUserInfo = asyncHandler(async (req, res) => {
    const { id, user, fullName, address1, address2, city, state, zip } = req.body

    // Confirm data 
    if (!id || !user|| !fullName || !address1 || !city || !state || !zip) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Does the userInfo exist to update?
    const userInfo = await UserInfo.findById(id).exec()

    if (!userInfo) {
        return res.status(400).json({ message: 'User not found' })
    }

    // Check for duplicate 
    const duplicate = await UserInfo.findOne({ fullName }).lean().exec()

    // Allow updates to the original user 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    userInfo.user = user
    userInfo.fullName = fullName
    userInfo.address1 = address1
    userInfo.address2 = address2
    userInfo.city = city
    userInfo.state = state
    userInfo.zip = zip

    const updatedUser = await userInfo.save()

    res.json({ message: `${updatedUser.fullName} updated` })
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

