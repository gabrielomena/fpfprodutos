const { Produto } = require("../models")

class ProdutosController {
  static async index(req, res) {
    const produtos = await Produto.findAll()
    res.status(200).json({
      success: true,
      data: produtos,
    })
  }
}

module.exports = ProdutosController
