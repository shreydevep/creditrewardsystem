const rewardService = require('../services/rewardService');

module.exports = {
    getCoinsCount: async (req, res, next) => {
        try {
            rewardService.getCoinsCount(req, res, next)
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server Error' });
        }
    },
    addRewards: async (req, res, next) => {
        try {
            rewardService.addRewards(req, res, next)
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server Error' });
        }
    },
    getAllRewards: async (req, res, next) => {
        try {
            rewardService.getAllRewards(req, res, next)
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server Error' });
        }
    }
}