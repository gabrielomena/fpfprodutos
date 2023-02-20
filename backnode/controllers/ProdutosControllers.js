const {Produto, sequelize} = require("../models")
const ProdutoService = require("../services/ProdutoService");

class ProdutosController {
    static async index(req, res) {
        try {
            const result = await ProdutoService.getProdutos(req.query)
            return res.status(200).json({
                success: true,
                data: result
            })
        } catch (e) {
            res.status(500).json({
                error: true,
                message: "Erro ao carregar produtos!",
            })
        }
    }

    static async store(req, res) {
        try {
            const result = await ProdutoService.save(req.body)
            if (result.error) {
                return res.status(422).json({
                    error: true,
                    messages: result.messages
                })
            }
            return res.status(200).json({
                success: true,
                data: result
            })
        } catch (e) {
            return res.status(500).json({
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
            return res.status(200).json({
                success: true,
                data: produto
            })
        } catch (e) {
            return res.status(500).json({
                error: true,
                message: e.message,
            })
        }
    }

    static async update(req, res) {
        const data = {
            id: req.params.id,
            update: req.body
        }
        try {
            const result = await ProdutoService.update(data)
            if (result.error) {
                return res.status(422).json({
                    error: true,
                    messages: result.messages
                })
            }
            return res.status(200).json({
                success: true,
                data: result
            })
        } catch (e) {
            return res.status(500).json({
                error: true,
                message: e.message,
            })
        }
    }

    static async destroy(req, res) {
        try {
            const produto = await Produto.findByPk(req.params.id)
            if (!produto){
                return res.status(404).json({
                    error: true,
                    messages: [{message: "Produto não existe!"}],
                })
            }
            await sequelize.transaction(async (db) => {
                return await produto.destroy({transaction:db})
            })
            return res.status(200).json({
                success: true,
                data: "Produto deletado com sucesso!"
            })
        } catch (e) {
            return res.status(500).json({
                error: true,
                message: e.message,
            })
        }
    }
}

module.exports = ProdutosController
