"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Distributor extends Model {
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
  Distributor.init(
    {
      img: DataTypes.STRING,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      contact: DataTypes.STRING,
      website: DataTypes.STRING,
      profile: DataTypes.STRING,
      transactions: DataTypes.INTEGER,
      location: DataTypes.STRING,
      ratings: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Distributor",
      tableName: "distributors",
    }
  );
  return Distributor;
};
