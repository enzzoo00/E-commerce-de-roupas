const { pool } = require("../config/db");

const COLUNAS = "id, cep, rua, numero, complemento, bairro, cidade, uf, principal";

// Executa várias queries juntas: ou todas dão certo, ou nenhuma é aplicada
async function emTransacao(fn) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const resultado = await fn(conn);
    await conn.commit();
    return resultado;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

async function listar(clienteId) {
  const [rows] = await pool.execute(
    `SELECT ${COLUNAS} FROM enderecos WHERE cliente_id = ? ORDER BY principal DESC, id ASC`,
    [clienteId]
  );
  return rows;
}

async function buscar(clienteId, id) {
  const [rows] = await pool.execute(
    `SELECT ${COLUNAS} FROM enderecos WHERE id = ? AND cliente_id = ?`,
    [id, clienteId]
  );
  return rows[0] || null;
}

async function criar(clienteId, e) {
  return emTransacao(async (conn) => {
    const [existentes] = await conn.execute(
      "SELECT id FROM enderecos WHERE cliente_id = ? FOR UPDATE",
      [clienteId]
    );
    // O primeiro endereço sempre vira o principal
    const principal = e.principal || existentes.length === 0;

    if (principal) {
      await conn.execute("UPDATE enderecos SET principal = 0 WHERE cliente_id = ?", [clienteId]);
    }

    const [r] = await conn.execute(
      `INSERT INTO enderecos
         (cliente_id, cep, rua, numero, complemento, bairro, cidade, uf, principal)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [clienteId, e.cep, e.rua, e.numero, e.complemento, e.bairro, e.cidade, e.uf, principal ? 1 : 0]
    );
    return r.insertId;
  });
}

async function atualizar(clienteId, id, e) {
  return emTransacao(async (conn) => {
    // Só dá para PROMOVER um endereço a principal; para trocar, marque outro como principal
    if (e.principal) {
      await conn.execute("UPDATE enderecos SET principal = 0 WHERE cliente_id = ?", [clienteId]);
    }

    await conn.execute(
      `UPDATE enderecos
          SET cep = ?, rua = ?, numero = ?, complemento = ?, bairro = ?, cidade = ?, uf = ?
              ${e.principal ? ", principal = 1" : ""}
        WHERE id = ? AND cliente_id = ?`,
      [e.cep, e.rua, e.numero, e.complemento, e.bairro, e.cidade, e.uf, id, clienteId]
    );
  });
}

async function remover(clienteId, id) {
  return emTransacao(async (conn) => {
    const [rows] = await conn.execute(
      "SELECT principal FROM enderecos WHERE id = ? AND cliente_id = ? FOR UPDATE",
      [id, clienteId]
    );
    if (rows.length === 0) return false;

    await conn.execute("DELETE FROM enderecos WHERE id = ? AND cliente_id = ?", [id, clienteId]);

    // Se removeu o principal, o endereço mais antigo que sobrar assume
    if (rows[0].principal) {
      await conn.execute(
        "UPDATE enderecos SET principal = 1 WHERE cliente_id = ? ORDER BY id ASC LIMIT 1",
        [clienteId]
      );
    }
    return true;
  });
}

module.exports = { listar, buscar, criar, atualizar, remover };
