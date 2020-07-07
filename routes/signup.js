const router = require('express').Router();
const { verifyExist, verifyAttri, sendUser } = require('../controllers/userController')

router.route('/')
  .post(verifyAttri, verifyExist, sendUser)

module.exports = router;