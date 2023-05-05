const express = require('express');
const router = express.Router();

const productController = require('../controllers/product');

router.get('/products', productController.getAllProducts);
router.get('/products/:id',productController.getProduct, productController.getProductById);
router.post('/products', productController.createProduct);
router.patch('/products/:id',productController.getProduct, productController.updateProduct);
router.delete('/products/:id',productController.getProduct, productController.deleteProduct);

module.exports = router;
