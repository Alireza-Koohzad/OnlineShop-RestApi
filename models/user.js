const Sequelize = require('sequelize');
const sequelize = new Sequelize();
const String = Sequelize.STRING;

const User = sequelize.define('users', {
    username: {
        type: String,
        allowNull: false
    },
    email: {
        primaryKey: true,
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
        defaultValue : 'user'
    }
})

User.associate = function (models){
    User.hasOne(models.Cart);

}

module.exports = User;



