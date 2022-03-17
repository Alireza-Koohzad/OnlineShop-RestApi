const {Sequelize} = require('sequelize');


module.exports = new Sequelize("online-shop-project" , "postgres" , "alireza894" , {
    host: "localhost",
    dialect: "postgres",
    port : 5432
});
