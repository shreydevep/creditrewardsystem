const Product = require('../models/productSchema');

class ProductService {
    constructor() { }
    static getProduct = async (productId) => {
        return await Product.findById(productId);
    }

    static async getAllProducts() {
        return await Product.find();
    }
}

module.exports = ProductService;
