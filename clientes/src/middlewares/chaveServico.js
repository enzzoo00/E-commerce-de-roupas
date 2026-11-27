const crypto = require("crypto");

function iguais(a, b) {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}

// Protege a rota usada pelo serviço de Pedidos.
// Se SERVICE_KEY não estiver definida no .env, a rota fica aberta (útil em desenvolvimento).
module.exports = function chaveServico(req, res, next) {
  const esperada = process.env.SERVICE_KEY;
  if (!esperada) return next();

  const recebida = req.headers["x-service-key"];
  if (recebida && iguais(recebida, esperada)) return next();

  return res.status(401).json({ valido: false, mensagem: "Chave de serviço inválida." });
};
