const Sequelize = require('sequelize');
const userModel = require('./models/User');

require('../dotenv');

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: 'mysql'
})

const User = userModel(sequelize, Sequelize);


sequelize.sync()
  .then(() => console.log('DB sincronizada correctamente'))
  .catch(err => console.log(err))


module.exports = { User }