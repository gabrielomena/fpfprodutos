const express = require("express")
const CategoriasController = require("../controllers/CategoriasController")
const ProdutosController = require("../controllers/ProdutosControllers")

const routes = express.Router()

routes.get("/", ProdutosController.index)

routes.post("/produtos", ProdutosController.store)

routes.get("/produto/:id", ProdutosController.show)

routes.put("/produto/:id", ProdutosController.update)

routes.delete("/produto/:id", ProdutosController.destroy)

routes.get("/categorias", CategoriasController.index)

module.exports = routes
