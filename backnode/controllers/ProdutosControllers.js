const { Produto } = require("../models")
const Sequelize = require("sequelize")

class ProdutosController {
  static async index(req, res) {
    let produtos = ""
    let filtro = []

    if (req.query.categorias) {
      req.query.categorias.map((e) => {
        filtro.push(e.id)
      })
      produtos = await Produto.findAll({
        include: "categoria",
        where: {
          [Sequelize.Op.or]: [{ categoriaId: { [Sequelize.Op.in]: filtro } }],
        },
      })
    } else {
      produtos = await Produto.findAll({ include: "categoria" })
    }

    res.status(200).json({
      success: true,
      data: produtos,
    })
  }

  static async store(req, res) {
    try {
      const produto = req.body.produto
      const result = await Produto.create(produto)

      res.status(200).json(result)
    } catch (e) {
      res.status(500).json({
        error: true,
        message: e.message,
      })
    }
  }

  static async show(req, res) {
    try {
      const produto = await Produto.findByPk(req.params.id, {
        include: "categoria",
      })
      res.status(200).json(produto)
    } catch (e) {
      res.status(500).json({
        error: true,
        message: e.message,
      })
    }
  }

  static async destroy(req, res) {
    console.log(req.params.id)
    try {
      const produto = await Produto.findByPk(req.params.id)
      await produto.destroy()
      res.json(true)
    } catch (e) {
      res.status(500).json({
        error: true,
        message: e.message,
      })
    }
  }
}

module.exports = ProdutosController
