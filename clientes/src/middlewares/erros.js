const { HttpError } = require("../utils/erros");

function notFound(req, res) {
  res.status(404).json({ mensagem: "Rota não encontrada." });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      mensagem: err.mensagem,
      ...(err.detalhes ? { erros: err.detalhes } : {}),
    });
  }
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ mensagem: "JSON inválido." });
  }
  if (err.type === "entity.too.large") {
    return res.status(413).json({ mensagem: "Corpo da requisição muito grande." });
  }

  console.error(err);
  return res.status(500).json({ mensagem: "Erro interno do servidor." });
}

module.exports = { notFound, errorHandler };
