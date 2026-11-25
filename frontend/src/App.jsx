import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";



export default function App() {
  return (
    <BrowserRouter>
      <Navbar quantidadeCarrinho={0} />
      <main className="container">
        <Routes>
          <Route path="/" element={<h1>Catálogo</h1>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}