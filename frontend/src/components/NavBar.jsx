import { Link } from "react-router-dom";
import "./NavBar.css";

const AVISO = "FRETE GRÁTIS ACIMA DE R$ 299 · NOVO DROP · PIX COM DESCONTO · ";

export default function Navbar({ quantidadeCarrinho = 0 }) {
  return (
    <header className="navbar">
      <div className="navbar__faixa" aria-hidden="true">
        <div className="navbar__faixa-trilho">
          <span>{AVISO.repeat(6)}</span>
          <span>{AVISO.repeat(6)}</span>
        </div>
      </div>

      <div className="container navbar__barra">
        <Link to="/" className="navbar__logo">NOME DA LOJA</Link>

        <nav className="navbar__links">
          <Link to="/">Catálogo</Link>
          <Link to="/pedidos">Pedidos</Link>
          <Link to="/login">Entrar</Link>
          <Link to="/carrinho" className="navbar__carrinho">
            Carrinho <span className="navbar__contador">{quantidadeCarrinho}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}