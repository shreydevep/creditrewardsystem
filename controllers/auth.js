const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/loginSchema');


// Register route
exports.signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({ ...req.body, email, password: hashedPassword });
        // save the user to the database
        await user.save();
        res.json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Login route
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user in database
        // If not found, return an error
        // If found, compare passwords
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        console.log(password, user.password);
        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ email: user.email }, 'your-secret-key');

        // Set token in cookie and return success message
        res.cookie('token', token, { httpOnly: true });
        res.json({ user, message: 'success', token: token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getProfile = async (req, res) => {
    // getting profile using req.user.id
    try {
        const userId = req.user.id;
        const userProfile = await db.Profile.findOne({
            where: {
                UserId: userId,
            },
            attributes: ['id', 'email', 'authCode', 'UserId', 'name', 'phoneNumber', 'reminders', 'coins']
        })
        const duplicate = { ...userProfile.dataValues };
        if (userProfile.authCode === null) {
            res.status(200).json(userProfile);
        }
        else {
            duplicate.authCode = await encryptDecrypt.decrypt(userProfile.authCode);
            res.status(200).json(duplicate);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Logout route
exports.logout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logout successful' });
};

