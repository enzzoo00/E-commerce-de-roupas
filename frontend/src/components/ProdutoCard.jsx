import { formatarPreco, precoPix, parcela } from "../utils/formatar";
import "./ProdutoCard.css";

export default function ProdutoCard({ produto }) {
  const { nome, preco, precoOriginal, cores, selo, imagem } = produto;

  return (
    <article className="produto-card">
      <div className="produto-card__midia">
        {selo && <span className="produto-card__selo">{selo}</span>}
        {imagem ? (
          <img src={imagem} alt={nome} loading="lazy" />
        ) : (
          <div className="produto-card__placeholder" aria-hidden="true">
            {nome.charAt(0)}
          </div>
        )}
      </div>

      <div className="produto-card__info">
        <h3 className="produto-card__nome">{nome}</h3>
        <p className="produto-card__cor">{cores.join(" / ")}</p>

        <div className="produto-card__precos">
          {precoOriginal && (
            <span className="produto-card__de">{formatarPreco(precoOriginal)}</span>
          )}
          <span className="produto-card__preco">{formatarPreco(preco)}</span>
        </div>
        <p className="produto-card__pix">{formatarPreco(precoPix(preco))} no Pix</p>
        <p className="produto-card__parcela">ou 5x de {formatarPreco(parcela(preco))}</p>
      </div>
    </article>
  );
}