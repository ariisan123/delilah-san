const { Product } = require('../database/db');

const sendAll = async (req, res) => {
  try {
    const products = Product.findAll({
      attributes: ['id', 'name', 'description', 'price', 'stock']
    })

    res.status(200).json(products);

  } catch (err) {
    console.log(err)
    res.status(409).json(err);
  }
}


module.exports = sendAll;