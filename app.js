const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./utils/database');
const routes = require('./routes/rotues');
const passport = require('passport');
const multer = require("multer");
const session = require('express-session');

//define models
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const Product = require('./models/product');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');
const Payment = require('./models/payment');
const Category = require('./models/category');
//create app server
const app = express();

app.use(session({
    secret : "mysecret",
    resave : false,
    saveUninitialized : false

}))

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/assets/uploads/");
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, new Date().toISOString() + "-" + file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

//config multer
app.use(multer({
    storage: storage,
    fileFilter: fileFilter
}).single("image"));

//config body parser
app.use(bodyParser.json());

//config passport
app.use(passport.initialize());
//use passport middleware
require('./middlewares/passport.middleware')(passport);

//config header
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

//routers
app.use('/', routes);

//config middleware
app.use(require('./middlewares/error.middleware'));

// association
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem});
Product.belongsToMany(Order, {through: OrderItem});
User.hasMany(Payment);
Order.hasOne(Payment);
Payment.belongsTo(Order);
Category.hasMany(Product);
Product.belongsTo(Category);

//connect to server
sequelize
    .sync()
    .then(() => {
        app.listen(3000)
    })
    .catch(err => console.log(err))



