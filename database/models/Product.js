module.exports = (sequelize, type) => sequelize.define('Product', {
  id: {
    type: type.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: type.STRING
  },
  description: {
    type: type.TEXT
  },
  price: {
    type: type.DOUBLE(10, 2),
    allowNull: false
  },
  stock: {
    type: type.INTEGER
  }

}, {
  tableName: 'products',
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  paranoid: true
});