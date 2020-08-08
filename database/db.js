require('../dotenv');
const Sequelize = require('sequelize');
const userModel = require('./models/User');
const orderModel = require('./models/Order');
const productModel = require('./models/Product');
const orderItemModel = require('./models/Order_items');


//Connection
const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  dialect: 'mysql'
})

//Models
const User = userModel(sequelize, Sequelize);
const Product = productModel(sequelize, Sequelize);
const Order = orderModel(sequelize, Sequelize);
const Order_items = orderItemModel(sequelize, Sequelize);


//Associations
User.hasMany(Order, { as: 'orders', foreignKey: 'user_id' });
Order.belongsToMany(Product, { through: Order_items, as: 'products' });
Product.belongsToMany(Order, { through: Order_items, as: 'ProductOrder' });

//Synchronization
sequelize.sync({ force: true })
  .then(() => {
    console.log('DB sincronizada correctamente')
    Product.bulkCreate([
      {
        name: "Hamburguesa",
        description: "Hamburguesa con medallon de 120grs, lechuga y tomate",
        price: 150,
        stock: 100
      },
      {
        name: "Hamburguesa con queso",
        description: "Hamburguesa con medallon de 120grs y queso cheddar",
        price: 175,
        stock: 200
      },
      {
        name: "Hamburguesa americana",
        description: "Hamburguesa con medallon de 120grs, lechuga y tomate",
        price: 250,
        stock: 100
      },
      {
        name: "Papas fritas",
        description: "Porcion de papas fritas para una persona",
        price: 119.99,
        stock: 130
      },
      {
        name: "Pizza JyM",
        description: "Pizza de ocho porciones, con jamon y morrones",
        price: 403.33,
        stock: 100
      },
      {
        name: "Tortilla española",
        description: "Tortilla de papas con cebolla",
        price: 414.99,
        stock: 100
      },
    ])
  })
  .catch(err => console.log(err))


module.exports = { User, Order, Product, Order_items }