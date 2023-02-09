const { Categoria } = require("../models")

class CategoriasController {
  static async index(req, res) {
    const categorias = await Categoria.findAll()
    res.status(200).json({
      success: true,
      data: categorias,
    })
  }
}

module.exports = CategoriasController
