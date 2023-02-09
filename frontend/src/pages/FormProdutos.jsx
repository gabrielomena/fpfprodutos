import { FloppyDisk } from "phosphor-react"
import { useEffect, useState } from "react"
import { Button, Card, Col, Form, Row } from "react-bootstrap"
import CurrencyInput from "react-currency-masked-input"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import { Layout } from "../components/Layout"
import api from "../config/api"

export function FormProdutos({ titulo }) {
  const [categorias, setCategorias] = useState([])
  const navigate = useNavigate()
  const { id } = useParams()
  const [produto, setProduto] = useState({
    descricao: "",
    dataCompra: "",
    preco: "",
  })

  useEffect(() => {
    if (id) {
      api.get("/produto/" + id).then(({ data }) => {
        setProduto(data)
      })
    }
  }, [id, setProduto])

  const valorInput = (e) => {
    console.log(e)
    setProduto({ ...produto, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    api.get("/categorias").then(({ data }) => {
      setCategorias(data.data)
    })
  }, [])

  const enviar = (event) => {
    event.preventDefault()
    api.post("/produtos", { produto: produto }).then((response) => {
      if (response.status == 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Produto Cadastrado com sucesso!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate("/")
        })
      }
    })
  }

  return (
    <Layout>
      <Card>
        <Card.Body>
          <Card.Title>{titulo}</Card.Title>
          <Form onSubmit={enviar}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formDescricao">
                <Form.Label>Descricao</Form.Label>
                <Form.Control
                  value={produto.descricao}
                  type="text"
                  required
                  name="descricao"
                  placeholder="Descrição do Produto"
                  onChange={valorInput}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Data da Compra</Form.Label>
                <Form.Control
                  value={produto.dataCompra}
                  type="date"
                  required
                  name="dataCompra"
                  onChange={valorInput}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Preço</Form.Label>
                <CurrencyInput
                  prefix="£"
                  name="preco"
                  placeholder="$1,234,567"
                  onChange={valorInput}
                  className="form-control"
                  value={produto.preco}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Categoria</Form.Label>
                <Form.Select
                  required
                  name="categoriaId"
                  onChange={valorInput}
                  value={produto.categoriaId}
                >
                  <option value="">--- Selecione uma Categoria --- </option>
                  {categorias.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.nome}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>
            <Button variant="primary" type="submit">
              <FloppyDisk size={25} /> Salvar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Layout>
  )
}
