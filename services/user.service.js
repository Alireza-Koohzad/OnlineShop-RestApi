const Product = require('../models/product');
const User = require('../models/user');
const {Op} = require("sequelize/types");

exports.getAllProducts = async (req) => {
    const currentPage = req.query.page || 1;
    const perPage = 4;
    let totalItems = await Product.findAndCountAll();
    const products = await Product.findAll({
        offset: (currentPage - 1) * 4,
        limit: perPage
    });
    if (!products) {
        let err = new Error("products is not defined");
        err.statusCode = 404;
        throw  err;
    }
    return {
        products: products,
        totalItems: totalItems,
        perPage: perPage,
        currentPage: currentPage
    };
}

exports.getCategoryProduct = async (req) => {
    const {catId} = req.params;
    const currentPage = req.query.page || 1;
    const perPage = 4;
    let totalItems = await Product.findAndCountAll({where: {categoryId: catId}});

    const products = await Product.findAll({
        where: {categoryId: catId},
        offset: (currentPage - 1) * 4,
        limit: perPage
    })

    if (!products) {
        let err = new Error("products is not defined");
        err.statusCode = 404;
        throw  err;
    }
    return {
        products: products,
        totalItems: totalItems,
        perPage: perPage,
        currentPage: currentPage
    };
}

exports.getEditProfile = async (req) => {
    const userId = req.user.id;
    let user = await User.findByPk(userId)
    if (!user) {
        let err = new Error("user does not exist!");
        err.statusCode = 404;
        throw  err;
    }
    return user;

}

exports.putProfile = async (req) => {
    const {username, email} = req.body;
    const userId = req.user.id;
    let user = await User.findByPk(userId);
    if (!user) {
        let err = new Error("user does not exist!");
        err.statusCode = 404;
        throw  err;
    }

    user.email = email;
    user.username = username;
    await user.save();

    return user;

}


exports.getFilterProduct = async (req) => {
    let {
        priceFrom,
        priceTo,
    } = req.query;
    const products = await Product.findAll({
        where: {
            [Op.between]: [priceFrom, priceTo]
        }
    })
    let response ;
    if (!products) {
        response = {
            message: "product with this info does not exist",
            products: []
        }
        return response;
    }
    response = {
        products: products
    }
    return response;
}

exports.search = async (req) => {
    let {term} = req.body;

    let products = await Product.findAll({
        where: {
            [Op.like]: "%" + term + "%"
        }
    })
    let response ;
    if (!products) {
        response = {
            message: "this product  does not exist",
            products: []
        }
        return response;
    }
    response = {
        products: products
    }
    return response;
}


