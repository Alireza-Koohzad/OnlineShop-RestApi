const Sequelize = require('sequelize');


const sequelize = new Sequelize({
    database: "online-shop-project",
    username: "postgres",
    password: "alireza894",
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // <<<<<<< YOU NEED THIS
        }
    },
});

// const sequelize = new Sequelize('online-shop-project', 'postgres', 'alireza894' , {
//     host: 'localhost',
//     dialect: 'postgres',
//     port : 5432
// })


module.exports = sequelize;
