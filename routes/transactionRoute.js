const express = require('express');
const router = express.Router();

const TransactionController = require('../controllers/transactionController');

router.post('/getAllTransactions', TransactionController.getAllTransactions);
router.post('/gettransactionById', TransactionController.getTransactionById);

module.exports = router;
