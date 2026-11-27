const jwt = require("jsonwebtoken");

// Exige header "Authorization: Bearer <token>" e coloca o usuário em req.usuario
function autenticar(req, res, next) {
  const [tipo, token] = (req.headers.authorization || "").split(" ");

  if (tipo !== "Bearer" || !token) {
    return res.status(401).json({ mensagem: "Token não informado." });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ["HS256"] });
    req.usuario = { id: Number(payload.sub), email: payload.email };
    return next();
  } catch {
    return res.status(401).json({ mensagem: "Token inválido ou expirado." });
  }
}

// O cliente só pode mexer nos próprios dados (:id da rota == id do token)
function somenteDono(req, res, next) {
  if (req.usuario.id !== Number(req.params.id)) {
    return res.status(403).json({ mensagem: "Acesso negado." });
  }
  return next();
}

module.exports = { autenticar, somenteDono };
