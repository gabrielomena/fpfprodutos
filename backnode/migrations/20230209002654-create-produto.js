"use strict"
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("produtos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      descricao: {
        type: Sequelize.STRING,
      },
      preco: {
        type: Sequelize.DECIMAL(10, 2),
      },
      dataCompra: {
        type: Sequelize.DATEONLY,
      },
      categoriaId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "categorias",
          },
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("produtos")
  },
}
