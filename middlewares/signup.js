const { userControl } = require('../controllers/userController')

const signup = {
  bodyIsOk: (req, res, next) => {
    const newUser = Object.keys(req.body);
    let userKeys = userControl.getAttributes(1, 8);
    if (newUser.toString() == userKeys.toString() || newUser.toString() == (userKeys.toString() + ',admin')) {
      next()
    } else {
      res.status(400).send('Los parametros enviados no coinciden con los necesarios.')
    }

  },
  userEmailExist: async (req, res, next) => {
    try {
      const username = await userControl.find('username', req.body.username);

      if (username) {
        res.status(409).send('ERROR usuario ya registrado');
      } else {
        const email = await userControl.find('email', req.body.email);
        if (email) {
          res.status(409).send('ERROR email ya registrado');
        } else {
          next()
        }
      }
    } catch (err) {
      res.status(500).json(err)
    }


  },
  sendUser: async (req, res) => {
    let newUser = req.body;
    try {

      await userControl.setPass(newUser);
      await userControl.new(newUser)

      res.status(201).send("Usuario creado exitosamente");

    } catch (err) {
      res.status(500).json(err)
    }
  }

}

module.exports = { signup };