const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const repo = require("../repositories/clientesRepository");
const { HttpError } = require("../utils/erros");
const { validarCadastro, validarAtualizacao } = require("../utils/validacao");

// Usado quando o e-mail não existe, para o login levar o mesmo tempo nos dois casos
const HASH_FALSO = bcrypt.hashSync("senha-falsa-para-igualar-o-tempo", 10);

async function cadastrar(body) {
  const dados = validarCadastro(body);
  const senhaHash = await bcrypt.hash(dados.senha, 10);

  try {
    const id = await repo.criar({ ...dados, senhaHash });
    return { id, nome: dados.nome, email: dados.email };
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      throw new HttpError(409, "Este e-mail já está cadastrado.");
    }
    throw err;
  }
}

async function login(body = {}) {
  const email = String(body.email ?? "").trim().toLowerCase();
  const senha = String(body.senha ?? "");
  if (!email || !senha) throw new HttpError(400, "Informe e-mail e senha.");

  const cliente = await repo.buscarPorEmail(email);
  const senhaOk = await bcrypt.compare(senha, cliente ? cliente.senha_hash : HASH_FALSO);

  // Mesma mensagem nos dois casos, para não revelar quais e-mails existem
  if (!cliente || !senhaOk) throw new HttpError(401, "E-mail ou senha inválidos.");

  const token = jwt.sign({ email: cliente.email }, process.env.JWT_SECRET, {
    subject: String(cliente.id),
    expiresIn: process.env.JWT_EXPIRES_IN || "2h",
    algorithm: "HS256",
  });

  return { token, cliente: { id: cliente.id, nome: cliente.nome, email: cliente.email } };
}

async function obter(id) {
  const c = await repo.buscarPorId(id);
  if (!c) throw new HttpError(404, "Cliente não encontrado.");
  return { id: c.id, nome: c.nome, email: c.email, telefone: c.telefone, criadoEm: c.criado_em };
}

async function atualizar(id, body) {
  const dados = validarAtualizacao(body);
  await obter(id); // lança 404 se não existir
  await repo.atualizar(id, dados);
  return obter(id);
}

// Usado pelo serviço de Pedidos ("valida cliente")
async function validar(id) {
  const c = await repo.buscarPorId(id);
  if (!c) return { valido: false };
  return { valido: true, id: c.id, nome: c.nome, email: c.email };
}

module.exports = { cadastrar, login, obter, atualizar, validar };
