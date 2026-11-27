const { pool } = require("../config/db");

async function criar({ nome, email, senhaHash, telefone }) {
  const [r] = await pool.execute(
    "INSERT INTO clientes (nome, email, senha_hash, telefone) VALUES (?, ?, ?, ?)",
    [nome, email, senhaHash, telefone ?? null]
  );
  return r.insertId;
}

// Único lugar que devolve o hash da senha (só para o login)
async function buscarPorEmail(email) {
  const [rows] = await pool.execute(
    "SELECT id, nome, email, senha_hash FROM clientes WHERE email = ?",
    [email]
  );
  return rows[0] || null;
}

async function buscarPorId(id) {
  const [rows] = await pool.execute(
    "SELECT id, nome, email, telefone, criado_em FROM clientes WHERE id = ?",
    [id]
  );
  return rows[0] || null;
}

async function atualizar(id, { nome, telefone }) {
  await pool.execute("UPDATE clientes SET nome = ?, telefone = ? WHERE id = ?", [
    nome,
    telefone ?? null,
    id,
  ]);
}

module.exports = { criar, buscarPorEmail, buscarPorId, atualizar };
