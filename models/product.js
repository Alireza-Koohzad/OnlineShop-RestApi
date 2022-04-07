const {DataTypes} = require('sequelize');
const sequelize = require('../utils/database');


const STRING = DataTypes.STRING;
const NUMBER = DataTypes.INTEGER

const Product = sequelize.define('Product', {
    id: {
        autoIncrement : true,
        primaryKey: true,
        type: NUMBER,
        allowNull: false
    },
    name: {
        type: STRING,
        allowNull: false
    },
    price: {
        type: NUMBER,
        allowNull: false
    },
    description: {
        type: STRING,
        allowNull: false,
    },
    imageUrl : {
        type : STRING,
        allowNull : false
    }
})


module.exports = Product;



