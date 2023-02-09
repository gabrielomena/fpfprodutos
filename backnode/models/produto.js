"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Produto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Categoria, {
        as: "categoria",
      })
    }
  }
  Produto.init(
    {
      descricao: DataTypes.STRING,
      preco: {
        type: DataTypes.DECIMAL(10, 2),
        set(valor) {
          if (valor) {
            this.setDataValue("preco", valor.replace(",", "").replace(".", ","))
          } else {
            this.setDataValue("preco", null)
          }
        },
      },
      dataCompra: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "Produto",
      tableName: "produtos",
    }
  )
  return Produto
}
