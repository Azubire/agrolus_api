"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Distributor, { foreignKey: "userId" });
      this.hasMany(models.Order, { foreignKey: "userId" });
      this.hasMany(models.Ad, { foreignKey: "userId" });
      this.hasMany(models.Transaction, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      fullname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      contact: DataTypes.STRING,
      location: DataTypes.STRING,
      img: { type: DataTypes.STRING, defaultValue: "default_profile.jpg" },
      accountBalance: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
