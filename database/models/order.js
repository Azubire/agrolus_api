"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "userId" });
      this.hasMany(models.OrderDetails, { foreignKey: "orderId" });
    }
  }
  Order.init(
    {
      grandTotal: DataTypes.INTEGER,
      paymentStatus: DataTypes.ENUM("paid", "unpaid"),
      paymentType: DataTypes.ENUM("momo", "account"),
      viewed: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      deliveryStatus: {
        type: DataTypes.ENUM("delivered", "pending", "rejected"),
        defaultValue: 0,
      },
      orderCode: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "orders",
    }
  );
  return Order;
};
