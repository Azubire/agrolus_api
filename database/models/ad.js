"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.OrderDetails, { foreignKey: "productId" });
      this.belongsTo(models.User, { foreignKey: "userId" });
      this.belongsTo(models.Category, { foreignKey: "categoryId" });
    }
  }
  Ad.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.FLOAT,
      img: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Ad",
      tableName: "ads",
    }
  );
  return Ad;
};
