const mongoose = require('mongoose')

//brining in furniture schema 
const furnitureSchema = require('./furniture')

const homeSchema = new mongoose.Schema(
	{
		type: {
			type: String,
			required: true,
		},
		color: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
		    required:true,

		},

		onsale: {
			type: Boolean,
		    required:true

		},
		furnitures: [furnitureSchema],
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			// required: true,
		},
	},
	{
		timestamps: true,

		
		toObject: { virtuals: true },
		toJSON : { virtuals: true}
	}
)

// virtuals go here
// remember these are virtual properties, that use existing data, to add a property whenever we retrieve these documents.
homeSchema.virtual('fullTitle').get(function () {
	return `${this.price} the ${this.onsale}`
})

// this virtual will tell whether the house is to buy or good deal based on its priice and type 
homeSchema.virtual('isExpensive').get(function () {
	if (this.price < 400000) {
		return "Good Deal buy now"
	} else if (this.price >= 500000 && this.color ==='Red') {
		return "Look something else"
	} else {
		return "Buy now or Regret Later)"
	}
})

module.exports = mongoose.model('Home', homeSchema)

