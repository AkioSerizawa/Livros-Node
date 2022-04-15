import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";

//Conexão com o banco de dados
db.on(
  "error",
  console.log.bind(console, "Erro de conexão com o Banco de Dados")
);
db.once("open", () => {
  console.log("Conexão com o Banco de Dados feita com sucesso!");
});

const app = express();
app.use(express.json());

// Rotas
routes(app);

export default app;
