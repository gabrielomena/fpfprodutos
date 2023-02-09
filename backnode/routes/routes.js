const express = require("express")
const ProdutosController = require("../controllers/ProdutosControllers")

const routes = express.Router()

routes.get("/", ProdutosController.index)

module.exports = routes
