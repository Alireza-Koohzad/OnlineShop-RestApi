const {DataTypes} = require('sequelize');
const sequelize = require('../utils/database');

const INTEGER = DataTypes.INTEGER;
const STRING = DataTypes.STRING;

const Category = sequelize.define('Category', {
    id: {
        autoIncrement : true,
        primaryKey: true,
        type: INTEGER,
        allowNull: false
    },
    name : {
        type : STRING,
        allowNull: false,
    }

})



module.exports = Category;



