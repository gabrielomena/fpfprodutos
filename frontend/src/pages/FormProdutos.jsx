import {FloppyDisk, X} from "phosphor-react"
import {useEffect, useState} from "react"
import {Alert, Button, Card, Col, Form, Row} from "react-bootstrap"
import CurrencyInput from "react-currency-input-field"
import {useNavigate, useParams} from "react-router-dom"
import Swal from "sweetalert2"
import {Layout} from "../components/Layout"
import api from "../config/api"

export function FormProdutos({titulo}) {
    const [categorias, setCategorias] = useState([])
    const [errors, setErrors] = useState([])
    const [descricao, setDescricao] = useState("")
    const [preco, setPreco] = useState("")
    const [dataCompra, setDataCompra] = useState("")
    const [categoriaId, setCategoriaId] = useState(0)

    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        if (id) {
            api.get("/produto/" + id).then(({data}) => {
                setDescricao(data.data.descricao)
                setPreco(data.data.preco)
                setDataCompra(data.data.dataCompra)
                setCategoriaId(data.data.categoriaId)
            })
        } else {
            setDescricao("")
            setPreco("")
            setDataCompra("")
            setCategoriaId(0)
        }
    }, [id])

    useEffect(() => {
        api.get("/categorias").then(({data}) => {
            setCategorias(data.data)
        })
    }, [])

    const enviar = (event) => {
        event.preventDefault()
        if (id) {
            api
                .put("/produto/" + id, {
                    descricao: descricao,
                    preco: preco.replace('.', '').replace(',', '.'),
                    dataCompra: dataCompra,
                    categoriaId: categoriaId,
                })
                .then((response) => {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Produto Editado com sucesso!",
                        showConfirmButton: false,
                        timer: 1500,
                    }).then(() => {
                        navigate("/")
                    })
                }).catch((error) => {
                setErrors(error.response.data.messages)
            })
        } else {
            api
                .post("/produto", {
                    descricao: descricao,
                    preco: preco.replace('.', '').replace(',', '.'),
                    dataCompra: dataCompra,
                    categoriaId: categoriaId,
                })
                .then((response) => {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Produto Cadastrado com sucesso!",
                        showConfirmButton: false,
                        timer: 1500,
                    }).then(() => {
                        navigate("/")
                    })
                }).catch((error) => {
                setErrors(error.response.data.messages)
            })
        }
    }

    return (
        <Layout>
            <Card>
                {errors.map((erro, index) => (
                    <div className="p-3" key={index}>
                        <Alert variant="danger" className="mt-2">{erro.message}</Alert>
                    </div>
                ))}
                <Card.Body>
                    <Card.Title>{titulo}</Card.Title>
                    <Form onSubmit={enviar}>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formDescricao">
                                <Form.Label>Descricao</Form.Label>
                                <Form.Control
                                    value={descricao}
                                    type="text"
                                    required
                                    name="descricao"
                                    placeholder="Descri????o do Produto"
                                    onChange={(e) => setDescricao(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Data da Compra</Form.Label>
                                <Form.Control
                                    value={dataCompra}
                                    type="date"
                                    required
                                    name="dataCompra"
                                    max={new Date().toISOString().split("T")[0]}
                                    onChange={(e) => setDataCompra(e.target.value)}
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>Pre??o</Form.Label>
                                <CurrencyInput
                                    intlConfig={{locale: "pt-BR", currency: "BRL"}}
                                    name="preco"
                                    value={preco}
                                    onValueChange={(e) => setPreco(e)}
                                    className="form-control"
                                    required
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Categoria</Form.Label>
                                <Form.Select
                                    required
                                    name="categoriaId"
                                    onChange={(e) => setCategoriaId(e.target.value)}
                                    value={categoriaId}
                                >
                                    <option value="">--- Selecione uma Categoria ---</option>
                                    {categorias.map((e) => (
                                        <option key={e.id} value={e.id}>
                                            {e.nome}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Button variant="primary" type="submit">
                            <FloppyDisk size={25}/> Salvar
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() => {
                                navigate("/")
                            }}
                            className="ms-4"
                        >
                            <X size={25}/> Cancelar
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Layout>
    )
}
