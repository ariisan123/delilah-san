const jwt = require('jsonwebtoken');
require('../dotenv');

const isAdmin = async (req, res, next) => {
  const { token } = req.headers;

  try {
    const user = jwt.verify(token, process.env.SECRET);
    if (user.admin) {
      next()
    } else {
      res.status(401).send('No autorizado')
    }
  } catch (err) {
    console.log(err)
    res.status(400).send('Error')
  }
}

module.exports = isAdmin