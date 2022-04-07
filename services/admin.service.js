const Product = require('../models/product');

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
    if(!product){
        let err = new Error("this product not found !");
        err.statusCode = 404;
        throw err;
    }
    product.name = name ;
    product.price = price;
    product.description = description
    product.imageUrl = imageUrl;

    await product.save();
    return product

}

