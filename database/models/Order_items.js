module.exports = (sequelize, type) => sequelize.define('Order_item', {
  quantity: {
    type: type.INTEGER,
    alowNull: false,
  }

}, {
  tableName: 'order_items',
  underscored: true,
  timestamps: false
})