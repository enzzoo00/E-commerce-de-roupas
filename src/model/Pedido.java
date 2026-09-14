package model;

import java.util.Date;
import java.util.List;

public class Pedido {
    private int id;
    private Date dataCriacao;
    private float valorTotal;
    private boolean statusPagamento;
    private Cliente cliente;
    private List<ItemCarrinho> itens;

    public Pedido(int id, Cliente cliente, Carrinho carrinho) {
        this.id = id;
        this.cliente = cliente;
        this.dataCriacao = new Date();
        this.itens = List.copyOf(carrinho.getItens());
        this.valorTotal = carrinho.calcularTotal();
        this.statusPagamento = false;
    }

    public ResultadoPagamento processarPagamento(MetodoPagamento metodo) {
        ResultadoPagamento resultado = metodo.processar(this.valorTotal);
        if (resultado.isSucesso()) {
            this.statusPagamento = true;
        }
        return resultado;
    }

    public int getId() { return id; }
    public Date getDataCriacao() { return dataCriacao; }
    public float getValorTotal() { return valorTotal; }
    public boolean isStatusPagamento() { return statusPagamento; }
    public Cliente getCliente() { return cliente; }
    public List<ItemCarrinho> getItens() { return itens; }
}