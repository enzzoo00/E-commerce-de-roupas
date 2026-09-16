package controller;

import model.Carrinho;
import model.Cliente;
import model.MetodoPagamento;
import model.Pedido;
import model.ResultadoPagamento;

public class PedidoController {
    private static int contadorPedido = 1;

    public Pedido criarPedido(Cliente cliente, Carrinho carrinho) {
        if (carrinho.getItens().isEmpty()) {
            throw new IllegalStateException("O carrinho está vazio.");
        }
        return new Pedido(contadorPedido++, cliente, carrinho);
    }

    public ResultadoPagamento finalizarCompra(Pedido pedido, MetodoPagamento metodo) {
        return pedido.processarPagamento(metodo);
    }
}
