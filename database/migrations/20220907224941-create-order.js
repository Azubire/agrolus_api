"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      grandTotal: {
        type: Sequelize.INTEGER,
      },
      paymentStatus: {
        type: Sequelize.ENUM("paid", "unpaid"),
      },
      paymentType: {
        type: Sequelize.ENUM("momo", "account"),
      },
      viewed: {
        type: Sequelize.BOOLEAN,
      },
      deliveryStatus: {
        type: Sequelize.ENUM("delivered", "pending", "rejected"),
      },
      orderCode: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Orders");
  },
};
