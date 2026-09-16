package repository;

import model.Categoria;
import model.Produto;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class ProdutoRepository {
    private List<Produto> bancoDadosProdutos = new ArrayList<>();

    public void salvar(Produto produto) {
        bancoDadosProdutos.add(produto);
    }

    public List<Produto> buscarPorNome(String termo) {
        return bancoDadosProdutos.stream()
                .filter(p -> p.getNome().toLowerCase().contains(termo.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Produto> filtrarPorCategoria(Categoria categoria) {
        return bancoDadosProdutos.stream()
                .filter(p -> p.getCategoria().getId() == categoria.getId())
                .collect(Collectors.toList());
    }
}