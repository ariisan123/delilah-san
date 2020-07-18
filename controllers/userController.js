const { User } = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('../dotenv');

const userControl = {
  find: async (attribute, value) => {
    try {
      const user = await User.findOne({
        where: { [attribute]: value }
      })

      if (user) {
        return user
      } else {
        return false
      }
    } catch (err) {
      return err;
    }
  },
  new: async (userObject) => {
    try {
      await User.create(userObject);
    } catch (err) {
      return err
    }

  },
  getAttributes: (start, end) => {
    let attributes = Object.keys(User.rawAttributes).splice(start, end);
    return attributes;
  },
  setPass: async (userObject) => {
    try {
      const encryptPass = await bcrypt.hash(userObject.password, 12);
      userObject.password = encryptPass;
      return userObject;
    } catch (err) {
      return err;
    }
  },
  comparePass: async (bodyPass, userPass) => {
    try {
      const ok = await bcrypt.compare(bodyPass, userPass)
      return ok
    } catch (err) {
      return err;
    }
  },
  setJwt: (id, admin) => {
    try {
      const token = jwt.sign({
        user_id: id,
        admin: admin,
      }, process.env.SECRET)
      return token;
    } catch (err) {
      return err
    }

  }
}


module.exports = { userControl }