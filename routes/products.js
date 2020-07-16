const router = require('express').Router();
const isAdmin = require('../middlewares/global');
const sendAll = require('../controllers/productController')

router.route('/')
  .get(isAdmin, sendAll)

module.exports = router;