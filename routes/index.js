const router = require('express').Router();
const signupRoute = require('./signup');
const loginRoute = require('./login');
const productsRoute = require('./products');
const orderRoute = require('./orders');

router.use('/signup', signupRoute)
router.use('/login', loginRoute)
router.use('/products', productsRoute)
router.use('/orders', orderRoute)

module.exports = router;