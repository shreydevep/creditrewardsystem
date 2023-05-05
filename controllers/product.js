const express = require('express');
const router = express.Router();
const Product = require('../models/productSchema');

exports.getAllProducts = async (req, res) => {
    console.log('req.body', req.body);
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProductById = (req, res) => {
    res.json(res.product);
};

exports.createProduct = async (req, res) => {
    const product = new Product({
        price: req.body.price,
        description: req.body.description,
        productName: req.body.productName,
        numberOfEmis: req.body.numberOfEmis,
        image: req.body.image
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    if (req.body.price != null) {
        res.product.price = req.body.price;
    }

    if (req.body.description != null) {
        res.product.description = req.body.description;
    }

    if (req.body.productName != null) {
        res.product.productName = req.body.productName;
    }

    if (req.body.numberOfEmis != null) {
        res.product.numberOfEmis = req.body.numberOfEmis;
    }

    if (req.body.image != null) {
        res.product.image = req.body.image;
    }

    try {
        const updatedProduct = await res.product.save();
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteProduct =  async (req, res) => {
    try {
        await res.product.remove();
        res.json({ message: 'Deleted Product' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProduct = async (req, res, next) => {
    let product;
    console.log('product id', req.params.id);
    try {
        product = await Product.findById(req.params.id);
        if (product == null) {
            return res.status(404).json({ message: 'Cannot find product' });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }

    res.product = product;
    next();
}
