module.exports = (sequelize, types) => sequelize.define('User', {
  id: {
    type: types.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  firstname: { type: types.STRING(40) },
  lastname: { type: types.STRING(40) },
  username: {
    type: types.STRING(50),
    unique: true,
  },
  password: { type: types.STRING },
  email: {
    type: types.STRING(100),
    unique: true
  },
  birthday: { type: types.DATEONLY },
  address: { type: types.STRING(100) },
  cellphone: { type: types.STRING(40) },
  admin: {
    type: types.BOOLEAN,
    defaultValue: 0
  }

}, {
  tableName: 'users',
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});