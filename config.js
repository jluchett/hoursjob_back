require('dotenv').config(); // Carga variables de entorno desde .env

module.exports = {
  // 1. Configuración del Servidor
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || 'localhost',

  // 2. Base de Datos (PostgreSQL)
  DB: {
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'empleados_db',
    password: process.env.DB_PASSWORD || '',
    port: process.env.DB_PORT || 5432,
    //ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false, // Para producción con SSL
  },

  // 3. Autenticación (JWT)
  JWT: {
    secret: process.env.JWT_SECRET || 'secret_key_dev', // ¡Cambiar en producción!
    expiresIn: process.env.JWT_EXPIRES || '1h',
  },

  // 4. Configuración de CORS (Seguridad)
  CORS_OPTIONS: {
    origin: process.env.CORS_ORIGIN || '*', // En producción usa tu dominio real
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },

  // 5. Logging (Solo en desarrollo)
  LOGGING: process.env.LOGGING === 'true',
};