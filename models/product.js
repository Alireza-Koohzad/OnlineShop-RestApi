const Sequelize = require('sequelize');
const sequelize = new Sequelize();

const STRING = Sequelize.STRING;
const INTEGER = Sequelize.INTEGER;

const Product = sequelize.define('Product', {
    id: {
        autoIncrement : true,
        primaryKey: true,
        type: INTEGER,
        allowNull: false
    },
    name: {
        type: STRING,
        allowNull: false
    },
    price: {
        type: INTEGER,
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



