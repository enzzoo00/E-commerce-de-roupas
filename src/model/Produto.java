package model;

import java.util.ArrayList;
import java.util.List;

public class Produto {
    private int id;
    private String nome;
    private String descricao;
    private float precoBase;
    private Categoria categoria;
    private List<ItemEstoque> variacoes;

    public Produto(int id, String nome, String descricao, float precoBase, Categoria categoria) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.precoBase = precoBase;
        this.categoria = categoria;
        this.variacoes = new ArrayList<>();
    }

    public void adicionarVariacao(ItemEstoque itemEstoque) {
        this.variacoes.add(itemEstoque);
    }

    public int getId() { return id; }
    public String getNome() { return nome; }
    public String getDescricao() { return descricao; }
    public float getPrecoBase() { return precoBase; }
    public Categoria getCategoria() { return categoria; }
    public List<ItemEstoque> getVariacoes() { return variacoes; }
}
