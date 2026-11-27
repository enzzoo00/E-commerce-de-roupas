const { HttpError } = require("./erros");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TEL_RE = /^[0-9()+\-\s]{8,20}$/;
const UF_RE = /^[A-Z]{2}$/;

const texto = (v) => (typeof v === "string" ? v.trim() : "");

function lancar(erros) {
  if (erros.length) throw new HttpError(400, erros.join(" "), erros);
}

function validarCadastro(body = {}) {
  const nome = texto(body.nome);
  const email = texto(body.email).toLowerCase();
  const senha = typeof body.senha === "string" ? body.senha : "";
  const telefone = texto(body.telefone);
  const erros = [];

  if (nome.length < 2 || nome.length > 120) erros.push("Nome deve ter entre 2 e 120 caracteres.");
  if (!EMAIL_RE.test(email) || email.length > 120) erros.push("E-mail inválido.");
  // 72 é o limite do bcrypt
  if (senha.length < 6 || senha.length > 72) erros.push("A senha deve ter entre 6 e 72 caracteres.");
  if (telefone && !TEL_RE.test(telefone)) erros.push("Telefone inválido.");

  lancar(erros);
  return { nome, email, senha, telefone: telefone || null };
}

function validarAtualizacao(body = {}) {
  const nome = texto(body.nome);
  const telefone = texto(body.telefone);
  const erros = [];

  if (nome.length < 2 || nome.length > 120) erros.push("Nome deve ter entre 2 e 120 caracteres.");
  if (telefone && !TEL_RE.test(telefone)) erros.push("Telefone inválido.");

  lancar(erros);
  return { nome, telefone: telefone || null };
}

function validarEndereco(body = {}) {
  const cepNumeros = String(body.cep ?? "").replace(/\D/g, "");
  const rua = texto(body.rua);
  const numero = String(body.numero ?? "").trim();
  const complemento = texto(body.complemento);
  const bairro = texto(body.bairro);
  const cidade = texto(body.cidade);
  const uf = texto(body.uf).toUpperCase();
  const erros = [];

  if (cepNumeros.length !== 8) erros.push("CEP deve ter 8 dígitos.");
  if (!rua || rua.length > 150) erros.push("Rua é obrigatória (até 150 caracteres).");
  if (!numero || numero.length > 10) erros.push("Número é obrigatório (até 10 caracteres).");
  if (complemento.length > 80) erros.push("Complemento deve ter até 80 caracteres.");
  if (!bairro || bairro.length > 80) erros.push("Bairro é obrigatório (até 80 caracteres).");
  if (!cidade || cidade.length > 80) erros.push("Cidade é obrigatória (até 80 caracteres).");
  if (!UF_RE.test(uf)) erros.push("UF deve ter 2 letras.");

  lancar(erros);
  return {
    cep: `${cepNumeros.slice(0, 5)}-${cepNumeros.slice(5)}`,
    rua,
    numero,
    complemento: complemento || null,
    bairro,
    cidade,
    uf,
    principal: body.principal === true,
  };
}

module.exports = { validarCadastro, validarAtualizacao, validarEndereco };
