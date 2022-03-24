const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./utils/database');
const routes = require('./routes/rotues');
const passport = require('passport');

//define models
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const Product = require('./models/product')

//create app server
const app = express();
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
app.use('/' ,  routes);

//config middleware
app.use(require('./middlewares/error.middleware'));

// association

// Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
// User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, { through: OrderItem });



//connect to server
sequelize
    .sync()
    .then( () => {
        // const  product = new Product({
        //     name : "shoes",
        //     price : 45,
        //     description : "this is excellent",
        //     imageUrl : "null"
        // })
        // await product.save();

        app.listen(3000)
    })
    .catch(err => console.log(err))



