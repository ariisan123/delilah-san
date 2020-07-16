const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../database/db');
require('../dotenv');

const signup = {
  bodyIsOk: (req, res, next) => {
    const newUser = Object.keys(req.body);
    let userKeys = Object.keys(User.rawAttributes);
    userKeys = userKeys.splice(1, 8);

    if (newUser.toString() == userKeys.toString()) {
      next()
    } else {
      res.status(400).send('Los parametros enviados no coinciden con los necesarios.')
    }

  },
  userExist: async (req, res, next) => {
    const exist = await User.findOne({
      where:
      {
        username: req.body.username,
        email: req.body.email
      }
    })

    if (!exist) {
      next()
    } else {
      res.status(409).send('ERROR usuario/email ya registrados')
    }
  },
  sendUser: async (req, res) => {
    let newUser = req.body;
    try {
      const encryptPass = await bcrypt.hash(newUser.password, 12);
      newUser.password = encryptPass;
      await User.create(newUser);

      res.status(201).send("Usuario creado exitosamente");

    } catch (err) {
      res.status(409).send('Error', err)
      console.log(err)
    }
  }

}

const login = {
  bodyIsOk: async (req, res, next) => {
    try {
      const bodyArr = Object.getOwnPropertyNames(req.body);

      if (bodyArr.length == 2 && bodyArr[0] == 'username' && bodyArr[1] == 'password') {
        next()
      } else {
        res.status(400).send('Datos incorrectos, debes enviar el usuario y contraseña');
      }

    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
  userIsOk: async (req, res, next) => {
    try {
      const exist = await User.findOne({
        where: { username: req.body.username }
      })

      if (exist) {
        res.locals.user = exist;
        next()
      } else {
        res.status(400).send('Usuario inexistente')
      }

    } catch (err) {
      console.log(err);
      res.status(400).json(err)
    }

  },
  passwdIsOk: async (req, res) => {

    try {
      const { user } = res.locals;

      const passOk = await bcrypt.compare(req.body.password, user.password);
      if (passOk) {
        const token = jwt.sign({
          user_id: user.id,
          admin: user.admin,
        }, process.env.SECRET)
        res.status(200).json(token)
      } else {
        res.status(400).send('Contraseña incorrecta')
      }

    } catch (err) {
      console.log(err);
      res.status(400).json(err)
    }

  }
}


module.exports = { signup, login }