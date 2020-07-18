const { userControl } = require('../controllers/userController')

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
      const exist = await userControl.find('username', req.body.username);
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

      const passOk = await userControl.comparePass(req.body.password, user.password);
      if (passOk) {
        const token = userControl.setJwt(user.id, user.admin)
        res.status(200).json(token)
      } else {
        res.status(400).send('Contraseña incorrecta')
      }

    } catch (err) {
      res.status(500).json(err)
    }

  }
}

module.exports = { login };