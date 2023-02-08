import { Pencil, Trash } from "phosphor-react"
import { useState } from "react"
import { Badge, Button } from "react-bootstrap"
import DataTable from "react-data-table-component"
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

  const columns = [
    {
        name: 'Ações',
        width: "120px",
        cell: (row) => <><Button title="Editar Produto" className="me-2 px-2 py-1">
        <Pencil size={20} />
      </Button>
      <Button
        title="Remover Produto"
        variant="danger"
        onClick={()=>deletar(row.id)}
        className="px-2 py-1"
      >
        <Trash size={20} />
      </Button></>
    },
    {
        name: 'Descrição',
        selector: row => row.descricao,
    },
    {
      name: 'Preço',
      selector: row => row.preco,
  },
  {
    name: 'Data de Compra',
    selector: row => row.dataCompra,
},
{
  name: 'Categoria',
  cell:(row) => <Badge bg="dark">{row.categoria}</Badge>
},
];

const paginationComponentOptions = {
  rowsPerPageText: 'Produtos por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};

const data = [
    {
        id: 1,
        descricao: 'Playstation',
        preco: '2500',
        dataCompra: '01/02/2023',
        categoria: 'Lazer'
    },
    {
        id: 2,
        descricao: 'Xbox',
        preco: '2500',
        dataCompra: '01/02/2023',
        categoria: 'Lazer'
    },
]
  const [selectedOption, setSelectedOption] = useState(null)

  const handleChange = (data) => {
    setSelectedOption(selectedOption)
  }

  const deletar = (id) => {
    Swal.fire({
      title: "Você tem certeza que deseja deletar este produto?",
      showDenyButton: true,
      confirmButtonText: "Sim",
      denyButtonText: "Cancelar",
    }).then((result) => {
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
     <DataTable
            columns={columns}
            data={data}
            pagination
            paginationComponentOptions={paginationComponentOptions}
            highlightOnHover
        />

      {/* <Table striped bordered hover responsive>
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
              <Button title="Editar Produto" className="me-2 px-2 py-1">
                <Pencil size={20} />
              </Button>
              <Button
                title="Remover Produto"
                variant="danger"
                onClick={deletar}
                className="px-2 py-1"
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
      </Table> */}
    </Layout>
  )
}


