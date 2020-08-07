const { Order, Product } = require('../database/db');
const { Op } = require('sequelize');

const orderControl = {
  new: async (orderObject) => {
    try {
      const newOrder = await Order.create(orderObject)
      return newOrder
    } catch (err) { return err }
  },
  newItems: async (orderInstance, productsObject) => {
    try {
      await productsObject.forEach(async (element) => {
        try {
          await orderInstance.addProducts(element.id, { through: { quantity: element.quantity } })
        } catch (err) { return err }

      });
    } catch (err) { return err }
  },
  getProduct: async (objectProduct) => {
    try {
      const product = await Product.findOne({
        where: {
          id: objectProduct.id,
          stock: {
            [Op.and]: {
              [Op.gte]: objectProduct.quantity
            }
          }
        },
        attributes: ['price']
      })
      if (!product) {
        return false
      } else {
        return product
      }
    } catch (err) { return err }
  },
  verifyProducts: async (productsArr) => {
    try {
      let finalProducts = [];
      for (let i = 0; i < productsArr.length; i++) {
        const exist = await orderControl.getProduct(productsArr[i]);
        if (exist) {
          finalProducts.push({ id: productsArr[i].id, price: exist.dataValues.price });
        } else {
          return finalProducts
        }
      }
      return finalProducts

    } catch (err) { return err }
  },
  getTotalAmount: (priceArr, productsArr) => {
    let totalAmount = 0

    priceArr.forEach((element, index) => {
      totalAmount += (element.price * productsArr[index].quantity);
      console.log(totalAmount);
    })

    return totalAmount;
  },
  getAll: async (id) => {
    try {
      const order = await Order.findAll({
        where: { user_id: id },
        attributes: [['id', 'order_id'], 'status', 'total_amount', 'payment'],
        include: [
          {
            model: Product,
            as: 'products',
            attributes: ['id', 'name', 'price', 'description'],
            through: {
              as: 'item',
              attributes: ['quantity']
            }
          }
        ]
      })
      return order
    } catch (err) { return err }
  },
  updateStatus: async (id, newStatus) => {
    try {
      await Order.update({ status: newStatus }, {
        where: {
          id: id
        }
      })
    } catch (err) { return err }
  },
  getOne: async (id) => {
    try {
      const order = await Order.findOne({
        where: {
          id: id
        },
        attributes: [['id', 'order_id'], 'status', 'total_amount', 'payment'],
        include: [
          {
            model: Product,
            as: 'products',
            attributes: ['id', 'name', 'price', 'description'],
            through: {
              as: 'item',
              attributes: ['quantity']
            }
          }
        ]
      })

      if (order) {
        console.log(order);
        return order
      } else {
        return false
      }

    } catch (err) { return err }
  },
  updateStock: async (objectProduct) => {
    try {
      objectProduct.forEach(async element => {
        const object = await Product.decrement(['stock'], { by: element.quantity, where: { id: element.id } })
        console.log(object);
      })
    } catch (err) { return err }
  }
}

module.exports = { orderControl }