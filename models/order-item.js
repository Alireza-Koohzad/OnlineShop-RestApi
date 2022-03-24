const {DataTypes} = require('sequelize');
const sequelize = require('../utils/database');


const INTEGER = DataTypes.INTEGER;

const OrderItem = sequelize.define('OrderItem', {
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


module.exports = OrderItem;



