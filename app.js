const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./utils/database');
const authRouter = require('./routes/auth');

const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const Product = require('./models/product')


const app = express();
app.use(bodyParser.json());

//routers
app.use('/auth' , authRouter);


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });

});
//association

// Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
// User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, { through: OrderItem });
//---------------

sequelize
    .sync()
    .then(() => {
        app.listen(3000)
    })
    .catch(err => console.log(err))



