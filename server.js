const app = require("./app");
const { PORT } = require("./config");
const { connectDB } = require("./src/config/db");

// Conectar a la base de datos al iniciar el servidor
await connectDB()

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});