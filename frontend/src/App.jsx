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
          <Route path="/cadastrar" element={<FormProdutos />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
