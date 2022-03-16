const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./utils/database');
const app = express();

app.use(bodyParser.json());

const User = require('./models/user')
const Cart= require('./models/cart')
const CartItem = require('./models/cart-item')
const Product = require('./models/product')

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

// Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
// User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, { through: OrderItem });



sequelize.sync({force : true}).then(() => {
    console.log("Success!");
    app.listen(3000)
}).catch((err) => {
    console.log(err);
});



