module.exports = (sequelize, type) => sequelize.define('Order', {
  id: {
    type: type.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  description: {
    type: type.TEXT,
  },
  status: {
    type: type.ENUM,
    values: ['pending', 'processed', 'shipped', 'delivered'],
    defaultValue: 'pending',
    allowNull: false
  },
  total_amount: {
    type: type.DOUBLE(20, 2),
    allowNull: true
  },
  payment: {
    type: type.BOOLEAN,
    defaultValue: 0 // 0 = false = tarjeta ------ 1 = true = efectivo
  }

}, {
  tableName: 'orders',
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});