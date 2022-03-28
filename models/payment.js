const {DataTypes} = require('sequelize');
const sequelize = require('../utils/database');

//const variable
const INTEGER = DataTypes.INTEGER;
const STRING = DataTypes.STRING;
const BOOLEAN = DataTypes.BOOLEAN;

//schema
const Payment = sequelize.define('Payment', {
    id: {
        autoIncrement : true,
        primaryKey: true,
        type: INTEGER,
        allowNull: false
    },
    pay_code : {
        type : INTEGER,
    },
    price : {
        type : INTEGER,
        allowNull: false
    },
    status : {
        type : BOOLEAN,
        defaultValue : false
    }
})

module.exports = Payment;



