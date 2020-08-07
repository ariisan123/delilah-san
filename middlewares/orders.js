const { orderControl } = require('../controllers/orderController');

const post = {
  hasProducts: (req, res, next) => {
    const { products } = req.body;
    if (products.length > 0) {
      next()
    } else {
      res.status(400).send('Error, no se enviaron productos')
    }
  },
  hasQuantity: (req, res, next) => {
    const { products } = req.body;
    for (let i = 0; i < products.length; i++) {
      if (typeof (products[i].quantity) != 'number') {
        return res.status(400).send('No se encontro la cantidad a comprar.')
      }
    }
    next()
  },
  productsExist: async (req, res, next) => {
    try {
      const { products } = req.body;
      const finalProducts = await orderControl.verifyProducts(products);

      if (finalProducts.length == products.length) {
        const totalAmount = orderControl.getTotalAmount(finalProducts, products);
        res.locals.totalAmount = totalAmount;
        next()
      } else {
        res.status(404).send('Producto no encontrado o sin stock')
      }
    } catch (err) {
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
      await orderControl.updateStock(orderObject.products)
      res.status(201).send('Orden creada exitosamente!')
    } catch (err) {
      res.status(500).json(err)
    }

  }
}

const get = {
  all: async (req, res) => {
    try {
      const id = res.locals.user.user_id;
      const orders = await orderControl.getAll(id);
      if (orders.length == 0) {
        res.status(200).send('No has realizado pedidos')
      } else {
        res.status(200).json(orders)
      }
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

const put = {
  verifyStatus: (req, res, next) => {
    const { status } = req.body;

    const statusValues = ['pending', 'processed', 'shipped', 'delivered'];
    const exist = statusValues.find(a => a == status);
    console.log(exist)

    if (exist) {
      next()
    } else {
      res.status(400).send('Valor inválido')
    }

  },
  orderExist: async (req, res, next) => {
    const { id } = req.params;
    try {
      const exist = await orderControl.getOne(id);
      if (exist) {
        next()
      } else {
        res.status(404).send('No se escontró el pedido')
      }

    } catch (err) {
      res.status(500).json(err)
    }

  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      await orderControl.updateStatus(id, status)
      res.status(200).send('Estado actualizado correctamente')
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

module.exports = { post, get, put } 