const {DataTypes} = require('sequelize');
const sequelize = require('../utils/database');


const STRING = DataTypes.STRING;
const INTEGER = DataTypes.INTEGER;

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



