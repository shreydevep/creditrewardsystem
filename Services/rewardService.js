const UserService = require('../Services/userService');
const Reward = require('../models/rewardSchema');
const crypto = require('crypto')

function randomValueHex(len) {
    return crypto.randomBytes(Math.ceil(len / 2))
        .toString('hex')
        .slice(0, len).toUpperCase();
}

module.exports = {
    getCoinsCount: async (req, res, next) => {
        // getProfileAssociated
        try {
            const userAssociated = await UserService.findById(req.user.id);
            res.status(200).json({ coinsCount: userAssociated.coins });
        }
        catch (err) {
            res.statusCode = 500;
            throw new Error(err);
        }


    },
    addRewards: async (req, res, next) => {

        try {
            console.log("req.body", req.body);
            const userAssociated = await UserService.findById(req.body.userId);
            const couponPromoCode = randomValueHex(4) + "-" + randomValueHex(4) + "-" + randomValueHex(4);

            await Reward.create({
                couponId: req.body.couponId,
                companyName: req.body.companyName,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                promocode: couponPromoCode,
                coinsNeeded: req.body.coinsNeeded,
                userId: userAssociated._id
            })
            userAssociated.coins = parseInt(userAssociated.coins) - parseInt(req.body.coinsNeeded);
            await userAssociated.save();

            res.status(200).json({ msg: "Reward Added Successfully !" });

        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                status: 'error',
                message: 'Internal server error',
            });
        }
    },
    getAllRewards: async (req, res, next) => {
        try {
            // getProfileAssociated
            console.log("req.body", req.body.userId);
            const userAssociated = await UserService.findById(req.body.userId);
            console.log("userAssociated", userAssociated);
            const allRewards = await Reward.find({ userId: userAssociated._id });

            res.status(200).send(allRewards);
        }
        catch (error) {
            res.statusCode = 500;
            throw new Error(error);
        }
    }
}