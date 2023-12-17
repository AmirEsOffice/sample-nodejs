const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config()
const sequelize = new Sequelize(process.env.database, process.env.user,process.env.password, {
    host: process.env.host,
    dialect: 'mysql',
  });
 


const getAllCategories = (callback) => {
    sequelize
    .authenticate()
    .then(async () => {
        console.log('Connection has been established successfully.');
        const results = await sequelize.query('SELECT * FROM tbl_categories', {
            type: Sequelize.QueryTypes.SELECT,
        });
        const obj = results.map(category => ({ id: category.id, title: category.Title }));
        callback(null, obj);
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })
    .finally(() => {
        
    });
}


module.exports = {
    getAllCategories
}