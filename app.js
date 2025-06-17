const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares 
app.use(cors()); // permite solicitudes desde el frontend
app.use(express.json()); // parsea el cuerpo de las solicitudes JSON

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: "Api en funcionamiento" });
});

// Manejo de errores - middleware final
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal' });
});

module.exports = app;