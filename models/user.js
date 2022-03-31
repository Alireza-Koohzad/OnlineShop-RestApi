const {DataTypes} = require('sequelize');
const sequelize = require('../utils/database');
const String = DataTypes.STRING;
const Integer = DataTypes.INTEGER;

const User = sequelize.define('users', {
    id: {
        type: Integer,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    username: {
        type: String,
        allowNull: false
    },
    email: {
        type: String,
        allowNull: false
    },
    password: {
        type: String,
        allowNull: false
    },
    role: {
        type: String,
        allowNull: false,
        defaultValue: 'user'
    },
    resetToken: {
        type: String,
        allowNull : false
    },
    resetTokenExpiration : {
        type : DataTypes.DATE,
        allowNull : true
    }

})


module.exports = User;



