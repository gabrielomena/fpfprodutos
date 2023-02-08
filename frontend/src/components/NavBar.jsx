import { ListChecks, ListPlus } from "phosphor-react"
import { Container, Nav, Navbar } from "react-bootstrap"
import { NavLink } from "react-router-dom"

export function NavBars() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>FPF Produtos</Navbar.Brand>
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">
              <ListChecks size={20} className="me-2" />
              Lista de Produtos
            </NavLink>
            <NavLink className="nav-link" to="/cadastrar">
              <ListPlus size={20} className="me-2" />
              Cadastro de Produtos
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}
