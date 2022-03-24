const {DataTypes} = require('sequelize');
const sequelize = require('../utils/database');

const INTEGER = DataTypes.INTEGER;
const STRING = DataTypes.STRING;

const Order = sequelize.define('Order', {
    id: {
        autoIncrement : true,
        primaryKey: true,
        type: INTEGER,
        allowNull: false
    },
    payment_status : {
        type : STRING,
        allowNull: false,
        defaultValue : 'unpaid'
    },
    shipping_status : {
        type : STRING,
        allowNull: false,
        defaultValue : 'Not delivered'
    },

})



module.exports = Order;



