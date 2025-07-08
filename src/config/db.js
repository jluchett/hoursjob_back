const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

// Verificar conexión a la base de datos al iniciar
pool.connect((err) => {
  if (err) {
    console.error("Error al conectar a PostgreSQL:", err.stack);
  } else {
    console.log("PostgreSQL conectado correctamente");
  }
});

// Manejar errores de conexión inesperados
pool.on("error", (err) => {
  console.error("Error inesperado en la base de datos:", err);
});

module.exports = pool;