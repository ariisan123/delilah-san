const router = require('express').Router();
const { isLogged, isAdmin } = require('../middlewares/global');
const { post, get, put } = require('../middlewares/orders');

router.route('/')
  .post(isLogged, post.hasProducts, post.hasQuantity, post.productsExist, post.newOrder)
  .get(isLogged, get.all)

router.route('/:id')
  .put(isLogged, isAdmin, put.verifyStatus, put.orderExist, put.update)


module.exports = router;