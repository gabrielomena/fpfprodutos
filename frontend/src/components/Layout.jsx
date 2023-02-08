import { Container } from "react-bootstrap"

export function Layout({ children }) {
  return (
    <>
      <Container className="mt-4">{children}</Container>
    </>
  )
}
