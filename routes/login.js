const router = require('express').Router();
const { login } = require('../middlewares/login');

router.route('/')
  .post(login.bodyIsOk, login.userIsOk, login.passwdIsOk)

module.exports = router;