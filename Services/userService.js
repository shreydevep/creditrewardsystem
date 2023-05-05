const User = require('../models/loginSchema');

class UserService {
    static async registerUser(user) {
        const newUser = new User(user);
        return await newUser.save();
    }

    static async getAllUsers() {
        return await User.find({});
    }

    static async loginUser(email) {
        return await User.findOne({ email });
    }

    static async findById(userId) {
        return await User.findById(userId);
    }
}

module.exports = UserService;
