const express = require("express");
const ctrl = require("../controllers/enderecosController");

// mergeParams: permite ler o :id da rota pai (/clientes/:id/enderecos)
const router = express.Router({ mergeParams: true });

router.param("eid", (req, res, next, valor) => {
  if (!/^\d+$/.test(valor)) return res.status(400).json({ mensagem: "ID de endereço inválido." });
  return next();
});

router.get("/", ctrl.listar);
router.post("/", ctrl.criar);
router.put("/:eid", ctrl.atualizar);
router.delete("/:eid", ctrl.remover);

module.exports = router;
