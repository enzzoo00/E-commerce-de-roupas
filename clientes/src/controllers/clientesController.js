const service = require("../services/clientesService");
const asyncHandler = require("../utils/asyncHandler");

exports.cadastrar = asyncHandler(async (req, res) => {
  res.status(201).json(await service.cadastrar(req.body));
});

exports.login = asyncHandler(async (req, res) => {
  res.json(await service.login(req.body));
});

exports.obter = asyncHandler(async (req, res) => {
  res.json(await service.obter(Number(req.params.id)));
});

exports.atualizar = asyncHandler(async (req, res) => {
  res.json(await service.atualizar(Number(req.params.id), req.body));
});

exports.validar = asyncHandler(async (req, res) => {
  const resultado = await service.validar(Number(req.params.id));
  res.status(resultado.valido ? 200 : 404).json(resultado);
});
