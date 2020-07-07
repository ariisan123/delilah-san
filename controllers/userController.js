const bcrypt = require('bcrypt');
const { User } = require('../database/db');

const verifyExist = async (req, res, next) => {
  const exist = await User.findOne({
    where:
    {
      username: req.body.username,
      email: req.body.email
    }
  })

  if (exist) {
    res.status(409).send('ERROR usuario/email ya registrados')
  } else {
    next()
  }
}

const verifyAttri = async (req, res, next) => {
  const newUser = Object.keys(req.body);
  let userKeys = Object.keys(User.rawAttributes);
  userKeys = userKeys.splice(1, 8);

  if (newUser.toString() == userKeys.toString()) {
    next()
  } else {
    res.status(400).send('Los parametros enviados no coinciden con los necesarios.')
  }

}

const sendUser = async (req, res) => {
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

module.exports = { verifyExist, verifyAttri, sendUser }