import { FloppyDisk } from "phosphor-react"
import { Button, Card, Col, Form, Row } from "react-bootstrap"
import { Layout } from "../components/Layout"

export function FormProdutos() {
  const categorias = [
    {
      id: "1",
      descricao: "Eletronico",
    },
    {
      id: "2",
      descricao: "Livraria",
    },
    {
      id: "3",
      descricao: "Música",
    },
  ]
  return (
    <Layout>
      <Card>
        <Card.Body>
          <Card.Title>Cadastro de Produto</Card.Title>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formDescricao">
                <Form.Label>Descricao</Form.Label>
                <Form.Control type="text" placeholder="Descrição do Produto" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Data da Compra</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Preço</Form.Label>
                <Form.Control type="text" mask="000.000.000-00" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Categoria</Form.Label>
                <Form.Select defaultValue="Selecione a Categoria">
                  {categorias.map((e) => (
                    <option value={e.id}>{e.descricao}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>
            <Button variant="primary" type="submit">
              <FloppyDisk size={25} /> Cadastrar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Layout>
  )
}
