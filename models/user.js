const mongoose = require('mongoose')
// mimic whats on the sign up sheet 
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxlength: 100
    },
    password: {
        type: String,
        required: true,
        maxlength: 100
    }
    
})
module.exports = mongoose.model('User', userSchema)