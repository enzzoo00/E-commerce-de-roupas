const express = require("express");
const ctrl = require("../controllers/clientesController");
const enderecosRoutes = require("./enderecos");
const { autenticar, somenteDono } = require("../middlewares/auth");
const chaveServico = require("../middlewares/chaveServico");

const router = express.Router();

router.param("id", (req, res, next, valor) => {
  if (!/^\d+$/.test(valor)) return res.status(400).json({ mensagem: "ID inválido." });
  return next();
});

// Públicas
router.post("/cadastro", ctrl.cadastrar);
router.post("/login", ctrl.login);

// Usada pelo serviço de Pedidos (protegida por X-Service-Key se SERVICE_KEY estiver definida)
router.get("/:id/validar", chaveServico, ctrl.validar);

// Autenticadas (JWT) e só do próprio cliente
router.get("/:id", autenticar, somenteDono, ctrl.obter);
router.put("/:id", autenticar, somenteDono, ctrl.atualizar);
router.use("/:id/enderecos", autenticar, somenteDono, enderecosRoutes);

module.exports = router;
