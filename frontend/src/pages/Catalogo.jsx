import { useEffect, useMemo, useState } from "react";
import { catalogoApi } from "../api/catalogoApi";
import ProdutoCard from "../components/ProdutoCard";
import "./Catalogo.css";

const CATEGORIAS = [
  { valor: "todos", rotulo: "Todos" },
  { valor: "camisetas", rotulo: "Camisetas" },
  { valor: "moletons", rotulo: "Moletons" },
  { valor: "calcas", rotulo: "Calças" },
  { valor: "acessorios", rotulo: "Acessórios" },
];

export default function Catalogo() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [categoria, setCategoria] = useState("todos");
  const [busca, setBusca] = useState("");
  const [ordem, setOrdem] = useState("padrao");

  useEffect(() => {
    let cancelado = false;

    async function carregar() {
      try {
        const dados = await catalogoApi.listar();
        if (!cancelado) setProdutos(dados);
      } catch {
        if (!cancelado) setErro("Não foi possível carregar os produtos. Tente novamente.");
      } finally {
        if (!cancelado) setCarregando(false);
      }
    }

    carregar();
    return () => { cancelado = true; };
  }, []);

  const lista = useMemo(() => {
    let resultado = produtos.filter(
      (p) =>
        (categoria === "todos" || p.categoria === categoria) &&
        p.nome.toLowerCase().includes(busca.toLowerCase())
    );
    if (ordem === "menor") resultado = [...resultado].sort((a, b) => a.preco - b.preco);
    if (ordem === "maior") resultado = [...resultado].sort((a, b) => b.preco - a.preco);
    return resultado;
  }, [produtos, categoria, busca, ordem]);

  return (
    <div className="catalogo">
      <section className="catalogo__hero">
        <h1>Novo drop</h1>
        <p>Peças oversized, moletons pesados e estampas exclusivas.</p>
      </section>

      <div className="catalogo__filtros">
        <div className="catalogo__categorias">
          {CATEGORIAS.map((c) => (
            <button
              key={c.valor}
              className={`catalogo__chip ${categoria === c.valor ? "catalogo__chip--ativo" : ""}`}
              onClick={() => setCategoria(c.valor)}
            >
              {c.rotulo}
            </button>
          ))}
        </div>

        <div className="catalogo__controles">
          <input
            type="search"
            placeholder="Buscar produto"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            aria-label="Buscar produto"
          />
          <select value={ordem} onChange={(e) => setOrdem(e.target.value)} aria-label="Ordenar">
            <option value="padrao">Ordenar</option>
            <option value="menor">Menor preço</option>
            <option value="maior">Maior preço</option>
          </select>
        </div>
      </div>

      {erro && <p role="alert" className="catalogo__erro">{erro}</p>}

      {carregando ? (
        <div className="catalogo__grade">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="catalogo__skeleton" />
          ))}
        </div>
      ) : lista.length === 0 && !erro ? (
        <p className="catalogo__vazio">Nenhum produto encontrado.</p>
      ) : (
        <div className="catalogo__grade">
          {lista.map((p) => (
            <ProdutoCard key={p.id} produto={p} />
          ))}
        </div>
      )}
    </div>
  );
}