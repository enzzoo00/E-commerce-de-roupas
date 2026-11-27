const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const { notFound, errorHandler } = require("./middlewares/erros");

const app = express();
app.disable("x-powered-by");

// Origens permitidas (separe por vírgula): o frontend local e o da Vercel
const origens = (process.env.FRONTEND_URL || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(cors({ origin: origens }));
app.use(express.json({ limit: "100kb" }));

app.get("/health", (req, res) => res.json({ status: "ok", servico: "clientes" }));
app.use("/clientes", routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
