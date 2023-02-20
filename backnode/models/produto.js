"use strict"
const {Model} = require("sequelize")
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
            descricao: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            preco: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            dataCompra: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Produto",
            tableName: "produtos",
        }
    )
    return Produto
}
