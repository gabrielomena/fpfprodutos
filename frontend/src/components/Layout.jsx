import { Container } from "react-bootstrap"
import { NavBars } from "./NavBar"

export function Layout({ children }) {
  return (
    <>
      <NavBars />
      <Container className="mt-4">{children}</Container>
    </>
  )
}
