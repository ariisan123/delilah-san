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
    if (err.name == 'JsonWebTokenError') {
      res.status(400).send('Error, token invalido')
    } else {
      res.status(500).json(err)
    }
  }
}

const isLogged = (req, res, next) => {
  try {
    const { token } = req.headers;
    const user = jwt.verify(token, process.env.SECRET);
    if (user.user_id) {
      res.locals.user = user
      next()
    } else {
      res.status(401).send("Token no encontrado, debes iniciar sesion")
    }
  } catch (err) {
    if (err.name == 'JsonWebTokenError') {
      res.status(400).send('Error, token invalido')
    } else {
      res.status(500).json(err)
    }
  }

}

module.exports = { isAdmin, isLogged }