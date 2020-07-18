const { Product } = require('../database/db');

const productControl = {
  getAll: async () => {
    try {
      const products = await Product.findAll({
        attributes: ['id', 'name', 'description', 'price', 'stock']
      })
      return products;
    } catch (err) {
      return err;
    }
  },
  new: async (productObject) => {
    try {
      const newProduct = await Product.create(productObject);
      const response = await newProduct;
      return response.dataValues;
    } catch (err) {
      return err;
    }
  },
  getAttributes: (start, end) => {
    let attributes = Object.keys(Product.rawAttributes).splice(start, end);
    return attributes;
  },
  update: async (productId, object) => {
    try {
      return await Product.update(object, {
        where: {
          id: productId
        }
      })
    } catch (err) {
      return err;
    }

  },
  getOne: async (attribute, value) => {
    try {
      const exist = await Product.findOne(
        {
          where: { [attribute]: value },
          attributes: ['id', 'name', 'description', 'price', 'stock']
        })

      if (exist) {
        return exist;
      } else {
        return false;
      }
    } catch (err) {
      return err;
    }
  },
  attriNull: (object) => {
    let isOk = 0;
    for (data in object) {
      if ((data == 'price' || data == 'stock') && typeof (object[data]) == 'number') {
        isOk++
      } else if ((data === 'name' || data === 'description') && object[data].length >= 3) {
        isOk++
      }
    }
    return isOk
  }

}


module.exports = { productControl };

