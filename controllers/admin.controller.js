const adminService = require('../services/admin.service');
const {checkValidationError} = require('../utils/validationError');


exports.addProduct = async (req, res, next) => {
    try {
        checkValidationError(req);
        const {name, price, description} = req.body;
        if (!req.file) {
            let err = new Error("no image provided!")
            err.statusCode = 422;
            throw err;
        }
        let imageUrl = req.file.path;
        const product = await adminService.addProduct(name, price, description, imageUrl);
        if (product) {
            res.status(201).json({
                message: "add product successfully",
                product: product
            })
        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.editProduct = async (req, res, next) => {
    try {
        checkValidationError(req);
        const prodId = req.params.prodId;
        console.log(prodId);
        const {name, price, description} = req.body;
        if (!req.file) {
            let err = new Error("no image provided!")
            err.statusCode = 422;
            throw err;
        }
        let imageUrl = req.file.path;
        const product = await adminService.editProduct(prodId, name, price, description, imageUrl);
        if (product) {
            res.status(201).json({
                message: "edit product successfully",
                product: product
            })
        }

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

//delete product
exports.deleteProduct = async (req, res, next) => {
    const {prodId} = req.body;
    try {
        const product = await adminService.deleteProduct(prodId);
        res.status(200).json({
            message: "delete product successfully",
            product: product
        })

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}


//get products
exports.getProducts = async (req, res, next) => {
    try {
        const products = await adminService.getProducts();
        res.status(200).json({
            message: "successfully",
            products: products
        })

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}


//get single product

exports.getProduct = async (req, res, next) => {
    const {prodId} = req.params;
    try {
        const product = await adminService.getProduct(prodId);
        res.status(200).json({
            message: "get single successfully",
            product: product
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

//orders functions

//get orders
exports.getOrders = async (req, res, next) => {
    try {
        const orders = await adminService.getOrders();
        res.status(200).json({
            message: "get orders successfully",
            orders: orders
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

//get single order

exports.getOrder = async (req, res, next) => {
    const {orderId} = req.params;
    try {
        const data = await adminService.getOrder(orderId)
        res.json(data);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.putOrder = async (req, res, next) => {
    try {
        const order = await adminService.putOrder(req);
        res.status(200).json({
            message : "edit order was successfully",
            order : order
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}