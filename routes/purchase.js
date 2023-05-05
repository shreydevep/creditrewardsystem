const express = require('express');
const router = express.Router();
const ProductService = require('../Services/productService');
const userService = require('../Services/userService');
const userCardService = require('../Services/userCardService');
const cardService = require('../Services/cardService');
const transactionInfoService = require('../Services/transactionInfoService');

router.post('/purchase', async (req, res) => {
    console.log('purchase', req.body);
    try {
        const { productId, userId, numberOfEmis } = req.body;
        console.log('productId', productId, 'userId', userId, 'numberOfEmis', numberOfEmis);
        const purchasableProduct = await ProductService.getProduct(productId);
        const currUserCard = await userCardService.getUserCard(userId);
        const currUser = await userService.findById(userId);
        console.log(currUserCard, currUser);
        //const genericCard = await cardService.getCard(currUser.cardType);
        const limit =
            currUserCard.useableCreditLimit -
            purchasableProduct.price / numberOfEmis;

        if (limit < 0) {
            return res.status(400).json({
                status: 'error',
                message: 'Cannot initiate purchase due to low amount',
            });
        }
        let amount = purchasableProduct.price / numberOfEmis;
        const newTransaction = {
            amountPaid: amount,
            productId,
            userCardId: currUserCard.id,
            outstanding: false,
            completed: true,
            userId: currUser.id,
            date: new Date(),
        };

        await transactionInfoService.saveTransactionInfo(newTransaction);
        currUserCard.useableCreditLimit = limit;

        // Code for outstanding transactions
        // ...

        return res.json({
            status: 'success',
            message: 'Purchase done successfully!',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
});

module.exports = router;
