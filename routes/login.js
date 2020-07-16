const router = require('express').Router();
const { login } = require('../controllers/userController');

router.route('/')
  .post(login.bodyIsOk, login.userIsOk, login.passwdIsOk)

module.exports = router;