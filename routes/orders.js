const router = require('express').Router();
const { isLogged, isAdmin } = require('../middlewares/global');
const { post, get } = require('../middlewares/orders');

router.route('/')
  .post(isLogged, post.productsArray, post.productsExist, post.newOrder)
  .get(isAdmin, get.all)


module.exports = router;