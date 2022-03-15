const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres' ,'postgres','alireza894' ,{
    dialect : 'postgres',
    host : 'localhost'
} )


module.exports = sequelize;