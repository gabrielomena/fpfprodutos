import {Pencil, Trash} from "phosphor-react"
import {useContext, useEffect, useState} from "react"
import {Badge, Button} from "react-bootstrap"
import DataTable from "react-data-table-component"
import {Link} from "react-router-dom"
import Select from "react-select"
import makeAnimated from "react-select/animated"
import Swal from "sweetalert2"
import {Layout} from "../components/Layout"
import api from "../config/api"
import {LoadingContext} from "../context/LoadingContext.jsx";

const animatedComponents = makeAnimated()

export function Index() {
    const {setLoading} = useContext(LoadingContext)
    const [produtosDt, setProdutosDt] = useState([])
    const [categorias, setCategorias] = useState([])
    const [reload, setReload] = useState(false)

    const [categoriasSelecionadas, setCategoriasSelecionadas] = useState(null)

    useEffect(() => {
        try {
            setLoading(true)
            api.get("/categorias").then(async ({data}) => {
                await setCategorias(data.data)
            })
            api.get("/").then(({data}) => {
                setProdutosDt(data.data)
            }).finally(() => {
                setLoading(false)
                setReload(false)
            })
        } catch (e) {
        }

    }, [reload, setLoading])

    const columns = [
        {
            name: "Ações",
            width: "120px",
            cell: (row) => (
                <>
                    <Link to={"/produto/" + row.id}>
                        <Button title="Editar Produto" className="me-2 px-2 py-1">
                            <Pencil size={20}/>
                        </Button>
                    </Link>
                    <Button
                        title="Remover Produto"
                        variant="danger"
                        onClick={() => deletar(row.id)}
                        className="px-2 py-1"
                    >
                        <Trash size={20}/>
                    </Button>
                </>
            ),
        },
        {
            name: "Descrição",
            selector: (row) => row.descricao,
        },
        {
            name: "Preço",
            selector: (row) =>
                new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                }).format(row.preco),
        },
        {
            name: "Data de Compra",
            selector: (row) => row.dataCompra.split("-").reverse().join("/"),
        },
        {
            name: "Categoria",
            cell: (row) => <Badge bg="dark">{row.categoria.nome}</Badge>,
        },
    ]

    const paginationComponentOptions = {
        rowsPerPageText: "Produtos por página",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Todos",
    }

    const filtrarProduto = (categorias) => {
        setCategoriasSelecionadas(categorias)
        api
            .get("/", {
                params: {
                    categorias: categorias,
                },
            })
            .then(({data}) => {
                setProdutosDt(data.data)
            })
    }

    const deletar = (id) => {
        Swal.fire({
            title: "Você tem certeza que deseja deletar este produto?",
            showDenyButton: true,
            confirmButtonText: "Sim",
            denyButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                api.delete("/produto/" + id).then(({data}) => {
                    Swal.fire("Deletado com Sucesso!", "", "success").then(() => {
                        setReload(true)
                        setCategoriasSelecionadas(null)
                    })
                })
            }
        })
    }

    return (
        <Layout>
            <Select
                placeholder="Filtre as Categorias"
                components={animatedComponents}
                className="mb-3"
                value={categoriasSelecionadas}
                closeMenuOnSelect={true}
                isMulti
                options={categorias}
                getOptionLabel={(option) => option.nome}
                getOptionValue={(option) => option.id}
                onChange={filtrarProduto}
            />
            <DataTable
                columns={columns}
                data={produtosDt}
                noDataComponent="Produto não encontrado!"
                pagination
                paginationComponentOptions={paginationComponentOptions}
                highlightOnHover
            />
        </Layout>
    )
}
