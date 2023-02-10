const mongoose = require('mongoose')

const computerSchema = new mongoose.Schema(
	{
		brand: {
			type: String,
			required: true,
		},
		operatingSystem: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
		    required:true

		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
		toObject: { virtuals: true },
		toJSON : { virtuals: true}
	}
)

// virtuals go here 
module.exports = mongoose.model('Computer', computerSchema)
