package model;

public class ItemCarrinho {
    private int quantidade;
    private String tamanhoSelecionado;
    private String corSelecionada;
    private Produto produto;

    public ItemCarrinho(Produto produto, String tamanho, String cor, int quantidade) {
        this.produto = produto;
        this.tamanhoSelecionado = tamanho;
        this.corSelecionada = cor;
        this.quantidade = quantidade;
    }

    public float calcularSubtotal() {
        return produto.getPrecoBase() * quantidade;
    }

    public int getQuantidade() { return quantidade; }
    public void setQuantidade(int quantidade) { this.quantidade = quantidade; }
    public String getTamanhoSelecionado() { return tamanhoSelecionado; }
    public String getCorSelecionada() { return corSelecionada; }
    public Produto getProduto() { return produto; }
}