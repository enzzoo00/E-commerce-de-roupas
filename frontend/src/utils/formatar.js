const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export const formatarPreco = (valor) => brl.format(valor);
export const precoPix = (valor, desconto = 0.1) => valor * (1 - desconto);
export const parcela = (valor, vezes = 5) => valor / vezes;