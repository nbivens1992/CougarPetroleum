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
    },
    fullName: {
        type: String,
        required: true,
        maxlength: 100
    },
    address1: {
        type: String,
        required: true,
        maxlength: 100
    },
    address2: {
        type: String,
        required: false,
        maxlength: 100
    },
    city: {
        type: String,
        required: true,
        maxlength: 100
    },
    state: {
        type: String,
        required: true,
        maxlength: 2,
        enum: ["AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MP", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UM", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"]
    },
    zip: {
        type: String,
        required: true,
        minlength:5,
        maxlength: 9
    }
    
})
module.exports = mongoose.model('User', userSchema)