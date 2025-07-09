const { Pool } = require("pg");
const { DB } = require("../../config");

const pool = new Pool({DB});

// Verificar conexión a la base de datos al iniciar
const connectDB = async () => {
  try {
    await pool.query('SELECT NOW()'); // Test de conexión
    console.log('✅ PostgreSQL conectado');
  } catch (err) {
    throw new Error(`Error de conexión a PostgreSQL: ${err.message}`);
  }
};

module.exports = { pool, connectDB };  