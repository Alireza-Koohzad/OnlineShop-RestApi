const orderService = require('../services/order.service');
const cartService = require('../services/cart.service');

exports.getOrder = async (req, res, next) => {
    try {
        const orders = await orderService.getOrders(req);
        if (orders) {
            res.status(201).json({
                message: "getOrders successfully",
                orders: orders
            })
        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.postOrder = async (req, res, next) => {
    try {
        const cart = await cartService.getCart(req);
        const products = await cart.getProducts();
        if (products.length > 0) {
            //createOrder
            const order = await req.user.createOrder();
            //map cartItem qty to orderItem qty
            const mapProducts = products.map(product => {
                product.OrderItem = {quantity: product.CartItem.quantity};
                return product;
            });
            //add order items
            const orders = await order.addProducts(mapProducts);
            await cart.setProducts(null);
            res.status(201).json({
                message: "create order successfully",
                orders: orders
            })
        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }


}