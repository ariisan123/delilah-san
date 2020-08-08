const router = require('express').Router();
const { isAdmin, isLogged } = require('../middlewares/global');
const { post, get, put, delProduct } = require('../middlewares/products');
const { productControl } = require('../controllers/productController');

router.route('/')
  .get(isLogged, get.all)
  .post(isLogged, isAdmin, post.attriNames, post.attriOk, post.new)

router.route('/:id')
  .put(isLogged, isAdmin, put.exist, put.attriNames, put.attriOk, put.update)
  .delete(isLogged, isAdmin, delProduct.exist, delProduct.destroy)

module.exports = router;