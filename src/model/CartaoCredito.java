package model;

import java.util.UUID;

public class CartaoCredito implements MetodoPagamento {
    private String numeroCartao;
    private String validade;
    private String cvv;
    private String nomeTitular;

    public CartaoCredito(String numeroCartao, String validade, String cvv, String nomeTitular) {
        this.numeroCartao = numeroCartao;
        this.validade = validade;
        this.cvv = cvv;
        this.nomeTitular = nomeTitular;
    }

    @Override
    public ResultadoPagamento processar(float valor) {
        if (numeroCartao != null && !numeroCartao.isEmpty()) {
            String transacaoId = "CC-" + UUID.randomUUID().toString().substring(0, 8);
            return new ResultadoPagamento(true, null, transacaoId);
        }
        return new ResultadoPagamento(false, "Cartão inválido.", null);
    }
}
