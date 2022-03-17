const {DataTypes} = require('sequelize');
const sequelize = require('../utils/database');

const INTEGER = DataTypes.INTEGER;

const Cart = sequelize.define('Cart', {
    id: {
        autoIncrement : true,
        primaryKey: true,
        type: INTEGER,
        allowNull: false
    }
})



module.exports = Cart;



