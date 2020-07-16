const router = require('express').Router();
const { signup } = require('../controllers/userController')

router.route('/')
  .post(signup.bodyIsOk, signup.userExist, signup.sendUser)

module.exports = router;