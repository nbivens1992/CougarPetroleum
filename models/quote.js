//lesson 3
// should mimic quote form 
// connect to user 
const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const quoteSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        galReq: {
            type: Number,
            required: true,
        },
        // dAddress: {
        //     _id: mongoose.Schema.Types.ObjectId,
        //     references: { type: mongoose.Schema.Types.ObjectId, refPath: 'address1'},
        //     address1: { type: String, required: true, maxlength: 100}
        // },
        dDate: {
            type: Date,
            required: true
        },
        sPrice: {
            type: Number,
            require: true
        },
        amountDue: {
            type: Number,
            required: false
        }

    }
)

module.exports = mongoose.model('Quote', quoteSchema)
