const Sequelize = require('sequelize');
const sequelize = new Sequelize();

const STRING = Sequelize.STRING;
const INTEGER = Sequelize.INTEGER;

const Cart = sequelize.define('Cart', {
    id: {
        autoIncrement : true,
        primaryKey: true,
        type: INTEGER,
        allowNull: false
    }
})



module.exports = Cart;



