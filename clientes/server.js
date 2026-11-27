// O dotenv precisa ser carregado ANTES dos demais arquivos (db.js lê o process.env)
require("dotenv").config();

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET não definido. Copie .env.example para .env e preencha.");
  process.exit(1);
}

const app = require("./src/app");
const { pool } = require("./src/config/db");

const PORT = Number(process.env.PORT) || 3001;

const server = app.listen(PORT, "0.0.0.0", async () => {
  console.log(`Serviço de Clientes rodando na porta ${PORT}`);
  try {
    await pool.query("SELECT 1");
    console.log("Conexão com o MySQL OK");
  } catch (err) {
    console.error("Não foi possível conectar ao MySQL:", err.message);
  }
});

function encerrar() {
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
}
process.on("SIGTERM", encerrar);
process.on("SIGINT", encerrar);
