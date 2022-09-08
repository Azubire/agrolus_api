"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Order, { foreignKey: "orderId" });
    }
  }
  OrderDetails.init(
    {
      orderId: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
      productId: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      distributorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "OrderDetails",
    }
  );
  return OrderDetails;
};
