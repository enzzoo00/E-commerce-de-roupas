import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Catalogo from "./pages/Catalogo";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar quantidadeCarrinho={0} />
      <main className="container">
        <Routes>
          <Route path="/" element={<Catalogo />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}