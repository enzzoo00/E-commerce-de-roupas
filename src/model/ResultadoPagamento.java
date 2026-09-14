package model;

public class ResultadoPagamento {
    private boolean sucesso;
    private String mensagemErro;
    private String transacaoId;

    public ResultadoPagamento(boolean sucesso, String mensagemErro, String transacaoId) {
        this.sucesso = sucesso;
        this.mensagemErro = mensagemErro;
        this.transacaoId = transacaoId;
    }

    public boolean isSucesso() { return sucesso; }
    public String getMensagemErro() { return mensagemErro; }
    public String getTransacaoId() { return transacaoId; }
}

