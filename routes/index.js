const router = require('express').Router();
const signupRoute = require('./signup');

router.use('/signup', signupRoute)

module.exports = router;