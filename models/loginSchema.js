const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const loginSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    cardType: {
        type: String
    },
    bank: {
        type: String
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true
    },
    ifscCode: {
        type: String
    },
    userType: {
        type: String
    },
    activated: {
        type: Boolean,
        required: true
    },
    registrationDate: {
        type: Date,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    coins: {
        type: Number,
        default: 0
    }
});

// check if a password matches the stored password hash
loginSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

const User = mongoose.model('User', loginSchema);
module.exports = User;
