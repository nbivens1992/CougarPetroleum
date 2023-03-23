//lesson 3
// should mimic quote form 
// connect to user 
const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const noteSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        id: {
            type: int,
            required: true,
        },
        galReq: {
            type: float,
            required: true,
        },
        dAddress: {
            _id: mongoose.Schema.Types.ObjectId,
            references: { type: mongoose.Schema.Types.ObjectId, refPath: 'address1'},
            address1: { type: String, required: true, maxlength: 100}
        },
        dDate: {
            type: Date,
            required: true
        },
        sPrice: {
            type: float,
            required: true
        },
        amountDue: {
            type: float,
            required: false
        },
        completed: {
            type: Boolean,
            default: false
        }

    },
    {
        timestamps: true
    }
)

quoteSchema.plugin(AutoIncrement, {
    inc_field: 'id',
    id: 'idNumber',
    start_seq: 500
})