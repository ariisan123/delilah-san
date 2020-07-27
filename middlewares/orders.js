const { orderControl } = require('../controllers/orderController');
const { response } = require('express');

post = {
  productsArray: (req, res, next) => {
    const products = req.body.products;
    if (products.length > 0) {
      next()
    } else {
      res.status(400).send('Error, no se enviaron productos')
    }
  },
  productsExist: async (req, res, next) => {
    try {

      const { products } = req.body;
      let finalProducts = await orderControl.verifyProducts(products);
      console.log(finalProducts);

      if (finalProducts.length == products.length) {
        const totalAmount = orderControl.getTotalAmount(finalProducts, products);
        res.locals.totalAmount = totalAmount;
        next()
      } else {
        res.status(404).send('Producto/s no encontado/s')
      }

    } catch (err) {
      console.log(err);
      res.status(500).json(err)
    }

  },
  newOrder: async (req, res) => {
    let orderObject = req.body;
    orderObject.user_id = res.locals.user.user_id;
    orderObject.total_amount = res.locals.totalAmount;

    try {
      const order = await orderControl.new(orderObject);
      await orderControl.newItems(order, orderObject.products)

      res.status(201).send('Orden creada exitosamente!')
    } catch (err) {
      res.status(500).json(err)
    }

  }
}

get = {
  all: async (req, res) => {
    try {
      const orders = await orderControl.getAll(1);
      console.log(orders);
      res.status(200).json(orders)
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

module.exports = { post, get } 