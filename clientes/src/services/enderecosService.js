const repo = require("../repositories/enderecosRepository");
const { HttpError } = require("../utils/erros");
const { validarEndereco } = require("../utils/validacao");

const paraApi = (r) => ({
  id: r.id,
  cep: r.cep,
  rua: r.rua,
  numero: r.numero,
  complemento: r.complemento,
  bairro: r.bairro,
  cidade: r.cidade,
  uf: r.uf,
  principal: Boolean(r.principal),
});

async function listar(clienteId) {
  const rows = await repo.listar(clienteId);
  return rows.map(paraApi);
}

async function criar(clienteId, body) {
  const dados = validarEndereco(body);
  try {
    const id = await repo.criar(clienteId, dados);
    return paraApi(await repo.buscar(clienteId, id));
  } catch (err) {
    if (err.code === "ER_NO_REFERENCED_ROW_2") {
      throw new HttpError(404, "Cliente não encontrado.");
    }
    throw err;
  }
}

async function atualizar(clienteId, id, body) {
  const dados = validarEndereco(body);
  if (!(await repo.buscar(clienteId, id))) throw new HttpError(404, "Endereço não encontrado.");
  await repo.atualizar(clienteId, id, dados);
  return paraApi(await repo.buscar(clienteId, id));
}

async function remover(clienteId, id) {
  const removido = await repo.remover(clienteId, id);
  if (!removido) throw new HttpError(404, "Endereço não encontrado.");
}

module.exports = { listar, criar, atualizar, remover };
