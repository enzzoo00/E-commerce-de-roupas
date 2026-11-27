const service = require("../services/enderecosService");
const asyncHandler = require("../utils/asyncHandler");

exports.listar = asyncHandler(async (req, res) => {
  res.json(await service.listar(Number(req.params.id)));
});

exports.criar = asyncHandler(async (req, res) => {
  res.status(201).json(await service.criar(Number(req.params.id), req.body));
});

exports.atualizar = asyncHandler(async (req, res) => {
  res.json(await service.atualizar(Number(req.params.id), Number(req.params.eid), req.body));
});

exports.remover = asyncHandler(async (req, res) => {
  await service.remover(Number(req.params.id), Number(req.params.eid));
  res.status(204).send();
});
