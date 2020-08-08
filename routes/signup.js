const router = require('express').Router();
const { signup } = require('../middlewares/signup')

router.route('/')
  .post(signup.bodyIsOk, signup.userEmailExist, signup.sendUser)

module.exports = router;