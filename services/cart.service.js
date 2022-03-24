const Cart = require('../models/cart');
const Product = require('../models/product');

exports.createCart = async (user) => {
    return await user.createCart();
}


exports.getCart = async (req) => {
    const cart = await req.user.getCart();

    if (!cart) {
        const error = new Error("cart not found")
        error.statusCode = 404;
        throw error
    }
    return cart;
}


exports.postCard = async (cart, prodId) => {
    let newCart = cart;
    const products = await cart.getProducts({where: {id: prodId}});
    let product;
    let newQty = 1;
    if (products.length > 0) {
        product = products[0];
    }
    if (product) {
        const currentQty = product.CartItem.quantity;
        newQty = currentQty + 1;
    } else {
        product = await Product.findByPk(prodId);
    }
    await newCart.addProduct(product, {through: {quantity: newQty}});
    return newCart;

}

exports.deleteCart = async (req,cart, prodId) => {
    const products = await cart.getProducts({where: {id: prodId}});
    let product;
    if (products.length > 0){
        product = products[0];
       return await product.CartItem.destroy();
    }
    const error = new Error("not found")
    error.statusCode = 404;
    throw error
}
