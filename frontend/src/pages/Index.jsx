import { Pencil, Trash } from "phosphor-react"
import { Badge, Button, Table } from "react-bootstrap"
import { Layout } from "../components/Layout"

export function Index() {
  return (
    <Layout>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Ações</th>
            <th>Descrição</th>
            <th>Data de Compra</th>
            <th>Preço</th>
            <th>Categoria</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Button title="Editar Produto" className="me-2">
                <Pencil size={20} />
              </Button>
              <Button title="Remover Produto" variant="danger">
                <Trash size={20} />
              </Button>
            </td>
            <td>Playstation 5</td>
            <td>10/02/2023</td>
            <td>R$5.000,00</td>
            <td>
              <Badge bg="dark">Lazer</Badge>
            </td>
          </tr>
        </tbody>
      </Table>
    </Layout>
  )
}
