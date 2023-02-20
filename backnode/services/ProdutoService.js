const yup = require("yup");
const {Produto, sequelize} = require("../models")
const Sequelize = require("sequelize");

class ProdutoService {
    static async getProdutos(filtros) {
        let filtro = []
        if (filtros.categorias) {
            filtros.categorias.map((e) => {
                filtro.push(e.id)
            })
            return await Produto.findAll({
                include: "categoria",
                where: {
                    [Sequelize.Op.or]: [{categoriaId: {[Sequelize.Op.in]: filtro}}],
                },
            })
        } else {
            return await Produto.findAll({include: "categoria"})
        }
    }

    static async save(produto) {
        try {
            await this.validator(produto)
            return await sequelize.transaction(async (db) => {
                return await Produto.create(produto, {transition: db})
            })
        } catch (e) {
            return {
                error: true,
                messages: e.errors
            }
        }
    }

    static async update({id, update}) {
        try {
            await this.validator(update)
            const produto = await Produto.findByPk(id)
            if (!produto){
                return {
                    error: true,
                    messages: [{message: "Produto não existe!"}]
                }
            }
            return await sequelize.transaction(async (db) => {
                return await produto.update(update, {transition: db})
            })
        } catch (e) {
            return {
                error: true,
                messages: e.errors
            }
        }

    }

    static async validator(produto) {
        const validator = yup.object().shape({
            descricao: yup.string().required({message: "Descrição Obrigatória"}),
            preco: yup.number().required({message: "Preço Obrigatório"}),
            dataCompra: yup.date().required({message: "Data Obrigatória"}),
            categoriaId: yup.number().required({message: "Categoria Obrigatório"})
        })
        return await validator.validateSync(produto, {abortEarly: false})
    }
}

module.exports = ProdutoService