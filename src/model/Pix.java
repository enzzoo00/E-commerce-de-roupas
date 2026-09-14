package model;

import java.util.UUID;

public class Pix implements MetodoPagamento {
    private String chavePix;

    public Pix(String chavePix) {
        this.chavePix = chavePix;
    }

    @Override
    public ResultadoPagamento processar(float valor) {
        if (chavePix != null && !chavePix.isEmpty()) {
            String transacaoId = "PIX-" + UUID.randomUUID().toString().substring(0, 8);
            return new ResultadoPagamento(true, null, transacaoId);
        }
        return new ResultadoPagamento(false, "Chave Pix inválida.", null);
    }
}
