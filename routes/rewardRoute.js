const express = require('express');
const router = express.Router();
const rewardService = require('../Services/rewardService');

router.post('/reward', rewardService.addRewards);
router.get('/reward', rewardService.getAllRewards);
router.get('/reward/coins', rewardService.getCoinsCount);


module.exports = router;