// import dependencies
const mongoose = require('mongoose')

// furniture is a subdocument. NOT A MODEL.
// furniture will be part of the furnitures array added to specific pets
// since we only need the schema, we can skip destructuring from mongoose

const furnitureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String
    },
    needs: {
        type: Boolean,
        required: true,
        default: false
    },
    condition: {
        type: String,
        // here we'll use enum, which means we can only use specific strings for this field.
        // enum is a validator on the type String that says "you can only use one of the values within this array"
        enum: ['new', 'used', 'broken'],
        default: 'new'
    }
}, { timestamps: true })

module.exports = furnitureSchema