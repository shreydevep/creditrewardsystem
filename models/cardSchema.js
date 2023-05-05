const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    joiningFee: {
        type: Number,
        required: true,
    },
    creditLimit: {
        type: Number,
        required: true,
    },
    billingCycle: {
        type: Number,
        required: true,
    },
    cardType: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
