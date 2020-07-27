const Sequelize = require('sequelize');
const userModel = require('./models/User');
const orderModel = require('./models/Order');
const productModel = require('./models/Product');
const orderItemModel = require('./models/Order_items');

require('../dotenv');

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: 'mysql'
})

const User = userModel(sequelize, Sequelize);
const Product = productModel(sequelize, Sequelize);
const Order = orderModel(sequelize, Sequelize);
const Order_items = orderItemModel(sequelize, Sequelize);

User.hasMany(Order, { as: 'orders', foreignKey: 'user_id' });
Order.belongsToMany(Product, { through: Order_items, as: 'products' });
Product.belongsToMany(Order, { through: Order_items, as: 'ProductOrder' });


sequelize.sync({ force: false })
  .then(() => console.log('DB sincronizada correctamente'))
  .catch(err => console.log(err))


module.exports = { User, Order, Product, Order_items }