package model;

public class ItemEstoque {
    private int id;
    private String tamanho;
    private String cor;
    private int quantidadeEstoque;

    public ItemEstoque(int id, String tamanho, String cor, int quantidadeEstoque) {
        this.id = id;
        this.tamanho = tamanho;
        this.cor = cor;
        this.quantidadeEstoque = quantidadeEstoque;
    }

    public boolean verificarDisponibilidade(int qtd) {
        return this.quantidadeEstoque >= qtd;
    }

    public void deduzirEstoque(int qtd) {
        if (verificarDisponibilidade(qtd)) {
            this.quantidadeEstoque -= qtd;
        } else {
            throw new IllegalArgumentException("Estoque insuficiente para esta variação.");
        }
    }

    public int getId() { return id; }
    public String getTamanho() { return tamanho; }
    public String getCor() { return cor; }
    public int getQuantidadeEstoque() { return quantidadeEstoque; }
}
