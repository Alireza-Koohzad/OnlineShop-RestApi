const cartService = require('../services/cart.service');


exports.getCart = async (req, res, next) => {
    try {
        const cart = await cartService.getCart(req);
        res.status(201).json({
            message: "cart found ",
            products: await cart.getProducts()
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.postCart = async (req, res, next) => {
    try {
        const prodId = req.body.prodId;

        const cart = await cartService.getCart(req);
        const newCart = await cartService.postCard(cart, prodId);
        if (newCart) {
            res.status(201).json({
                message: "add product to cart successfully!",
                cart: newCart,
                products : await newCart.getProducts()
            })
        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}


exports.deleteCart = async (req, res, next) => {
    const prodId = req.body.prodId;
    try {
        const cart = await cartService.getCart(req);
        const deleteProduct = await cartService.deleteCart(req, cart, prodId);
        res.status(201).json({
            message: "delete this product successfully",
            productId: deleteProduct.id
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

