package model;

import java.util.ArrayList;
import java.util.List;

public class Carrinho {
    private int id;
    private List<ItemCarrinho> itens;

    public Carrinho(int id) {
        this.id = id;
        this.itens = new ArrayList<>();
    }

    public void adicionarItem(Produto produto, String tam, String cor, int qtd) {
        ItemCarrinho item = new ItemCarrinho(produto, tam, cor, qtd);
        itens.add(item);
    }

    public void removerItem(ItemCarrinho item) {
        itens.remove(item);
    }

    public void alterarQuantidade(ItemCarrinho item, int qtd) {
        if (qtd <= 0) {
            removerItem(item);
        } else {
            item.setQuantidade(qtd);
        }
    }

    public float calcularTotal() {
        float total = 0.0f;
        for (ItemCarrinho item : itens) {
            total += item.calcularSubtotal();
        }
        return total;
    }

    public int getId() { return id; }
    public List<ItemCarrinho> getItens() { return itens; }
}
