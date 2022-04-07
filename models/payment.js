const {DataTypes} = require('sequelize');
const sequelize = require('../utils/database');

//const variable
const NUMBER = DataTypes.INTEGER;
const BOOLEAN = DataTypes.BOOLEAN;

//schema
const Payment = sequelize.define('Payment', {
    id: {
        autoIncrement : true,
        primaryKey: true,
        type: NUMBER,
        allowNull: false
    },
    pay_code : {
        type : NUMBER,
    },
    price : {
        type : NUMBER,
        allowNull: false
    },
    status : {
        type : BOOLEAN,
        defaultValue : false
    }
})

module.exports = Payment;



