const express = require('express');
const router = express.Router();

const UserCardController = require('../controllers/userCardController');

router.post('/getCardDetails', UserCardController.getCardDetails);

module.exports = router;
