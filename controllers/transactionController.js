const TransactionInfoService = require('../Services/transactionInfoService');
const ProductService = require('../Services/productService');


exports.getAllTransactions = async (req, res) => {
    try {
        console.log('Transaction', req.body);
        const userBody = req.body;
        const transactionList = await TransactionInfoService.getAllTransaction(userBody.userId);
        const returnObj = [];

        for (let i = 0; i < transactionList.length; i++) {
            let check = false;

            if (await ProductService.getProduct(transactionList[i].productId)) {
                check = true;
            }

            const currHashmap = {};
            currHashmap.transactionId = transactionList[i].transactionId;
            currHashmap.amountPaid = transactionList[i].amountPaid;
            currHashmap.productId = transactionList[i].productId;
            currHashmap.userCardId = transactionList[i].userCardId;
            currHashmap.outStanding = transactionList[i].outstanding;
            currHashmap.completed = transactionList[i].completed;
            currHashmap.userId = transactionList[i].userId;
            currHashmap.date = transactionList[i].date;
            currHashmap.productName = check
                ? (await ProductService.getProduct(transactionList[i].productId)).productName
                : 'Joining Fee';

            returnObj.push(currHashmap);
        }

        res.json(returnObj);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
};

exports.getTransactionById = async (req, res) => {
    try {
        const transactionBody = req.body;
        const transaction = await transactionInfoService.getTransaction(transactionBody.transactionId);
        res.json(transaction);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
};

