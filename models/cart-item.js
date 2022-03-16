const Sequelize = require('sequelize');
const sequelize = new Sequelize();

const STRING = Sequelize.STRING;
const INTEGER = Sequelize.INTEGER;

const CartItem = sequelize.define('CartItem', {
    id: {
        autoIncrement : true,
        primaryKey: true,
        type: INTEGER,
        allowNull: false
    },
    quantity: {
        type: INTEGER,
        allowNull: false
    }
})


module.exports = CartItem;



