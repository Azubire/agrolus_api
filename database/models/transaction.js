"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Transaction.init(
    {
      name: DataTypes.STRING,
      momoNumber: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      trx_code: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      status: DataTypes.ENUM("pending", "completed", "rejected"),
    },
    {
      sequelize,
      modelName: "Transaction",
      tableName: "transactions",
    }
  );
  return Transaction;
};
