import { BrowserRouter, Route, Routes } from "react-router-dom"
import { NavBars } from "./components/NavBar"
import { FormProdutos } from "./pages/FormProdutos"
import { Index } from "./pages/Index"

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBars />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/cadastrar"
            element={<FormProdutos titulo="Cadastrar Produto" />}
          />
          <Route
            path="/produto/:id"
            element={<FormProdutos titulo="Editar Produto" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
