import { Pencil, Trash } from "phosphor-react"
import { useState } from "react"
import { Badge, Button, Table } from "react-bootstrap"
import Select from "react-select"
import makeAnimated from "react-select/animated"
import Swal from "sweetalert2"
import { Layout } from "../components/Layout"
const animatedComponents = makeAnimated()
export function Index() {
  const opcoes = [
    {
      value: "1",
      label: "Eletronico",
    },
    {
      value: "2",
      label: "Livro",
    },
    {
      value: "3",
      label: "Música",
    },
    {
      value: "4",
      label: "Lazer",
    },
  ]

  const [selectedOption, setSelectedOption] = useState(null)

  const handleChange = (data) => {
    setSelectedOption(selectedOption)
  }

  const handleDelet = () => {
    Swal.fire({
      title: "Você tem certeza que deseja deletar?",
      showDenyButton: true,
      confirmButtonText: "Sim",
      denyButtonText: "Cancelar",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success")
      }
    })
  }

  return (
    <Layout>
      <Select
        placeholder="Filtre as Categorias"
        components={animatedComponents}
        className="mb-3"
        closeMenuOnSelect={false}
        isMulti
        options={opcoes}
        onChange={handleChange}
      />

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
              <Button
                title="Remover Produto"
                variant="danger"
                onClick={handleDelet}
              >
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
