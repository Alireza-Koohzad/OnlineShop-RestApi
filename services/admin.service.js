const Product = require('../models/product');
const Order = require('../models/order');


exports.addProduct = async (name, price, description, imageUrl) => {
    const product = new Product({
        name: name,
        price: price,
        description: description,
        imageUrl: imageUrl
    })
    await product.save();
    return product

}


exports.editProduct = async (prodId, name, price, description, imageUrl) => {
    const product = await Product.findByPk(prodId);
    if (!product) {
        let err = new Error("this product not found !");
        err.statusCode = 404;
        throw err;
    }
    product.name = name;
    product.price = price;
    product.description = description
    product.imageUrl = imageUrl;

    await product.save();
    return product

}


exports.deleteProduct = async (prodId) => {
    let product = await Product.findByPk({where: {id: prodId}});
    if (!product) {
        let error = new Error("product not found");
        error.statusCode = 404;
        throw err;
    }
    let temp = product;
    await product.destroy();
    return temp;
}

exports.getProducts = async ()=>{
    const products = await Product.findAll();
    if(!products){
        let error = new Error("product not found");
        error.statusCode = 404;
        throw err;
    }
    return products;
}


exports.getProduct = async (prodId) =>{
    const product = await Product.findByPk({where : {id : prodId}});
    if (!product) {
        let error = new Error("product not found");
        error.statusCode = 404;
        throw err;
    }
    return product;
}


// manage orders

exports.getOrders = async ()=>{
    const orders = Order.findAll({
        order : ['id' , 'DESC']
    })
    if (!orders) {
        let error = new Error("orders not found");
        error.statusCode = 404;
        throw err;
    }
    return orders;
}

exports.getOrder = async (orderId)=>{
    const order = Order.findByPk(orderId , {include : ['Products']});
    if (!order) {
        let error = new Error("orders not found");
        error.statusCode = 404;
        throw err;
    }
    let totalPrice = 0;
    if(order.products.length >0){
        order.products.map((d, i) => ({
            quantity: order.products[i].OrderItem.quantity,
        }))
        order.products.forEach(p =>{
            totalPrice += p.price * p.quantity
        })
    }
    let data = {
        message : "get order successfully",
        order : order,
        totalPrice : totalPrice
    }

    return data;
}