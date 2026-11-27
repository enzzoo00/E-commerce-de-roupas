// Erro com status HTTP. O errorHandler transforma em { mensagem, erros? }
class HttpError extends Error {
  constructor(status, mensagem, detalhes) {
    super(mensagem);
    this.status = status;
    this.mensagem = mensagem;
    this.detalhes = detalhes;
  }
}

module.exports = { HttpError };
