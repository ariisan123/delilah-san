const router = require('express').Router();
const { isAdmin, isLogged } = require('../middlewares/global');
const { post, get, put } = require('../middlewares/products')

router.route('/')
  .get(isLogged, get.all)
  .post(isAdmin, post.attriNames, post.attriOk, post.new)

router.route('/:id')
  .put(isAdmin, put.exist, put.attriNames, put.attriOk, put.update)

module.exports = router;