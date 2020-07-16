const router = require('express').Router();
const signupRoute = require('./signup');
const loginRoute = require('./login');
const productsRoute = require('./products');

router.use('/signup', signupRoute)
router.use('/login', loginRoute)
router.use('/products', productsRoute)

module.exports = router;